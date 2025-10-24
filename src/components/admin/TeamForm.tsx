'use client';

import { useForm } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { createSlug } from "@/utils/create-slug";
import { TeamMember } from "@/app/types/team";
import { useImageLibrary } from "@/contexts/ImageLibraryContext";
import RichTextEditor from "@/components/core/RichTextEditor";
import LuxeButton from "@/components/core/LuxeButton";
import toast from "react-hot-toast";

interface TeamFormProps {
    initialData?: TeamMember | null;
    onCancel?: () => void;
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TeamForm({ initialData, onCancel }: TeamFormProps) {
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
    } = useForm<TeamMember>({
        defaultValues: {
            title: initialData?.title || "",
            cover_image: initialData?.cover_image || "",
            excerpt: initialData?.excerpt || "",
            content: initialData?.content || "",
        },
    });

    const title = watch("title");

    const onSubmit = async (data: Partial<TeamMember>) => {
        setIsSubmitting(true);

        try {
            const slug = createSlug(data.title || "");

            console.log('Form data:', data);
            console.log('Selected image:', selectedImage);

            const teamMember = {
                title: data.title,
                cover_image: selectedImage || data.cover_image,
                excerpt: data.excerpt,
                content: data.content,
                slug,
            };

            const { error } = initialData
                ? await supabase
                    .from("team")
                    .update(teamMember)
                    .eq('id', initialData.id)
                : await supabase
                    .from("team")
                    .insert(teamMember);

            if (error) {
                console.error("Error saving team member:", error);
                toast.error(error.message || "Failed to save team member", {
                    style: {
                        background: '#000',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                    },
                });
            } else {
                const successMessage = `Team member ${initialData ? 'updated' : 'created'} successfully!`;
                toast.success(successMessage, {
                    style: {
                        background: '#000',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                    },
                    icon: '✨',
                });

                if (!initialData) {
                    // Only reset form for new members
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
                    onCancel(); // Return to list view after editing
                }
            }
        } catch (error) {
            console.error("Error saving team member:", error);
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
                    {initialData ? 'Edit Team Member' : 'Create New Team Member'}
                </h1>


                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Top Section - Two Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Title & Excerpt */}
                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                                    Name *
                                </label>
                                <input
                                    {...register("title", { required: "Name is required" })}
                                    type="text"
                                    id="title"
                                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:border-white focus:outline-none transition-colors"
                                    placeholder="Enter team member name"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                                )}
                                {title && (
                                    <p className="mt-1 text-sm text-white/50">Slug: {createSlug(title)}</p>
                                )}
                            </div>

                            {/* Excerpt */}
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

                        {/* Right Column - Profile Image */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Profile Image
                            </label>
                            <div className="mt-1">
                                {selectedImage ? (
                                    <div className="relative group">
                                        <img
                                            src={selectedImage}
                                            alt="Profile"
                                            className="w-40 h-40 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    openImageLibrary((url) => {
                                                        if (url) {
                                                            console.log('Selected image URL:', url);
                                                            setSelectedImage(url);
                                                            setValue("cover_image", url, { shouldDirty: true });
                                                        }
                                                    }, "team-profile");
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
                                                    console.log('Selected image URL:', url);
                                                    setSelectedImage(url);
                                                    setValue("cover_image", url, { shouldDirty: true });
                                                }
                                            }, "team-profile");
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
                                            Upload Photo
                                        </button>
                                        <p className="text-xs text-white/50 mt-1">
                                            Square image recommended
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section - Content */}
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

                        {/* Submit and Cancel Buttons */}
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
                                        ? 'Update Team Member'
                                        : 'Create Team Member'}
                            </LuxeButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}