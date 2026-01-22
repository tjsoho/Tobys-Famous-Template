"use client";

import { SaveBanner } from "../core/save-banner";
import { useState } from "react";
import EditableImage from "@/components/core/editable-image";
import { EditableElement } from "@/components/core/input";
import { FooterContent, FooterProps } from "@/app/_config";
import useUpdatePage from "@/utils/hooks/useUpdatePage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Pencil } from "lucide-react";

export default function FooterAdminInputs(props: FooterProps) {
	const [logoImage, setLogoImage] = useState(props.content.logoImage);
	const [tagline, setTagline] = useState(props.content.tagline);
	const [taglineBold, setTaglineBold] = useState(props.content.taglineBold ?? false);
	const [phone, setPhone] = useState(props.content.phone);
	const [phoneBold, setPhoneBold] = useState(props.content.phoneBold ?? false);
	const [address, setAddress] = useState(props.content.address);
	const [addressBold, setAddressBold] = useState(props.content.addressBold ?? false);
	const [abn, setAbn] = useState(props.content.abn);
	const [abnBold, setAbnBold] = useState(props.content.abnBold ?? false);
	const [acn, setAcn] = useState(props.content.acn);
	const [acnBold, setAcnBold] = useState(props.content.acnBold ?? false);
	const [copyright, setCopyright] = useState(props.content.copyright);
	const [copyrightBold, setCopyrightBold] = useState(props.content.copyrightBold ?? false);

	// Section title states
	const [sectionTitles, setSectionTitles] = useState({
		logo: props.content.sectionTitles?.logo || "Footer Logo",
		content: props.content.sectionTitles?.content || "Footer Content",
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
				logoImage,
				siteLogo: props.content.siteLogo || "/images/brightlogo.png",
				tagline,
				taglineBold,
				phone,
				phoneBold,
				address,
				addressBold,
				abn,
				abnBold,
				acn,
				acnBold,
				copyright,
				copyrightBold,
				socialMedia: props.content.socialMedia, // Preserve social media links
				sectionTitles,
			},
		});
	};

	return (
		<div>
			<SaveBanner
				pageTitle="Footer Content"
				onSave={handleSave}
				isSaving={isSaving}
			/>
			<div className="min-h-screen bg-white">
				<div className="max-w-7xl mx-auto px-4 py-4">
					<Accordion type="multiple" className="space-y-8">
						{/* ***************************************************************
						   FOOTER LOGO SECTION
						****************************************************************/}
						<AccordionItem value="logo" className="bg-brand-yellow/10 border border-brand-yellow/20 p-6 rounded-2xl">
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
												Footer Logo Image
											</label>
											<div className="aspect-video bg-brand-black/50 rounded-lg overflow-hidden h-48">
												<EditableImage
													src={logoImage}
													alt="Footer Logo"
													width={320}
													height={240}
													className="w-full h-48 object-contain hover:opacity-90 transition-opacity border-2 p-1 border-brand-yellow"
													onImageChange={setLogoImage}
													usage="footer"
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

						{/* ***************************************************************
						   FOOTER CONTENT SECTION
						****************************************************************/}
						<AccordionItem value="content" className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl">
							<AccordionTrigger 
								className="text-xl text-brand-black font-bold hover:no-underline"
								editIcon={editingSection !== "content" ? (
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleTitleEdit("content");
										}}
										className="p-2 hover:bg-black/10 rounded-full border border-brand-yellow transition-colors w-8 h-8 flex items-center justify-center"
									>
										<Pencil size={16} className="text-brand-black" />
									</button>
								) : null}
							>
								{editingSection === "content" ? (
									<div className="flex items-center gap-3 flex-1" onClick={(e) => e.stopPropagation()}>
										<input
											type="text"
											value={editTitleValue}
											onChange={(e) => setEditTitleValue(e.target.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter") handleTitleSave("content");
												if (e.key === "Escape") handleTitleCancel();
											}}
											className="flex-1 px-2 py-1 border border-brand-black/20 rounded text-xl font-bold bg-white"
											autoFocus
										/>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleTitleSave("content");
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
									<span>{sectionTitles.content}</span>
								)}
							</AccordionTrigger>
							<AccordionContent>
								<section className="pt-4">
									<div className="space-y-6">
										<div>
											<label className="block text-brand-black text-sm font-medium mb-2">
												Tagline
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-20"
												onTextChange={setTagline}
												defaultValue={tagline}
											/>
											<div className="mt-2">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={taglineBold}
														onChange={(e) => setTaglineBold(e.target.checked)}
														className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
													/>
													<span className="text-brand-black text-sm">Make tagline bold (500 weight)</span>
												</label>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div>
												<label className="block text-brand-black text-sm font-medium mb-2">
													Phone Number
												</label>
												<EditableElement
													as="input"
													className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
													onTextChange={setPhone}
													defaultValue={phone}
												/>
												<div className="mt-2">
													<label className="flex items-center space-x-2 cursor-pointer">
														<input
															type="checkbox"
															checked={phoneBold}
															onChange={(e) => setPhoneBold(e.target.checked)}
															className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
														/>
														<span className="text-brand-black text-sm">Make phone bold (500 weight)</span>
													</label>
												</div>
											</div>

											<div>
												<label className="block text-brand-black text-sm font-medium mb-2">
													Address
												</label>
												<EditableElement
													as="input"
													className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
													onTextChange={setAddress}
													defaultValue={address}
												/>
												<div className="mt-2">
													<label className="flex items-center space-x-2 cursor-pointer">
														<input
															type="checkbox"
															checked={addressBold}
															onChange={(e) => setAddressBold(e.target.checked)}
															className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
														/>
														<span className="text-brand-black text-sm">Make address bold (500 weight)</span>
													</label>
												</div>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div>
												<label className="block text-brand-black text-sm font-medium mb-2">
													ABN
												</label>
												<EditableElement
													as="input"
													className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
													onTextChange={setAbn}
													defaultValue={abn}
												/>
												<div className="mt-2">
													<label className="flex items-center space-x-2 cursor-pointer">
														<input
															type="checkbox"
															checked={abnBold}
															onChange={(e) => setAbnBold(e.target.checked)}
															className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
														/>
														<span className="text-brand-black text-sm">Make ABN bold (500 weight)</span>
													</label>
												</div>
											</div>

											<div>
												<label className="block text-brand-black text-sm font-medium mb-2">
													ACN
												</label>
												<EditableElement
													as="input"
													className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
													onTextChange={setAcn}
													defaultValue={acn}
												/>
												<div className="mt-2">
													<label className="flex items-center space-x-2 cursor-pointer">
														<input
															type="checkbox"
															checked={acnBold}
															onChange={(e) => setAcnBold(e.target.checked)}
															className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
														/>
														<span className="text-brand-black text-sm">Make ACN bold (500 weight)</span>
													</label>
												</div>
											</div>
										</div>

										<div>
											<label className="block text-brand-black text-sm font-medium mb-2">
												Copyright Text
											</label>
											<EditableElement
												as="input"
												className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
												onTextChange={setCopyright}
												defaultValue={copyright}
											/>
											<div className="mt-2">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={copyrightBold}
														onChange={(e) => setCopyrightBold(e.target.checked)}
														className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
													/>
													<span className="text-brand-black text-sm">Make copyright bold (500 weight)</span>
												</label>
											</div>
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
