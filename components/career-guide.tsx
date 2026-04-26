"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { fieldQuestions, fields, questions } from "@/data/career-data";
import { getAllCareerPaths, getCareerPathById, getCareerPathsForField } from "@/lib/career-paths";
import { matchCareers } from "@/lib/match-careers";
import { useCareerCompass } from "@/providers/career-compass-provider";

export function CareerGuide() {
  const { profile, customPaths, savePath, logQuizResult, addCompletedPath, isReady, isCloudMode } = useCareerCompass();
  const [selectedField, setSelectedField] = useState<string>("engineering");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const loggedCompletionRef = useRef<string | null>(null);
  const activeQuestions = useMemo(
    () => [...questions, ...(fieldQuestions[selectedField] ?? [])],
    [selectedField]
  );

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === activeQuestions.length;
  const activeQuestion = activeQuestions[answeredCount] ?? null;
  const allCareerPaths = useMemo(() => getAllCareerPaths(customPaths), [customPaths]);

  const matches = useMemo(() => {
    if (!isComplete) {
      return [];
    }

    return matchCareers(selectedField, answers, allCareerPaths).slice(0, 3);
  }, [answers, isComplete, selectedField, allCareerPaths]);

  const selectedFieldData = fields.find((field) => field.id === selectedField);
  const fieldCareerCount = getCareerPathsForField(selectedField, customPaths).length;
  const savedPath = getCareerPathById(profile.savedPathId, customPaths);
  const topMatch = matches[0] ?? null;
  const secondaryMatches = matches.slice(1, 3);

  useEffect(() => {
    const completionKey = `${selectedField}:${JSON.stringify(answers)}`;

    if (isComplete && loggedCompletionRef.current !== completionKey) {
      loggedCompletionRef.current = completionKey;
      void logQuizResult(selectedField, matches[0]?.id ?? null);
      if (matches[0]?.id) {
        void addCompletedPath(matches[0].id);
      }
    }
  }, [isComplete, selectedField, matches, answers, logQuizResult, addCompletedPath]);

  function chooseField(fieldId: string) {
    setSelectedField(fieldId);
    setAnswers({});
    loggedCompletionRef.current = null;
  }

  function selectAnswer(questionId: string, value: string) {
    setAnswers((current) => ({
      ...current,
      [questionId]: value
    }));
  }

  function goBack() {
    if (answeredCount === 0) {
      return;
    }

    const previousQuestion = activeQuestions[answeredCount - 1];
    setAnswers((current) => {
      const updated = { ...current };
      delete updated[previousQuestion.id];
      return updated;
    });
  }

  function restartQuiz() {
    setAnswers({});
    loggedCompletionRef.current = null;
  }

  const progress = (answeredCount / activeQuestions.length) * 100;

  return (
    <main className="page-shell">
      <nav className="top-nav">
        <Link href="/" className="brand-mark">
          Career Compass
        </Link>
        <div className="top-nav-links">
          <a href="#quiz">Quiz</a>
          <a href="#results">Results</a>
          <a href="#saved-path">Saved path</a>
          <Link href="/account">Account</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/auth/sign-in">{isCloudMode ? "Cloud On" : "Sign In"}</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="panel hero-copy">
          <span className="eyebrow">Explore without throwing away what mattered to you first</span>
          <h1>Your next direction can still honor your first dream.</h1>
          <p>
            You may start out wanting one career and later realize another path fits you better. That does not mean the first dream failed. It might mean you are finding a new way to serve the same purpose.
          </p>
          <p>
            Try the guided questions below and we will suggest roles that fit your interests, strengths, and motivation, then give you a roadmap with classes, skills, and projects to begin with.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#quiz">
              Start the guided quiz
            </a>
            <a className="btn btn-secondary" href="#results">
              Jump to recommendations
            </a>
          </div>
        </div>

        <aside className="panel hero-card">
          <div className="mini-card">
            <strong>A story this app understands</strong>
            <p>
              Someone who once wanted to become a surgeon might discover that mechatronics or biomedical engineering fits them better and still allows them to improve surgery through better tools and technology.
            </p>
          </div>
          <div className="stats">
            <div className="stat">
              <span className="stat-value">{fields.length}</span>
              <span>career areas</span>
            </div>
            <div className="stat">
              <span className="stat-value">{allCareerPaths.length}</span>
              <span>path ideas</span>
            </div>
            <div className="stat">
              <span className="stat-value">{activeQuestions.length}</span>
              <span>guiding questions</span>
            </div>
          </div>
          <div className="mini-card">
            <strong>Built for clarity</strong>
            <p>Choose a broad area, answer the quiz, compare matches, and save the direction you want to come back to.</p>
          </div>
        </aside>
      </section>

      <section className="main-grid">
        <div className="panel section">
          <div className="section-header">
            <div>
              <h2>Choose Your Area</h2>
              <p>Start broad. We will narrow things down with the quiz.</p>
            </div>
            <span className="badge">{fieldCareerCount} sample roles</span>
          </div>

          <div className="field-list">
            {fields.map((field) => (
              <div key={field.id} className={`field-chip ${field.id === selectedField ? "active" : ""}`}>
                <button type="button" onClick={() => chooseField(field.id)}>
                  <strong>{field.name}</strong>
                  <div>{field.description}</div>
                </button>
              </div>
            ))}
          </div>

          <p className="footer-note">
            Current focus: <strong>{selectedFieldData?.name}</strong>. Switching fields resets the quiz so the recommendations stay consistent.
          </p>
          {isReady && profile.firstDream ? (
            <p className="footer-note">
              You started with <strong>{profile.firstDream}</strong>. The quiz can help connect that original dream to a direction that fits you now.
            </p>
          ) : null}
        </div>

        <div className="panel section" id="quiz">
          <div className="section-header">
            <div>
              <h2>Guided Quiz</h2>
              <p>Answer the prompts below and we will calculate your strongest matches using shared and field-specific signals.</p>
            </div>
            <span className="badge">
              {answeredCount}/{activeQuestions.length} answered
            </span>
          </div>

          {!isComplete && activeQuestion ? (
            <div className="question-card">
              <div className="question-progress">
                <span>Question {answeredCount + 1}</span>
                <span>{selectedFieldData?.name}</span>
              </div>
              <div className="progress-bar" aria-hidden="true">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <h2>{activeQuestion.prompt}</h2>
              <div className="option-grid">
                {activeQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`option-card ${answers[activeQuestion.id] === option.value ? "active" : ""}`}
                    onClick={() => selectAnswer(activeQuestion.id, option.value)}
                  >
                    <strong>{option.label}</strong>
                    <span>{option.description}</span>
                  </button>
                ))}
              </div>
              <div className="quiz-actions">
                <button className="btn btn-secondary" type="button" onClick={goBack}>
                  Back
                </button>
                <button className="btn btn-secondary" type="button" onClick={restartQuiz}>
                  Restart
                </button>
              </div>
            </div>
          ) : (
            <div className="question-card">
              <h2>You finished the quiz.</h2>
              <p>
                Your recommendations are ready below. You can restart the quiz anytime to explore a different path or test another set of answers.
              </p>
              <div className="quiz-actions">
                <a className="btn btn-primary" href="#results">
                  See my matches
                </a>
                <button className="btn btn-secondary" type="button" onClick={restartQuiz}>
                  Retake quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="dashboard-grid" id="results">
        <div className="panel section">
          <div className="results-header">
            <h2>Your Best Matches</h2>
            <p>
              Results are based on your selected field and the patterns in your answers. This is here to guide exploration, not to trap you in one answer.
            </p>
          </div>

          {matches.length === 0 ? (
            <div className="result-card">
              <p>Finish the guided quiz to see your top matches, recommended classes, key skills, and starter projects.</p>
            </div>
          ) : (
            <div className="stack">
              {matches.map((match, index) => (
                <article key={match.id} className={`result-card ${index === 0 ? "top-match" : ""}`}>
                  <div className="result-card-header">
                    <div>
                      <h3>{match.title}</h3>
                      <p>{match.description}</p>
                    </div>
                    <span className="match-score">{match.matchPercent}% match</span>
                  </div>

                  <div className="stack">
                    <div>
                      <h4 className="subsection-title">Why it fits</h4>
                      <div className="pill-row">
                        {match.traits.map((trait) => (
                          <span key={trait} className="pill">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="subsection-title">Mission</h4>
                      <p>{match.mission}</p>
                    </div>

                    <div>
                      <h4 className="subsection-title">Why the engine recommended this</h4>
                      <p>{match.explanation}</p>
                      <p className="footer-note">{match.dimensionNarrative}</p>
                      <div className="pill-row">
                        {match.reasons.map((reason) => (
                          <span key={`${match.id}-${reason.answer}`} className="pill">
                            {reason.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="subsection-title">Your fit profile</h4>
                      <div className="dimension-list">
                        <div className="dimension-item">
                          <span>Logic / math thinking</span>
                          <strong>{match.dimensionBreakdown.logic}%</strong>
                        </div>
                        <div className="dimension-bar" aria-hidden="true">
                          <div className="dimension-fill" style={{ width: `${match.dimensionBreakdown.logic}%` }} />
                        </div>
                        <div className="dimension-item">
                          <span>Hands-on building</span>
                          <strong>{match.dimensionBreakdown.handsOn}%</strong>
                        </div>
                        <div className="dimension-bar" aria-hidden="true">
                          <div className="dimension-fill" style={{ width: `${match.dimensionBreakdown.handsOn}%` }} />
                        </div>
                        <div className="dimension-item">
                          <span>Impact / people-focused</span>
                          <strong>{match.dimensionBreakdown.impact}%</strong>
                        </div>
                        <div className="dimension-bar" aria-hidden="true">
                          <div className="dimension-fill" style={{ width: `${match.dimensionBreakdown.impact}%` }} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="subsection-title">Skills to build</h4>
                      <div className="pill-row">
                        {match.skills.map((skill) => (
                          <span key={skill} className="pill">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="subsection-title">What you would actually do</h4>
                      <ul className="project-list">
                        {match.actualWork.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="subsection-title">Helpful classes</h4>
                      <ul className="class-list">
                        {match.classes.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="subsection-title">Starter projects</h4>
                      <ul className="project-list">
                        {match.projects.map((project) => (
                          <li key={project}>{project}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="next-step-card">
                      <h4 className="subsection-title">Next step</h4>
                      <p>Try this beginner project: {match.beginnerProject}</p>
                    </div>

                    <div className="quiz-actions">
                      <button className="btn btn-secondary" type="button" onClick={() => savePath(match.id)}>
                        Save this path
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="sidebar-stack">
          <section className="panel section">
            <div className="section-header">
              <div>
                <h2>Compare Nearby Matches</h2>
                <p>These are strong alternatives for slightly different reasons.</p>
              </div>
            </div>

            {secondaryMatches.length > 0 ? (
              <div className="stack">
                {secondaryMatches.map((match) => (
                  <div key={match.id} className="saved-card">
                    <strong>{match.title}</strong>
                    <p>{match.dimensionNarrative}</p>
                    <div className="pill-row">
                      {match.reasons.slice(0, 2).map((reason) => (
                        <span key={`${match.id}-${reason.answer}`} className="pill">
                          {reason.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="footer-note">Finish the quiz to compare your strongest nearby options.</p>
            )}
          </section>

          <section className="panel section">
            <div className="section-header">
              <div>
                <h2>Growth Roadmap</h2>
                <p>A simple starting sequence for the top recommendation.</p>
              </div>
            </div>

            {topMatch ? (
              <div className="roadmap-list">
                {topMatch.roadmap.map((step, index) => (
                  <div key={step} className="roadmap-step">
                    <span className="roadmap-index">0{index + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="footer-note">Complete the quiz to generate a step-by-step roadmap.</p>
            )}
          </section>

          <section className="panel section" id="saved-path">
            <div className="section-header">
              <div>
                <h2>Saved Path</h2>
                <p>Your current favorite stays here on this device.</p>
              </div>
            </div>

            {savedPath ? (
              <div className="saved-card">
                <strong>{savedPath.title}</strong>
                <p>{savedPath.description}</p>
                <div className="pill-row">
                  {savedPath.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="footer-note">Save one of your matches to keep a path in view while you keep exploring.</p>
            )}
          </section>

          <section className="panel section">
            <div className="section-header">
              <div>
                <h2>Account Bridge</h2>
                <p>Keep your story and your path connected.</p>
              </div>
            </div>
            <div className="dream-bridge-card">
              <strong>{profile.name || "Your profile"}</strong>
              <p>{profile.mission || "Add your mission on the account page to keep your recommendations tied to what matters most to you."}</p>
              <div className="quiz-actions">
                <Link className="btn btn-secondary" href="/account">
                  Open account
                </Link>
              </div>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
