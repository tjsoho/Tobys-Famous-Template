'use client';

import { useForm } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { createSlug } from "@/utils/create-slug";
import { SciencePost } from "@/app/types/science";
import { useImageLibrary } from "@/contexts/ImageLibraryContext";
import RichTextEditor from "@/components/core/RichTextEditor";
import LuxeButton from "@/components/core/LuxeButton";
import toast from "react-hot-toast";

interface ScienceFormProps {
    initialData?: SciencePost | null;
    onCancel?: () => void;
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ScienceForm({ initialData, onCancel }: ScienceFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>(initialData?.cover_image || "");
    const { openImageLibrary } = useImageLibrary();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm<SciencePost>({
        defaultValues: {
            title: initialData?.title || "",
            cover_image: initialData?.cover_image || "",
            excerpt: initialData?.excerpt || "",
            content: initialData?.content || "",
        },
    });

    const title = watch("title");

    const onSubmit = async (data: Partial<SciencePost>) => {
        setIsSubmitting(true);

        try {
            const slug = createSlug(data.title || "");

            const sciencePost = {
                title: data.title,
                cover_image: selectedImage,
                excerpt: data.excerpt,
                content: data.content,
                slug,
            };

            const { error } = initialData
                ? await supabase
                    .from("science")
                    .update(sciencePost)
                    .eq('id', initialData.id)
                : await supabase
                    .from("science")
                    .insert([sciencePost]);

            if (error) {
                console.error("Error saving science post:", error);
                toast.error(error.message || "Failed to save science post", {
                    style: {
                        background: '#000',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                    },
                });
            } else {
                const successMessage = `Science post ${initialData ? 'updated' : 'created'} successfully!`;
                toast.success(successMessage, {
                    style: {
                        background: '#000',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                    },
                    icon: '✨',
                });

                if (!initialData) {
                    reset({
                        title: "",
                        cover_image: "",
                        excerpt: "",
                        content: "",
                    });
                    setSelectedImage("");
                    setValue("content", "", { shouldDirty: false });
                }

                if (initialData && onCancel) {
                    onCancel();
                }
            }
        } catch (error) {
            console.error("Error saving science post:", error);
            toast.error("An unexpected error occurred", {
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
                <h1 className="text-3xl font-bold text-white mb-8">
                    {initialData ? 'Edit Science Post' : 'Create New Science Post'}
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                                    Title *
                                </label>
                                <input
                                    {...register("title", { required: "Title is required" })}
                                    type="text"
                                    id="title"
                                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:border-white focus:outline-none transition-colors"
                                    placeholder="Enter post title"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                                )}
                                {title && (
                                    <p className="mt-1 text-sm text-white/50">Slug: {createSlug(title)}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="excerpt" className="block text-sm font-medium text-white mb-2">
                                    Excerpt
                                </label>
                                <textarea
                                    {...register("excerpt")}
                                    id="excerpt"
                                    rows={3}
                                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:border-white focus:outline-none transition-colors"
                                    placeholder="Brief description"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Cover Image
                            </label>
                            <div className="mt-1">
                                {selectedImage ? (
                                    <div className="relative group">
                                        <img
                                            src={selectedImage}
                                            alt="Cover"
                                            className="w-40 h-40 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    openImageLibrary((url) => {
                                                        if (url) {
                                                            setSelectedImage(url);
                                                            setValue("cover_image", url);
                                                        }
                                                    }, "science-cover");
                                                }}
                                                className="px-4 py-2 bg-black text-white border border-white/20 text-sm font-medium hover:border-white transition-colors"
                                            >
                                                Change Image
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="w-48 h-48 border border-dashed border-white/20 flex flex-col items-center justify-center bg-black hover:border-white transition-colors cursor-pointer text-center p-4"
                                        onClick={() => {
                                            openImageLibrary((url) => {
                                                if (url) {
                                                    setSelectedImage(url);
                                                    setValue("cover_image", url);
                                                }
                                            }, "science-cover");
                                        }}
                                    >
                                        <svg
                                            className="w-8 h-8 text-white/50 mb-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <button
                                            type="button"
                                            className="text-sm font-medium text-white hover:text-white/80"
                                        >
                                            Upload Cover Image
                                        </button>
                                        <p className="text-xs text-white/50 mt-1">
                                            Square image recommended
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-white mb-2">
                                Content
                            </label>
                            <RichTextEditor
                                content={watch("content") || ""}
                                onChange={(newContent) => {
                                    setValue("content", newContent);
                                }}
                                className="h-[500px]"
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            {onCancel && (
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="px-6 py-2 border border-white/20 text-white hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                            <LuxeButton
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? 'Saving...'
                                    : initialData
                                        ? 'Update Science Post'
                                        : 'Create Science Post'}
                            </LuxeButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
