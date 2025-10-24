'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FAQ, FAQCategory } from '@/app/types/faq';
import { createFAQ, updateFAQ } from '@/server-actions/faq';
import LuxeButton from '@/components/core/LuxeButton';
import toast from 'react-hot-toast';

interface FAQFormProps {
    categories: FAQCategory[];
    initialData?: FAQ | null;
    onSuccess: () => void;
}

export default function FAQForm({ categories, initialData, onSuccess }: FAQFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FAQ>({
        defaultValues: initialData || {
            question: '',
            answer: '',
            category_id: '00000000-0000-0000-0000-000000000000' // Default to General
        }
    });

    const onSubmit = async (data: FAQ) => {
        setIsSubmitting(true);
        try {
            if (initialData) {
                await updateFAQ(initialData.id, data);
                toast.success('FAQ updated successfully!');
            } else {
                await createFAQ(data);
                toast.success('FAQ created successfully!');
                reset();
            }
            onSuccess();
        } catch (error) {
            console.error('Error saving FAQ:', error);
            toast.error('Failed to save FAQ');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-black border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-8">
                {initialData ? 'Edit FAQ' : 'Create New FAQ'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Category Selection */}
                <div>
                    <label className="block text-sm font-medium text-white mb-2">
                        Category
                    </label>
                    <select
                        {...register("category_id")}
                        className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:border-white focus:outline-none"
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Question */}
                <div>
                    <label className="block text-sm font-medium text-white mb-2">
                        Question
                    </label>
                    <input
                        type="text"
                        {...register("question", { required: "Question is required" })}
                        className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:border-white focus:outline-none"
                    />
                    {errors.question && (
                        <p className="mt-1 text-sm text-red-600">{errors.question.message}</p>
                    )}
                </div>

                {/* Answer */}
                <div>
                    <label className="block text-sm font-medium text-white mb-2">
                        Answer
                    </label>
                    <textarea
                        {...register("answer", { required: "Answer is required" })}
                        rows={6}
                        className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:border-white focus:outline-none"
                    />
                    {errors.answer && (
                        <p className="mt-1 text-sm text-red-600">{errors.answer.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <LuxeButton
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : initialData ? 'Update FAQ' : 'Create FAQ'}
                    </LuxeButton>
                </div>
            </form>
        </div>
    );
}