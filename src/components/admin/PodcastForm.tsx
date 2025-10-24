'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import LuxeButton from '@/components/core/LuxeButton';
import toast from 'react-hot-toast';
import { createPodcast } from '@/server-actions/podcast';

interface PodcastFormProps {
    onSuccess?: () => void;
}

interface PodcastFormData {
    podcasts: Array<{
        title: string;
        link: string;
    }>;
}

export default function PodcastForm({ onSuccess }: PodcastFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, control, handleSubmit, reset } = useForm<PodcastFormData>({
        defaultValues: {
            podcasts: [{ title: '', link: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "podcasts"
    });

    const onSubmit = async (data: PodcastFormData) => {
        setIsSubmitting(true);
        try {
            // Submit each podcast
            await Promise.all(data.podcasts.map(podcast => createPodcast(podcast)));

            toast.success('Podcasts added successfully!', {
                style: {
                    background: '#000',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                },
                icon: '🎙️',
            });

            reset({ podcasts: [{ title: '', link: '' }] });
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Error creating podcasts:', error);
            toast.error('Failed to add podcasts', {
                style: {
                    background: '#000',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                },
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-black border border-white/20 p-8">
                <h1 className="text-3xl font-bold text-white mb-8">Add New Podcasts</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-start">
                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        Title *
                                    </label>
                                    <input
                                        {...register(`podcasts.${index}.title` as const, { required: true })}
                                        type="text"
                                        className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:border-white focus:outline-none transition-colors"
                                        placeholder="Enter podcast title"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        Link *
                                    </label>
                                    <input
                                        {...register(`podcasts.${index}.link` as const, { required: true })}
                                        type="url"
                                        className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:border-white focus:outline-none transition-colors"
                                        placeholder="Enter podcast link"
                                    />
                                </div>
                            </div>
                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="mt-8 px-3 py-2 text-white/70 hover:text-white transition-colors"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => append({ title: '', link: '' })}
                            className="text-white/70 hover:text-white transition-colors"
                        >
                            + Add Another Podcast
                        </button>
                        <LuxeButton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Adding...' : 'Add Podcasts'}
                        </LuxeButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
