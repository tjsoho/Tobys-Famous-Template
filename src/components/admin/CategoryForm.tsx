'use client';

import { useState } from 'react';
import { createFAQCategory, deleteFAQCategory } from '@/server-actions/faq';
import { FAQCategory } from '@/app/types/faq';
import LuxeButton from '@/components/core/LuxeButton';
import toast from 'react-hot-toast';

interface CategoryFormProps {
    categories: FAQCategory[];
    onSuccess: () => void;
}

export default function CategoryForm({ categories, onSuccess }: CategoryFormProps) {
    const [newCategory, setNewCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        setIsSubmitting(true);
        try {
            await createFAQCategory(newCategory);
            setNewCategory('');
            toast.success('Category created successfully');
            onSuccess();
        } catch (error) {
            console.error('Error creating category:', error);
            toast.error('Failed to create category');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category? All FAQs will be moved to General.')) return;

        try {
            await deleteFAQCategory(id);
            toast.success('Category deleted successfully');
            onSuccess();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Error deleting category:', error);
            if (errorMessage.includes('Cannot delete the General category')) {
                toast.error('Cannot delete the General category');
            } else {
                toast.error('Failed to delete category');
            }
        }
    };

    return (
        <div className="bg-black border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-8">FAQ Categories</h2>

            {/* Create Category Form */}
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter new category name"
                        className="flex-1 px-4 py-2 bg-black border border-white/20 text-white focus:border-white focus:outline-none"
                    />
                    <LuxeButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Category'}
                    </LuxeButton>
                </div>
            </form>

            {/* Categories List */}
            <div className="space-y-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="flex items-center justify-between p-4 border border-white/20"
                    >
                        <span className="text-white">{category.name}</span>
                        {category.id !== '00000000-0000-0000-0000-000000000000' && (
                            <button
                                onClick={() => handleDelete(category.id)}
                                className="text-red-500 hover:text-red-400"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
