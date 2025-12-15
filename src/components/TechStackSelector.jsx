import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { techStack } from '../data/techStack';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TechStackSelector = () => {
    const store = useStore();
    const [search, setSearch] = useState('');

    const filteredStack = techStack.filter((tech) =>
        tech.name.toLowerCase().includes(search.toLowerCase())
    );

    const isSelected = (slug) => store.skills.selected.includes(slug);

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search technologies..."
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-700 text-sm"
                />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                {filteredStack.map((tech) => {
                    const selected = isSelected(tech.slug);
                    return (
                        <motion.button
                            key={tech.slug}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => store.toggleSkill(tech.slug)}
                            className={`
                flex flex-col items-center justify-center p-3 rounded-lg border transition-all
                ${selected
                                    ? 'bg-primary/20 border-primary text-primary'
                                    : 'bg-gray-900/50 border-gray-800 text-gray-400 hover:border-gray-600 hover:bg-gray-800'
                                }
              `}
                        >
                            <img
                                src={`https://img.shields.io/badge/${tech.slug}-%23${tech.color}?style=flat&logo=${tech.slug}&logoColor=white`}
                                alt={tech.name}
                                className="h-6 mb-2 object-contain filter drop-shadow-md"
                                onError={(e) => {
                                    // Fallback if shield fails or logo invalid (just show text)
                                    e.target.style.display = 'none';
                                }}
                            />
                            <span className="text-xs font-medium truncate w-full text-center">{tech.name}</span>
                        </motion.button>
                    );
                })}
            </div>

            {filteredStack.length === 0 && (
                <p className="text-center text-gray-500 text-sm py-4">No results found.</p>
            )}

            {/* Selected Summary */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800">
                <span className="text-xs text-gray-500 w-full mb-1">Selected: {store.skills.selected.length}</span>
                {store.skills.selected.map(slug => (
                    <span key={slug} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 flex items-center gap-1">
                        {slug}
                        <button onClick={() => store.toggleSkill(slug)} className="hover:text-red-400"><X size={10} /></button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TechStackSelector;
