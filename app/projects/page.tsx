import { SectionShell } from "@/components/ui/SectionShell";
import Link from "next/link";
import showcase from "@/app/data/showcase.json";
import projects from "@/app/data/projects.json";

export default function ProjectsPage() {
    return (
        <div className="flex flex-col gap-24 pb-32 pt-12">
            <div className="px-6 max-w-5xl mx-auto w-full">
                <h1 className="text-3xl font-medium text-[var(--foreground)] mb-4">Projects</h1>
                <p className="text-[var(--muted-foreground)] max-w-2xl">
                    A collection of systems, products, and tools I&apos;ve built.
                    Focusing on scalability, reliability, and user experience.
                </p>
            </div>

            {/* Project Showcase */}
            <SectionShell id="showcase" title="Project Showcase">
                <div className="space-y-24">
                    {showcase.map((project, index) => (
                        <div key={index} className="group">
                            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-2xl font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-[var(--muted-foreground)] mt-1">{project.role} • {project.timeline}</p>
                                </div>
                                <Link href={`/projects/${project.slug}`} className="text-sm font-medium text-[var(--accent)] hover:underline underline-offset-4">
                                    View Deep Dive →
                                </Link>
                            </div>

                            <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--muted)]/30">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-sm font-medium text-[var(--foreground)] mb-2">The Problem</h4>
                                            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                                {project.problem}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-[var(--foreground)] mb-2">Technical Approach</h4>
                                            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                                {project.solution}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-sm font-medium text-[var(--foreground)] mb-2">Key Outcomes</h4>
                                            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                                                {project.outcomes.map((outcome, i) => (
                                                    <li key={i} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--accent)]"></span>{outcome}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="flex gap-2 flex-wrap">
                                            {project.techStack.map((tech, i) => (
                                                <span key={i} className="px-2 py-1 bg-[var(--background)] border border-[var(--border)] rounded text-xs text-[var(--muted-foreground)]">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionShell>

            {/* Other Projects */}
            <SectionShell id="other" title="Other Projects">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <div key={index} className="p-6 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--foreground)] transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-medium text-[var(--foreground)]">{project.title}</h3>
                                <span className="text-xs text-[var(--muted-foreground)] border border-[var(--border)] px-2 py-0.5 rounded-full">{project.type}</span>
                            </div>
                            <p className="text-sm text-[var(--muted-foreground)] mb-6 line-clamp-3">
                                {project.description}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex gap-2 text-xs text-[var(--muted-foreground)]">
                                    {project.stack.map((tech, i) => (
                                        <span key={i}>{tech}</span>
                                    ))}
                                </div>
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[var(--foreground)] opacity-0 group-hover:opacity-100 transition-opacity">
                                        {project.linkText} →
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </SectionShell>
        </div>
    );
}
