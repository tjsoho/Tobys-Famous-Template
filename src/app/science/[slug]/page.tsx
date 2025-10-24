import { getSciencePostBySlug } from "@/server-actions/science";
import Link from "next/link";
import LuxeButton from "@/components/core/LuxeButton";
import { ScienceHeader } from "@/components/science/ScienceHeader";

interface SciencePostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function SciencePostPage({
	params,
}: SciencePostPageProps) {
	const { slug } = await params;
	const post = await getSciencePostBySlug(slug);

	if (!post) {
		return (
			<div className="min-h-screen bg-black text-white flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">Science Post Not Found</h1>
					<Link href="/science">
						<LuxeButton>Back to Science</LuxeButton>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<main className="min-h-screen bg-black text-white">
			<ScienceHeader
				title={post.title}
				coverImage={post.cover_image}
				excerpt={post.excerpt}
			/>

			<div className="max-w-4xl mx-auto px-4 py-16">
				<article className="prose prose-invert prose-lg mx-auto [&_p]:mb-6 [&_a]:block [&_a]:mb-6">
					<div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
				</article>
				<div id="__clipara-embed" style={{ width: "100%" }}></div>
				<div className="mt-16 text-center">
					<Link href="/science">
						<LuxeButton>Back to STAIT SCIENCE</LuxeButton>
					</Link>
				</div>
			</div>
		</main>
	);
}
