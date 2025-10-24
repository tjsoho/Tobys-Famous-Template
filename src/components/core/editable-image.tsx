'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useImageLibrary } from '@/contexts/ImageLibraryContext';

interface EditableImageProps {
    src: string;
    alt: string;
    className?: string;
    width: number;
    height: number;
    onImageChange: (url: string) => void;
    usage?: 'mobile' | 'desktop' | string;
}

export default function EditableImage({
    src,
    alt,
    className = '',
    width,
    height,
    onImageChange,
    usage
}: EditableImageProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { openImageLibrary } = useImageLibrary();

    const handleClick = () => {
        openImageLibrary(onImageChange, usage);
    };

    // Validate and fix image URL
    const getValidImageSrc = (src: string) => {
        if (!src || src === '' || src === 'undefined' || src === 'null') {
            return '/placeholder.jpg';
        }

        // Check if it's a valid URL or path
        try {
            new URL(src);
            return src;
        } catch {
            // If it's not a valid URL, check if it starts with /
            if (src.startsWith('/')) {
                return src;
            }
            return '/placeholder.jpg';
        }
    };

    return (
        <div
            className="relative cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <Image
                src={getValidImageSrc(src)}
                alt={alt}
                width={width}
                height={height}
                className={className}
            />

            <div
                className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <span className="text-white text-sm">Click to change image</span>
            </div>
        </div>
    );
}