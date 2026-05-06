import Link from "next/link";
import { getSortedPosts } from "@/lib/posts";

export default function Home() {
  const posts = getSortedPosts();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-grid-bg"></div>
        <div className="geo-circle geo-circle-1"></div>
        <div className="geo-circle geo-circle-2"></div>
        <div className="geo-rect geo-rect-1"></div>
        <div className="geo-rect geo-rect-2"></div>
        <svg className="geo-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="20" x2="100" y2="80" className="geo-line geo-line-1"/>
          <line x1="20" y1="0" x2="80" y2="100" className="geo-line geo-line-2"/>
          <line x1="0" y1="60" x2="100" y2="40" className="geo-line geo-line-3"/>
        </svg>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-line">碎</span>
            <span className="hero-title-line">屑</span>
          </h1>
          <p className="hero-subtitle">欢迎来到我的网站</p>
        </div>
        <div className="geo-triangle"></div>
        <div className="geo-cross"></div>
      </section>

      {/* SCINTILLA Section */}
      <section id="scintilla" className="section scintilla-section">
        <div className="section-header">
          <span className="section-number">01</span>
          <h2 className="section-title">SCINTILLA</h2>
          <div className="section-line"></div>
        </div>
        <div className="scintilla-grid">
          {posts.length > 0 ? (
            posts.slice(0, 4).map((post, index) => (
              <article key={post.slug} className="scintilla-card">
                <span className="scintilla-index">{String(index + 1).padStart(2, '0')}</span>
                <time className="scintilla-date">{post.date}</time>
                <h3 className="scintilla-title">
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="scintilla-excerpt">{post.description}</p>
                <Link href={`/posts/${post.slug}`} className="scintilla-arrow">→</Link>
              </article>
            ))
          ) : (
            <div className="scintilla-empty">
              <p>暂无文章</p>
            </div>
          )}
        </div>
      </section>

      {/* 内陆帝国 Section */}
      <section id="inland-empire" className="section inland-empire-section">
        <div className="section-header">
          <span className="section-number">02</span>
          <h2 className="section-title">内陆帝国</h2>
          <div className="section-line"></div>
        </div>
        <div className="inland-grid">
          <div className="inland-placeholder">
            <span>图片展示区</span>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section id="manifesto" className="section manifesto-section">
        <div className="manifesto-bg-geo"></div>
        <blockquote className="manifesto-quote">
          <p>技术是用来让世界变得更美好的工具。</p>
        </blockquote>
      </section>
    </div>
  );
}