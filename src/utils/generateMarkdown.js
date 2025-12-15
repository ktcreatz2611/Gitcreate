export const generateMarkdown = (store) => {
    const { header, about, skills, socials, stats } = store;

    let md = '';

    // Header
    if (header.bannerUrl) md += `![Banner](${header.bannerUrl})\n\n`;
    md += `# ${header.title}\n\n`;
    if (header.subtitle) md += `### ${header.subtitle}\n\n`;

    // About
    if (about.content) {
        md += `## About Me\n\n${about.content}\n\n`;
    }

    // Skills
    if (skills.selected.length > 0) {
        md += `## Tech Stack\n\n`;
        md += `<p align="left">\n`;
        skills.selected.forEach(skill => {
            // Using generic badges for now, can be improved with specific colors
            md += `  <img src="https://img.shields.io/badge/${skill}-%23121011?style=for-the-badge&logo=${skill}&logoColor=white" alt="${skill}" />\n`;
        });
        md += `</p>\n\n`;
    }

    // GitHub Stats
    if (stats.show) {
        md += `## GitHub Stats\n\n`;
        const params = `?username=${socials.github || 'yourusername'}&show_icons=${stats.showIcons}&theme=${stats.theme}&hide_border=${stats.hideBorder}`;
        md += `![GitHub Stats](https://github-readme-stats.vercel.app/api${params})\n\n`;
        md += `![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/${params}&layout=compact)\n\n`;
    }

    // Socials
    if (Object.values(socials).some(s => s)) {
        md += `## Connect with me\n\n`;
        md += `<p align="left">\n`;
        if (socials.github) md += `  <a href="https://github.com/${socials.github}"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>\n`;
        if (socials.twitter) md += `  <a href="https://twitter.com/${socials.twitter}"><img src="https://img.shields.io/badge/twitter-%231DA1F2.svg?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>\n`;
        if (socials.linkedin) md += `  <a href="${socials.linkedin}"><img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>\n`;
        // ... add others
        md += `</p>\n\n`;
    }

    return md;
};
