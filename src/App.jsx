import React from 'react';
import Sidebar from './components/Sidebar';
import Preview from './components/Preview';

function App() {
    return (
        <div className="flex h-screen bg-background text-text-primary overflow-hidden font-sans">
            {/* Left Panel: Configuration */}
            <div className="w-1/2 h-full border-r border-border overflow-y-auto custom-scrollbar p-6 bg-surface/30 backdrop-blur-sm">
                <Sidebar />
            </div>

            {/* Right Panel: Preview */}
            <div className="w-1/2 h-full bg-background/50 p-8 overflow-y-auto custom-scrollbar flex flex-col items-center justify-start relative">
                <div className="w-full max-w-4xl">
                    <Preview />
                </div>
            </div>
        </div>
    );
}

export default App;
