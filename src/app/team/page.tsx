import { getTeamMembers } from "@/server-actions/team";
import TeamCard from "@/components/team/TeamCard";

export default async function Team() {
    const members = (await getTeamMembers()) || [];

    return (
        <section className="py-16 bg-black min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-white mb-12">STAIT Team</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {members.map((member) => (
                        <TeamCard
                            key={member.id}
                            title={member.title}
                            excerpt={member.excerpt}
                            coverImage={member.cover_image}
                            slug={member.slug}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}