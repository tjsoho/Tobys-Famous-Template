"use client";

import { SaveBanner } from "@/components/core/save-banner";
import { useState } from "react";
import { EditableElement } from "@/components/core/input";
import EditableImage from "@/components/core/editable-image";
import { AboutUsPageContent, AboutUsPageProps } from "@/app/about-us/_config";
import useUpdatePage from "@/utils/hooks/useUpdatePage";

export default function AboutUsAdminInputs(props: AboutUsPageProps) {
	const [titleHero, setTitleHero] = useState(props.content.title);
	const [youtubeVideoId, setYoutubeVideoId] = useState(props.content.youtubeVideoId || "");
	const [heroImage, setHeroImage] = useState(props.content.heroImage || "/placeholder.jpg");
	const [ourStoryParagraph, setOurStoryParagraph] = useState(
		props.content.ourStoryParagraph,
	);
	const [AboutUsbuttonText, setAboutUsbuttonText] = useState(
		props.content.AboutUsbuttonText,
	);
	const [tab1title, setTab1title] = useState(props.content.tab1title);
	const [tab1content, setTab1content] = useState(props.content.tab1content);
	const [tab1image, setTab1image] = useState(props.content.tab1image || "/placeholder.jpg");
	const [tab2title, setTab2title] = useState(props.content.tab2title);
	const [tab2content, setTab2content] = useState(props.content.tab2content);
	const [tab2image, setTab2image] = useState(props.content.tab2image || "/placeholder.jpg");
	const [tab3title, setTab3title] = useState(props.content.tab3title);
	const [tab3content, setTab3content] = useState(props.content.tab3content);
	const [tab3image, setTab3image] = useState(props.content.tab3image || "/placeholder.jpg");
	const [tab4title, setTab4title] = useState(props.content.tab4title);
	const [tab4content, setTab4content] = useState(props.content.tab4content);
	const [tab4image, setTab4image] = useState(props.content.tab4image || "/placeholder.jpg");
	const [tab5title, setTab5title] = useState(props.content.tab5title);
	const [tab5content, setTab5content] = useState(props.content.tab5content);
	const [tab5image, setTab5image] = useState(props.content.tab5image || "/placeholder.jpg");

	const { isSaving, updatePage } =
		useUpdatePage<AboutUsPageContent>("about-us");

	const handleSave = async () => {
		await updatePage({
			...props,

			content: {
				youtubeVideoId,
				title: titleHero,
				heroImage,
				ourStoryParagraph,
				AboutUsbuttonText,
				tab1title,
				tab1content,
				tab1image,
				tab2title,
				tab2content,
				tab2image,
				tab3title,
				tab3content,
				tab3image,
				tab4title,
				tab4content,
				tab4image,
				tab5title,
				tab5content,
				tab5image,
			},
		});
	};

	return (
		<div>
			<SaveBanner
				pageTitle={"About Page"}
				onSave={handleSave}
				isSaving={isSaving}
			/>
			<div className="min-h-screen bg-black">
				<div className="max-w-6xl mx-auto px-8 py-16">
					{/* ************************** Header Section **************************/}

					<header className="mb-16">
						<h1 className="text-6xl font-bold text-white mb-8 tracking-tight">
							About Us
						</h1>
					</header>

					{/* ***************************************************************
					   HERO SECTION
					****************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">Hero Section</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{/* ************************** Hero Image **************************/}
							<div className="space-y-4">
								<label className="block text-white text-sm font-medium mb-2">
									Hero Image
								</label>
								<div className="bg-gray-800 rounded-lg overflow-hidden">
									<EditableImage
										src={heroImage}
										alt="About Us Hero"
										width={1920}
										height={1080}
										className="w-full h-auto object-contain hover:opacity-90 transition-opacity"
										onImageChange={setHeroImage}
										usage="about-hero"
									/>
								</div>
								<p className="text-gray-400 text-xs">Click image to change. Recommended size: 1920x1080px</p>
							</div>

							{/* ************************** Text Content **************************/}
							<div className="space-y-6">
								<div>
									<label className="block text-white text-sm font-medium mb-2">
										Hero Title
									</label>
									<EditableElement
										as="input"
										className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={titleHero}
										onTextChange={setTitleHero}
									/>
								</div>

								<div>
									<label className="block text-white text-sm font-medium mb-2">
										Story Content
									</label>
									<EditableElement
										as="textarea"
										className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={ourStoryParagraph}
										onTextChange={setOurStoryParagraph}
									/>
								</div>

								<div>
									<label className="block text-white text-sm font-medium mb-2">
										Button Text
									</label>
									<EditableElement
										as="input"
										className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={AboutUsbuttonText}
										onTextChange={setAboutUsbuttonText}
									/>
								</div>
							</div>
						</div>
					</section>



					{/* ***************************************************************
					   TABS SECTION
					****************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">Content Tabs</h2>
						<div className="space-y-8">
							{[
								{
									title: tab1title, setTitle: setTab1title,
									content: tab1content, setContent: setTab1content,
									image: tab1image, setImage: setTab1image
								},
								{
									title: tab2title, setTitle: setTab2title,
									content: tab2content, setContent: setTab2content,
									image: tab2image, setImage: setTab2image
								},
								{
									title: tab3title, setTitle: setTab3title,
									content: tab3content, setContent: setTab3content,
									image: tab3image, setImage: setTab3image
								},
								{
									title: tab4title, setTitle: setTab4title,
									content: tab4content, setContent: setTab4content,
									image: tab4image, setImage: setTab4image
								},
								{
									title: tab5title, setTitle: setTab5title,
									content: tab5content, setContent: setTab5content,
									image: tab5image, setImage: setTab5image
								},
							].map((tab, index) => (
								<div key={index} className="space-y-4 bg-gray-800 rounded-lg p-6">
									<div className="grid grid-cols-[1fr,120px] gap-4 items-start">
										<div>
											<label className="block text-white text-sm font-medium mb-2">
												Tab {index + 1} Title
											</label>
											<EditableElement
												as="input"
												className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
												defaultValue={tab.title}
												onTextChange={tab.setTitle}
											/>
										</div>
										<div>
											<label className="block text-white text-sm font-medium mb-2">
												Icon
											</label>
											<div className="bg-gray-800 rounded-lg overflow-hidden">
												<EditableImage
													src={tab.image}
													alt={`Tab ${index + 1} icon`}
													width={120}
													height={120}
													className="w-[120px] h-[120px] object-contain hover:opacity-90 transition-opacity"
													onImageChange={tab.setImage}
													usage={`tab-${index + 1}-icon`}
												/>
											</div>
										</div>
									</div>
									<div>
										<label className="block text-white text-sm font-medium mb-2">
											Tab {index + 1} Content
										</label>
										<EditableElement
											as="textarea"
											className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											defaultValue={tab.content}
											onTextChange={tab.setContent}
										/>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* ***************************************************************
					   YOUTUBE VIDEO SECTION
					****************************************************************/}
					<section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-2xl text-white font-bold mb-8">YouTube Video</h2>
						<div>
							<label className="block text-white text-sm font-medium mb-2">
								Video ID
							</label>
							<div className="flex gap-4 items-start">
								<div className="flex-1">
									<EditableElement
										as="input"
										className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										defaultValue={youtubeVideoId}
										onTextChange={setYoutubeVideoId}
									/>
									<p className="text-gray-400 text-xs mt-2">
										Paste the full YouTube URL or just the video ID
									</p>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
