'use client';

import { getSciencePosts } from "@/server-actions/science";
import ScienceCard from "@/components/science/ScienceCard";
import { motion, easeInOut } from "framer-motion";
import { useEffect, useState } from "react";
import { BlogPost } from "@/app/types/blog";

export default function SciencePage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getSciencePosts();
            setPosts(data || []);
        };
        fetchPosts();
    }, []);

    const titleVariants = {
        hidden: {
            opacity: 0,
            y: -20
        },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: easeInOut
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.95
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: easeInOut
            }
        }
    };

    return (
        <section className="py-16 bg-black min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    className="text-4xl font-bold text-white mb-12"
                    variants={titleVariants}
                    initial="hidden"
                    animate="show"
                >
                    STAIT Science
                </motion.h1>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {posts.map((post) => (
                        <motion.div key={post.id} variants={cardVariants}>
                            <ScienceCard
                                title={post.title}
                                excerpt={post.excerpt || ""}
                                coverImage={post.cover_image || ""}
                                slug={post.slug}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}