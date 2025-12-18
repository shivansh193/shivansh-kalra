import { SectionShell } from "@/components/ui/SectionShell";
import experiences from "@/app/data/experiences.json";

export default function ExperiencePage() {
    return (
        <div className="flex flex-col gap-24 pb-32 pt-12">
            <div className="px-6 max-w-5xl mx-auto w-full">
                <h1 className="text-3xl font-medium text-[var(--foreground)] mb-4">Experience</h1>
                <p className="text-[var(--muted-foreground)] max-w-2xl">
                    My professional journey building systems and products.
                </p>
            </div>

            <SectionShell id="timeline" title="Work History">
                <div className="border-l border-[var(--border)] ml-3 space-y-20 pl-8 relative">

                    {experiences.map((exp, index) => (
                        <div key={index} className={`relative ${!exp.current ? 'opacity-90' : ''}`}>
                            <div className={`absolute -left-[37px] top-1.5 w-3 h-3 rounded-full ring-4 ring-[var(--background)] ${exp.current ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}></div>

                            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-medium text-[var(--foreground)]">{exp.company}</h3>
                                    <p className="text-[var(--muted-foreground)]">{exp.role}</p>
                                </div>
                                <span className={`text-sm font-mono mt-2 md:mt-0 ${exp.current ? 'text-[var(--accent)]' : 'text-[var(--muted-foreground)]'}`}>{exp.period}</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-[var(--foreground)] mb-2">Core Responsibilities</h4>
                                        <ul className="space-y-2 text-sm text-[var(--muted-foreground)] list-disc list-outside ml-4">
                                            {exp.responsibilities.map((resp, i) => (
                                                <li key={i}>{resp}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    {exp.achievement && (
                                        <div>
                                            <h4 className="text-sm font-medium text-[var(--foreground)] mb-2">Key Achievement</h4>
                                            <p className="text-sm text-[var(--muted-foreground)] border-l-2 border-[var(--border)] pl-4 italic">
                                                &quot;{exp.achievement}&quot;
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Tech stack removed as per user request */}
                            </div>
                        </div>
                    ))}

                </div>
            </SectionShell>
        </div>
    );
}
