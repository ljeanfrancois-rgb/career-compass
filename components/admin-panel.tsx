"use client";

import Link from "next/link";
import { useState } from "react";
import { fields, type CareerFieldId, type CareerPath } from "@/data/career-data";
import { useCareerCompass } from "@/providers/career-compass-provider";
import { isSupabaseConfigured } from "@/lib/supabase-config";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitLines(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function AdminPanel() {
  const { customPaths, addCustomPath, deleteCustomPath, isCloudMode } = useCareerCompass();
  const [formState, setFormState] = useState({
    title: "",
    field: "engineering" as CareerFieldId,
    description: "",
    mission: "",
    traits: "",
    skills: "",
    classes: "",
    projects: "",
    roadmap: ""
  });

  function handleChange(field: keyof typeof formState, value: string) {
    setFormState((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleCreate() {
    if (!formState.title || !formState.description || !formState.mission) {
      return;
    }

    const path: CareerPath = {
      id: slugify(formState.title),
      title: formState.title,
      field: formState.field,
      description: formState.description,
      mission: formState.mission,
      traits: splitLines(formState.traits),
      skills: splitLines(formState.skills),
      classes: splitLines(formState.classes),
      projects: splitLines(formState.projects),
      roadmap: splitLines(formState.roadmap),
      actualWork: [],
      beginnerProject: splitLines(formState.projects)[0] ?? "Create a small beginner project connected to this path.",
      dimensionProfile: {
        logic: 3,
        handsOn: 3,
        impact: 3
      },
      answerWeights: {}
    };

    await addCustomPath(path);
    setFormState({
      title: "",
      field: "engineering",
      description: "",
      mission: "",
      traits: "",
      skills: "",
      classes: "",
      projects: "",
      roadmap: ""
    });
  }

  return (
    <main className="page-shell">
      <nav className="top-nav">
        <Link href="/" className="brand-mark">
          Career Compass
        </Link>
        <div className="top-nav-links">
          <Link href="/explore">Explore</Link>
          <Link href="/account">Account</Link>
        </div>
      </nav>

      <section className="dashboard-grid">
        <section className="panel section">
          <div className="section-header">
            <div>
              <h2>Admin Panel</h2>
              <p>Create custom career paths without editing the source files directly.</p>
            </div>
            <span className="badge">
              {isCloudMode ? "Supabase-backed admin" : isSupabaseConfigured() ? "Sign in to publish to cloud" : "Local admin tools"}
            </span>
          </div>

          {!isCloudMode && isSupabaseConfigured() ? (
            <p className="footer-note">
              Sign in to store admin-created paths in Supabase.
              {" "}
              <Link href="/auth/sign-in">Open sign in</Link>
            </p>
          ) : null}

          <div className="form-grid">
            <label className="form-field">
              <span>Career title</span>
              <input value={formState.title} onChange={(event) => handleChange("title", event.target.value)} placeholder="Example: Robotics Systems Engineer" />
            </label>
            <label className="form-field">
              <span>Field</span>
              <select value={formState.field} onChange={(event) => handleChange("field", event.target.value as CareerFieldId)}>
                {fields.map((field) => (
                  <option key={field.id} value={field.id}>
                    {field.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-field form-field-wide">
              <span>Description</span>
              <textarea value={formState.description} onChange={(event) => handleChange("description", event.target.value)} rows={3} />
            </label>
            <label className="form-field form-field-wide">
              <span>Mission</span>
              <textarea value={formState.mission} onChange={(event) => handleChange("mission", event.target.value)} rows={3} />
            </label>
            <label className="form-field">
              <span>Traits</span>
              <textarea value={formState.traits} onChange={(event) => handleChange("traits", event.target.value)} rows={4} placeholder="Creative, Analytical, Collaborative" />
            </label>
            <label className="form-field">
              <span>Skills</span>
              <textarea value={formState.skills} onChange={(event) => handleChange("skills", event.target.value)} rows={4} placeholder="CAD, Python, Research" />
            </label>
            <label className="form-field">
              <span>Classes</span>
              <textarea value={formState.classes} onChange={(event) => handleChange("classes", event.target.value)} rows={4} placeholder="Calculus, Design, Biology" />
            </label>
            <label className="form-field">
              <span>Projects</span>
              <textarea value={formState.projects} onChange={(event) => handleChange("projects", event.target.value)} rows={4} placeholder="Prototype an app, Analyze a dataset" />
            </label>
            <label className="form-field form-field-wide">
              <span>Roadmap</span>
              <textarea value={formState.roadmap} onChange={(event) => handleChange("roadmap", event.target.value)} rows={4} placeholder="Learn basics, build samples, publish work" />
            </label>
          </div>

          <div className="quiz-actions">
            <button className="btn btn-primary" type="button" onClick={handleCreate}>
              Create custom path
            </button>
          </div>
        </section>

        <aside className="sidebar-stack">
          <section className="panel section">
            <div className="section-header">
              <div>
                <h2>Custom Paths</h2>
                <p>These appear in the explore flow and sync to Supabase when you are signed in.</p>
              </div>
            </div>
            <div className="stack">
              {customPaths.length === 0 ? (
                <p className="footer-note">No custom paths yet. Create one from the form to see it here.</p>
              ) : (
                customPaths.map((path) => (
                  <div key={path.id} className="saved-card">
                    <strong>{path.title}</strong>
                    <p>{path.description}</p>
                    <div className="quiz-actions">
                      <button className="btn btn-secondary" type="button" onClick={() => deleteCustomPath(path.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
