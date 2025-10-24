'use client';

import { useEffect, useState } from 'react';
import { FAQ, FAQCategory } from '@/app/types/faq';
import { getFAQs, getFAQCategories } from '@/server-actions/faq';
import { motion, easeInOut } from "framer-motion";

export default function FAQsPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [categories, setCategories] = useState<FAQCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openFaqId, setOpenFaqId] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [faqsData, categoriesData] = await Promise.all([
                    getFAQs(),
                    getFAQCategories()
                ]);

                // Sort categories to ensure General is first
                const sortedCategories = categoriesData.sort((a, b) => {
                    if (a.slug === 'general') return -1;
                    if (b.slug === 'general') return 1;
                    return a.name.localeCompare(b.name);
                });

                // Sort FAQs to ensure General category FAQs appear first
                const sortedFaqs = faqsData.sort((a, b) => {
                    const aIsGeneral = a.category?.slug === 'general';
                    const bIsGeneral = b.category?.slug === 'general';
                    if (aIsGeneral && !bIsGeneral) return -1;
                    if (!aIsGeneral && bIsGeneral) return 1;
                    return 0;
                });

                setFaqs(sortedFaqs);
                setCategories(sortedCategories);
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredFaqs = selectedCategory === 'all'
        ? faqs
        : faqs.filter(faq => faq.category_id === selectedCategory);

    if (isLoading) {
        return <div className="p-8 text-white">Loading...</div>;
    }

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

    const tabsContainerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2
            }
        }
    };

    const tabVariants = {
        hidden: {
            opacity: 0,
            y: 10,
            scale: 0.95
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: easeInOut
            }
        }
    };

    const faqContainerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const faqVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.98
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
        <div className="min-h-screen bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.h1
                    className="text-4xl font-bold text-white text-center mb-16"
                    variants={titleVariants}
                    initial="hidden"
                    animate="show"
                >
                    Frequently Asked Questions
                </motion.h1>

                {/* Category Tabs */}
                <motion.div
                    className="flex flex-wrap gap-4 justify-center mb-12"
                    variants={tabsContainerVariants}
                    initial="hidden"
                    animate="show"
                >
                    <motion.button
                        variants={tabVariants}
                        onClick={() => setSelectedCategory('all')}
                        className={`px-6 py-2 text-sm font-medium transition-colors ${selectedCategory === 'all'
                            ? 'bg-white text-black'
                            : 'bg-black text-white/70 hover:text-white border border-white/20'
                            }`}
                    >
                        All
                    </motion.button>
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            variants={tabVariants}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-6 py-2 text-sm font-medium transition-colors ${selectedCategory === category.id
                                ? 'bg-white text-black'
                                : 'bg-black text-white/70 hover:text-white border border-white/20'
                                }`}
                        >
                            {category.name}
                        </motion.button>
                    ))}
                </motion.div>

                {/* FAQs Grid */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    variants={faqContainerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {filteredFaqs.map((faq) => (
                        <motion.div
                            key={faq.id}
                            variants={faqVariants}
                            className={`border transition-colors ${openFaqId === faq.id ? 'border-white' : 'border-white/20'
                                }`}
                        >
                            <button
                                onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                                className="w-full text-left p-6"
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div className="space-y-2">
                                        <div className="inline-flex px-2 py-1 text-xs font-medium bg-white/5 border border-white/10 text-white/70 rounded">
                                            {faq.category?.name || 'General'}
                                        </div>
                                        <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                                    </div>
                                    <span className="text-2xl text-white/70 flex-shrink-0">
                                        {openFaqId === faq.id ? '−' : '+'}
                                    </span>
                                </div>
                            </button>
                            {openFaqId === faq.id && (
                                <div className="px-6 pb-6">
                                    <div className="text-white/70 whitespace-pre-wrap">{faq.answer}</div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {filteredFaqs.length === 0 && (
                    <p className="text-center text-white/50 italic mt-8">
                        No FAQs found in this category
                    </p>
                )}
            </div>
        </div>
    );
}