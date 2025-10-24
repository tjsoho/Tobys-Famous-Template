'use client';

import { useState, useEffect } from 'react';
import TeamForm from "@/components/admin/TeamForm";
import TeamList from "@/components/admin/TeamList";
import { createClient } from "@supabase/supabase-js";
import { TeamMember } from "@/app/types/team";
import LuxeButton from "@/components/core/LuxeButton";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TeamAdminPage() {
    const [showList, setShowList] = useState(false);
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMembers = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('team')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching team members:', error);
        } else {
            setMembers(data || []);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (showList) {
            fetchMembers();
        }
    }, [showList]);

    const handleEdit = (member: TeamMember) => {
        setSelectedMember(member);
        setShowList(false);
    };

    const handleDelete = async (id: string) => {
        const { error } = await supabase
            .from('team')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting team member:', error);
        } else {
            fetchMembers();
        }
    };

    return (
        <ImageLibraryProvider>
            <div className="min-h-screen bg-black py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-white">
                            {showList ? 'Manage Team Members' : selectedMember ? 'Edit Team Member' : 'Create New Team Member'}
                        </h1>
                        <LuxeButton
                            onClick={() => {
                                setShowList(!showList);
                                setSelectedMember(null);
                            }}
                        >
                            {showList ? 'Create New Member' : 'View All Members'}
                        </LuxeButton>
                    </div>

                    {showList ? (
                        isLoading ? (
                            <div className="text-white text-center py-12">Loading team members...</div>
                        ) : (
                            <TeamList
                                members={members}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        )
                    ) : (
                        <TeamForm
                            key={selectedMember?.id || 'new'}
                            initialData={selectedMember}
                            onCancel={() => {
                                setSelectedMember(null);
                                setShowList(true);
                            }}
                        />
                    )}
                </div>
            </div>
        </ImageLibraryProvider>
    );
}