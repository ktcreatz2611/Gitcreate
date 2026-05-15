import { techStack } from '../data/techStack';

// type: 'export' | 'preview'
export const generateMarkdown = (store, type = 'export') => {
    const { header, about, skills, socials, stats, visitorCounter, trophies, addons, donations, appTheme } = store;

    let md = '';

    // Visitor Counter (Top)
    if (visitorCounter.show) {
        md += `![Visitor Count](https://profile-counter.glitch.me/${socials.github || 'yourusername'}/count.svg?theme=${visitorCounter.theme})\n\n`;
    }

    // Header
    if (header.bannerUrl) md += `![Banner](${header.bannerUrl})\n\n`;
    md += `# ${header.title}\n\n`;
    if (header.subtitle) md += `### ${header.subtitle}\n\n`;

    // About
    if (about.content) {
        md += `## About Me\n\n${about.content}\n\n`;
    }

    // 7 Pillars
    const pillars = [
        { label: '🔭 I’m currently working on', value: about.workingOn },
        { label: '🌱 I’m currently learning', value: about.learning },
        { label: '👯 I’m looking to collaborate on', value: about.collaborating },
        { label: '🤝 I’m looking for help with', value: about.helpNeeded },
        { label: '💬 Ask me about', value: about.askMeAbout },
        { label: '📫 How to reach me', value: about.contactInfo },
        { label: '⚡ Fun fact', value: about.funFact },
    ];

    if (pillars.some(p => p.value)) {
        pillars.forEach(p => {
            if (p.value) md += `- ${p.label} **${p.value.trim()}**\n`;
        });
        md += '\n';
    }

    // Trophies (Before Tech Stack or Stats)
    if (trophies.show) {
        md += `## 🏆 Trophies\n\n`;
        const themeToUse = (type === 'preview' && (!trophies.theme || trophies.theme === 'flat'))
            ? (appTheme === 'dark' ? 'gitdimmed' : 'flat')
            : (trophies.theme || 'flat');

        md += `![Trophies](https://github-profile-trophy.vercel.app/?username=${socials.github || 'yourusername'}&theme=${themeToUse}&no-frame=true&no-bg=true&margin-w=4)\n\n`;
    }

    // Skills
    if (skills.selected.length > 0) {
        md += `## Tech Stack\n\n`;

        if (skills.style === 'icons') {
            // SkillIcons.dev style (Horizontal strip)
            const codes = skills.selected.map(slug => {
                const tech = techStack.find(t => t.slug === slug);
                return tech ? (tech.code || tech.slug) : slug;
            }).join(',');

            const themeParam = type === 'preview' && appTheme === 'dark' ? '&theme=dark' : '';
            md += `<div align="center">\n`;
            md += `  <img src="https://skillicons.dev/icons?i=${codes}${themeParam}" />\n`;
            md += `</div>\n\n`;
        } else {
            // Badges style (Default)
            md += `<p align="left">\n`;
            skills.selected.forEach(skillSlug => {
                const tech = techStack.find(t => t.slug === skillSlug);
                const color = tech ? tech.color : '121011';
                const name = tech ? tech.name : skillSlug;
                md += `  <img src="https://img.shields.io/badge/${skillSlug}-%23${color}?style=for-the-badge&logo=${skillSlug}&logoColor=white" alt="${name}" />\n`;
            });
            md += `</p>\n\n`;
        }
    }

    // GitHub Stats
    if (stats.show) {
        md += `## GitHub Stats\n\n`;
        const username = socials.github || 'yourusername';
        const commonParams = `username=${username}&show_icons=${stats.showIcons}&hide_border=${stats.hideBorder}`;

        // Determine Theme (Universal)
        let themeToUse = stats.theme;
        if (type === 'preview' && (!stats.theme || stats.theme === 'tokyonight')) {
            themeToUse = appTheme === 'dark' ? 'tokyonight' : 'default';
        }

        const params = `?${commonParams}&theme=${themeToUse}`;
        md += `![GitHub Stats](https://github-readme-stats.vercel.app/api${params})\n\n`;

        // Streak Stats
        if (stats.showStreaks) {
            md += `![Streak Stats](https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${themeToUse}&hide_border=${stats.hideBorder})\n\n`;
        }

        md += `![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/${params}&layout=compact)\n\n`;

        // WakaTime Stats
        if (store.wakatime?.show && store.wakatime?.username) {
            md += `![WakaTime Status](https://github-readme-stats.vercel.app/api/wakatime?username=${store.wakatime.username}&theme=${themeToUse}&layout=compact)\n\n`;
        }
    }

    // Fun Components
    if (addons.quotes || addons.memes) {
        md += `## Fun Corner\n\n`;
        if (addons.quotes) {
            md += `![Quote](https://github-readme-quotes.herokuapp.com/quote?theme=${type === 'preview' && appTheme === 'dark' ? 'dark' : 'light'})\n\n`;
        }
        if (addons.memes) {
            md += `![Meme](https://github-readme-memes.vercel.app/api?theme=${type === 'preview' && appTheme === 'dark' ? 'dark' : 'light'})\n\n`;
        }
    }

    // Socials
    if (Object.values(socials).some(s => s)) {
        md += `## Connect with me\n\n`;
        md += `<p align="left">\n`;

        const socialBadges = [
            { key: 'github', label: 'GitHub', logo: 'github', color: '181717', link: (v) => `https://github.com/${v}` },
            { key: 'twitter', label: 'Twitter', logo: 'twitter', color: '1DA1F2', link: (v) => `https://twitter.com/${v}` },
            { key: 'linkedin', label: 'LinkedIn', logo: 'linkedin', color: '0A66C2', link: (v) => v },
            { key: 'website', label: 'Website', logo: 'googlechrome', color: '4285F4', link: (v) => v },
            { key: 'instagram', label: 'Instagram', logo: 'instagram', color: 'E4405F', link: (v) => `https://instagram.com/${v}` },
            { key: 'facebook', label: 'Facebook', logo: 'facebook', color: '1877F2', link: (v) => `https://facebook.com/${v}` },
            { key: 'youtube', label: 'YouTube', logo: 'youtube', color: 'FF0000', link: (v) => `https://youtube.com/@${v}` },
            { key: 'leetcode', label: 'LeetCode', logo: 'leetcode', color: 'FFA116', link: (v) => `https://leetcode.com/${v}` },
            { key: 'hackerrank', label: 'HackerRank', logo: 'hackerrank', color: '2EC866', link: (v) => `https://hackerrank.com/${v}` },
            { key: 'stackoverflow', label: 'StackOverflow', logo: 'stackoverflow', color: 'F58025', link: (v) => `https://stackoverflow.com/users/${v}` },
            { key: 'kaggle', label: 'Kaggle', logo: 'kaggle', color: '20BEFF', link: (v) => `https://kaggle.com/${v}` },
            { key: 'medium', label: 'Medium', logo: 'medium', color: '000000', link: (v) => `https://medium.com/@${v}` },
            { key: 'hashnode', label: 'Hashnode', logo: 'hashnode', color: '2962FF', link: (v) => `https://hashnode.com/@${v}` },
            { key: 'devto', label: 'Dev.to', logo: 'dev.to', color: '0A0A0A', link: (v) => `https://dev.to/${v}` },
            { key: 'dribbble', label: 'Dribbble', logo: 'dribbble', color: 'EA4C89', link: (v) => `https://dribbble.com/${v}` },
            { key: 'behance', label: 'Behance', logo: 'behance', color: '1769FF', link: (v) => `https://behance.net/${v}` },
        ];

        socialBadges.forEach(s => {
            if (socials[s.key]) {
                md += `  <a href="${s.link(socials[s.key])}"><img src="https://img.shields.io/badge/${s.label}-%23${s.color}.svg?style=for-the-badge&logo=${s.logo}&logoColor=white" alt="${s.label}" /></a>\n`;
            }
        });
        md += `</p>\n\n`;
    }

    // Donations
    if (Object.values(donations).some(d => d)) {
        md += `## Support Me\n\n`;
        md += `<p align="left">\n`;
        if (donations.buymeacoffee) md += `  <a href="https://www.buymeacoffee.com/${donations.buymeacoffee}"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="40" /></a>\n`;
        if (donations.kofi) md += `  <a href="https://ko-fi.com/${donations.kofi}"><img src="https://storage.ko-fi.com/cdn/kofi2.png?v=3" alt="Buy Me A Coffee" height="40" /></a>\n`;
        if (donations.paypal) md += `  <a href="https://paypal.me/${donations.paypal}"><img src="https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white" alt="PayPal" /></a>\n`;
        if (donations.patreon) md += `  <a href="https://www.patreon.com/${donations.patreon}"><img src="https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white" alt="Patreon" /></a>\n`;
        md += `</p>\n\n`;
    }

    return md;
};

export const generateBlogWorkflow = (store) => {
    const { socials } = store;
    const feeds = [];
    if (socials.devto) feeds.push(`https://dev.to/feed/${socials.devto}`);
    if (socials.medium) feeds.push(`https://medium.com/feed/@${socials.medium}`);
    if (socials.hashnode) feeds.push(`https://hashnode.com/@${socials.hashnode}/rss.xml`);
    if (socials.website && socials.website.includes('rss')) feeds.push(socials.website); // Heuristic

    if (feeds.length === 0) return null;

    return `name: Latest blog post workflow
on:
  schedule: # Run workflow automatically
    - cron: '0 * * * *' # Runs every hour, on the hour
  workflow_dispatch: # Run workflow manually (without waiting for the cron to be called), through the GitHub Actions Workflow page directly
permissions:
  contents: write # To write the generated contents to the readme

jobs:
  update-readme-with-blog:
    name: Update this repo's README with latest blog posts
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Pull in blog posts
        uses: gautamkrishnar/blog-post-workflow@v1
        with:
          feed_list: "${feeds.join(', ')}"`;
};
