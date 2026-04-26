"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import type { CareerPath } from "@/data/career-data";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase-config";
import { emptyProfile, readStorage, STORAGE_KEYS, type StoredProfile, writeStorage } from "@/lib/storage";
import type { Database } from "@/types/database";

type CareerCompassContextValue = {
  profile: StoredProfile;
  customPaths: CareerPath[];
  isReady: boolean;
  session: Session | null;
  user: User | null;
  isCloudMode: boolean;
  updateProfile: (updates: Partial<StoredProfile>) => Promise<void>;
  savePath: (pathId: string) => Promise<void>;
  addCompletedPath: (pathId: string) => Promise<void>;
  logQuizResult: (fieldId: string, topMatchId: string | null) => Promise<void>;
  addCustomPath: (path: CareerPath) => Promise<void>;
  deleteCustomPath: (pathId: string) => Promise<void>;
  refreshCloudData: () => Promise<void>;
  signOut: () => Promise<void>;
};

const CareerCompassContext = createContext<CareerCompassContextValue | null>(null);

function mapCareerPathRow(row: Database["public"]["Tables"]["career_paths"]["Row"]): CareerPath {
  return {
    id: row.id,
    title: row.title,
    field: row.field as CareerPath["field"],
    description: row.description,
    mission: row.mission,
    traits: row.traits ?? [],
    skills: row.skills ?? [],
    classes: row.classes ?? [],
    projects: row.projects ?? [],
    roadmap: row.roadmap ?? [],
    actualWork: [],
    beginnerProject: "Create a small beginner project connected to this path and document what you learn.",
    dimensionProfile: {
      logic: 3,
      handsOn: 3,
      impact: 3
    },
    answerWeights:
      row.answer_weights && typeof row.answer_weights === "object" && !Array.isArray(row.answer_weights)
        ? (row.answer_weights as Record<string, number>)
        : {}
  };
}

function mapProfileRow(
  row: Database["public"]["Tables"]["profiles"]["Row"],
  quizHistory: StoredProfile["quizHistory"]
): StoredProfile {
  return {
    name: row.name ?? "",
    email: row.email ?? "",
    firstDream: row.first_dream ?? "",
    currentInterest: row.current_interest ?? "",
    mission: row.mission ?? "",
    savedPathId: row.saved_path_id,
    completedPathIds: row.completed_path_ids ?? [],
    quizHistory
  };
}

