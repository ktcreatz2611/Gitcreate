import { create } from 'zustand';

export const useStore = create((set) => ({
    header: {
        title: 'Hi 👋, I\'m [Name]',
        subtitle: 'A passionate Frontend Developer from [Location]',
        bannerUrl: '',
    },
    about: {
        content: 'I love building things for the web. 🔭 I’m currently working on ...',
    },
    skills: {
        selected: ['react', 'javascript', 'tailwindcss'], // Default skills
    },
    socials: {
        github: '',
        linkedin: '',
        twitter: '',
        website: '',
        medium: '',
        devto: '',
    },
    stats: {
        show: true,
        theme: 'tokyonight',
        hideBorder: true,
        showIcons: true,
    },

    // Actions
    updateHeader: (field, value) => set((state) => ({ header: { ...state.header, [field]: value } })),
    updateAbout: (content) => set((state) => ({ about: { ...state.about, content } })),
    toggleSkill: (skill) => set((state) => {
        const selected = state.skills.selected.includes(skill)
            ? state.skills.selected.filter((s) => s !== skill)
            : [...state.skills.selected, skill];
        return { skills: { ...state.skills, selected } };
    }),
    updateSocial: (platform, value) => set((state) => ({ socials: { ...state.socials, [platform]: value } })),
    updateStats: (field, value) => set((state) => ({ stats: { ...state.stats, [field]: value } })),
}));
