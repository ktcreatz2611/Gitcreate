import { techStack } from './src/data/techStack.js';

const slugCounts = {};
techStack.forEach((item, index) => {
    if (!item.slug) return;
    const slug = item.slug.toLowerCase();
    if (!slugCounts[slug]) slugCounts[slug] = [];
    slugCounts[slug].push({ index, name: item.name });
});

const duplicates = Object.entries(slugCounts).filter(([_, list]) => list.length > 1);

if (duplicates.length > 0) {
    console.log(`Found ${duplicates.length} duplicate slugs:`);
    duplicates.forEach(([slug, list]) => {
        console.log(`Slug: "${slug}"`);
        list.forEach(i => console.log(`  - Index ${i.index}: ${i.name}`));
    });
} else {
    console.log("No duplicate slugs found.");
}
