import { SectionShell } from "@/components/ui/SectionShell";
import Link from "next/link";
import experiences from "@/app/data/experiences.json";
import showcase from "@/app/data/showcase.json";

export default function Home() {
  return (
    <div className="flex flex-col gap-32 pb-32 pt-12 md:pt-20">

      {/* Hero Section */}
      <section className="px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Column: Text */}
          <div className="flex flex-col gap-8 order-2 md:order-1 animate-enlarge">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-[var(--foreground)] leading-[1.1]">
                Building intelligent systems <br />
                with <span className="text-[var(--accent)]">precision</span>.
              </h1>
              <p className="text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-lg">
                I&apos;m Shivansh, a Full Stack Engineer focused on scalable architecture and AI-driven products.
                I build tools that solve real problems.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/projects"
                className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] text-sm font-medium rounded hover:opacity-90 transition-opacity"
              >
                View Projects
              </Link>
              <a
                href="/Resume_Dec25.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[var(--muted)] text-[var(--foreground)] text-sm font-medium rounded hover:bg-[var(--muted)]/80 transition-colors"
              >
                Read Resume
              </a>
            </div>
          </div>

          {/* Right Column: Abstract System Diagram */}
          <div className="group order-1 md:order-2 w-full h-64 md:h-96 border border-[var(--border)] rounded-2xl bg-[var(--muted)]/20 relative overflow-hidden flex items-center justify-center animate-fade-in hover:border-[var(--accent)] transition-colors duration-500">
            <svg width="100%" height="100%" viewBox="0 0 800 400" className="opacity-80">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[var(--border)]" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Abstract Nodes with Animations */}
              {/* Left Circle - Moves Right */}
              <g style={{ "--target-x": "100px" } as React.CSSProperties} className="animate-converge group-hover:animate-[converge-pulse_1s_ease-in-out_infinite]">
                <circle cx="100" cy="200" r="40" className="fill-[var(--background)] stroke-[var(--foreground)] group-hover:stroke-[var(--accent)] transition-colors duration-500" strokeWidth="1.5" />
              </g>

              {/* Right Circle - Moves Left */}
              <g style={{ "--target-x": "-100px" } as React.CSSProperties} className="animate-converge group-hover:animate-[converge-pulse_1s_ease-in-out_infinite]">
                <circle cx="700" cy="200" r="40" className="fill-[var(--background)] stroke-[var(--foreground)] group-hover:stroke-[var(--accent)] transition-colors duration-500" strokeWidth="1.5" />
              </g>

              {/* Center Rect - Scales Up */}
              <g className="animate-enlarge origin-center group-hover:animate-[enlarge-pulse_1s_ease-in-out_infinite]">
                <rect x="360" y="160" width="80" height="80" rx="8" className="fill-[var(--background)] stroke-[var(--accent)]" strokeWidth="1.5" />
              </g>

              {/* Connecting Lines - Fade In */}
              <path d="M 240 200 L 360 200" stroke="currentColor" strokeWidth="1.5" className="text-[var(--muted-foreground)] animate-fade-in" strokeDasharray="4 4" />
              <path d="M 440 200 L 560 200" stroke="currentColor" strokeWidth="1.5" className="text-[var(--muted-foreground)] animate-fade-in" strokeDasharray="4 4" />
            </svg>
            <div className="absolute bottom-4 right-6 text-xs font-mono text-[var(--muted-foreground)]">
              SYSTEM_ARCH_V1.0
            </div>
          </div>

        </div>
      </section>

      {/* Selected Work Preview */}
      <SectionShell id="work" title="Selected Work">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showcase.slice(0, 2).map((project, index) => (
            <Link key={index} href={`/projects/${project.slug}`} className="group block">
              <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--accent)] transition-colors h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">{project.title}</h3>
                  <span className="text-xs text-[var(--muted-foreground)] border border-[var(--border)] px-2 py-0.5 rounded-full">Deep Dive</span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] line-clamp-3 mb-4 flex-grow">
                  {project.shortDescription}
                </p>
                <div className="flex items-center text-xs font-medium text-[var(--accent)]">
                  Read Case Study →
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/projects" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors border-b border-transparent hover:border-[var(--foreground)] pb-0.5">
            View all projects →
          </Link>
        </div>
      </SectionShell>

      {/* Experience Section (Full) */}
      <SectionShell id="experience" title="Experience">
        <div className="border-l border-[var(--border)] ml-3 space-y-16 pl-8 relative">
          {experiences.map((exp, index) => (
            <div key={index} className={`relative ${!exp.current ? 'opacity-90' : ''}`}>
              <div className={`absolute -left-[37px] top-1.5 w-3 h-3 rounded-full ring-4 ring-[var(--background)] ${exp.current ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}></div>

              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-[var(--foreground)]">{exp.company}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{exp.role}</p>
                </div>
                <span className={`text-xs font-mono mt-1 md:mt-0 ${exp.current ? 'text-[var(--accent)]' : 'text-[var(--muted-foreground)]'}`}>{exp.period}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <ul className="space-y-2 text-sm text-[var(--muted-foreground)] list-disc list-outside ml-4">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
                {exp.achievement && (
                  <p className="text-sm text-[var(--muted-foreground)] border-l-2 border-[var(--border)] pl-4 italic">
                    &quot;{exp.achievement}&quot;
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] flex justify-center">
          <Link
            href="/experience"
            className="px-6 py-3 bg-[var(--muted)]/50 hover:bg-[var(--muted)] text-[var(--foreground)] text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            Learn More About My Journey →
          </Link>
        </div>
      </SectionShell>

    </div>
  );
}
