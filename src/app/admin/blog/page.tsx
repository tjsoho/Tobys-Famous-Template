'use client';

import { useState, useEffect } from 'react';
import BlogForm from "@/components/admin/BlogForm";
import BlogList from "@/components/admin/BlogList";
import { createClient } from "@supabase/supabase-js";
import { BlogPost } from "@/app/types/blog";
import LuxeButton from "@/components/core/LuxeButton";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function BlogAdminPage() {
  const [showList, setShowList] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
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

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setShowList(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
    } else {
      fetchPosts();
    }
  };

  return (
    <ImageLibraryProvider>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* ************************************************************
                              HEADER SECTION
          ************************************************************ */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-brand-black mb-2">
                {showList ? 'Manage Blog Posts' : selectedPost ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h1>
              <p className="text-brand-black/70">
                {showList ? 'View and manage all your blog articles' : 'Create engaging content for your audience'}
              </p>
            </div>
            <div className="flex gap-4">
            <LuxeButton
              onClick={() => {
                setShowList(!showList);
                setSelectedPost(null);
              }}
              className="bg-brand-yellow text-brand-black hover:bg-brand-yellow/80 rounded-full"
            >
              {showList ? 'Create New Post' : 'View All Posts'}
            </LuxeButton>
            <Link href="/admin">
              <LuxeButton className="bg-brand-yellow text-brand-black hover:bg-brand-yellow/80 rounded-full">
                  Back To Admin
                </LuxeButton>
              </Link>
            </div>
          </div>

          {/* ************************************************************
                              CONTENT SECTION
          ************************************************************ */}
          {showList ? (
            isLoading ? (
              <div className="bg-brand-cream/30 border border-brand-yellow/20 rounded-2xl p-12 text-center">
                <div className="text-brand-black/70 text-lg">Loading posts...</div>
              </div>
            ) : (
              <BlogList
                posts={posts}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )
          ) : (
            <BlogForm
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