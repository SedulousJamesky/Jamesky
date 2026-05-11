import fs from "node:fs";
import path from "node:path";

const USER_ID = "1215370";
const OUTPUT_PATH = path.join(process.cwd(), "src/data/bangumi-data.json");

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function parseAnimeFromHTML(html) {
  const results = [];

  // Split into item blocks between <li id="item_..."> and </li>
  const itemRegex = /<li id="item_(\d+)"[^>]*>([\s\S]*?)<\/li>/g;
  let itemMatch;
  while ((itemMatch = itemRegex.exec(html)) !== null) {
    const itemId = itemMatch[1];
    const block = itemMatch[2];

    // Extract cover from <img src="..." class="cover" ...>
    const coverMatch = block.match(/<img src="([^"]+)"[^>]*class="cover"[^>]*>/);
    // Extract title from <a href="/subject/..." class="l">TITLE</a>
    const titleMatch = block.match(/<a href="\/subject\/\d+" class="l">([^<]+)<\/a>/);

    if (coverMatch && titleMatch) {
      let cover = coverMatch[1];
      // Convert protocol-relative URL to https
      if (cover.startsWith("//")) {
        cover = "https://" + cover.slice(2);
      }
      results.push({
        id: itemId,
        cover,
        title: titleMatch[1].trim(),
      });
    }
  }

  return results;
}

async function fetchBangumiData() {
  console.log(`Fetching Bangumi anime data for user ${USER_ID}...`);

  try {
    const types = [
      { name: "do", status: "watching" },
      { name: "collect", status: "completed" },
      { name: "wish", status: "planned" },
    ];

    const allAnime = [];
    for (const t of types) {
      const url = `https://bgm.tv/anime/list/${USER_ID}/${t.name}`;
      console.log(`Fetching: ${url}`);
      const html = await fetchText(url);
      const items = parseAnimeFromHTML(html);
      console.log(`Found ${t.name}: ${items.length} anime`);

      for (const item of items) {
        allAnime.push({
          title: item.title,
          cover: item.cover,
          link: `https://bgm.tv/subject/${item.id}`,
          status: t.status,
          rating: 0,
          progress: 0,
          totalEpisodes: 0,
          description: "",
          year: "",
          studio: "",
          genre: [],
        });
      }
    }

    // Deduplicate by title
    const seen = new Set();
    const uniqueAnime = allAnime.filter((a) => {
      if (seen.has(a.title)) return false;
      seen.add(a.title);
      return true;
    });

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(uniqueAnime, null, 2), "utf-8");
    console.log(`Saved ${uniqueAnime.length} unique anime to ${OUTPUT_PATH}`);
  } catch (error) {
    console.error("Failed to fetch Bangumi data:", error);
    process.exit(1);
  }
}

fetchBangumiData();