"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCareerCompass } from "@/providers/career-compass-provider";
import { getAllCareerPaths, getCareerPathById } from "@/lib/career-paths";
import { fields } from "@/data/career-data";
import { isSupabaseConfigured } from "@/lib/supabase-config";

export function AccountDashboard() {
  const { profile, customPaths, updateProfile, isCloudMode, user, signOut } = useCareerCompass();
  const [formState, setFormState] = useState({
    name: profile.name,
    email: profile.email,
    firstDream: profile.firstDream,
    currentInterest: profile.currentInterest,
    mission: profile.mission
  });

  const savedPath = getCareerPathById(profile.savedPathId, customPaths);
  const availablePaths = useMemo(() => getAllCareerPaths(customPaths), [customPaths]);

  useEffect(() => {
    setFormState({
      name: profile.name,
      email: profile.email,
      firstDream: profile.firstDream,
      currentInterest: profile.currentInterest,
      mission: profile.mission
    });
  }, [profile]);

  function handleChange(field: keyof typeof formState, value: string) {
    setFormState((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleSave() {
    await updateProfile(formState);
  }

  return (
    <main className="page-shell">
      <nav className="top-nav">
        <Link href="/" className="brand-mark">
          Career Compass
        </Link>
        <div className="top-nav-links">
          <Link href="/explore">Explore</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </nav>

      <section className="dashboard-grid">
        <section className="panel section">
          <div className="section-header">
            <div>
              <h2>Your Account</h2>
              <p>Keep your dream, your current direction, and your mission in one place.</p>
            </div>
            <span className="badge">
              {isCloudMode ? "Cloud sync active" : isSupabaseConfigured() ? "Supabase ready" : "Local profile mode"}
            </span>
          </div>

          {isCloudMode ? (
            <p className="footer-note">Signed in as <strong>{user?.email}</strong>.</p>
          ) : isSupabaseConfigured() ? (
            <p className="footer-note">
              Supabase is configured, but you are not signed in yet.
              {" "}
              <Link href="/auth/sign-in">Sign in</Link>
              {" "}
              to sync this profile to the cloud.
            </p>
          ) : (
            <p className="footer-note">This page currently saves locally in your browser until Supabase is configured.</p>
          )}

          <div className="form-grid">
            <label className="form-field">
              <span>Name</span>
              <input value={formState.name} onChange={(event) => handleChange("name", event.target.value)} placeholder="Your name" />
            </label>
            <label className="form-field">
              <span>Email</span>
              <input value={formState.email} onChange={(event) => handleChange("email", event.target.value)} placeholder="you@example.com" />
            </label>
            <label className="form-field">
              <span>First dream</span>
              <input
                value={formState.firstDream}
                onChange={(event) => handleChange("firstDream", event.target.value)}
                placeholder="Example: surgeon"
              />
            </label>
            <label className="form-field">
              <span>Current interest</span>
              <input
                value={formState.currentInterest}
                onChange={(event) => handleChange("currentInterest", event.target.value)}
                placeholder="Example: mechatronics engineer"
              />
            </label>
            <label className="form-field form-field-wide">
              <span>Mission</span>
              <textarea
                value={formState.mission}
                onChange={(event) => handleChange("mission", event.target.value)}
                placeholder="What do you still want your work to help with?"
                rows={4}
              />
            </label>
          </div>

          <div className="quiz-actions">
            <button className="btn btn-primary" type="button" onClick={handleSave}>
              Save profile
            </button>
            <Link className="btn btn-secondary" href="/explore">
              Continue exploring
            </Link>
            {isCloudMode ? (
              <button className="btn btn-secondary" type="button" onClick={() => void signOut()}>
                Sign out
              </button>
            ) : isSupabaseConfigured() ? (
              <Link className="btn btn-secondary" href="/auth/sign-up">
                Create account
              </Link>
            ) : null}
          </div>
        </section>

        <aside className="sidebar-stack">
          <section className="panel section">
            <div className="section-header">
              <div>
                <h2>Saved Direction</h2>
                <p>The path you picked as your current best fit.</p>
              </div>
            </div>

            {savedPath ? (
              <div className="saved-card">
                <strong>{savedPath.title}</strong>
                <p>{savedPath.description}</p>
                <div className="pill-row">
                  {savedPath.skills.slice(0, 5).map((skill) => (
                    <span key={skill} className="pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="footer-note">Save a result from the explore page to keep it here.</p>
            )}
          </section>

          <section className="panel section">
            <div className="section-header">
              <div>
                <h2>Quiz History</h2>
                <p>Your recent exploration sessions stay visible here and sync to Supabase when cloud mode is active.</p>
              </div>
            </div>

            <div className="history-list">
              {profile.quizHistory.length === 0 ? (
                <p className="footer-note">No quiz runs yet. Take the quiz to start building your path history.</p>
              ) : (
                profile.quizHistory.map((entry) => {
                  const field = fields.find((item) => item.id === entry.fieldId);
                  const match = getCareerPathById(entry.topMatchId, customPaths);
                  return (
                    <div key={`${entry.createdAt}-${entry.fieldId}`} className="history-item">
                      <strong>{match?.title ?? "No top match"}</strong>
                      <span>{field?.name ?? entry.fieldId}</span>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          <section className="panel section">
            <div className="section-header">
              <div>
                <h2>Profile Snapshot</h2>
                <p>A quick view of how your story is evolving.</p>
              </div>
            </div>
            <div className="stack">
              <div className="saved-card">
                <strong>First dream</strong>
                <p>{profile.firstDream || "Not set yet"}</p>
              </div>
              <div className="saved-card">
                <strong>Current direction</strong>
                <p>{profile.currentInterest || savedPath?.title || "Still exploring"}</p>
              </div>
              <div className="saved-card">
                <strong>Total visible paths</strong>
                <p>{availablePaths.length}</p>
              </div>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