export function CareerCompassProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<StoredProfile>(emptyProfile);
  const [customPaths, setCustomPaths] = useState<CareerPath[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const supabase = useMemo(() => (isSupabaseConfigured() ? createClient() : null), []);
  const isCloudMode = Boolean(supabase && user);

  const persistLocalProfile = useCallback((next: StoredProfile) => {
    setProfile(next);
    writeStorage(STORAGE_KEYS.profile, next);
  }, []);

  const persistLocalPaths = useCallback((next: CareerPath[]) => {
    setCustomPaths(next);
    writeStorage(STORAGE_KEYS.customPaths, next);
  }, []);

  const refreshCloudData = useCallback(async () => {
    if (!supabase) {
      return;
    }

    const {
      data: { session: nextSession }
    } = await supabase.auth.getSession();

    setSession(nextSession);
    setUser(nextSession?.user ?? null);

    if (!nextSession?.user) {
      const { data: publicPaths } = await supabase
        .from("career_paths")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: false });

      persistLocalProfile(readStorage(STORAGE_KEYS.profile, emptyProfile));
      persistLocalPaths(
        publicPaths && publicPaths.length > 0
          ? publicPaths.map(mapCareerPathRow)
          : readStorage(STORAGE_KEYS.customPaths, [] as CareerPath[])
      );
      return;
    }

    const [profileResult, quizRunsResult, careerPathsResult] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", nextSession.user.id).maybeSingle(),
      supabase
        .from("quiz_runs")
        .select("field_id, top_match_id, created_at")
        .eq("user_id", nextSession.user.id)
        .order("created_at", { ascending: false })
        .limit(10),
      supabase.from("career_paths").select("*").order("created_at", { ascending: false })
    ]);

   const quizHistory =
  ((quizRunsResult.data ?? []) as Array<{
    created_at: string;
    field_id: string;
    top_match_id: string | null;
  }>).map((row) => ({
    createdAt: row.created_at,
    fieldId: row.field_id,
    topMatchId: row.top_match_id
  }));

    if (profileResult.data) {
      const nextProfile = mapProfileRow(profileResult.data, quizHistory);
      persistLocalProfile(nextProfile);
    } else {
      const fallbackProfile = {
        ...emptyProfile,
        email: nextSession.user.email ?? "",
        quizHistory
      };
      persistLocalProfile(fallbackProfile);
    }

    const nextPaths = (careerPathsResult.data ?? []).map(mapCareerPathRow);
    persistLocalPaths(nextPaths);
  }, [persistLocalPaths, persistLocalProfile, supabase]);

  useEffect(() => {
    if (!supabase) {
      persistLocalProfile(readStorage(STORAGE_KEYS.profile, emptyProfile));
      persistLocalPaths(readStorage(STORAGE_KEYS.customPaths, [] as CareerPath[]));
      setIsReady(true);
      return;
    }

    refreshCloudData().finally(() => setIsReady(true));

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      void refreshCloudData();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [persistLocalPaths, persistLocalProfile, refreshCloudData, supabase]);

  const updateProfile = useCallback(
    async (updates: Partial<StoredProfile>) => {
      const nextLocal = { ...profile, ...updates };
      persistLocalProfile(nextLocal);

      if (!supabase || !user) {
        return;
      }

      await supabase.from("profiles").upsert({
        id: user.id,
        name: nextLocal.name || null,
        email: nextLocal.email || user.email || null,
        first_dream: nextLocal.firstDream || null,
        current_interest: nextLocal.currentInterest || null,
        mission: nextLocal.mission || null,
        saved_path_id: nextLocal.savedPathId,
        completed_path_ids: nextLocal.completedPathIds
      });
    },
    [persistLocalProfile, profile, supabase, user]
  );

  const savePath = useCallback(
    async (pathId: string) => {
      await updateProfile({ savedPathId: pathId });
    },
    [updateProfile]
  );

  const addCompletedPath = useCallback(
    async (pathId: string) => {
      const completedPathIds = Array.from(new Set([...profile.completedPathIds, pathId]));
      await updateProfile({ completedPathIds });
    },
    [profile.completedPathIds, updateProfile]
  );

  const logQuizResult = useCallback(
    async (fieldId: string, topMatchId: string | null) => {
      const nextHistory = [
        {
          createdAt: new Date().toISOString(),
          fieldId,
          topMatchId
        },
        ...profile.quizHistory
      ].slice(0, 10);

      persistLocalProfile({
        ...profile,
        quizHistory: nextHistory
      });

      if (!supabase || !user) {
        return;
      }

      await supabase.from("quiz_runs").insert({
        user_id: user.id,
        field_id: fieldId,
        top_match_id: topMatchId
      });
    },
    [persistLocalProfile, profile, supabase, user]
  );

  const addCustomPath = useCallback(
    async (path: CareerPath) => {
      const nextLocal = [...customPaths.filter((item) => item.id !== path.id), path];
      persistLocalPaths(nextLocal);

      if (!supabase || !user) {
        return;
      }

      await supabase.from("career_paths").upsert({
        id: path.id,
        created_by: user.id,
        field: path.field,
        title: path.title,
        description: path.description,
        mission: path.mission,
        traits: path.traits,
        skills: path.skills,
        classes: path.classes,
        projects: path.projects,
        roadmap: path.roadmap,
        answer_weights: path.answerWeights,
        is_public: true
      });
    },
    [customPaths, persistLocalPaths, supabase, user]
  );

  const deleteCustomPath = useCallback(
    async (pathId: string) => {
      const nextLocal = customPaths.filter((item) => item.id !== pathId);
      persistLocalPaths(nextLocal);

      if (!supabase || !user) {
        return;
      }

      await supabase.from("career_paths").delete().eq("id", pathId).eq("created_by", user.id);
    },
    [customPaths, persistLocalPaths, supabase, user]
  );

  const signOut = useCallback(async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    persistLocalProfile(readStorage(STORAGE_KEYS.profile, emptyProfile));
    persistLocalPaths(readStorage(STORAGE_KEYS.customPaths, [] as CareerPath[]));
  }, [persistLocalPaths, persistLocalProfile, supabase]);

  return (
    <CareerCompassContext.Provider
      value={{
        profile,
        customPaths,
        isReady,
        session,
        user,
        isCloudMode,
        updateProfile,
        savePath,
        addCompletedPath,
        logQuizResult,
        addCustomPath,
        deleteCustomPath,
        refreshCloudData,
        signOut
      }}
    >
      {children}
    </CareerCompassContext.Provider>
  );
}

export function useCareerCompass() {
  const context = useContext(CareerCompassContext);

  if (!context) {
    throw new Error("useCareerCompass must be used within CareerCompassProvider");
  }

  return context;
}
