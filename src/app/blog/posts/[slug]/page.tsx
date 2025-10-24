import { PostBody } from "@/components/blog/post-body";
import { getPostBySlug } from "@/server-actions/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Image from "next/image";
import MobileBlogHero from "@/components/blog/MobileBlogHero";

export default async function Post(props: Params) {
	const params = await props.params;
	const post = await getPostBySlug(params.slug);

	if (!post) {
		return notFound();
	}

	return (
		<main className="min-h-screen bg-white">
			{/* ************************************************************
								MOBILE HERO
			************************************************************ */}
			<MobileBlogHero
				title={post.title}
				author={post.author}
				created_at={post.created_at || new Date().toISOString()}
				cover_image={post.cover_image}
			/>

			{/* ************************************************************
								DESKTOP HERO SECTION
			************************************************************ */}
			<section className="hidden md:block relative min-h-[70vh] overflow-hidden">
				{/* ************************************************************
									DESKTOP BACKGROUND IMAGE
				************************************************************ */}
				{post.cover_image && (
					<div className="absolute inset-0 flex justify-end">
						<div className="w-2/3 h-full">
							<Image
								src={post.cover_image}
								alt={post.title}
								width={800}
								height={600}
								className="w-full h-full object-cover"
							/>
							{/* ************************************************************
											WHITE GRADIENT OVERLAY ON IMAGE
							************************************************************ */}
							<div className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent" />
						</div>
					</div>
				)}

				{/* ************************************************************
									DESKTOP CONTENT CONTAINER
				************************************************************ */}
				<div className="relative z-10 max-w-7xl mx-auto px-4 py-16 lg:py-24">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center min-h-[60vh]">
						{/* ************************************************************
											LEFT CONTENT (1/3)
						************************************************************ */}
						<div className="lg:col-span-1 space-y-8">
							{/* ************************************************************
												BACK BUTTON
							************************************************************ */}
							<Link
								href="/blog"
								className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-yellow transition-colors duration-300 group"
							>
								<ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" />
								<span className="font-medium">Back to Articles</span>
							</Link>

							{/* ************************************************************
												POST TITLE
							************************************************************ */}
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black leading-tight">
								{post.title}
							</h1>

							{/* ************************************************************
												META INFORMATION
							************************************************************ */}
							<div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 text-brand-black/70">
								<div className="flex items-center gap-2">
									<User className="w-5 h-5" />
									<span className="font-medium text-lg">{post.author}</span>
								</div>
								<div className="flex items-center gap-2">
									<Calendar className="w-5 h-5" />
									<span className="text-lg">{new Date(post.created_at || new Date().toISOString()).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}</span>
								</div>
							</div>

							{/* ************************************************************
												READ TIME BADGE
							************************************************************ */}
							<div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-black px-4 py-2 rounded-full text-sm font-semibold">
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>2 min read</span>
							</div>
						</div>

					</div>
				</div>
			</section>

			{/* ************************************************************
								CONTENT SECTION
			************************************************************ */}
			<article className="max-w-4xl mx-auto px-4 py-16">
				<div className="prose prose-lg max-w-none">
					<PostBody content={post.content || ""} />
				</div>

				{/* ************************************************************
									CLIPARA EMBED
				************************************************************ */}
				<div id="__clipara-embed" style={{ width: "100%" }}></div>
			</article>

			{/* ************************************************************
								FOOTER SECTION
			************************************************************ */}
			<section className="bg-brand-cream/30 border-t border-brand-yellow/20">
				<div className="max-w-4xl mx-auto px-4 py-12">
					<div className="text-center">
						<h3 className="text-2xl font-bold text-brand-black mb-4">
							Enjoyed this article?
						</h3>
						<p className="text-brand-black/70 mb-8">
							Stay updated with our latest insights and tips on novated leasing.
						</p>
						<Link
							href="/blog"
							className="inline-flex items-center gap-2 px-8 py-3 bg-brand-yellow text-brand-black rounded-full font-semibold hover:bg-brand-yellow/80 transition-colors duration-300 shadow-md"
						>
							<span>View All Articles</span>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}

type Params = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
	const params = await props.params;
	const post = await getPostBySlug(params.slug);

	if (!post) {
		return notFound();
	}

	const title = `${post.title}`;

	return {
		title,
		description: post.excerpt,
		openGraph: {
			title,
			description: post.excerpt,
			images: [post.cover_image || ""],
		},
	};
}
