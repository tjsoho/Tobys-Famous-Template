"use client";

import { SaveBanner } from "../core/save-banner";
import { useState } from "react";
import EditableImage from "@/components/core/editable-image";
import { FooterContent, FooterProps } from "@/app/_config";
import useUpdatePage from "@/utils/hooks/useUpdatePage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { ensureAbsoluteUrl } from "@/utils/url";

export default function SiteLogoInputs(props: FooterProps) {
	const [siteLogo, setSiteLogo] = useState(
		props.content.siteLogo || "/images/brightlogo.png",
	);
	const [instagram, setInstagram] = useState(props.content.socialMedia?.instagram || "");
	const [facebook, setFacebook] = useState(props.content.socialMedia?.facebook || "");
	const [youtube, setYoutube] = useState(props.content.socialMedia?.youtube || "");
	const [pinterest, setPinterest] = useState(props.content.socialMedia?.pinterest || "");
	const [linkedin, setLinkedin] = useState(props.content.socialMedia?.linkedin || "");
	const [tiktok, setTiktok] = useState(props.content.socialMedia?.tiktok || "");

	// Section title states
	const [sectionTitles, setSectionTitles] = useState({
		logo: props.content.sectionTitles?.logo || "Site Logo",
		social: props.content.sectionTitles?.social || "Social Media Links",
	});
	const [editingSection, setEditingSection] = useState<string | null>(null);
	const [editTitleValue, setEditTitleValue] = useState("");

	const { isSaving, updatePage } = useUpdatePage<FooterContent>("footer");

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
				siteLogo,
				socialMedia: {
					instagram: ensureAbsoluteUrl(instagram),
					facebook: ensureAbsoluteUrl(facebook),
					youtube: ensureAbsoluteUrl(youtube),
					pinterest: ensureAbsoluteUrl(pinterest),
					linkedin: ensureAbsoluteUrl(linkedin),
					tiktok: ensureAbsoluteUrl(tiktok),
				},
				sectionTitles,
			},
		});
	};

	return (
		<div>
			<SaveBanner
				pageTitle="Site Logo"
				onSave={handleSave}
				isSaving={isSaving}
			/>
			<div className="min-h-screen bg-white">
				<div className="max-w-7xl mx-auto px-4 py-4">
					<Accordion type="multiple" className="space-y-8">
						{/* ************************************************************
						   SITE LOGO SECTION
						****************************************************************/}
						<AccordionItem value="site-logo" className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl">
							<AccordionTrigger 
								className="text-xl text-brand-black font-bold hover:no-underline"
								editIcon={editingSection !== "logo" ? (
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleTitleEdit("logo");
										}}
										className="p-2 hover:bg-black/10 rounded-full border border-brand-yellow transition-colors w-8 h-8 flex items-center justify-center"
									>
										<Pencil size={16} className="text-brand-black" />
									</button>
								) : null}
							>
								{editingSection === "logo" ? (
									<div className="flex items-center gap-3 flex-1" onClick={(e) => e.stopPropagation()}>
										<input
											type="text"
											value={editTitleValue}
											onChange={(e) => setEditTitleValue(e.target.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter") handleTitleSave("logo");
												if (e.key === "Escape") handleTitleCancel();
											}}
											className="flex-1 px-2 py-1 border border-brand-black/20 rounded text-xl font-bold bg-white"
											autoFocus
										/>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleTitleSave("logo");
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
									<span>{sectionTitles.logo}</span>
								)}
							</AccordionTrigger>
							<AccordionContent>
								<section className="pt-4">
									<div className="space-y-6">
										<div>
											<label className="block text-brand-black text-sm font-medium mb-2">
												Site Logo Image
											</label>
											<div className="aspect-video bg-white rounded-lg overflow-hidden h-48 border-2 border-brand-yellow p-4">
												<EditableImage
													src={siteLogo}
													alt="Site Logo"
													width={320}
													height={240}
													className="w-full h-auto object-contain hover:opacity-90 transition-opacity"
													onImageChange={setSiteLogo}
													usage="site-logo"
												/>
											</div>
											<p className="text-gray-400 text-xs mt-2">
												Click image to choose from library
											</p>
										</div>

										{/* Preview Section */}
										<div className="mt-8 pt-8 border-t border-gray-200">
											<h3 className="text-lg text-brand-black font-semibold mb-4">
												Preview
											</h3>
											<div className="space-y-4">
												<div>
													<p className="text-sm text-gray-600 mb-2">Header Preview:</p>
													<div className="bg-brand-teal rounded-lg p-4 inline-block">
														<Image
															src={siteLogo}
															alt="Site Logo Preview - Header"
															width={120}
															height={48}
															className="h-12 w-auto"
														/>
													</div>
												</div>
												<div>
													<p className="text-sm text-gray-600 mb-2">Admin Dashboard Preview:</p>
													<div className="bg-white border border-gray-200 rounded-lg p-4 inline-block">
														<Image
															src={siteLogo}
															alt="Site Logo Preview - Admin Dashboard"
															width={150}
															height={64}
															className="h-16 w-auto"
														/>
													</div>
												</div>
												<div>
													<p className="text-sm text-gray-600 mb-2">Footer Preview:</p>
													<div className="bg-brand-black rounded-lg p-4 inline-block">
														<Image
															src={siteLogo}
															alt="Site Logo Preview - Footer"
															width={120}
															height={48}
															className="h-12 w-auto"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</section>
							</AccordionContent>
						</AccordionItem>

						{/* ************************************************************
						   SOCIAL MEDIA LINKS SECTION
						****************************************************************/}
						<AccordionItem value="social-media" className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl">
							<AccordionTrigger 
								className="text-xl text-brand-black font-bold hover:no-underline"
								editIcon={editingSection !== "social" ? (
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleTitleEdit("social");
										}}
										className="p-2 hover:bg-black/10 rounded-full border border-brand-yellow transition-colors w-8 h-8 flex items-center justify-center"
									>
										<Pencil size={16} className="text-brand-black" />
									</button>
								) : null}
							>
								{editingSection === "social" ? (
									<div className="flex items-center gap-3 flex-1" onClick={(e) => e.stopPropagation()}>
										<input
											type="text"
											value={editTitleValue}
											onChange={(e) => setEditTitleValue(e.target.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter") handleTitleSave("social");
												if (e.key === "Escape") handleTitleCancel();
											}}
											className="flex-1 px-2 py-1 border border-brand-black/20 rounded text-xl font-bold bg-white"
											autoFocus
										/>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleTitleSave("social");
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
									<span>{sectionTitles.social}</span>
								)}
							</AccordionTrigger>
							<AccordionContent>
								<section className="pt-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-brand-black text-sm font-medium mb-2">
												Instagram URL
											</label>
											<input
												type="url"
												value={instagram}
												onChange={(e) => setInstagram(e.target.value)}
												placeholder="https://instagram.com/yourprofile"
												className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											/>
										</div>
										<div>
											<label className="block text-brand-black text-sm font-medium mb-2">
												Facebook URL
											</label>
											<input
												type="url"
												value={facebook}
												onChange={(e) => setFacebook(e.target.value)}
												placeholder="https://facebook.com/yourpage"
												className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											/>
										</div>
										<div>
											<label className="block text-brand-black text-sm font-medium mb-2">
												YouTube URL
											</label>
											<input
												type="url"
												value={youtube}
												onChange={(e) => setYoutube(e.target.value)}
												placeholder="https://youtube.com/@yourchannel"
												className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											/>
										</div>
										<div>
											<label className="block text-brand-black text-sm font-medium mb-2">
												Pinterest URL
											</label>
											<input
												type="url"
												value={pinterest}
												onChange={(e) => setPinterest(e.target.value)}
												placeholder="https://pinterest.com/yourprofile"
												className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											/>
										</div>
										<div>
											<label className="block text-brand-black text-sm font-medium mb-2">
												LinkedIn URL
											</label>
											<input
												type="url"
												value={linkedin}
												onChange={(e) => setLinkedin(e.target.value)}
												placeholder="https://linkedin.com/company/yourcompany"
												className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											/>
										</div>
										<div>
											<label className="block text-brand-black text-sm font-medium mb-2">
												TikTok URL
											</label>
											<input
												type="url"
												value={tiktok}
												onChange={(e) => setTiktok(e.target.value)}
												placeholder="https://tiktok.com/@yourprofile"
												className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											/>
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
