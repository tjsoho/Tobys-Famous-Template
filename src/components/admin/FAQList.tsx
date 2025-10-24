'use client';

import { FAQ, FAQCategory } from "@/app/types/faq";
import { deleteFAQ, deleteFAQCategory } from "@/server-actions/faq";
import toast from "react-hot-toast";

interface FAQListProps {
    faqs: FAQ[];
    categories: FAQCategory[];
    onEdit: (faq: FAQ) => void;
    onDelete: (id: string) => void;
    onCategoryDelete: (id: string) => void;
}

export default function FAQList({ faqs, categories, onEdit, onDelete, onCategoryDelete }: FAQListProps) {
    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this FAQ?')) return;

        try {
            await deleteFAQ(id);
            onDelete(id);
            toast.success('FAQ deleted successfully!', {
                style: {
                    background: '#000',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                },
            });
        } catch (error) {
            console.error('Error deleting FAQ:', error);
            toast.error('Failed to delete FAQ', {
                style: {
                    background: '#000',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                },
            });
        }
    };

    const handleCategoryDelete = async (categoryId: string) => {
        if (!confirm('Are you sure you want to delete this category and all its FAQs?')) return;

        try {
            await deleteFAQCategory(categoryId);
            onCategoryDelete(categoryId);
            toast.success('Category deleted successfully!', {
                style: {
                    background: '#000',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                },
            });
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Failed to delete category', {
                style: {
                    background: '#000',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                },
            });
        }
    };

    // Group FAQs by category
    const faqsByCategory = categories.map(category => ({
        ...category,
        faqs: faqs.filter(faq => faq.category_id === category.id)
    }));

    return (
        <div className="space-y-8">
            {faqsByCategory.map((category) => (
                <div key={category.id} className="bg-black border border-white/20 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white">{category.name}</h2>
                        <button
                            onClick={() => handleCategoryDelete(category.id)}
                            className="text-white/70 hover:text-white transition-colors"
                        >
                            Delete Category
                        </button>
                    </div>
                    <div className="space-y-4">
                        {category.faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-white font-medium">{faq.question}</h3>
                                        <div className="text-white/70 mt-1 whitespace-pre-wrap">{faq.answer}</div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => onEdit(faq)}
                                            className="text-white/70 hover:text-white transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(faq.id)}
                                            className="text-white/70 hover:text-white transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {category.faqs.length === 0 && (
                            <p className="text-white/50 text-center py-4">No FAQs in this category</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
