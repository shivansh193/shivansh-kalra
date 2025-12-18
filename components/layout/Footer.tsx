export function Footer() {
    return (
        <footer className="border-t border-[var(--border)] py-12 mt-24">
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-[var(--foreground)] font-medium">
                        Shivansh Kalra
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)] max-w-md">
                        I like working on difficult problems with clear ownership.
                    </p>
                </div>

                <div className="flex items-center gap-6 text-sm text-[var(--muted-foreground)]">
                    <a href="mailto:hello@example.com" className="hover:text-[var(--foreground)] transition-colors">
                        Email
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">
                        GitHub
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
}
