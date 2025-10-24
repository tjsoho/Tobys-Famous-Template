'use client';


import { BlogPost } from '@/app/types/blog';
import Image from 'next/image';
import LuxeButton from '@/components/core/LuxeButton';

interface BlogListProps {
    posts: BlogPost[];
    onEdit: (post: BlogPost) => void;
    onDelete: (id: string) => void;
}

export default function BlogList({ posts, onEdit, onDelete }: BlogListProps) {
    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <div key={post.id} className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start gap-6">
                        {post.cover_image && (
                            <div className="relative w-48 aspect-[16/9] rounded-lg overflow-hidden border-2 border-brand-yellow">
                                <Image
                                    src={post.cover_image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-brand-black mb-2">{post.title}</h3>
                            {post.excerpt && (
                                <p className="text-brand-black/70 mb-4 line-clamp-2">{post.excerpt}</p>
                            )}
                            <div className="flex items-center justify-between text-sm text-brand-black/60 mb-4">
                                <span className="font-medium">{post.author}</span>
                                <span>{new Date(post.created_at || '').toLocaleDateString()}</span>
                            </div>
                            <div className="flex gap-4">
                                <LuxeButton
                                    onClick={() => onEdit(post)}
                                    className="!px-4 !py-2 text-sm bg-brand-teal text-white hover:bg-brand-teal/80"
                                >
                                    Edit Post
                                </LuxeButton>
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this post?')) {
                                            if (post.id) onDelete(post.id);
                                        }
                                    }}
                                    className="px-4 py-2 text-sm text-red-600 border border-red-200 hover:bg-red-50 transition-colors rounded-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
