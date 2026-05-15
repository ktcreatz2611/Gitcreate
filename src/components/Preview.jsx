import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useStore } from '../store/useStore';
import { generateMarkdown, generateBlogWorkflow } from '../utils/generateMarkdown';
import { Copy, Download, Code, Eye, FileJson } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Preview = () => {
    const store = useStore();
    const exportMarkdown = generateMarkdown(store, 'export');
    const previewMarkdown = generateMarkdown(store, 'preview');
    const blogWorkflow = generateBlogWorkflow(store);
    const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'code'
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(exportMarkdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([exportMarkdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'README.md';
        a.click();
    };

    const handleDownloadWorkflow = () => {
        if (!blogWorkflow) return;
        const blob = new Blob([blogWorkflow], { type: 'text/yaml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'blog-post-workflow.yml';
        a.click();
    };

    return (
        <div className="w-full bg-surface border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface/80 backdrop-blur-sm">
                <div className="flex space-x-2 bg-background p-1 rounded-lg border border-border">
                    <button
                        onClick={() => setViewMode('preview')}
                        className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-2 transition-all ${viewMode === 'preview' ? 'bg-surface text-text-primary shadow-sm border border-border' : 'text-text-secondary hover:text-text-primary'
                            }`}
                    >
                        <Eye size={16} /> Preview
                    </button>
                    <button
                        onClick={() => setViewMode('code')}
                        className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-2 transition-all ${viewMode === 'code' ? 'bg-surface text-text-primary shadow-sm border border-border' : 'text-text-secondary hover:text-text-primary'
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
                    {blogWorkflow && (
                        <button onClick={handleDownloadWorkflow} className="p-2 text-text-secondary hover:text-primary hover:bg-surface rounded-lg transition-colors" title="Download Blog Workflow">
                            <FileJson size={18} />
                        </button>
                    )}
                    <button onClick={handleCopy} className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors" title="Copy to Clipboard">
                        <Copy size={18} />
                    </button>
                    <button onClick={handleDownload} className="btn-primary flex items-center gap-2 px-4 py-1.5 text-sm rounded-lg font-medium">
                        <Download size={16} /> Download
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-background text-text-primary">
                {viewMode === 'preview' ? (
                    <div className="markdown-body prose prose-invert max-w-none">
                        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{previewMarkdown}</Markdown>
                    </div>
                ) : (
                    <pre className="font-mono text-sm text-text-secondary whitespace-pre-wrap">
                        {exportMarkdown}
                    </pre>
                )}
            </div>
        </div>
    );
};

export default Preview;
