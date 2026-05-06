import Link from "next/link";
import { getSortedPosts } from "@/lib/posts";

export default function Home() {
  const posts = getSortedPosts();

  return (
    <div className="space-y-16">
      <section className="text-center space-y-6 py-12">
        <h1 className="text-5xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] bg-clip-text text-transparent">
            最新文章
          </span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
          分享技术心得，记录成长历程
        </p>
        <div className="flex justify-center gap-2">
          <span className="px-3 py-1 text-xs rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
            Next.js 14
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
            MDX
          </span>
        </div>
      </section>

      {posts.length > 0 ? (
        <div className="grid gap-6">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="group relative bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all duration-300"
            >
              <div className="absolute top-6 left-8 text-6xl font-bold text-[var(--border)] opacity-50 group-hover:opacity-100 group-hover:text-[var(--accent)]/20 transition-all duration-500">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="relative space-y-4">
                <div className="flex items-center gap-3">
                  <time className="text-sm text-[var(--text-secondary)]">
                    {post.date}
                  </time>
                </div>
                <Link href={`/posts/${post.slug}`}>
                  <h2 className="text-2xl font-bold group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {post.description}
                </p>
                <Link
                  href={`/posts/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:gap-3 transition-all"
                >
                  阅读全文
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-4">
          <div className="text-6xl opacity-50">📝</div>
          <p className="text-[var(--text-secondary)]">暂无文章</p>
          <p className="text-sm text-[var(--text-secondary)]">
            在 <code className="px-2 py-1 bg-[var(--bg-secondary)] rounded">src/content/posts/</code> 下添加 .mdx 文件开始写作
          </p>
        </div>
      )}
    </div>
  );
}