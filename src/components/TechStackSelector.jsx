import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { techStack } from '../data/techStack';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TechStackSelector = () => {
    const { skills, toggleSkill } = useStore();
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('Languages');

    const categories = useMemo(() => {
        const cats = [...new Set(techStack.map(t => t.category))].filter(Boolean);
        return cats;
    }, []);

    const filteredStack = useMemo(() => {
        return techStack.filter((tech) => {
            const matchesSearch = tech.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = search ? true : tech.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [search, activeCategory]);

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={16} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search skills..."
                    className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-text-primary focus:ring-2 focus:ring-primary outline-none text-sm"
                />
            </div>

            {/* Category Tabs (Hide if searching) */}
            {!search && (
                <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                                ? 'bg-primary text-white'
                                : 'bg-surface hover:bg-surface/80 text-text-secondary border border-border'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}

            {/* Icons Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 max-h-[300px] overflow-y-auto custom-scrollbar p-1">
                {filteredStack.map((tech) => {
                    const isSelected = skills.selected.includes(tech.slug);
                    return (
                        <motion.button
                            key={tech.slug}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => toggleSkill(tech.slug)}
                            className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all aspect-square ${isSelected
                                ? 'bg-primary/10 border-primary shadow-sm'
                                : 'bg-surface border-border hover:border-text-secondary/50 grayscale opacity-70 hover:grayscale-0 hover:opacity-100'
                                }`}
                            title={tech.name}
                        >
                            <img
                                src={tech.iconUrl || `https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop
                                    if (!tech.iconUrl) {
                                        // Fallback to JSDelivr (reliable, uncolored) if Simple Icons CDN fails
                                        e.target.src = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${tech.slug}.svg`;
                                    }
                                }}
                                alt={tech.name}
                                className="w-8 h-8 object-contain mb-1"
                            />
                            <span className="text-[10px] text-center font-medium truncate w-full">{tech.name}</span>
                        </motion.button>
                    );
                })}
            </div>
            {filteredStack.length === 0 && (
                <div className="text-center text-text-secondary py-4 text-sm">No skills found.</div>
            )}

            {/* Selected Summary */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border mt-2">
                <span className="text-xs text-text-secondary w-full mb-1">Selected: {skills.selected.length}</span>
                {skills.selected.map(slug => (
                    <span key={slug} className="px-2 py-1 bg-surface border border-border rounded text-xs text-text-primary flex items-center gap-1">
                        {slug}
                        <button onClick={() => toggleSkill(slug)} className="hover:text-red-400 text-text-secondary flex"><X size={10} /></button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TechStackSelector;
