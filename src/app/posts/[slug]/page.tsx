import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
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
      <div className="article-page">
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 900 }}>404</h1>
          <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>文章未找到</p>
          <Link href="/Jamesky" className="article-back">← 返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <article className="article-page">
      <header className="article-header">
        <div className="article-meta">
          <time>{post.date}</time>
          <span>•</span>
          <span>SCINTILLA</span>
        </div>
        <h1 className="article-title">{post.title}</h1>
        <p className="article-description">{post.description}</p>
      </header>

      <div className="article-content">
        <MDXRemote source={post.content} />
      </div>

      <Link href="/Jamesky" className="article-back">
        ← 返回列表
      </Link>
    </article>
  );
}