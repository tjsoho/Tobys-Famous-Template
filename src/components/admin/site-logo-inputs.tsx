"use client";

import { SaveBanner } from "../core/save-banner";
import { useState } from "react";
import EditableImage from "@/components/core/editable-image";
import { FooterContent, FooterProps } from "@/app/_config";
import useUpdatePage from "@/utils/hooks/useUpdatePage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";

export default function SiteLogoInputs(props: FooterProps) {
	const [siteLogo, setSiteLogo] = useState(
		props.content.siteLogo || "/images/brightlogo.png",
	);

	const { isSaving, updatePage } = useUpdatePage<FooterContent>("footer");

	const handleSave = async () => {
		await updatePage({
			...props,
			content: {
				...props.content,
				siteLogo,
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
						<AccordionItem value="site-logo" className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl">
							<AccordionTrigger className="text-xl text-brand-black font-bold hover:no-underline">
								Site Logo
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
					</Accordion>
				</div>
			</div>
		</div>
	);
}
