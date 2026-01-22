"use client";

import { SaveBanner } from "../core/save-banner";
import { useState } from "react";
import EditableImage from "@/components/core/editable-image";
import { EditableElement } from "@/components/core/input";
import { ContactPageContent, ContactPageProps } from "@/app/_config";
import useUpdatePage from "@/utils/hooks/useUpdatePage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Pencil } from "lucide-react";

export default function ContactAdminInputs(props: ContactPageProps) {
	const [heroTitle, setHeroTitle] = useState(props.content.heroTitle);
	const [heroTitleBold, setHeroTitleBold] = useState(props.content.heroTitleBold ?? false);
	const [heroSubtitle, setHeroSubtitle] = useState(props.content.heroSubtitle);
	const [heroSubtitleBold, setHeroSubtitleBold] = useState(props.content.heroSubtitleBold ?? false);
	const [heroDescription, setHeroDescription] = useState(props.content.heroDescription);
	const [heroDescriptionBold, setHeroDescriptionBold] = useState(props.content.heroDescriptionBold ?? false);
	const [contactTitle, setContactTitle] = useState(props.content.contactTitle);
	const [contactTitleBold, setContactTitleBold] = useState(props.content.contactTitleBold ?? false);
	const [contactDescription, setContactDescription] = useState(props.content.contactDescription);
	const [contactDescriptionBold, setContactDescriptionBold] = useState(props.content.contactDescriptionBold ?? false);
	const [contactImage, setContactImage] = useState(props.content.contactImage);

	// Section title states
	const [sectionTitles, setSectionTitles] = useState({
		hero: props.content.sectionTitles?.hero || "Hero Section",
		contact: props.content.sectionTitles?.contact || "Contact Information Section",
	});
	const [editingSection, setEditingSection] = useState<string | null>(null);
	const [editTitleValue, setEditTitleValue] = useState("");

	const { isSaving, updatePage } = useUpdatePage<ContactPageContent>("contact");

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
				...props.content,
				heroTitle,
				heroTitleBold,
				heroSubtitle,
				heroSubtitleBold,
				heroDescription,
				heroDescriptionBold,
				contactTitle,
				contactTitleBold,
				contactDescription,
				contactDescriptionBold,
				contactImage,
				sectionTitles,
			},
		});
	};

	return (
		<div>
			<SaveBanner
				pageTitle="Contact Page"
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
									<div className="space-y-6">
										<div>
											<label className="block text-brand-black text-sm font-medium mb-2">
												Hero Subtitle
											</label>
											<EditableElement
												as="input"
												className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
												onTextChange={setHeroSubtitle}
												defaultValue={heroSubtitle}
											/>
											<div className="mt-2">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={heroSubtitleBold}
														onChange={(e) => setHeroSubtitleBold(e.target.checked)}
														className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
													/>
													<span className="text-brand-black text-sm">Make subtitle bold (500 weight)</span>
												</label>
											</div>
										</div>

										<div>
											<label className="block text-brand-black text-sm font-medium mb-2">
												Hero Title
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
												onTextChange={setHeroTitle}
												defaultValue={heroTitle}
											/>
											<div className="mt-2">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={heroTitleBold}
														onChange={(e) => setHeroTitleBold(e.target.checked)}
														className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
													/>
													<span className="text-brand-black text-sm">Make title bold (500 weight)</span>
												</label>
											</div>
										</div>

										<div>
											<label className="block text-brand-black text-sm font-medium mb-2">
												Hero Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-24"
												onTextChange={setHeroDescription}
												defaultValue={heroDescription}
											/>
											<div className="mt-2">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={heroDescriptionBold}
														onChange={(e) => setHeroDescriptionBold(e.target.checked)}
														className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
													/>
													<span className="text-brand-black text-sm">Make description bold (500 weight)</span>
												</label>
											</div>
										</div>
									</div>
								</section>
							</AccordionContent>
						</AccordionItem>

						{/* ***************************************************************
						   CONTACT INFO SECTION
						****************************************************************/}
						<AccordionItem value="contact" className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl">
							<AccordionTrigger 
								className="text-xl text-brand-black font-bold hover:no-underline"
								editIcon={editingSection !== "contact" ? (
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleTitleEdit("contact");
										}}
										className="p-2 hover:bg-black/10 rounded-full border border-brand-yellow transition-colors w-8 h-8 flex items-center justify-center"
									>
										<Pencil size={16} className="text-brand-black" />
									</button>
								) : null}
							>
								{editingSection === "contact" ? (
									<div className="flex items-center gap-3 flex-1" onClick={(e) => e.stopPropagation()}>
										<input
											type="text"
											value={editTitleValue}
											onChange={(e) => setEditTitleValue(e.target.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter") handleTitleSave("contact");
												if (e.key === "Escape") handleTitleCancel();
											}}
											className="flex-1 px-2 py-1 border border-brand-black/20 rounded text-xl font-bold bg-white"
											autoFocus
										/>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleTitleSave("contact");
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
									<span>{sectionTitles.contact}</span>
								)}
							</AccordionTrigger>
							<AccordionContent>
								<section className="pt-4">
									<div className="space-y-6">
										<div>
											<label className="block text-brand-black text-sm font-medium mb-2">
												Contact Section Title
											</label>
											<EditableElement
												as="input"
												className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
												onTextChange={setContactTitle}
												defaultValue={contactTitle}
											/>
											<div className="mt-2">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={contactTitleBold}
														onChange={(e) => setContactTitleBold(e.target.checked)}
														className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
													/>
													<span className="text-brand-black text-sm">Make title bold (500 weight)</span>
												</label>
											</div>
										</div>

										<div>
											<label className="block text-brand-black text-sm font-medium mb-2">
												Contact Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-24"
												onTextChange={setContactDescription}
												defaultValue={contactDescription}
											/>
											<div className="mt-2">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={contactDescriptionBold}
														onChange={(e) => setContactDescriptionBold(e.target.checked)}
														className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
													/>
													<span className="text-brand-black text-sm">Make description bold (500 weight)</span>
												</label>
											</div>
										</div>

										<div>
											<label className="block text-brand-black text-sm font-medium mb-2">
												Contact Image
											</label>
											<div className="aspect-video bg-white rounded-lg overflow-hidden h-48">
												<EditableImage
													src={contactImage}
													alt="Contact Section Image"
													width={400}
													height={300}
													className="w-full h-48 object-cover hover:opacity-90 transition-opacity border-2 p-1 border-brand-yellow"
													onImageChange={setContactImage}
													usage="contact"
												/>
											</div>
											<p className="text-gray-400 text-xs mt-2">
												Click image to choose from library
											</p>
										</div>
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
