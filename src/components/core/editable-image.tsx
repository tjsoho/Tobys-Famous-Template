'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Crosshair } from 'lucide-react';
import { useImageLibrary } from '@/contexts/ImageLibraryContext';
import FocalPointPicker from './focal-point-picker';
import { encodeImageUrl, parseImageUrl } from '@/utils/focal-point';

interface EditableImageProps {
    src: string;
    alt: string;
    className?: string;
    width: number;
    height: number;
    onImageChange: (url: string) => void;
    usage?: 'mobile' | 'desktop' | string;
    /** Aspect ratio of the public container this image renders into — used for the focal preview. */
    previewAspect?: number;
}

export default function EditableImage({
    src,
    alt,
    className = '',
    width,
    height,
    onImageChange,
    usage,
    previewAspect,
}: EditableImageProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [focalOpen, setFocalOpen] = useState(false);
    const { openImageLibrary } = useImageLibrary();

    const { cleanUrl, focus } = parseImageUrl(src);
    const hasRealImage =
        !!cleanUrl && cleanUrl !== '/placeholder.jpg' && cleanUrl !== '';

    const handlePick = () => {
        openImageLibrary((pickedUrl) => {
            // When a fresh image is picked, reset focus to center (strip any stale fragment).
            onImageChange(parseImageUrl(pickedUrl).cleanUrl);
        }, usage);
    };

    const getValidImageSrc = (url: string) => {
        if (!url || url === '' || url === 'undefined' || url === 'null') {
            return '/placeholder.jpg';
        }
        try {
            new URL(url);
            return url;
        } catch {
            if (url.startsWith('/')) return url;
            return '/placeholder.jpg';
        }
    };

    return (
        <>
            <div
                className="relative cursor-pointer group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div onClick={handlePick}>
                    <Image
                        src={getValidImageSrc(cleanUrl)}
                        alt={alt}
                        width={width}
                        height={height}
                        className={className}
                        style={{ objectPosition: `${focus.x}% ${focus.y}%` }}
                    />
                </div>

                <div
                    className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-2 transition-opacity duration-200 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                >
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePick();
                        }}
                        className="pointer-events-auto bg-white/90 hover:bg-white text-brand-black text-xs font-semibold px-3 py-1.5 rounded-full"
                    >
                        Change image
                    </button>
                    {hasRealImage && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setFocalOpen(true);
                            }}
                            title={`Focal point: ${focus.x}% × ${focus.y}%`}
                            className="pointer-events-auto inline-flex items-center gap-1 bg-brand-yellow hover:bg-brand-yellow/80 text-brand-black text-xs font-semibold px-3 py-1.5 rounded-full"
                        >
                            <Crosshair className="w-3.5 h-3.5" />
                            Focus
                        </button>
                    )}
                </div>
            </div>

            {hasRealImage && (
                <FocalPointPicker
                    isOpen={focalOpen}
                    onClose={() => setFocalOpen(false)}
                    imageUrl={cleanUrl}
                    initialFocus={focus}
                    previewAspect={previewAspect}
                    onSave={(newFocus) => {
                        onImageChange(encodeImageUrl(cleanUrl, newFocus));
                    }}
                />
            )}
        </>
    );
}
