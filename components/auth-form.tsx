"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase-config";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isSupabaseConfigured()) {
      setStatus("Add your Supabase environment variables first. This screen is ready, but auth is not configured yet.");
      return;
    }

    const supabase = createClient();
    setIsSubmitting(true);
    setStatus("");

    if (mode === "sign-up") {
      const redirectUrl = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        setStatus(error.message);
      } else {
        setStatus("Account created. Check your email to confirm, then come back and sign in.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setStatus(error.message);
      } else {
        router.push("/account");
        router.refresh();
      }
    }

    setIsSubmitting(false);
  }

  const isSignIn = mode === "sign-in";

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

      <section className="auth-shell">
        <div className="panel section auth-card">
          <div className="section-header">
            <div>
              <h2>{isSignIn ? "Sign In" : "Create Your Account"}</h2>
              <p>{isSignIn ? "Access your saved profile and cloud-synced paths." : "Start syncing your profile, quiz history, and admin-created paths."}</p>
            </div>
          </div>

          <form className="stack" onSubmit={handleSubmit}>
            <label className="form-field">
              <span>Email</span>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
            <label className="form-field">
              <span>Password</span>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </label>
            {status ? <p className="footer-note">{status}</p> : null}
            <div className="quiz-actions">
              <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Working..." : isSignIn ? "Sign in" : "Create account"}
              </button>
              <Link className="btn btn-secondary" href={isSignIn ? "/auth/sign-up" : "/auth/sign-in"}>
                {isSignIn ? "Need an account?" : "Already have an account?"}
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
