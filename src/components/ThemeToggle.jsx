import React, { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

const ThemeToggle = () => {
    const store = useStore();
    const isDark = store.appTheme === 'dark';

    useEffect(() => {
        // Init theme on mount (in case it wasn't set by store init logic perfectly or to sync class)
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => {
        store.updateAppTheme(isDark ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-surface border border-border text-text-secondary hover:text-text-primary transition-all shadow-sm group"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            <div className="relative w-6 h-6 flex items-center justify-center">
                <motion.div
                    initial={false}
                    animate={{ rotate: isDark ? 0 : 90, scale: isDark ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Moon size={20} />
                </motion.div>
                <motion.div
                    initial={false}
                    animate={{ rotate: isDark ? -90 : 0, scale: isDark ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                >
                    <Sun size={20} className="text-yellow-500" />
                </motion.div>
            </div>
        </button>
    );
};

export default ThemeToggle;
