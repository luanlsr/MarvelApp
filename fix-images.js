const fs = require('fs');
const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

async function checkUrl(url) {
  if (!url) return false;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

async function getImageUrl(title, isSeries) {
  if (isSeries) {
    // Try TVMaze
    const tvmazeData = await fetchJson(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(title)}`);
    if (tvmazeData && tvmazeData.length > 0 && tvmazeData[0].show.image && tvmazeData[0].show.image.original) {
      return tvmazeData[0].show.image.original;
    }
  }

  // Try IMDB for movies (and fallback for series)
  try {
    const cleanTitle = title.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
    if (!cleanTitle) return null;
    const firstLetter = cleanTitle[0];
    const imdbUrl = `https://v3.sg.media-imdb.com/suggestion/${firstLetter}/${encodeURIComponent(cleanTitle)}.json`;
    
    const imdbData = await fetchJson(imdbUrl);
    if (imdbData && imdbData.d && imdbData.d.length > 0) {
      // Find the first result that is a movie or tvSeries and has an image
      for (const item of imdbData.d) {
        if (item.i && item.i.imageUrl) {
          // Get higher res image by removing the resize suffix
          return item.i.imageUrl.replace(/_V1_.*\.jpg$/, '_V1_FMjpg_UX1000_.jpg');
        }
      }
    }
  } catch (e) {
    console.error('IMDB error:', e.message);
  }
  
  return null;
}

async function main() {
  let fileContent = fs.readFileSync('prisma/seed-all.ts', 'utf-8');
  const regex = /{\s*title:\s*'([^']+)',\s*originalTitle:[^,]+,\s*type:\s*'([^']+)',.*?posterUrl:\s*('([^']+)'|null)\s*}/g;
  
  const matches = [...fileContent.matchAll(regex)];
  console.log(`Found ${matches.length} titles to check...`);
  
  let newContent = fileContent;

  for (const match of matches) {
    const fullMatch = match[0];
    const title = match[1];
    const type = match[2];
    const currentUrlRaw = match[3]; // "'url'" or "null"
    const currentUrl = currentUrlRaw === 'null' ? null : match[4];

    // Only fix broken or null URLs
    const isOk = await checkUrl(currentUrl);
    if (!isOk) {
      console.log(`Fixing: ${title}...`);
      const newUrl = await getImageUrl(title, type === 'SERIES' || type === 'SPECIAL');
      
      if (newUrl) {
        console.log(`   -> Found: ${newUrl}`);
        const replacement = fullMatch.replace(`posterUrl: ${currentUrlRaw}`, `posterUrl: '${newUrl}'`);
        newContent = newContent.replace(fullMatch, replacement);
      } else {
        console.log(`   -> No image found for ${title}, keeping as is.`);
        const replacement = fullMatch.replace(`posterUrl: ${currentUrlRaw}`, `posterUrl: null`);
        newContent = newContent.replace(fullMatch, replacement);
      }
    }
  }
  
  fs.writeFileSync('prisma/seed-all.ts', newContent);
  console.log('Done!');
}

main();
