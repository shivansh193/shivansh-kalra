import { SectionShell } from "@/components/ui/SectionShell";

export default function AboutPage() {
    return (
        <div className="flex flex-col gap-24 pb-32 pt-12">
            <div className="px-6 max-w-5xl mx-auto w-full">
                <h1 className="text-3xl font-medium text-[var(--foreground)] mb-4">About Me</h1>
                <p className="text-[var(--muted-foreground)] max-w-2xl">
                    Beyond the code: how I think, what I value, and why I build.
                </p>
            </div>

            <SectionShell id="philosophy" title="Philosophy">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-8 space-y-8 text-[var(--muted-foreground)] leading-relaxed">
                        <p>
                            I am a <strong>fast shipper</strong> who thrives in ambiguity and high-velocity environments. I&apos;ve built 6+ products from 0 to users/revenue, and I believe in full ownership—give me a problem, and I&apos;ll design, build, deploy, and iterate until it works.
                        </p>
                        <p>
                            I have <strong>strong opinions</strong> on AI UX and system design. Most tools prioritize &quot;impressive&quot; over &quot;useful.&quot; I build for what developers and users actually need, not just what looks good in demos.
                        </p>
                        <p>
                            I value <strong>proof over titles</strong>. While I have 0-2 years of formal experience, I have 2+ years of real shipping experience. I prefer to be judged by what I&apos;ve built and the problems I&apos;ve solved, rather than credentials.
                        </p>
                    </div>
                    <div className="md:col-span-4 space-y-8">
                        <div className="p-6 bg-[var(--muted)]/30 rounded-xl border border-[var(--border)]">
                            <h3 className="font-medium text-[var(--foreground)] mb-4">What I Value</h3>
                            <ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
                                <li className="flex items-start gap-3">
                                    <span className="text-[var(--accent)] mt-1">01</span>
                                    <span><strong>Clarity over cleverness.</strong> Readable code is better than complex one-liners.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[var(--accent)] mt-1">02</span>
                                    <span><strong>Shipping is learning.</strong> You don&apos;t know if it works until it&apos;s in production.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[var(--accent)] mt-1">03</span>
                                    <span><strong>Systems thinking.</strong> Optimize the whole, not just the parts.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </SectionShell>

            <SectionShell id="background" title="Background">
                <div className="max-w-3xl text-[var(--muted-foreground)] leading-relaxed space-y-6">
                    <p>
                        My journey into engineering started with a curiosity about how things work. That curiosity led me to explore everything from full-stack web development to machine learning pipelines.
                    </p>
                    <p>
                        I am currently a student at <strong>Shiv Nadar University</strong> (Class of 2027), but I&apos;ve spent the last 2+ years self-teaching my stack through building real products used by real users.
                    </p>
                    <p>
                        Currently, I&apos;m focused on the intersection of <strong>product engineering and AI</strong>. I enjoy the challenge of making complex AI models accessible and useful through intuitive user interfaces and reliable backend infrastructure.
                    </p>
                </div>
            </SectionShell>
        </div>
    );
}
