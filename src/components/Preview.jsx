import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useStore } from '../store/useStore';
import { generateMarkdown } from '../utils/generateMarkdown';
import { Copy, Download, Code, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Preview = () => {
    const store = useStore();
    const markdownContent = generateMarkdown(store);
    const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'code'
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(markdownContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([markdownContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'README.md';
        a.click();
    };

    return (
        <div className="w-full bg-surface border border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-black/40">
                <div className="flex space-x-2 bg-gray-900 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode('preview')}
                        className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-2 transition-all ${viewMode === 'preview' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'
                            }`}
                    >
                        <Eye size={16} /> Preview
                    </button>
                    <button
                        onClick={() => setViewMode('code')}
                        className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-2 transition-all ${viewMode === 'code' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'
                            }`}
                    >
                        <Code size={16} /> Code
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <AnimatePresence>
                        {copied && (
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-green-500 text-sm font-medium"
                            >
                                Copied!
                            </motion.span>
                        )}
                    </AnimatePresence>
                    <button onClick={handleCopy} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors" title="Copy to Clipboard">
                        <Copy size={18} />
                    </button>
                    <button onClick={handleDownload} className="btn-primary flex items-center gap-2 px-4 py-1.5 text-sm rounded-lg font-medium">
                        <Download size={16} /> Download
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#0d1117]"> {/* GitHub Dark BG */}
                {viewMode === 'preview' ? (
                    <div className="markdown-body prose prose-invert max-w-none">
                        <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>
                    </div>
                ) : (
                    <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap">
                        {markdownContent}
                    </pre>
                )}
            </div>
        </div>
    );
};

export default Preview;
