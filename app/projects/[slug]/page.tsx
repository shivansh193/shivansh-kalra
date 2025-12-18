import { SectionShell } from "@/components/ui/SectionShell";
import Link from "next/link";
import { notFound } from "next/navigation";
import showcase from "@/app/data/showcase.json";

// Force static generation for these paths
export function generateStaticParams() {
    return showcase.map((project) => ({
        slug: project.slug,
    }));
}

export default function ProjectDeepDive({ params }: { params: { slug: string } }) {
    const project = showcase.find((p) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-24 pb-32 pt-12">
            {/* Header */}
            <div className="px-6 max-w-5xl mx-auto w-full">
                <Link href="/projects" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-8 inline-block">
                    ← Back to Projects
                </Link>
                <h1 className="text-4xl font-medium text-[var(--foreground)] mb-4">{project.title}</h1>
                <p className="text-xl text-[var(--muted-foreground)] max-w-2xl leading-relaxed mb-8">
                    {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm text-[var(--muted-foreground)] border-b border-[var(--border)] pb-8">
                    <div>
                        <span className="block text-xs uppercase tracking-wider mb-1 opacity-70">Role</span>
                        <span className="font-medium text-[var(--foreground)]">{project.role}</span>
                    </div>
                    <div>
                        <span className="block text-xs uppercase tracking-wider mb-1 opacity-70">Timeline</span>
                        <span className="font-medium text-[var(--foreground)]">{project.timeline}</span>
                    </div>
                    {project.visitUrl && (
                        <div className="flex items-end">
                            <a href={project.visitUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[var(--foreground)] text-[var(--background)] text-xs font-medium rounded hover:opacity-90 transition-opacity">
                                Visit Project ↗
                            </a>
                        </div>
                    )}
                </div>

                {/* Tech Stack Blobs */}
                <div className="flex flex-wrap gap-2 mt-6">
                    {project.techStack.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 bg-[var(--muted)] border border-[var(--border)] rounded-full text-xs font-medium text-[var(--foreground)]">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Inspiration */}
            <SectionShell id="inspiration" title="Inspiration">
                <div className="max-w-3xl text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line">
                    {project.deepDive.inspiration}
                </div>
            </SectionShell>

            {/* Goals */}
            <SectionShell id="goals" title="Goals">
                <div className="max-w-3xl text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line">
                    {project.deepDive.goals}
                </div>
            </SectionShell>

            {/* Implementation */}
            <SectionShell id="implementation" title="Implementation">
                <div className="max-w-3xl text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line">
                    {project.deepDive.implementation}
                </div>
            </SectionShell>

            {/* Achievements */}
            <SectionShell id="achievements" title="Achievements">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.deepDive.achievements.map((achievement, i) => (
                        <div key={i} className="p-6 bg-[var(--muted)]/30 rounded-xl border border-[var(--border)] flex items-start gap-4">
                            <span className="text-[var(--accent)] text-lg mt-0.5">✦</span>
                            <span className="text-sm text-[var(--foreground)] leading-relaxed">{achievement}</span>
                        </div>
                    ))}
                </div>
            </SectionShell>

            <div className="px-6 max-w-5xl mx-auto w-full pt-12 border-t border-[var(--border)]">
                <div className="flex justify-between items-center">
                    <Link href="/projects" className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                        ← Back to Projects
                    </Link>
                </div>
            </div>
        </div>
    );
}
