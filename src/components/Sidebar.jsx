import React from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { ChevronDown, User, Code2, Share2, BarChart2, Type } from 'lucide-react';
import TechStackSelector from './TechStackSelector';

const Section = ({ title, icon: Icon, children }) => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <div className="mb-6 bg-surface/30 border border-gray-800 rounded-xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-800 rounded-lg text-primary">
                        <Icon size={18} />
                    </div>
                    <span className="font-semibold">{title}</span>
                </div>
                <ChevronDown
                    size={18}
                    className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            {isOpen && <div className="p-4 space-y-4">{children}</div>}
        </div>
    );
};

const InputGroup = ({ label, value, onChange, placeholder, type = "text" }) => (
    <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-700"
        />
    </div>
);

const Sidebar = () => {
    const store = useStore();

    return (
        <div className="pb-10">
            {/* Header Section */}
            <Section title="Header" icon={Type}>
                <InputGroup
                    label="Name"
                    value={store.header.title.replace("Hi 👋, I'm ", "")}
                    onChange={(val) => store.updateHeader('title', `Hi 👋, I'm ${val}`)}
                    placeholder="Your Name"
                />
                <InputGroup
                    label="Subtitle"
                    value={store.header.subtitle}
                    onChange={(val) => store.updateHeader('subtitle', val)}
                    placeholder="A passionate Frontend Developer..."
                />
                <InputGroup
                    label="Banner URL"
                    value={store.header.bannerUrl}
                    onChange={(val) => store.updateHeader('bannerUrl', val)}
                    placeholder="https://..."
                />
            </Section>

            {/* About Section */}
            <Section title="About Me" icon={User}>
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</label>
                    <textarea
                        value={store.about.content}
                        onChange={(e) => store.updateAbout(e.target.value)}
                        rows={6}
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none resize-none custom-scrollbar placeholder-gray-700"
                    />
                </div>
            </Section>

            {/* Skills Section */}
            <Section title="Tech Stack" icon={Code2}>
                <TechStackSelector />
            </Section>

            {/* Socials Section */}
            <Section title="Social Links" icon={Share2}>
                <InputGroup label="GitHub Username" value={store.socials.github} onChange={(v) => store.updateSocial('github', v)} />
                <InputGroup label="Twitter Username" value={store.socials.twitter} onChange={(v) => store.updateSocial('twitter', v)} />
                <InputGroup label="LinkedIn URL" value={store.socials.linkedin} onChange={(v) => store.updateSocial('linkedin', v)} />
            </Section>

            {/* Stats Section */}
            <Section title="GitHub Stats" icon={BarChart2}>
                <div className="flex items-center gap-2 mb-4">
                    <input type="checkbox" checked={store.stats.show} onChange={(e) => store.updateStats('show', e.target.checked)} />
                    <span>Show Stats</span>
                </div>
                {store.stats.show && (
                    <>
                        <InputGroup label="Theme" value={store.stats.theme} onChange={(v) => store.updateStats('theme', v)} />
                        <div className="flex items-center gap-2 mt-2">
                            <input type="checkbox" checked={store.stats.hideBorder} onChange={(e) => store.updateStats('hideBorder', e.target.checked)} />
                            <span className="text-sm text-gray-400">Hide Border</span>
                        </div>
                    </>
                )}
            </Section>
        </div>
    );
};

export default Sidebar;
