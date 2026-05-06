import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Blog",
  description: "A modern blog built with Next.js and MDX",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--bg-primary)]/80 border-b border-[var(--border)]">
            <div className="max-w-4xl mx-auto px-6 py-5">
              <nav className="flex items-center justify-between">
                <a href="/Jamesky" className="text-xl font-bold tracking-tight group">
                  <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] bg-clip-text text-transparent">
                    My Blog
                  </span>
                </a>
                <div className="flex items-center gap-6">
                  <a href="/Jamesky" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    首页
                  </a>
                  <a href="/Jamesky/posts/hello-world" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    文章
                  </a>
                </div>
              </nav>
            </div>
          </header>
          <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12">
            {children}
          </main>
          <footer className="border-t border-[var(--border)] py-10 mt-auto">
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex flex-col items-center gap-4 text-[var(--text-secondary)] text-sm">
                <p>Built with Next.js & MDX</p>
                <p className="text-xs">© {new Date().getFullYear()} My Blog. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}