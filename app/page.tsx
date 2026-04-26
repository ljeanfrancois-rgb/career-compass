import Link from "next/link";
import { fields, careerPaths } from "@/data/career-data";

const featuredExamples = [
  {
    from: "Future surgeon",
    to: "Mechatronics engineer",
    description: "You can still shape surgery by designing smarter robotic tools, safer equipment, and better operating-room systems."
  },
  {
    from: "Game lover",
    to: "UX designer",
    description: "The same curiosity about how people interact with screens can become a career in product and experience design."
  },
  {
    from: "Science student",
    to: "Healthcare analyst",
    description: "You can improve patient outcomes through data, operations, and smarter healthcare decisions."
  }
];

export default function Home() {
  return (
    <main className="page-shell landing-shell">
      <section className="hero landing-hero">
        <div className="panel hero-copy">
          <span className="eyebrow">Welcome to Career Compass</span>
          <h1>You do not have to give up a first dream to grow into a new one.</h1>
          <p className="lead">
            Sometimes the dream changes, but the purpose stays. A student who once wanted to be a surgeon might later realize they want to be a mechatronics engineer and still help surgeons by designing medical tools, robotics, or safer devices.
          </p>
          <p>
            This platform helps you turn a big interest into a clearer direction. We guide you through questions, show you roles that fit you, and then map out the skills, classes, and projects that can move you forward.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/explore">
              Start exploring careers
            </Link>
            <Link className="btn btn-secondary" href="/account">
              Build your profile
            </Link>
            <a className="btn btn-secondary" href="#how-it-works">
              See how it works
            </a>
          </div>
        </div>

        <aside className="panel hero-card">
          <div className="mini-card spotlight-card">
            <span className="spotlight-label">Dream Bridge</span>
            <strong>One path can still honor another.</strong>
            <p>
              Career Compass is built around the idea that changing direction does not erase what mattered to you before. It can actually reveal a more fitting way to serve the same mission.
            </p>
          </div>

          <div className="stats">
            <div className="stat">
              <span className="stat-value">{fields.length}</span>
              <span>career areas</span>
            </div>
            <div className="stat">
              <span className="stat-value">{careerPaths.length}</span>
              <span>path ideas</span>
            </div>
            <div className="stat">
              <span className="stat-value">7</span>
              <span>guided questions</span>
            </div>
          </div>

          <div className="mini-card">
            <strong>What you get</strong>
            <p>Best-fit career matches, a growth roadmap, useful classes, practical projects, a saved account profile, and local admin tools.</p>
          </div>
        </aside>
      </section>

      <section className="panel section story-grid" id="how-it-works">
        <div className="section-header">
          <div>
            <h2>How It Works</h2>
            <p>We start with your interests, then build toward a realistic next step.</p>
          </div>
          <span className="badge">Built for students and career changers</span>
        </div>

        <div className="landing-steps">
          <article className="step-card">
            <span className="step-number">01</span>
            <h3>Choose a broad area</h3>
            <p>Pick from fields like engineering, technology, healthcare, design, or business.</p>
          </article>
          <article className="step-card">
            <span className="step-number">02</span>
            <h3>Answer guided questions</h3>
            <p>Your responses help us understand your motivation, work style, environment, and strengths.</p>
          </article>
          <article className="step-card">
            <span className="step-number">03</span>
            <h3>Get your roadmap</h3>
            <p>See your best matches plus the classes, skills, and projects that can help you move forward.</p>
          </article>
        </div>
      </section>

      <section className="landing-bottom-grid">
        <article className="panel section">
          <div className="section-header">
            <div>
              <h2>Why This Matters</h2>
              <p>A changing path can still keep your deeper goal alive.</p>
            </div>
          </div>
          <div className="stack">
            <div className="saved-card">
              <strong>Your first dream still counts</strong>
              <p>The platform is built to respect what first pulled you in, not erase it.</p>
            </div>
            <div className="saved-card">
              <strong>Your next fit can be more honest</strong>
              <p>The best role is not always the original title. Sometimes it is the path that fits your real strengths and still serves the same mission.</p>
            </div>
          </div>
        </article>

        <article className="panel section">
          <div className="section-header">
            <div>
              <h2>Start With Momentum</h2>
              <p>Move from uncertainty to a first real plan.</p>
            </div>
          </div>
          <div className="stack">
            <div className="saved-card">
              <strong>Explore roles</strong>
              <p>Compare paths like biomedical engineering, product management, UX design, healthcare analytics, and more.</p>
            </div>
            <div className="quiz-actions">
              <Link className="btn btn-primary" href="/explore">
                Open the quiz
              </Link>
              <Link className="btn btn-secondary" href="/account">
                Create your profile
              </Link>
            </div>
          </div>
        </article>
      </section>

      <section className="example-grid">
        {featuredExamples.map((example) => (
          <article key={`${example.from}-${example.to}`} className="panel example-card">
            <span className="example-route">
              {example.from} to {example.to}
            </span>
            <p>{example.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
