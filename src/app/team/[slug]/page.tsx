import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import LuxeButton from "@/components/core/LuxeButton";
import { TeamHeader } from "@/components/team/TeamHeader";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

interface TeamMemberPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
	const { slug } = await params;
	const { data: member } = await supabase
		.from("team")
		.select("*")
		.eq("slug", slug)
		.single();

	if (!member) {
		return (
			<div className="min-h-screen bg-black text-white flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">Team Member Not Found</h1>
					<Link href="/team">
						<LuxeButton>Back to Team</LuxeButton>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<main className="min-h-screen bg-black text-white">
			<TeamHeader
				title={member.title}
				coverImage={member.cover_image}
				excerpt={member.excerpt}
			/>

			{/* Content Section */}
			<div className="max-w-4xl mx-auto px-4 py-16">
				<article className="prose prose-invert prose-lg mx-auto">
					<div dangerouslySetInnerHTML={{ __html: member.content || "" }} />
				</article>
				<div id="__clipara-embed" style={{ width: "100%" }}></div>
				{/* Back Button */}
				<div className="mt-16 text-center">
					<Link href="/team">
						<LuxeButton>Back to STAIT TEAM</LuxeButton>
					</Link>
				</div>
			</div>
		</main>
	);
}
