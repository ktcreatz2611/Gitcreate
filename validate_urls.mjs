import { techStack } from './src/data/techStack.js';
import https from 'https';

const checkUrl = (url) => new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
        resolve({ status: res.statusCode, url });
    });
    req.on('error', () => resolve({ status: 'ERR', url }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 'TIMEOUT', url }); });
    req.end();
});

const report = [];
console.log(`Validating ${techStack.length} icons...`);

const batchSize = 5; // Reduce batch size
const chunks = [];
for (let i = 0; i < techStack.length; i += batchSize) {
    chunks.push(techStack.slice(i, i + batchSize));
}

async function run() {
    process.setMaxListeners(0); // Disable warning
    for (const [idx, chunk] of chunks.entries()) {
        await Promise.all(chunk.map(async (item) => {
            const url = item.iconUrl || `https://cdn.simpleicons.org/${item.slug}`;
            // Note: simpleicons CDN usually redirects or returns SVG. 
            // We strip color for validation to be safe, or keep it? CDN supports color.
            // Let's us the exact URL the app uses:
            // "https://cdn.simpleicons.org/${tech.slug}/${tech.color}"

            const targetUrl = item.iconUrl || `https://cdn.simpleicons.org/${item.slug}/${item.color}`;

            const res = await checkUrl(targetUrl);
            if (res.status !== 200 && res.status !== 302 && res.status !== 301) {
                // Ignore redirects? SimpleIcons often returns SVG directly (200).
                report.push({ name: item.name, slug: item.slug, status: res.status, url: targetUrl });
            }
        }));
        process.stdout.write('.');
    }
    console.log('\nValidation Complete.');
    console.log(`Found ${report.length} broken/suspicious URLs.`);
    require('fs').writeFileSync('broken_icons_report.json', JSON.stringify(report, null, 2));
}

run();
