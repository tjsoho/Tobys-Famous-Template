'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { X } from 'lucide-react';
import Image from 'next/image';

interface ImageUsage {
    url: string;
    usedIn: {
        mobile?: boolean;
        desktop?: boolean;
        other?: string[];
    };
}

interface MediaLibraryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
    currentUsage?: ImageUsage[];
}

export default function MediaLibraryModal({ isOpen, onClose, onSelect, currentUsage = [] }: MediaLibraryModalProps) {
    const [images, setImages] = useState<{ name: string; url: string; created_at: string; }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            loadImages();
        }
    }, [isOpen]);

    const loadImages = async () => {
        setIsLoading(true);
        setError(null);
        try {
            let allFiles: { name: string; created_at: string; }[] = [];
            let offset = 0;
            const limit = 100;

            // Keep fetching until we get all files
            while (true) {
                const { data, error } = await supabase.storage
                    .from('site-images')
                    .list('', {
                        limit: limit,
                        offset: offset,
                        sortBy: { column: 'created_at', order: 'desc' }
                    });

                if (error) throw error;

                if (!data || data.length === 0) break;

                allFiles = [...allFiles, ...data];

                if (data.length < limit) break;
                offset += limit;
            }

            const imageUrls = await Promise.all(
                allFiles.map(async (file) => {
                    const { data: { publicUrl } } = supabase.storage
                        .from('site-images')
                        .getPublicUrl(file.name);

                    return {
                        name: file.name,
                        url: publicUrl,
                        created_at: file.created_at
                    };
                })
            );

            // Sort by created_at in descending order (newest first)
            const sortedImages = imageUrls.sort((a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );

            setImages(sortedImages);
        } catch (error) {
            console.error('Error loading images:', error);
            setError('Failed to load images');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (imageName: string) => {
        if (!confirm('Are you sure you want to delete this image?')) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.storage
                .from('site-images')
                .remove([imageName]);

            if (error) throw error;

            setImages(prev => prev.filter(img => img.name !== imageName));
        } catch (error) {
            console.error('Error deleting image:', error);
            setError('Failed to delete image');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsLoading(true);
        setError(null);

        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from('site-images')
                    .upload(fileName, file, {
                        cacheControl: '3600',
                        upsert: true
                    });

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('site-images')
                    .getPublicUrl(fileName);

                return {
                    name: fileName,
                    url: publicUrl,
                    created_at: new Date().toISOString()
                };
            });

            const uploadedImages = await Promise.all(uploadPromises);
            setImages(prev => [...uploadedImages, ...prev]);
        } catch (error) {
            console.error('Error uploading files:', error);
            setError('Failed to upload one or more files');
        } finally {
            setIsLoading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-brand-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white border border-brand-yellow/20 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col rounded-2xl shadow-2xl">
                <div className="p-6 border-b border-brand-yellow/20 flex justify-between items-center bg-brand-yellow/10">
                    <h2 className="text-2xl font-bold text-brand-black">Media Library</h2>
                    <button
                        onClick={onClose}
                        className="text-brand-black/70 hover:text-brand-black transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 border-b border-brand-yellow/20">
                    <div className="flex justify-end">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-brand-yellow hover:bg-brand-yellow/80 text-brand-black px-6 py-2 transition-colors rounded-lg font-semibold"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Uploading...' : 'Upload Files'}
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            disabled={isLoading}
                            multiple
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-red-600 mt-2">{error}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto flex-grow p-6 bg-brand-cream/30 scrollbar-none">
                    {images.length === 0 && !isLoading ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                            <div className="text-brand-black/50 mb-4">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-brand-black mb-2">No images yet</h3>
                            <p className="text-brand-black/70 mb-4">Upload your first image to get started</p>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-brand-yellow hover:bg-brand-yellow/80 text-brand-black px-6 py-2 transition-colors rounded-lg font-semibold"
                            >
                                Upload Files
                            </button>
                        </div>
                    ) : (
                        images.map((image, index) => (
                            <div
                                key={`${image.url}-${index}`}
                                className={`group relative cursor-pointer overflow-hidden bg-brand-black/50 border-2 ${currentUsage.some(u => u.url === image.url)
                                    ? 'border-brand-yellow'
                                    : 'border-brand-yellow/20 hover:border-brand-yellow'
                                    } p-3 flex flex-col items-center justify-center h-48 transition-all duration-200 rounded-lg shadow-sm`}
                            >
                                <div className="relative w-full h-full flex items-center justify-center">
                                    {/* Usage badges */}
                                    {currentUsage.find(u => u.url === image.url) && (
                                        <div className="absolute top-0 left-0 flex gap-1 z-10 p-1">
                                            {currentUsage.find(u => u.url === image.url)?.usedIn.desktop && (
                                                <span className="bg-brand-teal text-white text-xs px-2 py-1 rounded">
                                                    Desktop
                                                </span>
                                            )}
                                            {currentUsage.find(u => u.url === image.url)?.usedIn.mobile && (
                                                <span className="bg-brand-yellow text-brand-black text-xs px-2 py-1 rounded">
                                                    Mobile
                                                </span>
                                            )}
                                            {currentUsage.find(u => u.url === image.url)?.usedIn.other?.map((usage, i) => (
                                                <span key={i} className="bg-brand-black text-white text-xs px-2 py-1 rounded">
                                                    {usage}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <Image
                                        src={image.url}
                                        alt={`Library image ${index + 1}`}
                                        width={200}
                                        height={200}
                                        className="object-contain max-h-full transition-transform duration-200 group-hover:scale-105"
                                        onError={(e) => {
                                            console.error(`Failed to load image: ${image.url}`);
                                            // Replace with placeholder on error
                                            e.currentTarget.src = '/placeholder.jpg';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col items-center justify-end pb-4 gap-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSelect(image.url);
                                                }}
                                                className="px-4 py-2 bg-brand-yellow text-brand-black hover:bg-brand-yellow/80 transition-colors border border-brand-yellow rounded-lg font-semibold"
                                            >
                                                Select
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(image.name);
                                                }}
                                                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors border border-red-600 hover:border-red-700 rounded-lg font-semibold"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-white text-xs px-2 text-center truncate max-w-full">
                                                {image.name}
                                            </p>
                                            {currentUsage.some(u => u.url === image.url) && (
                                                <p className="text-brand-yellow text-xs px-2 text-center font-semibold">
                                                    Currently Used
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}