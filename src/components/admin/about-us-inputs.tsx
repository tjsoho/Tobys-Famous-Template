"use client";

import { SaveBanner } from "@/components/core/save-banner";
import { useState } from "react";
import { EditableElement } from "@/components/core/input";
import EditableImage from "@/components/core/editable-image";
import { AboutUsPageContent, AboutUsPageProps } from "@/app/about-us/_config";
import useUpdatePage from "@/utils/hooks/useUpdatePage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Pencil } from "lucide-react";

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

	// Section title states
	const [sectionTitles, setSectionTitles] = useState({
		hero: props.content.sectionTitles?.hero || "Hero Section",
		tabs: props.content.sectionTitles?.tabs || "Content Tabs",
		youtube: props.content.sectionTitles?.youtube || "YouTube Video",
	});
	const [editingSection, setEditingSection] = useState<string | null>(null);
	const [editTitleValue, setEditTitleValue] = useState("");

	const { isSaving, updatePage } =
		useUpdatePage<AboutUsPageContent>("about-us");

	const handleTitleEdit = (sectionKey: string) => {
		setEditingSection(sectionKey);
		setEditTitleValue(sectionTitles[sectionKey as keyof typeof sectionTitles]);
	};

	const handleTitleSave = (sectionKey: string) => {
		setSectionTitles((prev) => ({
			...prev,
			[sectionKey]: editTitleValue,
		}));
		setEditingSection(null);
		setEditTitleValue("");
	};

	const handleTitleCancel = () => {
		setEditingSection(null);
		setEditTitleValue("");
	};

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
				sectionTitles,
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
			<div className="min-h-screen bg-white">
				<div className="max-w-7xl mx-auto px-4 py-4">
					<Accordion type="multiple" className="space-y-8">
						{/* ***************************************************************
						   HERO SECTION
						****************************************************************/}
						<AccordionItem value="hero" className="bg-brand-yellow/10 border border-brand-yellow/20 p-6 rounded-2xl">
							<AccordionTrigger 
								className="text-xl text-brand-black font-bold hover:no-underline"
								editIcon={editingSection !== "hero" ? (
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleTitleEdit("hero");
										}}
										className="p-2 hover:bg-black/10 rounded-full border border-brand-yellow transition-colors w-8 h-8 flex items-center justify-center"
									>
										<Pencil size={16} className="text-brand-black" />
									</button>
								) : null}
							>
								{editingSection === "hero" ? (
									<div className="flex items-center gap-3 flex-1" onClick={(e) => e.stopPropagation()}>
										<input
											type="text"
											value={editTitleValue}
											onChange={(e) => setEditTitleValue(e.target.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter") handleTitleSave("hero");
												if (e.key === "Escape") handleTitleCancel();
											}}
											className="flex-1 px-2 py-1 border border-brand-black/20 rounded text-xl font-bold bg-white"
											autoFocus
										/>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleTitleSave("hero");
											}}
											className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors border border-green-300"
										>
											Save
										</button>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleTitleCancel();
											}}
											className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors border border-red-300"
										>
											Cancel
										</button>
									</div>
								) : (
									<span>{sectionTitles.hero}</span>
								)}
							</AccordionTrigger>
							<AccordionContent>
								<section className="pt-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
										{/* Hero Image */}
										<div className="space-y-3">
											<label className="block text-brand-black text-sm font-medium mb-2">
												Hero Image
											</label>
											<div className="aspect-video bg-white rounded-lg overflow-hidden h-48">
												<EditableImage
													src={heroImage}
													alt="About Us Hero"
													width={1920}
													height={1080}
													className="w-full h-48 object-cover hover:opacity-90 transition-opacity border-2 p-1 border-brand-yellow"
													onImageChange={setHeroImage}
													usage="about-hero"
												/>
											</div>
											<p className="text-gray-400 text-xs">
												Click image to choose from library
											</p>
										</div>

										{/* Text Content */}
										<div className="space-y-6">
											<div>
												<label className="block text-brand-black text-sm font-medium mb-2">
													Hero Title
												</label>
												<EditableElement
													as="input"
													className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
													defaultValue={titleHero}
													onTextChange={setTitleHero}
												/>
											</div>

											<div>
												<label className="block text-brand-black text-sm font-medium mb-2">
													Story Content
												</label>
												<EditableElement
													as="textarea"
													className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
													defaultValue={ourStoryParagraph}
													onTextChange={setOurStoryParagraph}
												/>
											</div>

											<div>
												<label className="block text-brand-black text-sm font-medium mb-2">
													Button Text
												</label>
												<EditableElement
													as="input"
													className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
													defaultValue={AboutUsbuttonText}
													onTextChange={setAboutUsbuttonText}
												/>
											</div>
										</div>
									</div>
								</section>
							</AccordionContent>
						</AccordionItem>

						{/* ***************************************************************
						   TABS SECTION
						****************************************************************/}
						<AccordionItem value="tabs" className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl">
							<AccordionTrigger 
								className="text-xl text-brand-black font-bold hover:no-underline"
								editIcon={editingSection !== "tabs" ? (
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleTitleEdit("tabs");
										}}
										className="p-2 hover:bg-black/10 rounded-full border border-brand-yellow transition-colors w-8 h-8 flex items-center justify-center"
									>
										<Pencil size={16} className="text-brand-black" />
									</button>
								) : null}
							>
								{editingSection === "tabs" ? (
									<div className="flex items-center gap-3 flex-1" onClick={(e) => e.stopPropagation()}>
										<input
											type="text"
											value={editTitleValue}
											onChange={(e) => setEditTitleValue(e.target.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter") handleTitleSave("tabs");
												if (e.key === "Escape") handleTitleCancel();
											}}
											className="flex-1 px-2 py-1 border border-brand-black/20 rounded text-xl font-bold bg-white"
											autoFocus
										/>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleTitleSave("tabs");
											}}
											className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors border border-green-300"
										>
											Save
										</button>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleTitleCancel();
											}}
											className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors border border-red-300"
										>
											Cancel
										</button>
									</div>
								) : (
									<span>{sectionTitles.tabs}</span>
								)}
							</AccordionTrigger>
							<AccordionContent>
								<section className="pt-4">
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
											<div key={index} className="bg-brand-black p-3 rounded-lg border border-gray-700">
												<div className="grid grid-cols-[1fr,120px] gap-4 items-start mb-4">
													<div>
														<label className="block text-white text-xs mb-1">
															Tab {index + 1} Title
														</label>
														<EditableElement
															as="input"
															className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
															defaultValue={tab.title}
															onTextChange={tab.setTitle}
														/>
													</div>
													<div>
														<label className="block text-white text-xs mb-1">
															Icon
														</label>
														<div className="bg-white rounded-lg overflow-hidden">
															<EditableImage
																src={tab.image}
																alt={`Tab ${index + 1} icon`}
																width={120}
																height={120}
																className="w-[120px] h-[120px] object-contain hover:opacity-90 transition-opacity border-2 p-1 border-brand-yellow"
																onImageChange={tab.setImage}
																usage={`tab-${index + 1}-icon`}
															/>
														</div>
													</div>
												</div>
												<div>
													<label className="block text-white text-xs mb-1">
														Tab {index + 1} Content
													</label>
													<EditableElement
														as="textarea"
														className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm h-24"
														defaultValue={tab.content}
														onTextChange={tab.setContent}
													/>
												</div>
											</div>
										))}
									</div>
								</section>
							</AccordionContent>
						</AccordionItem>

						{/* ***************************************************************
						   YOUTUBE VIDEO SECTION
						****************************************************************/}
						<AccordionItem value="youtube" className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl">
							<AccordionTrigger 
								className="text-xl text-brand-black font-bold hover:no-underline"
								editIcon={editingSection !== "youtube" ? (
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleTitleEdit("youtube");
										}}
										className="p-2 hover:bg-black/10 rounded-full border border-brand-yellow transition-colors w-8 h-8 flex items-center justify-center"
									>
										<Pencil size={16} className="text-brand-black" />
									</button>
								) : null}
							>
								{editingSection === "youtube" ? (
									<div className="flex items-center gap-3 flex-1" onClick={(e) => e.stopPropagation()}>
										<input
											type="text"
											value={editTitleValue}
											onChange={(e) => setEditTitleValue(e.target.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter") handleTitleSave("youtube");
												if (e.key === "Escape") handleTitleCancel();
											}}
											className="flex-1 px-2 py-1 border border-brand-black/20 rounded text-xl font-bold bg-white"
											autoFocus
										/>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleTitleSave("youtube");
											}}
											className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors border border-green-300"
										>
											Save
										</button>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleTitleCancel();
											}}
											className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors border border-red-300"
										>
											Cancel
										</button>
									</div>
								) : (
									<span>{sectionTitles.youtube}</span>
								)}
							</AccordionTrigger>
							<AccordionContent>
								<section className="pt-4">
									<div>
										<label className="block text-brand-black text-sm font-medium mb-2">
											Video ID
										</label>
										<EditableElement
											as="input"
											className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											defaultValue={youtubeVideoId}
											onTextChange={setYoutubeVideoId}
										/>
									</div>
								</section>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</div>
	);
}
