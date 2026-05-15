import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { User, Code2, Share2, BarChart2, Zap, LayoutGrid, Download, Upload } from 'lucide-react';
import TechStackSelector from './TechStackSelector';
import ThemeToggle from './ThemeToggle';

// Reusable Components
const TabButton = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${active
            ? 'border-primary text-primary'
            : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-surface'
            }`}
    >
        <Icon size={16} />
        <span>{label}</span>
    </button>
);

const InputGroup = ({ label, value, onChange, placeholder, type = "text", help }) => (
    <div className="space-y-1">
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex justify-between">
            {label}
        </label>
        {type === 'textarea' ? (
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={3}
                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-text-primary focus:ring-2 focus:ring-primary outline-none resize-none custom-scrollbar placeholder-gray-400 text-sm"
            />
        ) : (
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all placeholder-gray-400 text-sm"
            />
        )}
        {help && <p className="text-[10px] text-text-secondary">{help}</p>}
    </div>
);

const Sidebar = () => {
    const store = useStore();
    const [activeTab, setActiveTab] = useState('intro'); // intro | skills | socials | stats | addons

    const fileInputRef = React.useRef(null);

    // Config Actions
    const handleExportConfig = () => {
        const config = JSON.stringify(store, null, 2);
        const blob = new Blob([config], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'gitprofile-config.json';
        a.click();
    };

    const handleImportConfig = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const config = JSON.parse(e.target.result);
                store.loadConfig(config);
            } catch (err) {
                console.error('Failed to parse config:', err);
                alert('Invalid configuration file');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="flex flex-col h-full bg-surface/30 backdrop-blur-sm">
            {/* Top Bar */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-surface">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    GitProfile Gen
                </h1>
                <div className="flex items-center gap-3">
                    <button onClick={handleExportConfig} title="Export Config" className="text-text-secondary hover:text-primary">
                        <Download size={18} />
                    </button>
                    <button onClick={() => fileInputRef.current.click()} title="Import Config" className="text-text-secondary hover:text-primary">
                        <Upload size={18} />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImportConfig}
                        accept=".json"
                        className="hidden"
                    />
                    <ThemeToggle />
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex overflow-x-auto border-b border-border bg-background custom-scrollbar">
                <TabButton active={activeTab === 'intro'} onClick={() => setActiveTab('intro')} icon={User} label="Intro" />
                <TabButton active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} icon={Code2} label="Skills" />
                <TabButton active={activeTab === 'socials'} onClick={() => setActiveTab('socials')} icon={Share2} label="Socials" />
                <TabButton active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={BarChart2} label="Stats" />
                <TabButton active={activeTab === 'addons'} onClick={() => setActiveTab('addons')} icon={Zap} label="Add-ons" />
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">

                {activeTab === 'intro' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Quick Start */}
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                            <h3 className="font-semibold text-primary mb-2 flex items-center gap-2"><LayoutGrid size={16} /> Quick Start</h3>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="GitHub Username"
                                    id="gh-fetch-input"
                                    className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                                    onKeyDown={(e) => e.key === 'Enter' && store.fetchGithubData(e.target.value)}
                                />
                                <button
                                    onClick={() => store.fetchGithubData(document.getElementById('gh-fetch-input').value)}
                                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90"
                                >
                                    Fetch
                                </button>
                            </div>
                        </div>

                        <div className="h-px bg-border" />

                        <InputGroup label="Name" value={store.header.title.replace("Hi 👋, I'm ", "")} onChange={(v) => store.updateHeader('title', `Hi 👋, I'm ${v}`)} />
                        <InputGroup label="Subtitle" value={store.header.subtitle} onChange={(v) => store.updateHeader('subtitle', v)} />
                        <InputGroup label="Banner URL" value={store.header.bannerUrl} onChange={(v) => store.updateHeader('bannerUrl', v)} placeholder="https://..." />
                        <InputGroup label="About Me" value={store.about.content} onChange={(v) => store.updateAbout('content', v)} type="textarea" />

                        <div className="space-y-4 pt-2">
                            <h3 className="font-semibold text-text-primary">The 7 Pillars</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <InputGroup label="🔭 I'm currently working on" value={store.about.workingOn} onChange={(v) => store.updateAbout('workingOn', v)} />
                                <InputGroup label="🌱 I'm currently learning" value={store.about.learning} onChange={(v) => store.updateAbout('learning', v)} />
                                <InputGroup label="👯 I'm looking to collaborate on" value={store.about.collaborating} onChange={(v) => store.updateAbout('collaborating', v)} />
                                <InputGroup label="🤝 I'm looking for help with" value={store.about.helpNeeded} onChange={(v) => store.updateAbout('helpNeeded', v)} />
                                <InputGroup label="💬 Ask me about" value={store.about.askMeAbout} onChange={(v) => store.updateAbout('askMeAbout', v)} />
                                <InputGroup label="📫 How to reach me" value={store.about.contactInfo} onChange={(v) => store.updateAbout('contactInfo', v)} />
                                <InputGroup label="⚡ Fun fact" value={store.about.funFact} onChange={(v) => store.updateAbout('funFact', v)} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'skills' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Settings */}


                        {/* Selector */}
                        <div className="bg-surface border border-border rounded-xl p-4">
                            <h3 className="font-semibold text-text-primary text-sm mb-4">Manage Skills</h3>
                            <TechStackSelector />
                        </div>
                    </div>
                )}

                {activeTab === 'socials' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div>
                            <h3 className="text-sm font-bold text-text-primary mb-4 uppercase tracking-wider">Social Media</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputGroup label="GitHub" value={store.socials.github} onChange={(v) => store.updateSocial('github', v)} />
                                <InputGroup label="Twitter / X" value={store.socials.twitter} onChange={(v) => store.updateSocial('twitter', v)} />
                                <InputGroup label="LinkedIn" value={store.socials.linkedin} onChange={(v) => store.updateSocial('linkedin', v)} />
                                <InputGroup label="Website" value={store.socials.website} onChange={(v) => store.updateSocial('website', v)} />
                                <InputGroup label="Instagram" value={store.socials.instagram} onChange={(v) => store.updateSocial('instagram', v)} />
                                <InputGroup label="Facebook" value={store.socials.facebook} onChange={(v) => store.updateSocial('facebook', v)} />
                                <InputGroup label="YouTube" value={store.socials.youtube} onChange={(v) => store.updateSocial('youtube', v)} />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-text-primary mb-4 uppercase tracking-wider">Coding Platforms</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputGroup label="LeetCode" value={store.socials.leetcode} onChange={(v) => store.updateSocial('leetcode', v)} />
                                <InputGroup label="HackerRank" value={store.socials.hackerrank} onChange={(v) => store.updateSocial('hackerrank', v)} />
                                <InputGroup label="StackOverflow" value={store.socials.stackoverflow} onChange={(v) => store.updateSocial('stackoverflow', v)} />
                                <InputGroup label="Kaggle" value={store.socials.kaggle} onChange={(v) => store.updateSocial('kaggle', v)} />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-text-primary mb-4 uppercase tracking-wider">Content & Design</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputGroup label="Medium" value={store.socials.medium} onChange={(v) => store.updateSocial('medium', v)} />
                                <InputGroup label="Hashnode" value={store.socials.hashnode} onChange={(v) => store.updateSocial('hashnode', v)} />
                                <InputGroup label="Dev.to" value={store.socials.devto} onChange={(v) => store.updateSocial('devto', v)} />
                                <InputGroup label="Dribbble" value={store.socials.dribbble} onChange={(v) => store.updateSocial('dribbble', v)} />
                                <InputGroup label="Behance" value={store.socials.behance} onChange={(v) => store.updateSocial('behance', v)} />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-text-primary mb-4 uppercase tracking-wider">Donations</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputGroup label="Buy Me A Coffee" value={store.donations.buymeacoffee} onChange={(v) => store.updateDonation('buymeacoffee', v)} />
                                <InputGroup label="Ko-fi" value={store.donations.kofi} onChange={(v) => store.updateDonation('kofi', v)} />
                                <InputGroup label="PayPal" value={store.donations.paypal} onChange={(v) => store.updateDonation('paypal', v)} />
                                <InputGroup label="Patreon" value={store.donations.patreon} onChange={(v) => store.updateDonation('patreon', v)} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-xl">
                            <span className="font-semibold text-text-primary">Show GitHub Stats</span>
                            <input type="checkbox" checked={store.stats.show} onChange={(e) => store.updateStats('show', e.target.checked)} className="accent-primary w-5 h-5" />
                        </div>

                        {store.stats.show && (
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Universal Theme</label>
                                    <select
                                        value={store.stats.theme}
                                        onChange={(e) => store.updateStats('theme', e.target.value)}
                                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-text-primary focus:ring-2 focus:ring-primary outline-none"
                                    >
                                        <option value="tokyonight">Tokyo Night</option>
                                        <option value="dracula">Dracula</option>
                                        <option value="dark">Dark</option>
                                        <option value="radical">Radical</option>
                                        <option value="merko">Merko</option>
                                        <option value="gruvbox">Gruvbox</option>
                                        <option value="onedark">One Dark</option>
                                        <option value="highcontrast">High Contrast</option>
                                    </select>
                                    <p className="text-[10px] text-text-secondary">Applies to all stats cards</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={store.stats.hideBorder} onChange={(e) => store.updateStats('hideBorder', e.target.checked)} className="accent-primary" />
                                        <span className="text-sm text-text-secondary">Hide Border</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={store.stats.showIcons} onChange={(e) => store.updateStats('showIcons', e.target.checked)} className="accent-primary" />
                                        <span className="text-sm text-text-secondary">Show Icons</span>
                                    </label>
                                </div>

                                <div className="p-4 bg-surface/50 border border-border rounded-xl space-y-3">
                                    <h4 className="font-medium text-text-primary text-sm">Cards to Display</h4>
                                    <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-surface rounded-lg">
                                        <span className="text-sm text-text-secondary">Streak Stats</span>
                                        <input type="checkbox" checked={store.stats.showStreaks} onChange={(e) => store.updateStats('showStreaks', e.target.checked)} className="accent-primary" />
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-surface rounded-lg">
                                        <span className="text-sm text-text-secondary">Top Languages</span>
                                        <input type="checkbox" checked={true} readOnly className="accent-primary opacity-50" />
                                    </label>
                                </div>

                                {/* [NEW] WakaTime */}
                                <div className="p-4 bg-surface border border-border rounded-xl space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-text-primary text-sm flex items-center gap-2">
                                            ⏳ WakaTime Stats
                                        </h3>
                                        <input type="checkbox" checked={store.wakatime?.show || false} onChange={(e) => store.updateWakaTime('show', e.target.checked)} className="accent-primary w-5 h-5" />
                                    </div>
                                    {store.wakatime?.show && (
                                        <InputGroup
                                            label="WakaTime Username"
                                            value={store.wakatime?.username}
                                            onChange={(v) => store.updateWakaTime('username', v)}
                                            placeholder="username"
                                            help="Ensure your WakaTime profile is public."
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'addons' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Visitor Counter */}
                        <div className="p-4 bg-surface border border-border rounded-xl space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-text-primary flex items-center gap-2">
                                    <User size={16} /> Visitor Counter
                                </h3>
                                <input type="checkbox" checked={store.visitorCounter.show} onChange={(e) => store.updateVisitorCounter('show', e.target.checked)} className="accent-primary w-5 h-5" />
                            </div>
                            {store.visitorCounter.show && (
                                <div className="grid grid-cols-3 gap-2">
                                    {['rule', 'flat', 'plastic'].map(style => (
                                        <button
                                            key={style}
                                            onClick={() => store.updateVisitorCounter('theme', style)}
                                            className={`p-2 rounded-lg border text-xs capitalize ${store.visitorCounter.theme === style ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-border text-text-secondary'}`}
                                        >
                                            {style}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Trophies */}
                        <div className="p-4 bg-surface border border-border rounded-xl space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-text-primary flex items-center gap-2">
                                    🏆 GitHub Trophies
                                </h3>
                                <input type="checkbox" checked={store.trophies.show} onChange={(e) => store.updateTrophies('show', e.target.checked)} className="accent-primary w-5 h-5" />
                            </div>
                            {store.trophies.show && (
                                <InputGroup
                                    label="Trophy Theme"
                                    type="select" // Note: InputGroup implementation above doesn't handle select, simplified here or need update. 
                                // Actually let's just use a direct select here
                                />
                            )}
                            {store.trophies.show && (
                                <select
                                    value={store.trophies.theme}
                                    onChange={(e) => store.updateTrophies('theme', e.target.value)}
                                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-text-primary focus:ring-2 focus:ring-primary outline-none text-sm"
                                >
                                    <option value="flat">Flat</option>
                                    <option value="ondark">On Dark</option>
                                    <option value="gitdimmed">Git Dimmed</option>
                                    <option value="darkhub">Darkhub</option>
                                </select>
                            )}
                        </div>

                        {/* Fun Zone */}
                        <div className="p-4 bg-surface border border-border rounded-xl space-y-3">
                            <h3 className="font-semibold text-text-primary flex items-center gap-2">
                                ⚡ Fun Zone
                            </h3>
                            <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-surface rounded-lg">
                                <span className="text-sm text-text-secondary">Random Dev Quote</span>
                                <input type="checkbox" checked={store.addons.quotes} onChange={(e) => store.updateAddons('quotes', e.target.checked)} className="accent-primary" />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-surface rounded-lg">
                                <span className="text-sm text-text-secondary">Random Meme</span>
                                <input type="checkbox" checked={store.addons.memes} onChange={(e) => store.updateAddons('memes', e.target.checked)} className="accent-primary" />
                            </label>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Sidebar;
