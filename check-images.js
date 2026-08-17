const https = require('https');
const fs = require('fs');

async function checkUrl(url) {
  if (!url) return false;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve({ isOk: res.statusCode === 200, code: res.statusCode });
    }).on('error', (e) => resolve({ isOk: false, code: e.message }));
  });
}

async function main() {
  const fileContent = fs.readFileSync('prisma/seed-all.ts', 'utf-8');
  const regex = /title:\s*'([^']+)',.*?posterUrl:\s*'([^']+)'/g;
  const matches = [...fileContent.matchAll(regex)];
  
  console.log(`Checking ${matches.length} titles...`);
  
  for (const match of matches) {
    const title = match[1];
    const url = match[2];
    const result = await checkUrl(url);
    if (!result.isOk) {
      console.log(`BROKEN [${result.code}]: "${title}" -> ${url}`);
    } else {
      console.log(`OK [${result.code}]: "${title}"`);
    }
  }
}

main();
