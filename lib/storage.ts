export const STORAGE_KEYS = {
  profile: "career-compass-profile",
  customPaths: "career-compass-custom-paths"
} as const;

export type StoredProfile = {
  name: string;
  email: string;
  firstDream: string;
  currentInterest: string;
  mission: string;
  savedPathId: string | null;
  completedPathIds: string[];
  quizHistory: Array<{
    createdAt: string;
    fieldId: string;
    topMatchId: string | null;
  }>;
};

export const emptyProfile: StoredProfile = {
  name: "",
  email: "",
  firstDream: "",
  currentInterest: "",
  mission: "",
  savedPathId: null,
  completedPathIds: [],
  quizHistory: []
};

export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }

    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}
