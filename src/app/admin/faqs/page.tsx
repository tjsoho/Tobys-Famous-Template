'use client';

import { useEffect, useState } from 'react';
import { FAQ, FAQCategory } from '@/app/types/faq';
import { getFAQs, getFAQCategories, deleteFAQ } from '@/server-actions/faq';
import CategoryForm from '@/components/admin/CategoryForm';
import FAQForm from '@/components/admin/FAQForm';
import toast from 'react-hot-toast';

export default function FAQAdminPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [categories, setCategories] = useState<FAQCategory[]>([]);
    const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
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

            setFaqs(faqsData);
            setCategories(sortedCategories);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to load data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this FAQ?')) return;

        try {
            await deleteFAQ(id);
            toast.success('FAQ deleted successfully');
            fetchData();
        } catch (error) {
            console.error('Error deleting FAQ:', error);
            toast.error('Failed to delete FAQ');
        }
    };

    // Group FAQs by category
    const faqsByCategory = categories.map(category => ({
        ...category,
        faqs: faqs.filter(faq => faq.category_id === category.id)
    }));

    if (isLoading) {
        return <div className="p-8 text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-6xl mx-auto px-8 py-16">
                <h1 className="text-6xl font-bold text-white mb-16 tracking-tight">
                    FAQ Management
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Categories */}
                    <div>
                        <CategoryForm
                            categories={categories}
                            onSuccess={fetchData}
                        />
                    </div>

                    {/* Right Column - FAQ Form */}
                    <div>
                        <FAQForm
                            categories={categories}
                            initialData={editingFaq}
                            onSuccess={() => {
                                fetchData();
                                setEditingFaq(null);
                            }}
                        />
                    </div>
                </div>

                {/* FAQs List */}
                <div className="mt-16 space-y-12">
                    {faqsByCategory.map((category) => (
                        <div key={category.id}>
                            <h2 className="text-2xl font-bold text-white mb-8">{category.name}</h2>
                            <div className="space-y-6">
                                {category.faqs.map((faq) => (
                                    <div
                                        key={faq.id}
                                        className="bg-black border border-white/20 p-6"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="space-y-4">
                                                <h3 className="text-white font-medium">{faq.question}</h3>
                                                <div className="text-white/70 whitespace-pre-wrap">{faq.answer}</div>
                                            </div>
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => setEditingFaq(faq)}
                                                    className="text-blue-500 hover:text-blue-400"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(faq.id)}
                                                    className="text-red-500 hover:text-red-400"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {category.faqs.length === 0 && (
                                    <p className="text-white/50 italic">No FAQs in this category</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}