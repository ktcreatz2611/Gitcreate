import { techStack } from './src/data/techStack.js';
import https from 'https';

const targetNames = [
    "C#", "CSS3", "Java", "Nix", "Objective-C", "Org Mode", "PowerShell", "Windows Terminal",
    "Heroku", "Linode", "Oracle", "Context API", "CUDA", "DjangoRest", "Ember", "Handlebars",
    "JavaFX", "MaxCompute", "Nuxt JS", "Rails", "SvelteKit", "TypeGraphQL", "WindiCSS", "Xamarin",
    "Angular", "React", "Amazon DynamoDB", "Cassandra", "Microsoft SQL Server", "Quill", "Realm",
    "Adobe", "InVision", "Canva", "Clip Studio Paint", "Matplotlib", "ChipperCI", "Perforce Helix",
    "GitLab", "Playwright", "Aqua Sec", "Mosquitto", "Portfolio", "Power BI", "SonarLint",
    "SonarQube", "Tor", "Twilio", "Xbox"
];

const targets = techStack.filter(t => targetNames.some(n => t.name.toLowerCase().includes(n.toLowerCase())));

console.log(`Checking ${targets.length} targets...`);

const checkUrl = (url) => new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD', timeout: 2000 }, (res) => { // 2000ms
        resolve(res.statusCode);
    });
    req.on('error', (e) => resolve('ERR'));
    req.on('timeout', () => { req.destroy(); resolve('TIMEOUT'); });
    req.end();
});

async function run() {
    process.setMaxListeners(0);
    const failures = [];
    // Concurrency for speed
    await Promise.all(targets.map(async (item) => {
        const url = item.iconUrl || `https://cdn.simpleicons.org/${item.slug}/${item.color}`;
        const status = await checkUrl(url);
        if (status !== 200 && status !== 302 && status !== 301) {
            console.log(`FAILED: ${item.name} (${status}) -> ${url}`);
            failures.push({ name: item.name, url, status });
        }
    }));
    require('fs').writeFileSync('verification_report.json', JSON.stringify(failures, null, 2));
    console.log(`\nFound ${failures.length} broken icons.`);
}

run();
