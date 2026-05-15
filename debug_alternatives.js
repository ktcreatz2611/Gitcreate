import https from 'https';

const checks = [
    // Devicon
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', // or plain
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-line.svg',

    // SkillIcons
    'https://skillicons.dev/icons?i=aws',
    'https://skillicons.dev/icons?i=azure',
    'https://skillicons.dev/icons?i=ps', // Photoshop
    'https://skillicons.dev/icons?i=xd', // Adobe XD maybe?
    'https://skillicons.dev/icons?i=xbox', // Xbox? (maybe not supported)

    // Other simple icons mirrors?
    // unpkg?
];

const checkUrl = (url) => {
    return new Promise((resolve) => {
        const req = https.request(url, { method: 'HEAD', timeout: 3000 }, (res) => {
            console.log(`${url}: ${res.statusCode}`);
            resolve();
        });
        req.on('error', () => {
            console.log(`${url}: ERROR`);
            resolve();
        });
        req.end();
    });
};

async function run() {
    console.log('Checking alternatives...');
    for (const url of checks) {
        await checkUrl(url);
    }
}

run();
