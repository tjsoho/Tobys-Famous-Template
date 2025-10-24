'use client';

import { Podcast } from "@/app/types/podcast";
import { deletePodcast } from "@/server-actions/podcast";
import toast from "react-hot-toast";

interface PodcastListProps {
    podcasts: Podcast[];
    onEdit: (podcast: Podcast) => void;
    onDelete: (id: string) => void;
}

export default function PodcastList({ podcasts, onEdit, onDelete }: PodcastListProps) {
    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this podcast?')) return;

        try {
            await deletePodcast(id);
            onDelete(id);
            toast.success('Podcast deleted successfully!', {
                style: {
                    background: '#000',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                },
            });
        } catch (error) {
            console.error('Error deleting podcast:', error);
            toast.error('Failed to delete podcast', {
                style: {
                    background: '#000',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                },
            });
        }
    };

    return (
        <div className="space-y-4">
            {podcasts.map((podcast) => (
                <div
                    key={podcast.id}
                    className="bg-black border border-white/20 p-4 flex items-center justify-between"
                >
                    <div>
                        <h3 className="text-white font-medium">{podcast.title}</h3>
                        <a
                            href={podcast.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                            {podcast.link}
                        </a>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(podcast)}
                            className="px-3 py-1 text-white/70 hover:text-white transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(podcast.id)}
                            className="px-3 py-1 text-white/70 hover:text-white transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
