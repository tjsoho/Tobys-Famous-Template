'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

interface BlogCardProps {
    title: string;
    excerpt?: string;
    coverImage?: string;
    slug: string;
    author: string;
    date: string;
}

export default function BlogCard({
    title,
    excerpt,
    coverImage,
    slug,
    author,
    date
}: BlogCardProps) {
    return (
        <Link
            href={`/blog/posts/${slug}`}
            className="group block bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-[1.02] border-2 border-brand-yellow/30 hover:border-brand-yellow"
        >
            {/* ************************************************************
                                IMAGE SECTION WITH OVERLAY
            ************************************************************ */}
            <div className="relative aspect-[16/9] overflow-hidden">
                {coverImage ? (
                    <Image
                        src={coverImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-cream to-brand-yellow/20 flex items-center justify-center">
                        <div className="text-brand-black/30 text-8xl">📝</div>
                    </div>
                )}

                {/* ************************************************************
                                    GRADIENT OVERLAY
                ************************************************************ */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* ************************************************************
                                    FLOATING CATEGORY BADGE
                ************************************************************ */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <span className="bg-brand-yellow text-brand-black px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                        Article
                    </span>
                </div>

                {/* ************************************************************
                                    READ TIME BADGE
                ************************************************************ */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-brand-teal text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>5 min</span>
                    </div>
                </div>
            </div>

            {/* ************************************************************
                                CONTENT SECTION
            ************************************************************ */}
            <div className="p-5 space-y-4">
                {/* ************************************************************
                                    TITLE SECTION
                ************************************************************ */}
                <div className="space-y-2">
                    <h2 className="text-lg font-bold text-brand-black group-hover:text-brand-teal transition-colors duration-300 line-clamp-2 leading-tight">
                        {title}
                    </h2>

                    {excerpt && (
                        <p className="text-brand-black/70 line-clamp-2 text-sm leading-relaxed">
                            {excerpt}
                        </p>
                    )}
                </div>

                {/* ************************************************************
                                    AUTHOR & DATE SECTION
                ************************************************************ */}
                <div className="flex items-center justify-between pt-3 border-t border-brand-cream/50">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-yellow/20 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-brand-black" />
                        </div>
                        <div>
                            <p className="font-semibold text-brand-black text-xs">{author}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 text-brand-black/60 text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        })}</span>
                    </div>
                </div>

                {/* ************************************************************
                                    READ MORE BUTTON
                ************************************************************ */}
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center text-brand-teal text-xs font-semibold group-hover:text-brand-yellow transition-colors duration-300">
                        <span>Read More</span>
                        <ArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>

                    <div className="w-6 h-6 bg-brand-yellow/10 rounded-full flex items-center justify-center group-hover:bg-brand-yellow/20 transition-colors duration-300">
                        <ArrowRight className="w-3 h-3 text-brand-teal group-hover:text-brand-yellow transition-colors duration-300" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
