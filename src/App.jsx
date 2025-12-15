import React from 'react';
import Sidebar from './components/Sidebar';
import Preview from './components/Preview';

function App() {
    return (
        <div className="flex h-screen bg-background text-gray-100 overflow-hidden font-sans">
            {/* Left Panel: Configuration */}
            <div className="w-1/2 h-full border-r border-gray-800 overflow-y-auto custom-scrollbar p-6 bg-surface/50 backdrop-blur-sm">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        GitProfile Gen
                    </h1>
                    <p className="text-gray-400">Craft your perfect profile README</p>
                </header>
                <Sidebar />
            </div>

            {/* Right Panel: Preview */}
            <div className="w-1/2 h-full bg-black/50 p-8 overflow-y-auto custom-scrollbar flex flex-col items-center justify-start relative">
                <div className="w-full max-w-4xl">
                    <Preview />
                </div>
            </div>
        </div>
    );
}

export default App;
