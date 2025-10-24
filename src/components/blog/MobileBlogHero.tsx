/* ************************************************************
                        NOTES
************************************************************ */
// Mobile-specific hero component for blog post pages
// Shows image above text content for better mobile UX
// Completely separate from desktop layout to avoid interference
/* ************************************************************
                        IMPORTS
************************************************************ */
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface MobileBlogHeroProps {
    title: string;
    author: string;
    created_at: string;
    cover_image?: string;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function MobileBlogHero({
    title,
    author,
    created_at,
    cover_image
}: MobileBlogHeroProps) {
    return (
        <section className="md:hidden">
            {/* ************************************************************
                                MOBILE IMAGE
            ************************************************************ */}
            {cover_image && (
                <div className="relative aspect-[16/9] w-full">
                    <Image
                        src={cover_image}
                        alt={title}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* ************************************************************
                                MOBILE CONTENT
            ************************************************************ */}
            <div className="px-4 py-8 space-y-6">
                {/* ************************************************************
                                    BACK BUTTON
                ************************************************************ */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-yellow transition-colors duration-300 group"
                >
                    <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="font-medium">Back to Articles</span>
                </Link>

                {/* ************************************************************
                                    POST TITLE
                ************************************************************ */}
                <h1 className="text-3xl font-bold text-brand-black leading-tight">
                    {title}
                </h1>

                {/* ************************************************************
                                    META INFORMATION
                ************************************************************ */}
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 text-brand-black/70">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span className="font-medium text-base">{author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-base">{new Date(created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </div>
                </div>

                {/* ************************************************************
                                    READ TIME BADGE
                ************************************************************ */}
                <div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-black px-3 py-2 rounded-full text-xs font-semibold">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>2 min read</span>
                </div>
            </div>
        </section>
    );
}
