import fs from "node:fs";
import path from "node:path";

const USER_ID = "1215370";
const OUTPUT_PATH = path.join(process.cwd(), "src/data/bangumi-data.json");

async function fetchBangumiData() {
  console.log(`Fetching Bangumi data for user ${USER_ID}...`);

  try {
    // Query ALL anime collection types at once
    // subject_type=1 filters to anime media type
    // type values: 1=wish, 2=doing(watching), 3=collect(watched), 4=on_hold, 5=dropped
    const url = `https://api.bgm.tv/v0/users/${USER_ID}/collections?subject_type=1&limit=200&offset=0`;
    console.log(`Fetching Bangumi anime collections: ${url}`);

    const response = await fetch(url, { headers: { "User-Agent": "MizukiBlog/1.0", "Content-Type": "application/json" } });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const items = data.data || [];
    console.log(`Total anime items: ${items.length}`);

    const animeList = items.map((item) => {
      const title = item.subject?.name || item.subject?.name_cn || "Unknown";
      const status = mapStatus(item.status);
      console.log(`Anime: ${title}, raw status: "${item.status}", mapped: ${status}`);
      return {
        title,
        cover: item.subject?.images?.large || "",
        link: `https://bgm.tv/subject/${item.subject?.id}`,
        status,
        rating: item.subject?.score || 0,
        progress: item.episode || 0,
        totalEpisodes: item.subject?.eps || 12,
        description: "",
        year: item.subject?.date?.split("-")[0] || "",
        studio: "",
        genre: [],
      };
    });

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(animeList, null, 2), "utf-8");
    console.log(`Saved ${animeList.length} anime to ${OUTPUT_PATH}`);
  } catch (error) {
    console.error("Failed to fetch Bangumi data:", error);
    process.exit(1);
  }
}

function mapStatus(status) {
  console.log(`Mapping status: "${status}"`);
  const map = {
    doing: "watching",
    on_hold: "onhold",
    dropped: "dropped",
    collect: "completed",
    wish: "planned",
    "": "planned",
  };
  return map[status] || "planned";
}

fetchBangumiData();