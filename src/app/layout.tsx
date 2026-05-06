import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "碎屑 - Fragment",
  description: "碎屑 - 个人空间",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <nav className="nav">
          <div className="nav-geo-line"></div>
          <a href="/Jamesky" className="nav-logo">碎屑</a>
          <div className="nav-links">
            <a href="/Jamesky#scintilla" className="nav-link">▢</a>
            <a href="/Jamesky#inland-empire" className="nav-link">◯</a>
            <a href="/Jamesky#gravity-rainbow" className="nav-link">△</a>
          </div>
          <div className="nav-geo-circle"></div>
        </nav>
        <main>{children}</main>
        <footer className="footer">
          <div className="footer-geo-line"></div>
          <div className="footer-content">
            <p className="footer-title">碎屑</p>
            <p className="footer-copy">© 2024 Suixie. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}