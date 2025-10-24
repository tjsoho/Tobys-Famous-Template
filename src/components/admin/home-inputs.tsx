"use client";
import { SaveBanner } from "../core/save-banner";
import { useState } from "react";
import EditableImage from "@/components/core/editable-image";
import { EditableElement } from "@/components/core/input";
import { HomePageContent, HomePageProps, AdditionalTile, AdditionalFAQ } from "@/app/_config";
import useUpdatePage from "@/utils/hooks/useUpdatePage";

export default function HomeAdminInputs(props: HomePageProps) {
	const [heroImage, setHeroImage] = useState(
		props.content.heroImage || "/placeholder.jpg",
	);
	const [heroTitle, setHeroTitle] = useState(props.content.heroTitle);
	const [heroTitleBold, setHeroTitleBold] = useState(props.content.heroTitleBold ?? false);
	const [heroParagraph, setHeroParagraph] = useState(
		props.content.heroParagraph,
	);
	const [heroParagraphBold, setHeroParagraphBold] = useState(props.content.heroParagraphBold ?? false);
	const [headerButtonText, setHeaderButtonText] = useState(props.content.headerButtonText);
	const [section2title, setSection2title] = useState(
		props.content.section2title,
	);
	const [section2titleBold, setSection2titleBold] = useState(props.content.section2titleBold ?? false);
	const [section2paragraph, setSection2paragraph] = useState(
		props.content.section2paragraph,
	);
	const [section2paragraphBold, setSection2paragraphBold] = useState(props.content.section2paragraphBold ?? false);
	const [section3title, setSection3title] = useState(
		props.content.section3title,
	);
	const [section3titleBold, setSection3titleBold] = useState(props.content.section3titleBold ?? false);
	const [section3tile1title, setSection3tile1title] = useState(
		props.content.section3tile1title,
	);
	const [section3tile1description, setSection3tile1description] = useState(
		props.content.section3tile1description,
	);
	const [section3tile1titleBold, setSection3tile1titleBold] = useState(props.content.section3tile1titleBold ?? false);
	const [section3tile1descriptionBold, setSection3tile1descriptionBold] = useState(props.content.section3tile1descriptionBold ?? false);
	const [section3tile2title, setSection3tile2title] = useState(
		props.content.section3tile2title,
	);
	const [section3tile2description, setSection3tile2description] = useState(
		props.content.section3tile2description,
	);
	const [section3tile2titleBold, setSection3tile2titleBold] = useState(props.content.section3tile2titleBold ?? false);
	const [section3tile2descriptionBold, setSection3tile2descriptionBold] = useState(props.content.section3tile2descriptionBold ?? false);
	const [section3tile3title, setSection3tile3title] = useState(
		props.content.section3tile3title,
	);
	const [section3tile3description, setSection3tile3description] = useState(
		props.content.section3tile3description,
	);
	const [section3tile3titleBold, setSection3tile3titleBold] = useState(props.content.section3tile3titleBold ?? false);
	const [section3tile3descriptionBold, setSection3tile3descriptionBold] = useState(props.content.section3tile3descriptionBold ?? false);
	const [section4title, setSection4title] = useState(
		props.content.section4title,
	);
	const [section4titleBold, setSection4titleBold] = useState(props.content.section4titleBold ?? false);
	const [section4step1title, setSection4step1title] = useState(
		props.content.section4step1title,
	);
	const [section4step1titleBold, setSection4step1titleBold] = useState(props.content.section4step1titleBold ?? false);
	const [section4step1description, setSection4step1description] = useState(
		props.content.section4step1description,
	);
	const [section4step1descriptionBold, setSection4step1descriptionBold] = useState(props.content.section4step1descriptionBold ?? false);
	const [section4step1icon, setSection4step1icon] = useState(
		props.content.section4step1icon || "/placeholder.jpg",
	);
	const [section4step2title, setSection4step2title] = useState(
		props.content.section4step2title,
	);
	const [section4step2titleBold, setSection4step2titleBold] = useState(props.content.section4step2titleBold ?? false);
	const [section4step2description, setSection4step2description] = useState(
		props.content.section4step2description,
	);
	const [section4step2descriptionBold, setSection4step2descriptionBold] = useState(props.content.section4step2descriptionBold ?? false);
	const [section4step2icon, setSection4step2icon] = useState(
		props.content.section4step2icon || "/placeholder.jpg",
	);
	const [section4step3title, setSection4step3title] = useState(
		props.content.section4step3title,
	);
	const [section4step3titleBold, setSection4step3titleBold] = useState(props.content.section4step3titleBold ?? false);
	const [section4step3description, setSection4step3description] = useState(
		props.content.section4step3description,
	);
	const [section4step3descriptionBold, setSection4step3descriptionBold] = useState(props.content.section4step3descriptionBold ?? false);
	const [section4step3icon, setSection4step3icon] = useState(
		props.content.section4step3icon || "/placeholder.jpg",
	);
	const [section4step4title, setSection4step4title] = useState(
		props.content.section4step4title,
	);
	const [section4step4titleBold, setSection4step4titleBold] = useState(props.content.section4step4titleBold ?? false);
	const [section4step4description, setSection4step4description] = useState(
		props.content.section4step4description,
	);
	const [section4step4descriptionBold, setSection4step4descriptionBold] = useState(props.content.section4step4descriptionBold ?? false);
	const [section4step4icon, setSection4step4icon] = useState(
		props.content.section4step4icon || "/placeholder.jpg",
	);
	const [section5title, setSection5title] = useState(
		props.content.section5title,
	);
	const [section5titleBold, setSection5titleBold] = useState(props.content.section5titleBold ?? false);
	const [section5description, setSection5description] = useState(
		props.content.section5description,
	);
	const [section5descriptionBold, setSection5descriptionBold] = useState(props.content.section5descriptionBold ?? false);
	const [section5buttonText, setSection5buttonText] = useState(
		props.content.section5buttonText,
	);
	const [section5buttonTextBold, setSection5buttonTextBold] = useState(props.content.section5buttonTextBold ?? false);
	const [section5image, setSection5image] = useState(
		props.content.section5image || "/placeholder.jpg",
	);
	const [section6title, setSection6title] = useState(
		props.content.section6title,
	);
	const [section6titleBold, setSection6titleBold] = useState(props.content.section6titleBold ?? false);
	const [section6tile1title, setSection6tile1title] = useState(
		props.content.section6tile1title,
	);
	const [section6tile1titleBold, setSection6tile1titleBold] = useState(props.content.section6tile1titleBold ?? false);
	const [section6tile1description, setSection6tile1description] = useState(
		props.content.section6tile1description,
	);
	const [section6tile1descriptionBold, setSection6tile1descriptionBold] = useState(props.content.section6tile1descriptionBold ?? false);
	const [section6tile2title, setSection6tile2title] = useState(
		props.content.section6tile2title,
	);
	const [section6tile2titleBold, setSection6tile2titleBold] = useState(props.content.section6tile2titleBold ?? false);
	const [section6tile2description, setSection6tile2description] = useState(
		props.content.section6tile2description,
	);
	const [section6tile2descriptionBold, setSection6tile2descriptionBold] = useState(props.content.section6tile2descriptionBold ?? false);
	const [section6tile3title, setSection6tile3title] = useState(
		props.content.section6tile3title,
	);
	const [section6tile3titleBold, setSection6tile3titleBold] = useState(props.content.section6tile3titleBold ?? false);
	const [section6tile3description, setSection6tile3description] = useState(
		props.content.section6tile3description,
	);
	const [section6tile3descriptionBold, setSection6tile3descriptionBold] = useState(props.content.section6tile3descriptionBold ?? false);
	const [additionalSection3Tiles, setAdditionalSection3Tiles] = useState<AdditionalTile[]>(props.content.additionalSection3Tiles || []);
	const [additionalSection6Tiles, setAdditionalSection6Tiles] = useState<AdditionalTile[]>(props.content.additionalSection6Tiles || []);
	const [additionalSection7Faqs, setAdditionalSection7Faqs] = useState<AdditionalFAQ[]>(props.content.additionalSection7Faqs || []);
	const [section7title, setSection7title] = useState(
		props.content.section7title,
	);
	const [section7titleBold, setSection7titleBold] = useState(props.content.section7titleBold ?? false);
	const [section7faq1question, setSection7faq1question] = useState(
		props.content.section7faq1question,
	);
	const [section7faq1questionBold, setSection7faq1questionBold] = useState(props.content.section7faq1questionBold ?? false);
	const [section7faq1answer, setSection7faq1answer] = useState(
		props.content.section7faq1answer,
	);
	const [section7faq1answerBold, setSection7faq1answerBold] = useState(props.content.section7faq1answerBold ?? false);
	const [section7faq2question, setSection7faq2question] = useState(
		props.content.section7faq2question,
	);
	const [section7faq2questionBold, setSection7faq2questionBold] = useState(props.content.section7faq2questionBold ?? false);
	const [section7faq2answer, setSection7faq2answer] = useState(
		props.content.section7faq2answer,
	);
	const [section7faq2answerBold, setSection7faq2answerBold] = useState(props.content.section7faq2answerBold ?? false);
	const [section7faq3question, setSection7faq3question] = useState(
		props.content.section7faq3question,
	);
	const [section7faq3questionBold, setSection7faq3questionBold] = useState(props.content.section7faq3questionBold ?? false);
	const [section7faq3answer, setSection7faq3answer] = useState(
		props.content.section7faq3answer,
	);
	const [section7faq3answerBold, setSection7faq3answerBold] = useState(props.content.section7faq3answerBold ?? false);
	const [section7faq4question, setSection7faq4question] = useState(
		props.content.section7faq4question,
	);
	const [section7faq4questionBold, setSection7faq4questionBold] = useState(props.content.section7faq4questionBold ?? false);
	const [section7faq4answer, setSection7faq4answer] = useState(
		props.content.section7faq4answer,
	);
	const [section7faq4answerBold, setSection7faq4answerBold] = useState(props.content.section7faq4answerBold ?? false);

	const { isSaving, updatePage } = useUpdatePage<HomePageContent>("home");

	const handleSave = async () => {
		await updatePage({
			...props,
			content: {
				...props.content,
				heroImage,
				heroTitle,
				heroTitleBold,
				heroParagraph,
				heroParagraphBold,
				headerButtonText,
				section2title,
				section2titleBold,
				section2paragraph,
				section2paragraphBold,
				section3title,
				section3titleBold,
				section3tile1title,
				section3tile1titleBold,
				section3tile1description,
				section3tile1descriptionBold,
				section3tile2title,
				section3tile2titleBold,
				section3tile2description,
				section3tile2descriptionBold,
				section3tile3title,
				section3tile3titleBold,
				section3tile3description,
				section3tile3descriptionBold,
				section4title,
				section4titleBold,
				section4step1title,
				section4step1titleBold,
				section4step1description,
				section4step1descriptionBold,
				section4step1icon,
				section4step2title,
				section4step2titleBold,
				section4step2description,
				section4step2descriptionBold,
				section4step2icon,
				section4step3title,
				section4step3titleBold,
				section4step3description,
				section4step3descriptionBold,
				section4step3icon,
				section4step4title,
				section4step4titleBold,
				section4step4description,
				section4step4descriptionBold,
				section4step4icon,
				section5title,
				section5titleBold,
				section5description,
				section5descriptionBold,
				section5buttonText,
				section5buttonTextBold,
				section5image,
				section6title,
				section6titleBold,
				section6tile1title,
				section6tile1titleBold,
				section6tile1description,
				section6tile1descriptionBold,
				section6tile2title,
				section6tile2titleBold,
				section6tile2description,
				section6tile2descriptionBold,
				section6tile3title,
				section6tile3titleBold,
				section6tile3description,
				section6tile3descriptionBold,
				additionalSection3Tiles,
				additionalSection6Tiles,
				additionalSection7Faqs,
				section7title,
				section7titleBold,
				section7faq1question,
				section7faq1questionBold,
				section7faq1answer,
				section7faq1answerBold,
				section7faq2question,
				section7faq2questionBold,
				section7faq2answer,
				section7faq2answerBold,
				section7faq3question,
				section7faq3questionBold,
				section7faq3answer,
				section7faq3answerBold,
				section7faq4question,
				section7faq4questionBold,
				section7faq4answer,
				section7faq4answerBold,
			},
		});
	};

	return (
		<div>
			<SaveBanner
				pageTitle="Home Page"
				onSave={handleSave}
				isSaving={isSaving}
			/>
			<div className="min-h-screen bg-white">
				<div className="max-w-7xl mx-auto px-4 py-4">
					{/* ************************** Header Section **************************/}



					{/* ***************************************************************
					   HERO SECTION
					****************************************************************/}
					<section className="bg-brand-yellow/10 border border-brand-yellow/20 p-6 rounded-2xl mb-8">
						<h2 className="text-xl text-brand-black font-bold mb-4">Hero Section</h2>

						{/* Background Images */}
						<div className="grid md:grid-cols-2 gap-6 mb-6">
							{/* Desktop Background */}
							<div className="space-y-3">
								<label className="block text-brand-black text-sm font-medium mb-2">
									Desktop Hero Image
								</label>

								{/* Image Preview */}
								<div className="aspect-video bg-white rounded-lg overflow-hidden h-48">
									<EditableImage
										src={heroImage}
										alt="Hero Desktop Background"
										width={1920}
										height={1080}
										className="w-full h-48 object-cover hover:opacity-90 transition-opacity border-2 p-1 border-brand-yellow"
										onImageChange={setHeroImage}
										usage="desktop"
									/>
								</div>

								{/* Image URL Input */}
								<div className="space-y-3">
									<div>
										<label className="block text-brand-black/70 text-xs mb-1">
											Or paste an image URL directly
										</label>
										<input
											type="url"
											value={heroImage}
											onChange={(e) => setHeroImage(e.target.value)}
											className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
											placeholder="https://example.com/image.jpg"
										/>
									</div>

									<div className="flex gap-2">
										<button
											type="button"
											onClick={() => {
												// Clear the current image
												setHeroImage("/placeholder.jpg");
											}}
											className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-colors"
										>
											Clear Image
										</button>
										<button
											type="button"
											onClick={() => {
												// Set the example URL you provided
												setHeroImage("https://cdn.imagin.studio/getImage?customer=au-karia&make=toyota&modelFamily=corolla&modelRange=GR&modelVariant=ca&modelYear=2025&countryCode=0&licensePlateType=eu&paintId=Yellow&angle=204&tailoring=karia&width=3456&zoomLevel=1&billingTag=brightleasing-website");
											}}
											className="px-3 py-1 bg-brand-yellow/20 text-brand-black rounded text-xs hover:bg-brand-yellow/30 transition-colors"
										>
											Use Example
										</button>
									</div>
								</div>

								<p className="text-gray-400 text-xs">
									Click image to choose from library, or paste a direct URL above
								</p>
							</div>

							{/* ************************** Text Content **************************/}

							<div className="space-y-6">
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
										Hero Paragraph
									</label>
									<EditableElement
										as="textarea"
										className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
										onTextChange={setHeroParagraph}
										defaultValue={heroParagraph}
									/>
									<div className="mt-2">
										<label className="flex items-center space-x-2 cursor-pointer">
											<input
												type="checkbox"
												checked={heroParagraphBold}
												onChange={(e) => setHeroParagraphBold(e.target.checked)}
												className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
											/>
											<span className="text-brand-black text-sm">Make paragraph bold (500 weight)</span>
										</label>
									</div>
								</div>
							</div>

							{/* Header Button Text */}
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Header Button Text
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									onTextChange={setHeaderButtonText}
									defaultValue={headerButtonText}
								/>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 2: WHAT IS NOVATED LEASING
					****************************************************************/}
					<section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
						<h2 className="text-xl text-brand-black font-bold mb-4">
							Section 2 - What is Novated Leasing
						</h2>

						<div className="space-y-6">
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									onTextChange={setSection2title}
									defaultValue={section2title}
								/>
								<div className="mt-2">
									<label className="flex items-center space-x-2 cursor-pointer">
										<input
											type="checkbox"
											checked={section2titleBold}
											onChange={(e) => setSection2titleBold(e.target.checked)}
											className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
										/>
										<span className="text-brand-black text-sm">Make title bold (500 weight)</span>
									</label>
								</div>
								<p className="text-gray-400 text-xs mt-1">
									This appears as the small uppercase title above the main
									paragraph
								</p>
							</div>

							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Main Paragraph
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
									onTextChange={setSection2paragraph}
									defaultValue={section2paragraph}
								/>
								<div className="mt-2">
									<label className="flex items-center space-x-2 cursor-pointer">
										<input
											type="checkbox"
											checked={section2paragraphBold}
											onChange={(e) => setSection2paragraphBold(e.target.checked)}
											className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
										/>
										<span className="text-brand-black text-sm">Make paragraph bold (500 weight)</span>
									</label>
								</div>
								<p className="text-gray-400 text-xs mt-1">
									This appears as the large paragraph text explaining novated
									leasing
								</p>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 3: WHY CHOOSE BRIGHT LEASING TILES
					****************************************************************/}
					<section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
						<h2 className="text-xl text-brand-black font-bold mb-4">
							Section 3 - Why Choose Bright Leasing
						</h2>

						<div className="space-y-6">
							{/* Section Title */}
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									onTextChange={setSection3title}
									defaultValue={section3title}
								/>
								<div className="mt-2">
									<label className="flex items-center space-x-2 cursor-pointer">
										<input
											type="checkbox"
											checked={section3titleBold}
											onChange={(e) => setSection3titleBold(e.target.checked)}
											className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
										/>
										<span className="text-brand-black text-sm">Make title bold (500 weight)</span>
									</label>
								</div>
								<p className="text-gray-400 text-xs mt-1">
									The main title that appears on the left side
								</p>
							</div>

							{/* Tiles */}
							<div className="space-y-6">
								{/* Tile 1 */}
								<div className="bg-brand-black p-3 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">Tile 1</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												onTextChange={setSection3tile1title}
												defaultValue={section3tile1title}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section3tile1titleBold}
														onChange={(e) => setSection3tile1titleBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm h-16"
												onTextChange={setSection3tile1description}
												defaultValue={section3tile1description}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section3tile1descriptionBold}
														onChange={(e) => setSection3tile1descriptionBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
									</div>
								</div>

								{/* Tile 2 */}
								<div className="bg-brand-black p-3 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">Tile 2</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												onTextChange={setSection3tile2title}
												defaultValue={section3tile2title}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section3tile2titleBold}
														onChange={(e) => setSection3tile2titleBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm h-16"
												onTextChange={setSection3tile2description}
												defaultValue={section3tile2description}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section3tile2descriptionBold}
														onChange={(e) => setSection3tile2descriptionBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
									</div>
								</div>

								{/* Tile 3 */}
								<div className="bg-brand-black p-3 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">Tile 3</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												onTextChange={setSection3tile3title}
												defaultValue={section3tile3title}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section3tile3titleBold}
														onChange={(e) => setSection3tile3titleBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm h-16"
												onTextChange={setSection3tile3description}
												defaultValue={section3tile3description}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section3tile3descriptionBold}
														onChange={(e) => setSection3tile3descriptionBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Additional Section 3 Tiles */}
							{additionalSection3Tiles.map((tile, index) => (
								<div key={tile.id} className="bg-brand-black p-3 rounded-lg border border-gray-700">
									<div className="flex justify-between items-center mb-4">
										<h4 className="text-white font-medium">Additional Tile {index + 1}</h4>
										<button
											onClick={() => setAdditionalSection3Tiles(additionalSection3Tiles.filter(t => t.id !== tile.id))}
											className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
										>
											Remove
										</button>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												onTextChange={(value) => {
													const updatedTiles = additionalSection3Tiles.map(t =>
														t.id === tile.id ? { ...t, title: value } : t
													);
													setAdditionalSection3Tiles(updatedTiles);
												}}
												defaultValue={tile.title}
											/>
											<div className="mt-2">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={tile.titleBold}
														onChange={(e) => {
															const updatedTiles = additionalSection3Tiles.map(t =>
																t.id === tile.id ? { ...t, titleBold: e.target.checked } : t
															);
															setAdditionalSection3Tiles(updatedTiles);
														}}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm h-20"
												onTextChange={(value) => {
													const updatedTiles = additionalSection3Tiles.map(t =>
														t.id === tile.id ? { ...t, description: value } : t
													);
													setAdditionalSection3Tiles(updatedTiles);
												}}
												defaultValue={tile.description}
											/>
											<div className="mt-2">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={tile.descriptionBold}
														onChange={(e) => {
															const updatedTiles = additionalSection3Tiles.map(t =>
																t.id === tile.id ? { ...t, descriptionBold: e.target.checked } : t
															);
															setAdditionalSection3Tiles(updatedTiles);
														}}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
									</div>
									<div className="mt-4">
										<label className="block text-brand-black/70 text-xs mb-1">
											Background Color
										</label>
										<select
											value={tile.backgroundColor}
											onChange={(e) => {
												const updatedTiles = additionalSection3Tiles.map(t =>
													t.id === tile.id ? { ...t, backgroundColor: e.target.value } : t
												);
												setAdditionalSection3Tiles(updatedTiles);
											}}
											className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
										>
											<option value="bg-brand-yellow text-brand-black">Yellow</option>
											<option value="bg-brand-teal text-white">Teal</option>
											<option value="bg-gray-300 text-brand-black">Gray</option>
											<option value="bg-brand-black text-white">Black</option>
										</select>
									</div>
								</div>
							))}

							{/* Add Another Tile Button for Section 3 */}
							<div className="mt-4">
								<button
									onClick={() => {
										const newTile: AdditionalTile = {
											id: `section3-tile-${Date.now()}`,
											title: '',
											titleBold: false,
											description: '',
											descriptionBold: false,
											backgroundColor: 'bg-brand-yellow text-brand-black'
										};
										setAdditionalSection3Tiles([...additionalSection3Tiles, newTile]);
									}}
									className="px-4 py-2 bg-brand-yellow text-brand-black rounded-lg font-medium hover:bg-brand-yellow/80 transition-colors"
								>
									Add another Tile
								</button>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 4: HOW IT WORKS
					****************************************************************/}
					<section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
						<h2 className="text-xl text-brand-black font-bold mb-4">
							Section 4 - How It Works
						</h2>

						<div className="space-y-6">
							{/* Section Title */}
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									onTextChange={setSection4title}
									defaultValue={section4title}
								/>
								<div className="mt-2">
									<label className="flex items-center space-x-2 cursor-pointer">
										<input
											type="checkbox"
											checked={section4titleBold}
											onChange={(e) => setSection4titleBold(e.target.checked)}
											className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
										/>
										<span className="text-brand-black text-sm">Make title bold (500 weight)</span>
									</label>
								</div>
								<p className="text-gray-400 text-xs mt-1">
									The main title for the How It Works section
								</p>
							</div>

							{/* Steps */}
							<div className="space-y-6">
								{/* Step 1 */}
								<div className="bg-brand-black p-3 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-3">Step 1</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												onTextChange={setSection4step1title}
												defaultValue={section4step1title}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section4step1titleBold}
														onChange={(e) => setSection4step1titleBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm h-16"
												onTextChange={setSection4step1description}
												defaultValue={section4step1description}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section4step1descriptionBold}
														onChange={(e) => setSection4step1descriptionBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
									</div>
									<div className="mt-4">
										<label className="block text-brand-black/70 text-xs mb-1">
											Icon
										</label>
										<EditableImage
											src={section4step1icon}
											alt="Step 1 Icon"
											width={48}
											height={48}
											onImageChange={setSection4step1icon}
											className="w-16 h-16 rounded-lg object-cover border-2 p-1 border-brand-yellow"
										/>
									</div>
								</div>

								{/* Step 2 */}
								<div className="bg-brand-black p-3 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-3">Step 2</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												onTextChange={setSection4step2title}
												defaultValue={section4step2title}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section4step2titleBold}
														onChange={(e) => setSection4step2titleBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm h-16"
												onTextChange={setSection4step2description}
												defaultValue={section4step2description}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section4step2descriptionBold}
														onChange={(e) => setSection4step2descriptionBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
									</div>
									<div className="mt-4">
										<label className="block text-brand-black/70 text-xs mb-1">
											Icon
										</label>
										<EditableImage
											src={section4step2icon}
											alt="Step 2 Icon"
											width={48}
											height={48}
											onImageChange={setSection4step2icon}
											className="w-16 h-16 rounded-lg object-cover border-2 p-1 border-brand-yellow"
										/>
									</div>
								</div>

								{/* Step 3 */}
								<div className="bg-brand-black p-3 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-3">Step 3</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												onTextChange={setSection4step3title}
												defaultValue={section4step3title}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section4step3titleBold}
														onChange={(e) => setSection4step3titleBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm h-16"
												onTextChange={setSection4step3description}
												defaultValue={section4step3description}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section4step3descriptionBold}
														onChange={(e) => setSection4step3descriptionBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
									</div>
									<div className="mt-4">
										<label className="block text-brand-black/70 text-xs mb-1">
											Icon
										</label>
										<EditableImage
											src={section4step3icon}
											alt="Step 3 Icon"
											width={48}
											height={48}
											onImageChange={setSection4step3icon}
											className="w-16 h-16 rounded-lg object-cover border-2 p-1 border-brand-yellow"
										/>
									</div>
								</div>

								{/* Step 4 */}
								<div className="bg-brand-black p-3 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-3">Step 4</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												onTextChange={setSection4step4title}
												defaultValue={section4step4title}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section4step4titleBold}
														onChange={(e) => setSection4step4titleBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm h-16"
												onTextChange={setSection4step4description}
												defaultValue={section4step4description}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section4step4descriptionBold}
														onChange={(e) => setSection4step4descriptionBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
									</div>
									<div className="mt-4">
										<label className="block text-brand-black/70 text-xs mb-1">
											Icon
										</label>
										<EditableImage
											src={section4step4icon}
											alt="Step 4 Icon"
											width={48}
											height={48}
											onImageChange={setSection4step4icon}
											className="w-16 h-16 rounded-lg object-cover border-2 p-1 border-brand-yellow"
										/>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 5: PROMOTIONAL BANNER
					****************************************************************/}
					<section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
						<h2 className="text-xl text-brand-black font-bold mb-4">
							Section 5 - Promotional Banner
						</h2>

						<div className="space-y-6">
							{/* Background Images */}
							<div className="grid md:grid-cols-2 gap-6 mb-6">
								{/* Promotional Image */}
								<div className="space-y-3">
									<label className="block text-brand-black text-sm font-medium mb-2">
										Promotional Image
									</label>

									{/* Image Preview */}
									<div className="aspect-video bg-brand-black rounded-lg overflow-hidden h-48">
										<EditableImage
											src={section5image}
											alt="Section 5 Promotional Image"
											width={1920}
											height={1080}
											className="w-full h-48 object-cover hover:opacity-90 transition-opacity border-2 p-1 border-brand-yellow"
											onImageChange={setSection5image}
											usage="section5"
										/>
									</div>

									{/* Image URL Input */}
									<div className="space-y-3">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Or paste an image URL directly
											</label>
											<input
												type="url"
												value={section5image}
												onChange={(e) => setSection5image(e.target.value)}
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												placeholder="https://example.com/image.jpg"
											/>
										</div>

										<div className="flex gap-2">
											<button
												type="button"
												onClick={() => {
													// Clear the current image
													setSection5image("/placeholder.jpg");
												}}
												className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-colors"
											>
												Clear Image
											</button>
											<button
												type="button"
												onClick={() => {
													// Set the example URL you provided
													setSection5image("https://cdn.imagin.studio/getImage?customer=au-karia&make=toyota&modelFamily=corolla&modelRange=GR&modelVariant=ca&modelYear=2025&countryCode=0&licensePlateType=eu&paintId=Yellow&angle=204&tailoring=karia&width=3456&zoomLevel=1&billingTag=brightleasing-website");
												}}
												className="px-3 py-1 bg-brand-yellow/20 text-brand-black rounded text-xs hover:bg-brand-yellow/30 transition-colors"
											>
												Use Example
											</button>
										</div>
									</div>

									<p className="text-gray-400 text-xs">
										Click image to choose from library, or paste a direct URL above
									</p>
								</div>

								{/* ************************** Text Content **************************/}

								<div className="space-y-6">
									<div>
										<label className="block text-brand-black text-sm font-medium mb-2">
											Title
										</label>
										<EditableElement
											as="textarea"
											className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											onTextChange={setSection5title}
											defaultValue={section5title}
										/>
										<div className="mt-2">
											<label className="flex items-center space-x-2 cursor-pointer">
												<input
													type="checkbox"
													checked={section5titleBold}
													onChange={(e) => setSection5titleBold(e.target.checked)}
													className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
												/>
												<span className="text-brand-black text-sm">Make title bold (500 weight)</span>
											</label>
										</div>
									</div>

									<div>
										<label className="block text-brand-black text-sm font-medium mb-2">
											Description
										</label>
										<EditableElement
											as="textarea"
											className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-24"
											onTextChange={setSection5description}
											defaultValue={section5description}
										/>
										<div className="mt-2">
											<label className="flex items-center space-x-2 cursor-pointer">
												<input
													type="checkbox"
													checked={section5descriptionBold}
													onChange={(e) => setSection5descriptionBold(e.target.checked)}
													className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
												/>
												<span className="text-brand-black text-sm">Make description bold (500 weight)</span>
											</label>
										</div>
									</div>

									<div>
										<label className="block text-brand-black text-sm font-medium mb-2">
											Button Text
										</label>
										<EditableElement
											as="input"
											className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											onTextChange={setSection5buttonText}
											defaultValue={section5buttonText}
										/>
										<div className="mt-2">
											<label className="flex items-center space-x-2 cursor-pointer">
												<input
													type="checkbox"
													checked={section5buttonTextBold}
													onChange={(e) => setSection5buttonTextBold(e.target.checked)}
													className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
												/>
												<span className="text-brand-black text-sm">Make button text bold (500 weight)</span>
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 6: CUSTOMER SUCCESS STORIES
					****************************************************************/}
					<section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
						<h2 className="text-xl text-brand-black font-bold mb-4">
							Section 6 - Customer Success Stories
						</h2>

						<div className="space-y-6">
							{/* Section Title */}
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									onTextChange={setSection6title}
									defaultValue={section6title}
								/>
								<div className="mt-2">
									<label className="flex items-center space-x-2 cursor-pointer">
										<input
											type="checkbox"
											checked={section6titleBold}
											onChange={(e) => setSection6titleBold(e.target.checked)}
											className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
										/>
										<span className="text-brand-black text-sm">Make title bold (500 weight)</span>
									</label>
								</div>
								<p className="text-gray-400 text-xs mt-1">
									The main title that appears on the left side
								</p>
							</div>

							{/* Tiles */}
							<div className="space-y-6">
								{/* Tile 1 */}
								<div className="bg-brand-black p-3 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">Tile 1</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												onTextChange={setSection6tile1title}
												defaultValue={section6tile1title}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section6tile1titleBold}
														onChange={(e) => setSection6tile1titleBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm h-16"
												onTextChange={setSection6tile1description}
												defaultValue={section6tile1description}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section6tile1descriptionBold}
														onChange={(e) => setSection6tile1descriptionBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
									</div>
								</div>

								{/* Tile 2 */}
								<div className="bg-brand-black p-3 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">Tile 2</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												onTextChange={setSection6tile2title}
												defaultValue={section6tile2title}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section6tile2titleBold}
														onChange={(e) => setSection6tile2titleBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm h-16"
												onTextChange={setSection6tile2description}
												defaultValue={section6tile2description}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section6tile2descriptionBold}
														onChange={(e) => setSection6tile2descriptionBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
									</div>
								</div>

								{/* Tile 3 */}
								<div className="bg-brand-black p-3 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-4">Tile 3</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												onTextChange={setSection6tile3title}
												defaultValue={section6tile3title}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section6tile3titleBold}
														onChange={(e) => setSection6tile3titleBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm h-16"
												onTextChange={setSection6tile3description}
												defaultValue={section6tile3description}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section6tile3descriptionBold}
														onChange={(e) => setSection6tile3descriptionBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Additional Section 6 Tiles */}
							{additionalSection6Tiles.map((tile, index) => (
								<div key={tile.id} className="bg-brand-black p-3 rounded-lg border border-gray-700">
									<div className="flex justify-between items-center mb-4">
										<h4 className="text-white font-medium">Additional Tile {index + 1}</h4>
										<button
											onClick={() => setAdditionalSection6Tiles(additionalSection6Tiles.filter(t => t.id !== tile.id))}
											className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
										>
											Remove
										</button>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Title
											</label>
											<EditableElement
												as="input"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												onTextChange={(value) => {
													const updatedTiles = additionalSection6Tiles.map(t =>
														t.id === tile.id ? { ...t, title: value } : t
													);
													setAdditionalSection6Tiles(updatedTiles);
												}}
												defaultValue={tile.title}
											/>
											<div className="mt-2">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={tile.titleBold}
														onChange={(e) => {
															const updatedTiles = additionalSection6Tiles.map(t =>
																t.id === tile.id ? { ...t, titleBold: e.target.checked } : t
															);
															setAdditionalSection6Tiles(updatedTiles);
														}}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Description
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm h-20"
												onTextChange={(value) => {
													const updatedTiles = additionalSection6Tiles.map(t =>
														t.id === tile.id ? { ...t, description: value } : t
													);
													setAdditionalSection6Tiles(updatedTiles);
												}}
												defaultValue={tile.description}
											/>
											<div className="mt-2">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={tile.descriptionBold}
														onChange={(e) => {
															const updatedTiles = additionalSection6Tiles.map(t =>
																t.id === tile.id ? { ...t, descriptionBold: e.target.checked } : t
															);
															setAdditionalSection6Tiles(updatedTiles);
														}}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
									</div>
									<div className="mt-4">
										<label className="block text-brand-black/70 text-xs mb-1">
											Background Color
										</label>
										<select
											value={tile.backgroundColor}
											onChange={(e) => {
												const updatedTiles = additionalSection6Tiles.map(t =>
													t.id === tile.id ? { ...t, backgroundColor: e.target.value } : t
												);
												setAdditionalSection6Tiles(updatedTiles);
											}}
											className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
										>
											<option value="bg-brand-yellow text-brand-black">Yellow</option>
											<option value="bg-brand-teal text-white">Teal</option>
											<option value="bg-gray-300 text-brand-black">Gray</option>
											<option value="bg-brand-black text-white">Black</option>
										</select>
									</div>
								</div>
							))}

							{/* Add Another Tile Button for Section 6 */}
							<div className="mt-4">
								<button
									onClick={() => {
										const newTile: AdditionalTile = {
											id: `section6-tile-${Date.now()}`,
											title: '',
											titleBold: false,
											description: '',
											descriptionBold: false,
											backgroundColor: 'bg-brand-yellow text-brand-black'
										};
										setAdditionalSection6Tiles([...additionalSection6Tiles, newTile]);
									}}
									className="px-4 py-2 bg-brand-yellow text-brand-black rounded-lg font-medium hover:bg-brand-yellow/80 transition-colors"
								>
									Add another Tile
								</button>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 7: FAQ ACCORDION
					****************************************************************/}
					<section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
						<h2 className="text-xl text-brand-black font-bold mb-4">
							Section 7 - FAQ Accordion
						</h2>

						<div className="space-y-6">
							{/* Section Title */}
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									onTextChange={setSection7title}
									defaultValue={section7title}
								/>
								<div className="mt-2">
									<label className="flex items-center space-x-2 cursor-pointer">
										<input
											type="checkbox"
											checked={section7titleBold}
											onChange={(e) => setSection7titleBold(e.target.checked)}
											className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
										/>
										<span className="text-brand-black text-sm">Make title bold (500 weight)</span>
									</label>
								</div>
								<p className="text-gray-400 text-xs mt-1">
									The main title for the FAQ section
								</p>
							</div>

							{/* FAQ Items */}
							<div className="space-y-6">
								{/* FAQ 1 */}
								<div className="bg-brand-black p-3 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-3">FAQ 1</h4>
									<div className="grid grid-cols-1 gap-4">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Question
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												onTextChange={setSection7faq1question}
												defaultValue={section7faq1question}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section7faq1questionBold}
														onChange={(e) => setSection7faq1questionBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Answer
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-24"
												onTextChange={setSection7faq1answer}
												defaultValue={section7faq1answer}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section7faq1answerBold}
														onChange={(e) => setSection7faq1answerBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
									</div>
								</div>

								{/* FAQ 2 */}
								<div className="bg-brand-black p-3 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-3">FAQ 2</h4>
									<div className="grid grid-cols-1 gap-4">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Question
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												onTextChange={setSection7faq2question}
												defaultValue={section7faq2question}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section7faq2questionBold}
														onChange={(e) => setSection7faq2questionBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Answer
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-24"
												onTextChange={setSection7faq2answer}
												defaultValue={section7faq2answer}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section7faq2answerBold}
														onChange={(e) => setSection7faq2answerBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
									</div>
								</div>

								{/* FAQ 3 */}
								<div className="bg-brand-black p-3 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-3">FAQ 3</h4>
									<div className="grid grid-cols-1 gap-4">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Question
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												onTextChange={setSection7faq3question}
												defaultValue={section7faq3question}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section7faq3questionBold}
														onChange={(e) => setSection7faq3questionBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Answer
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-24"
												onTextChange={setSection7faq3answer}
												defaultValue={section7faq3answer}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section7faq3answerBold}
														onChange={(e) => setSection7faq3answerBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
									</div>
								</div>

								{/* FAQ 4 */}
								<div className="bg-brand-black p-3 rounded-lg border border-gray-700">
									<h4 className="text-white font-medium mb-3">FAQ 4</h4>
									<div className="grid grid-cols-1 gap-4">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Question
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												onTextChange={setSection7faq4question}
												defaultValue={section7faq4question}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section7faq4questionBold}
														onChange={(e) => setSection7faq4questionBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Answer
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-24"
												onTextChange={setSection7faq4answer}
												defaultValue={section7faq4answer}
											/>
											<div className="mt-1">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={section7faq4answerBold}
														onChange={(e) => setSection7faq4answerBold(e.target.checked)}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Additional Section 7 FAQs */}
							{additionalSection7Faqs.map((faq, index) => (
								<div key={faq.id} className="bg-brand-black p-3 rounded-lg border border-gray-700">
									<div className="flex justify-between items-center mb-3">
										<h4 className="text-white font-medium">Additional FAQ {index + 1}</h4>
										<button
											onClick={() => setAdditionalSection7Faqs(additionalSection7Faqs.filter(f => f.id !== faq.id))}
											className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
										>
											Remove
										</button>
									</div>
									<div className="grid grid-cols-1 gap-4">
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Question
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
												onTextChange={(value) => {
													const updatedFaqs = additionalSection7Faqs.map(f =>
														f.id === faq.id ? { ...f, question: value } : f
													);
													setAdditionalSection7Faqs(updatedFaqs);
												}}
												defaultValue={faq.question}
											/>
											<div className="mt-2">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={faq.questionBold}
														onChange={(e) => {
															const updatedFaqs = additionalSection7Faqs.map(f =>
																f.id === faq.id ? { ...f, questionBold: e.target.checked } : f
															);
															setAdditionalSection7Faqs(updatedFaqs);
														}}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
										<div>
											<label className="block text-brand-black/70 text-xs mb-1">
												Answer
											</label>
											<EditableElement
												as="textarea"
												className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-24"
												onTextChange={(value) => {
													const updatedFaqs = additionalSection7Faqs.map(f =>
														f.id === faq.id ? { ...f, answer: value } : f
													);
													setAdditionalSection7Faqs(updatedFaqs);
												}}
												defaultValue={faq.answer}
											/>
											<div className="mt-2">
												<label className="flex items-center space-x-2 cursor-pointer">
													<input
														type="checkbox"
														checked={faq.answerBold}
														onChange={(e) => {
															const updatedFaqs = additionalSection7Faqs.map(f =>
																f.id === faq.id ? { ...f, answerBold: e.target.checked } : f
															);
															setAdditionalSection7Faqs(updatedFaqs);
														}}
														className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
													/>
													<span className="text-brand-black/70 text-xs">Bold</span>
												</label>
											</div>
										</div>
									</div>
								</div>
							))}

							{/* Add Another FAQ Button for Section 7 */}
							<div className="mt-4">
								<button
									onClick={() => {
										const newFaq: AdditionalFAQ = {
											id: `section7-faq-${Date.now()}`,
											question: '',
											questionBold: false,
											answer: '',
											answerBold: false
										};
										setAdditionalSection7Faqs([...additionalSection7Faqs, newFaq]);
									}}
									className="px-4 py-2 bg-brand-yellow text-brand-black rounded-lg font-medium hover:bg-brand-yellow/80 transition-colors"
								>
									Add another FAQ
								</button>
							</div>
						</div>
					</section>

					{/* ***************************************************************
						SECTION 1: FEATURES
					****************************************************************/}
					{/* <section className="bg-gray-900 p-8 rounded-lg mb-12">
						<h2 className="text-xl text-brand-black font-bold mb-4">Section 1</h2>
						<div className="space-y-6">
							

							<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
								{[1, 2, 3, 4].map((num, index) => (
									<div key={num} className="space-y-4">
										<label className="block text-brand-black text-sm font-medium mb-2">
											Feature {num}
										</label>
										<div className="aspect-square bg-brand-black rounded-lg overflow-hidden">
											<EditableImage
												src={
													section1Images[
														`icon${num}` as keyof typeof section1Images
													]
												}
												alt={`Feature ${num} Icon`}
												width={100}
												height={100}
												className="w-full h-full object-contain p-4"
												onImageChange={(url) => {
													setSection1Images((prev) => ({
														...prev,
														[`icon${num}` as keyof typeof section1Images]: url,
													}));
												}}
												usage={`feature-${num}`}
											/>
										</div>
										<EditableElement
											as="textarea"
											className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
											onTextChange={
												[
													setSection1tile1,
													setSection1tile2,
													setSection1tile3,
													setSection1tile4,
												][index]
											}
											defaultValue={
												[
													section1tile1,
													section1tile2,
													section1tile3,
													section1tile4,
												][index]
											}
										/>
									</div>
								))}
							</div>

							

							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Section Summary
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									onTextChange={setSection1paragraph}
									defaultValue={section1paragraph}
								/>
							</div>
						</div>
					</section> */}

					{/* <section className="bg-gray-900 p-8 rounded-lg mb-12">
						<div className="space-y-6">
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section2title}
									onTextChange={setSection2title}
								/>
							</div>

							

							<div className="grid md:grid-cols-2 gap-8">
								

								<div className="space-y-3">
									<label className="block text-brand-black text-sm font-medium mb-2">
										Desktop Image
									</label>
									<div className="aspect-square bg-brand-black rounded-lg overflow-hidden">
										<EditableImage
											src={section2ImageDesktop}
											alt="Section 2 Desktop Image"
											width={1000}
											height={1000}
											className="w-full h-full object-contain"
											onImageChange={setSection2ImageDesktop}
											usage="section2-desktop"
										/>
									</div>
									<p className="text-gray-400 text-xs">
										Click image to change
									</p>
								</div>
							</div>
						</div>
					</section> */}

					{/* ***************************************************************
						SECTION 3: TRUSTED BY THOUSANDS
					****************************************************************/}
					{/* <section className="bg-gray-900 p-8 rounded-lg mb-12">
						<div className="space-y-6">
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section3title}
									onTextChange={setSection3title}
								/>
							</div>
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Section Paragraph
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section3paragraph}
									onTextChange={setSection3paragraph}
								/>
							</div> */}

					{/* ************************** Profile Images **************************/}

					{/* <div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Profile Images
								</label>
								<div className="grid grid-cols-3 md:grid-cols-6 gap-4">
									{[1, 2, 3, 4, 5, 6].map((index) => (
										<div key={index} className="space-y-2">
											<div className="aspect-[9/16] bg-brand-black rounded-lg overflow-hidden">
												<EditableImage
													src={
														section3Images[
															`profile${index}` as keyof typeof section3Images
														]
													}
													alt={`Profile ${index}`}
													width={180}
													height={320}
													className="w-full h-full object-cover"
													onImageChange={(url) => {
														setSection3Images((prev) => ({
															...prev,
															[`profile${index}`]: url,
														}));
													}}
													usage={`profile-${index}`}
												/>
											</div>
											<p className="text-gray-400 text-xs text-center">
												Profile {index}
											</p>
										</div>
									))}
								</div>
								<p className="text-gray-400 text-xs mt-2">
									Click images to change
								</p>
							</div>
						</div>
					</section> */}

					{/* ***************************************************************
						SECTION 4: DYNAMIC IMAGES
					****************************************************************/}

					{/* <section className="bg-gray-900 p-8 rounded-lg mb-12">
						<div className="space-y-6">
							<div className="grid md:grid-cols-2 gap-8 h-full w-full">
							 */}

					{/* ************************** Desktop Image **************************/}

					{/* <div className="space-y-4 flex flex-col justify-start items-start h-full w-full">
									<label className="block text-brand-black text-sm font-medium mb-2">
										Mobile Image
									</label>
									<div className=" bg-brand-black  overflow-hidden">
										<EditableImage
											src={section4ImageDesktop}
											alt="Section 4 Desktop Image"
											width={1000}
											height={1000}
											className="w-full h-full object-contain"
											onImageChange={setSection4ImageDesktop}
											usage="section4-desktop"
										/>
									</div>
									<p className="text-gray-400 text-xs">
										Click image to change.{" "}
									</p>
								</div>
							</div>
						</div>
					</section> */}

					{/* ***************************************************************
						SECTION 5: HOW WE AGE
					****************************************************************/}

					{/* <section className="bg-gray-900 p-8 rounded-lg mb-12">
						<div className="space-y-6">
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									Section Title
								</label>
								<EditableElement
									as="input"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section5title}
									onTextChange={setSection5title}
								/>
							</div>
							<div>
								<label className="block text-brand-black text-sm font-medium mb-2">
									First Paragraph
								</label>
								<EditableElement
									as="textarea"
									className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
									defaultValue={section5paragraph1}
									onTextChange={setSection5paragraph1}
								/>
							</div> */}

					{/****************************  Section 5 Features *************************/}
					{/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
								{[...Array(8)].map((_, index) => (
									<div key={index} className="space-y-4">
										<label className="block text-brand-black text-sm font-medium mb-2">
											Feature {index + 1}
										</label>
										<div className="flex space-x-2">
											<div className="w-12 h-12 bg-brand-black rounded-lg overflow-hidden">
												<EditableImage
													src={section5Features.icons[index]}
													alt={`Feature ${index + 1} icon`}
													width={48}
													height={48}
													className="w-full h-full object-contain"
													onImageChange={(url) => {
														const newIcons = [...section5Features.icons];
														newIcons[index] = url;
														setSection5Features((prev) => ({
															...prev,
															icons: newIcons,
														}));
													}}
													usage={`feature-icon-${index + 1}`}
												/>
											</div>
											<EditableElement
												as="input"
												className="flex-1 p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
												defaultValue={section5Features.texts[index]}
												onTextChange={(value) => {
													const newTexts = [...section5Features.texts];
													newTexts[index] = value;
													setSection5Features((prev) => ({
														...prev,
														texts: newTexts,
													}));
												}}
											/>
										</div>
									</div>
								))}
							</div> */}

					{/* ************************* Section 5 Images * *************************/}

					{/* <div className="grid md:grid-cols-2 gap-8"> */}
					{/* Detail Image */}
					{/* <div className="space-y-4">
									<label className="block text-brand-black text-sm font-medium mb-2">
										Detail Image
									</label>
									<div className="aspect-video bg-brand-black rounded-lg overflow-hidden">
										<EditableImage
											src={section5DetailImage}
											alt="Section 5 Detail Image"
											width={800}
											height={600}
											className="w-full h-full object-contain"
											onImageChange={setSection5DetailImage}
											usage="section5-detail"
										/>
									</div>
									<p className="text-gray-400 text-xs">
										Click image to change
									</p>
								</div> */}

					{/* ************************** Feature Image **************************/}
					{/* <div className="space-y-4">
									<label className="block text-brand-black text-sm font-medium mb-2">
										Feature Image
									</label>
									<div className="aspect-video bg-brand-black rounded-lg overflow-hidden">
										<EditableImage
											src={section5FeatureImage}
											alt="Section 5 Feature Image"
											width={1000}
											height={800}
											className="w-full h-full object-contain"
											onImageChange={setSection5FeatureImage}
											usage="section5-feature"
										/>
									</div>
									<p className="text-gray-400 text-xs">
										Click image to change
									</p>
								</div>
							</div>
						</div>
					</section> */}
				</div>
			</div>
		</div>
	);
}
