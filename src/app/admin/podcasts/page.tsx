'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Podcast } from '@/app/types/podcast';
import PodcastForm from '@/components/admin/PodcastForm';
import PodcastList from '@/components/admin/PodcastList';
import LuxeButton from '@/components/core/LuxeButton';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PodcastAdminPage() {
    const [showList, setShowList] = useState(false);
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPodcasts = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('podcasts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching podcasts:', error);
        } else {
            setPodcasts(data || []);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (showList) {
            fetchPodcasts();
        }
    }, [showList]);

    const handleEdit = (podcast: Podcast) => {
        setSelectedPodcast(podcast);
        setShowList(false);
    };

    const handleDelete = async (id: string) => {
        setPodcasts(podcasts.filter(podcast => podcast.id !== id));
    };

    return (
        <div className="min-h-screen bg-black py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        {showList ? 'Manage Podcasts' : selectedPodcast ? 'Edit Podcast' : 'Add New Podcasts'}
                    </h1>
                    <LuxeButton
                        onClick={() => {
                            setShowList(!showList);
                            setSelectedPodcast(null);
                        }}
                    >
                        {showList ? 'Add New Podcasts' : 'View All Podcasts'}
                    </LuxeButton>
                </div>

                {showList ? (
                    isLoading ? (
                        <div className="text-white text-center py-12">Loading podcasts...</div>
                    ) : (
                        <PodcastList
                            podcasts={podcasts}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )
                ) : (
                    <PodcastForm
                        onSuccess={() => {
                            setShowList(true);
                        }}
                    />
                )}
            </div>
        </div>
    );
}
