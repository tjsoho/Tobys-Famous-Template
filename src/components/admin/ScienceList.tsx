'use client';

import { SciencePost } from '@/app/types/science';
import LuxeButton from '@/components/core/LuxeButton';

interface ScienceListProps {
    posts: SciencePost[];
    onEdit: (post: SciencePost) => void;
    onDelete: (id: string) => void;
}

export default function ScienceList({ posts, onEdit, onDelete }: ScienceListProps) {
    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="bg-black border border-white/20 p-6 flex items-center justify-between"
                >
                    <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 relative">
                            {post.cover_image ? (
                                <img
                                    src={post.cover_image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                            {post.excerpt && (
                                <p className="text-white/70 mt-1 line-clamp-2">{post.excerpt}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <LuxeButton onClick={() => onEdit(post)}>
                            Edit
                        </LuxeButton>
                        <button
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this science post?')) {
                                    onDelete(post.id);
                                }
                            }}
                            className="px-4 py-2 border border-white/20 text-white hover:border-white"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {posts.length === 0 && (
                <div className="text-center py-12 text-white/70">
                    No science posts found. Click &quot;Create New Post&quot; to add one.
                </div>
            )}
        </div>
    );
}
