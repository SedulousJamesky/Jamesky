import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="text-center py-20 space-y-6">
        <div className="text-8xl opacity-50">404</div>
        <h1 className="text-3xl font-bold">文章未找到</h1>
        <p className="text-[var(--text-secondary)]">抱歉，找不到你要的文章</p>
        <a href="/Jamesky" className="inline-flex items-center gap-2 text-[var(--accent)] hover:gap-3 transition-all">
          返回首页
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-12 text-center space-y-6">
        <div className="flex items-center justify-center gap-4">
          <time className="text-sm text-[var(--text-secondary)]">
            {post.date}
          </time>
          <span className="text-[var(--text-secondary)]">•</span>
          <span className="text-sm text-[var(--accent)]">技术文章</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {post.title}
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          {post.description}
        </p>
      </header>

      <div className="prose prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>

      <footer className="mt-16 pt-8 border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          <a
            href="/Jamesky"
            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            返回列表
          </a>
        </div>
      </footer>
    </article>
  );
}