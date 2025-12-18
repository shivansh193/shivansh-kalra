interface SectionShellProps {
    id: string;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function SectionShell({ id, title, children, className = "" }: SectionShellProps) {
    return (
        <section id={id} className={`px-6 max-w-5xl mx-auto w-full scroll-mt-24 ${className}`}>
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider shrink-0">
                    {title}
                </h2>
                <div className="h-[1px] bg-[var(--border)] w-full max-w-[200px]" />
            </div>
            {children}
        </section>
    );
}
