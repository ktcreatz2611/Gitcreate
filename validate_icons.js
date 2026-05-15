import https from 'https';
import { techStack } from './src/data/techStack.js';

const checkUrl = (url, slug) => {
    return new Promise((resolve) => {
        const req = https.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
            resolve({ slug, url, status: res.statusCode });
        });
        req.on('error', () => resolve({ slug, url, status: 'ERROR' }));
        req.on('timeout', () => { req.destroy(); resolve({ slug, url, status: 'TIMEOUT' }); });
        req.end();
    });
};

async function validate() {
    console.log('Validating ' + techStack.length + ' icons...');
    const results = [];
    const batchSize = 20;

    for (let i = 0; i < techStack.length; i += batchSize) {
        const batch = techStack.slice(i, i + batchSize).map(t => {
            const url = t.iconUrl || `https://cdn.simpleicons.org/${t.slug}`;
            return checkUrl(url, t.slug);
        });
        const batchResults = await Promise.all(batch);
        results.push(...batchResults);
        process.stdout.write('.');
    }
    console.log('\nDone.');

    const failures = results.filter(r => r.status !== 200 && r.status !== 301 && r.status !== 302);
    if (failures.length > 0) {
        console.log('Found ' + failures.length + ' broken icons:');
        failures.forEach(f => console.log(`${f.slug} (${f.url}): ${f.status}`));
    } else {
        console.log('All icons are valid!');
    }
}

validate();
