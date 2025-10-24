'use client';

import { useEffect, useState } from 'react';

interface LinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (displayText: string, url: string) => void;
    initialText?: string;
    initialUrl?: string;
}

interface LinkField {
    id: string;
    displayText: string;
    url: string;
}

export default function LinkModal({
    isOpen,
    onClose,
    onSubmit,
    initialText = '',
    initialUrl = '',
}: LinkModalProps) {
    const [links, setLinks] = useState<LinkField[]>([
        { id: '1', displayText: initialText, url: initialUrl }
    ]);

    useEffect(() => {
        if (isOpen) {
            setLinks([{ id: '1', displayText: initialText, url: initialUrl }]);
        }
    }, [isOpen, initialText, initialUrl]);

    const addNewLink = () => {
        setLinks(prev => [...prev, {
            id: String(Date.now()),
            displayText: '',
            url: ''
        }]);
    };

    const removeLink = (id: string) => {
        setLinks(prev => prev.filter(link => link.id !== id));
    };

    const updateLink = (id: string, field: 'displayText' | 'url', value: string) => {
        setLinks(prev => prev.map(link =>
            link.id === id ? { ...link, [field]: value } : link
        ));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Submit all non-empty links in reverse order
        // so they appear in the order they were added
        [...links].reverse().forEach(link => {
            if (link.displayText || link.url) {
                onSubmit(link.displayText, link.url);
            }
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-black border border-white/20 p-6 w-full max-w-md max-h-[80vh] flex flex-col">
                <h2 className="text-xl font-bold text-white mb-6">Insert Link</h2>
                <form id="linkForm" onSubmit={handleSubmit} className="space-y-4 flex-1 overflow-y-auto pr-2 min-h-0">
                    {links.map((link, index) => (
                        <div key={link.id} className="space-y-4 relative">
                            {index > 0 && (
                                <div className="absolute -top-2 -right-2">
                                    <button
                                        type="button"
                                        onClick={() => removeLink(link.id)}
                                        className="text-white/50 hover:text-white"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                            {!initialText && (
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        Display Text
                                    </label>
                                    <input
                                        type="text"
                                        value={link.displayText}
                                        onChange={(e) => updateLink(link.id, 'displayText', e.target.value)}
                                        className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-colors"
                                        placeholder="Enter text to display"
                                        autoFocus={index === 0 && !initialText}
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    URL
                                </label>
                                <input
                                    type="text"
                                    value={link.url}
                                    onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-colors"
                                    placeholder="https://"
                                    autoFocus={index === 0 && !!initialText}
                                />
                            </div>
                            {index === links.length - 1 && (
                                <button
                                    type="button"
                                    onClick={addNewLink}
                                    className="w-full px-3 py-2 border border-dashed border-white/20 text-white/50 hover:text-white hover:border-white transition-colors text-sm"
                                >
                                    + Add Another Link
                                </button>
                            )}
                        </div>
                    ))}
                </form>
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/20">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-white hover:bg-white/10 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-white text-black hover:bg-white/90 transition-colors"
                    >
                        Insert Links
                    </button>
                </div>
            </div>
        </div>
    );
}