import { create } from 'zustand';

export const useStore = create((set) => ({
    header: {
        title: 'Hi 👋, I\'m [Name]',
        subtitle: 'A passionate Frontend Developer from [Location]',
        bannerUrl: '',
    },
    about: {
        content: 'I love building things for the web. 🔭 I’m currently working on ...',
        // [NEW] 7 Pillars
        workingOn: '',
        learning: '',
        collaborating: '',
        helpNeeded: '',
        askMeAbout: '',
        contactInfo: '',
        funFact: '',
    },
    skills: {
        selected: [], // Default skills
        style: 'icons', // 'badges' | 'icons'
        iconSize: 40, // for icons
    },
    socials: {
        github: '',
        linkedin: '',
        twitter: '',
        website: '',
        // [NEW] Extended Socials & Platforms
        instagram: '',
        facebook: '',
        youtube: '',
        leetcode: '',
        hackerrank: '',
        stackoverflow: '',
        kaggle: '',
        medium: '',
        hashnode: '',
        dribbble: '',
        devto: '',
        behance: '',
        codechef: '',
    },
    stats: {
        show: true,
        theme: 'tokyonight',
        hideBorder: true,
        showIcons: true,
        showStreaks: false,
    },
    // [NEW] Feature States
    visitorCounter: {
        show: false,
        theme: 'rule',
    },
    wakatime: {
        show: false,
        username: '', // Uses WakaTime username
    },
    trophies: {
        show: false,
        theme: 'flat',
    },
    addons: {
        quotes: false,
        memes: false,
    },
    donations: {
        buymeacoffee: '',
        kofi: '',
        paypal: '',
        patreon: '',
    },

    appTheme: (() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
        }
        return 'dark';
    })(),

    // Actions
    loadConfig: (config) => set((state) => ({ ...state, ...config })),
    updateHeader: (field, value) => set((state) => ({ header: { ...state.header, [field]: value } })),
    updateAppTheme: (theme) => {
        localStorage.setItem('theme', theme);
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        set({ appTheme: theme });
    },
    updateAbout: (field, value) => set((state) => ({ about: { ...state.about, [field]: value } })),
    toggleSkill: (skill) => set((state) => {
        const selected = state.skills.selected.includes(skill)
            ? state.skills.selected.filter((s) => s !== skill)
            : [...state.skills.selected, skill];
        return { skills: { ...state.skills, selected } };
    }),
    updateSkills: (field, value) => set((state) => ({ skills: { ...state.skills, [field]: value } })),
    updateSocial: (platform, value) => set((state) => ({ socials: { ...state.socials, [platform]: value } })),
    updateStats: (field, value) => set((state) => ({ stats: { ...state.stats, [field]: value } })),

    // [NEW] Actions
    updateVisitorCounter: (field, value) => set((state) => ({ visitorCounter: { ...state.visitorCounter, [field]: value } })),
    updateWakaTime: (field, value) => set((state) => ({ wakatime: { ...state.wakatime, [field]: value } })),
    updateTrophies: (field, value) => set((state) => ({ trophies: { ...state.trophies, [field]: value } })),
    updateAddons: (field, value) => set((state) => ({ addons: { ...state.addons, [field]: value } })),
    updateDonation: (platform, value) => set((state) => ({ donations: { ...state.donations, [platform]: value } })),

    fetchGithubData: async (username) => {
        if (!username) return;
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) throw new Error('User not found');
            const data = await response.json();

            set((state) => ({
                header: {
                    ...state.header,
                    title: `Hi 👋, I'm ${data.name || username}`,
                    subtitle: data.bio || state.header.subtitle,
                },
                about: {
                    ...state.about,
                    content: data.bio ? `I'm ${data.name || username}. ${data.bio}` : state.about.content,
                    // Auto-fill some pillars if we can infer them? GitHub API doesn't give much more.
                    // We stick to basic profile info.
                    contactInfo: data.email || state.about.contactInfo,
                },
                socials: {
                    ...state.socials,
                    github: data.login,
                    twitter: data.twitter_username || '',
                    website: data.blog || '',
                },
                stats: {
                    ...state.stats,
                    show: true,
                }
            }));
            return true;
        } catch (error) {
            console.error('Failed to fetch GitHub data:', error);
            return false;
        }
    },
}));
