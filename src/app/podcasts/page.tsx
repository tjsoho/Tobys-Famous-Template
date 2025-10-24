'use client';

import { getPodcasts } from "@/server-actions/podcast";
import PodcastCard from "@/components/podcast/PodcastCard";
import { motion, easeInOut } from "framer-motion";
import { useEffect, useState } from "react";
import { Podcast } from "@/app/types/podcast";

export default function PodcastsPage() {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);

    useEffect(() => {
        const fetchPodcasts = async () => {
            const data = await getPodcasts();
            setPodcasts(data || []);
        };
        fetchPodcasts();
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
                    STAIT Podcasts
                </motion.h1>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {podcasts.map((podcast) => (
                        <motion.div key={podcast.id} variants={cardVariants}>
                            <PodcastCard
                                title={podcast.title}
                                link={podcast.link}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}