import https from 'https';

const slugsToCheck = [
    'xbox', 'microsoftxbox',
    'adobephotoshop', 'photoshop',
    'affinityphoto', 'affinity', 'affinitydesigner',
    'microsoftazure', 'azure', 'azuredevops',
    'amazonaws', 'aws', 'amazon',
    'gnubash', 'bash',
    'cplusplus', 'c',
    'scikitlearn', 'scikit-learn'
];

const checkUrl = (slug) => {
    return new Promise((resolve) => {
        const url = `https://cdn.simpleicons.org/${slug}`;
        const req = https.request(url, { method: 'HEAD', timeout: 3000 }, (res) => {
            console.log(`${slug}: ${res.statusCode}`);
            resolve();
        });
        req.on('error', () => {
            console.log(`${slug}: ERROR`);
            resolve();
        });
        req.end();
    });
};

async function run() {
    console.log('Checking slugs...');
    for (const slug of slugsToCheck) {
        await checkUrl(slug);
    }
}

run();
