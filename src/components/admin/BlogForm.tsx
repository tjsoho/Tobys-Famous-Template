'use client';

import { useForm } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";
import { useState, } from "react";
import { createSlug } from "@/utils/create-slug";
import { BlogFormData, BlogPost } from "@/app/types/blog";
import { useImageLibrary } from "@/contexts/ImageLibraryContext";
import RichTextEditor from "@/components/core/RichTextEditor";
import LuxeButton from "@/components/core/LuxeButton";

interface BlogFormProps {
    initialData?: BlogPost | null;
    onCancel?: () => void;
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function BlogForm({ initialData, onCancel }: BlogFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>(initialData?.cover_image || "");
    const [submitMessage, setSubmitMessage] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);
    const { openImageLibrary } = useImageLibrary();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm<BlogFormData>({
        defaultValues: {
            title: initialData?.title || "",
            cover_image: initialData?.cover_image || "",
            excerpt: initialData?.excerpt || "",
            author: initialData?.author || "",
            content: initialData?.content || "",
        },
    });

    const title = watch("title");

    const onSubmit = async (data: BlogFormData) => {
        setIsSubmitting(true);
        setSubmitMessage(null);

        try {
            const slug = createSlug(data.title);

            const blogPost: BlogPost = {
                title: data.title,
                cover_image: data.cover_image || undefined,
                excerpt: data.excerpt || undefined,
                author: data.author,
                content: data.content || undefined,
                slug,
            };

            const { error } = initialData
                ? await supabase
                    .from("blogs")
                    .update(blogPost)
                    .eq('id', initialData.id)
                : await supabase
                    .from("blogs")
                    .insert(blogPost);

            if (error) {
                console.error("Error saving blog post:", error);
                setSubmitMessage({
                    type: "error",
                    message: error.message || "Failed to save blog post",
                });
            } else {
                setSubmitMessage({
                    type: "success",
                    message: `Blog post ${initialData ? 'updated' : 'created'} successfully!`,
                });

                if (!initialData) {
                    // Only reset form for new posts
                    reset({
                        title: "",
                        cover_image: "",
                        excerpt: "",
                        author: "",
                        content: "",
                    });
                    setSelectedImage("");
                    setValue("content", "", { shouldDirty: false });
                }

                // Clear success message after 3 seconds
                setTimeout(() => {
                    setSubmitMessage(null);
                    if (initialData && onCancel) {
                        onCancel(); // Return to list view after editing
                    }
                }, 3000);
            }
        } catch (error) {
            console.error("Error saving blog post:", error);
            setSubmitMessage({
                type: "error",
                message: "An unexpected error occurred",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-brand-black mb-6">
                    {initialData ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h2>

                {submitMessage && (
                    <div
                        className={`mb-6 p-4 border rounded-lg ${submitMessage.type === "success"
                            ? "bg-brand-teal/10 border-brand-teal text-brand-teal"
                            : "bg-red-50 border-red-200 text-red-600"
                            }`}
                    >
                        {submitMessage.message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Top Section - Two Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Title & Author */}
                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-brand-black mb-2">
                                    Title *
                                </label>
                                <input
                                    {...register("title", { required: "Title is required" })}
                                    type="text"
                                    id="title"
                                    className="w-full px-3 py-2 bg-white border border-brand-black/20 text-brand-black focus:border-brand-teal focus:outline-none transition-colors rounded-lg"
                                    placeholder="Enter blog post title"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                                )}
                                {title && (
                                    <p className="mt-1 text-sm text-brand-black/60">Slug: {createSlug(title)}</p>
                                )}
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label htmlFor="excerpt" className="block text-sm font-medium text-brand-black mb-2">
                                    Excerpt
                                </label>
                                <textarea
                                    {...register("excerpt")}
                                    id="excerpt"
                                    rows={3}
                                    className="w-full px-3 py-2 bg-white border border-brand-black/20 text-brand-black focus:border-brand-teal focus:outline-none transition-colors rounded-lg"
                                    placeholder="Brief description of the blog post"
                                />
                            </div>
                        </div>

                        {/* Right Column - Author & Cover Image */}
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-brand-black mb-2">
                                    Author *
                                </label>
                                <input
                                    {...register("author", { required: "Author is required" })}
                                    type="text"
                                    id="author"
                                    className="w-full px-3 py-2 bg-white border border-brand-black/20 text-brand-black focus:border-brand-teal focus:outline-none transition-colors rounded-lg"
                                    placeholder="Enter author name"
                                />
                                {errors.author && (
                                    <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
                                )}
                            </div>

                            {/* Cover Image */}
                            <div>
                                <label className="block text-sm font-medium text-brand-black mb-2">
                                    Cover Image
                                </label>
                                <div className="mt-1">
                                    {selectedImage ? (
                                        <div className="relative group rounded-lg overflow-hidden border-2 border-brand-yellow">
                                            <img
                                                src={selectedImage}
                                                alt="Blog cover"
                                                className="w-full h-32 object-cover"
                                            />
                                            <div className="absolute inset-0 bg-brand-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        openImageLibrary((url) => {
                                                            if (url) {
                                                                setSelectedImage(url);
                                                                register("cover_image").onChange({
                                                                    target: { value: url, name: "cover_image" },
                                                                });
                                                            }
                                                        }, "blog-cover");
                                                    }}
                                                    className="px-4 py-2 bg-brand-yellow text-brand-black border border-brand-yellow text-sm font-medium hover:bg-brand-yellow/80 transition-colors rounded-lg"
                                                >
                                                    Change Image
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="w-full h-32 border border-dashed border-brand-yellow flex flex-col items-center justify-center bg-brand-cream/30 hover:border-brand-yellow transition-colors cursor-pointer rounded-lg bg-white hover:cursor-pointer "
                                            onClick={() => {
                                                openImageLibrary((url) => {
                                                    if (url) {
                                                        setSelectedImage(url);
                                                        register("cover_image").onChange({
                                                            target: { value: url, name: "cover_image" },
                                                        });
                                                    }
                                                }, "blog-cover");
                                            }}
                                        >
                                            <svg
                                                className="w-8 h-8 text-brand-black/50 mb-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <button
                                                type="button"
                                                className="text-sm font-medium text-brand-black hover:text-brand-teal"
                                            >
                                                Upload Cover Image
                                            </button>
                                            
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section - Content */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-brand-black mb-2">
                                Content
                            </label>
                            <RichTextEditor
                                content={watch("content") || ""}
                                onChange={(newContent) => {
                                    register("content").onChange({
                                        target: { value: newContent, name: "content" },
                                    });
                                }}
                            />
                        </div>

                        {/* Submit and Cancel Buttons */}
                        <div className="flex justify-end gap-4">
                            {onCancel && (
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="px-6 py-2 border border-brand-black/20 text-brand-black hover:bg-brand-cream/50 transition-colors rounded-full"
                                >
                                    Cancel
                                </button>
                            )}
                            <LuxeButton
                                type="submit"
                                isLoading={isSubmitting}
                                className="bg-brand-teal text-white hover:bg-brand-teal/80 rounded-full"
                            >
                                {initialData ? 'Update Post' : 'Create Post'}
                            </LuxeButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}