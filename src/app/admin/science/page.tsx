'use client';

import { useState, useEffect } from 'react';
import { SciencePost } from "@/app/types/science";
import LuxeButton from "@/components/core/LuxeButton";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";
import ScienceForm from "@/components/admin/ScienceForm";
import ScienceList from "@/components/admin/ScienceList";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ScienceAdminPage() {
    const [showList, setShowList] = useState(false);
    const [posts, setPosts] = useState<SciencePost[]>([]);
    const [selectedPost, setSelectedPost] = useState<SciencePost | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPosts = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('science')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching science posts:', error);
        } else {
            setPosts(data || []);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (showList) {
            fetchPosts();
        }
    }, [showList]);

    const handleEdit = (post: SciencePost) => {
        setSelectedPost(post);
        setShowList(false);
    };

    const handleDelete = async (id: string) => {
        const { error } = await supabase
            .from('science')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting science post:', error);
        } else {
            fetchPosts();
        }
    };

    return (
        <ImageLibraryProvider>
            <div className="min-h-screen bg-black py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-white">
                            {showList ? 'Manage Stait Science' : selectedPost ? 'Edit Science Post' : 'Create New Science Post'}
                        </h1>
                        <LuxeButton
                            onClick={() => {
                                setShowList(!showList);
                                setSelectedPost(null);
                            }}
                        >
                            {showList ? 'Create New Post' : 'View All Posts'}
                        </LuxeButton>
                    </div>

                    {showList ? (
                        isLoading ? (
                            <div className="text-white text-center py-12">Loading posts...</div>
                        ) : (
                            <ScienceList
                                posts={posts}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        )
                    ) : (
                        <ScienceForm
                            key={selectedPost?.id || 'new'}
                            initialData={selectedPost}
                            onCancel={() => {
                                setSelectedPost(null);
                                setShowList(true);
                            }}
                        />
                    )}
                </div>
            </div>
        </ImageLibraryProvider>
    );
}
