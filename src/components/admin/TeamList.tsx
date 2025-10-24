'use client';

import { TeamMember } from '@/app/types/team';
import LuxeButton from '@/components/core/LuxeButton';

interface TeamListProps {
    members: TeamMember[];
    onEdit: (member: TeamMember) => void;
    onDelete: (id: string) => void;
}

export default function TeamList({ members, onEdit, onDelete }: TeamListProps) {
    return (
        <div className="space-y-6">
            {members.map((member) => (
                <div
                    key={member.id}
                    className="bg-black border border-white/20 p-6 flex items-center justify-between"
                >
                    <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 relative">
                            {member.cover_image ? (
                                <img
                                    src={member.cover_image}
                                    alt={member.title}
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
                            <h3 className="text-xl font-semibold text-white">{member.title}</h3>
                            {member.excerpt && <p className="text-white/70">{member.excerpt}</p>}
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <LuxeButton onClick={() => onEdit(member)}>
                            Edit
                        </LuxeButton>
                        <button
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this team member?')) {
                                    onDelete(member.id);
                                }
                            }}
                            className="px-4 py-2 border border-white/20 text-white hover:border-white"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {members.length === 0 && (
                <div className="text-center py-12 text-white/70">
                    No team members found. Click &quot;Create New Member&quot; to add one.
                </div>
            )}
        </div>
    );
}
