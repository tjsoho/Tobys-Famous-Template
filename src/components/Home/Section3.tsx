/* ************************************************************
						NOTES
************************************************************ */
// Section3 component with carousel cards, pagination, and navigation
// Features: Three brand-colored cards with smooth transitions
// Layout: Heading positioned at top, cards in carousel, pagination below
/* ************************************************************
						IMPORTS
************************************************************ */
"use client";

import { HomePageProps } from "@/app/_config";
import { motion, useInView } from "framer-motion";
import React from "react";
import { Gallery6 } from "@/components/blocks/gallery6";
import { CarouselApi } from "@/components/ui/carousel";
import { RenderLineBreaks } from "@/utils/render-line-breaks";

/* ************************************************************
						INTERFACES
************************************************************ */
interface Section3Props {
	content: HomePageProps["content"];
}

/* ************************************************************
						COMPONENTS
************************************************************ */
export default function Section3({ content }: Section3Props) {
	/* ************************************************************
							HOOKS
	************************************************************ */
	const ref = React.useRef(null);
	const isInView = useInView(ref, {
		amount: 0.3,
	});
	const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
	const [currentSlide, setCurrentSlide] = React.useState(0);

	/* ************************************************************
							FUNCTIONS
	************************************************************ */
	React.useEffect(() => {
		if (!carouselApi) {
			return;
		}

		const updateCurrentSlide = () => {
			setCurrentSlide(carouselApi.selectedScrollSnap());
		};

		updateCurrentSlide();
		carouselApi.on("select", updateCurrentSlide);

		return () => {
			carouselApi.off("select", updateCurrentSlide);
		};
	}, [carouselApi]);

	/* ************************************************************
							ANIMATION VARIANTS
	************************************************************ */
	const titleVariants = {
		hidden: {
			opacity: 0,
			y: 40,
			scale: 0.95,
		},
		show: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 1.2,
				ease: [0.4, 0, 0.2, 1] as const,
			},
		},
	};

	const carouselVariants = {
		hidden: {
			opacity: 0,
			y: 30,
			scale: 0.9,
		},
		show: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 1.0,
				ease: [0.4, 0, 0.2, 1] as const,
				delay: 0.3,
			},
		},
	};

	const paginationVariants = {
		hidden: {
			opacity: 0,
			y: 20,
			scale: 0.8,
		},
		show: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.8,
				ease: [0.4, 0, 0.2, 1] as const,
				delay: 0.6,
			},
		},
	};



	/* ************************************************************
							RENDER
	************************************************************ */
	return (
		<section className="py-16 overflow-hidden" ref={ref}>
			<div className="max-w-7xl mx-auto px-4">
				{/* ************************************************************
					TOP ROW - 2 Columns
				************************************************************ */}
				<div className="flex flex-col lg:flex-row items-start lg:items-start gap-8">
					{/* ************************************************************
						LEFT COLUMN - Title Section (1/3 width)
					************************************************************ */}
					<motion.div
						className="flex-1 lg:w-1/4"
						variants={titleVariants}
						initial="hidden"
						animate={isInView ? "show" : "hidden"}
					>
						<h2 className={`text-brand-black leading-tight lg:pr-[20%] ${content.section3titleBold ? 'h2-bold' : 'h2'}`} >
							<RenderLineBreaks text={content.section3title} />
						</h2>
					</motion.div>

					{/* ************************************************************
						RIGHT COLUMN - Cards Carousel (2/3 width)
					************************************************************ */}
					<motion.div
						variants={carouselVariants}
						initial="hidden"
						animate={isInView ? "show" : "hidden"}
						className="flex-1 lg:w-3/4 w-full "

					>
						<Gallery6
							heading=""
							onCarouselApiChange={setCarouselApi}
							items={[
								// Static tiles
								{
									id: "card-1",
									title: content.section3tile1title,
									titleBold: content.section3tile1titleBold,
									summary: content.section3tile1description,
									summaryBold: content.section3tile1descriptionBold,
									url: "#",
									image: content.section3tile1image,
									color: "bg-brand-yellow text-brand-black"
								},
								{
									id: "card-2",
									title: content.section3tile2title,
									titleBold: content.section3tile2titleBold,
									summary: content.section3tile2description,
									summaryBold: content.section3tile2descriptionBold,
									url: "#",
									image: content.section3tile2image,
									color: "bg-brand-teal text-white"
								},
								{
									id: "card-3",
									title: content.section3tile3title,
									titleBold: content.section3tile3titleBold,
									summary: content.section3tile3description,
									summaryBold: content.section3tile3descriptionBold,
									url: "#",
									image: content.section3tile3image,
									color: "bg-gray-300 text-brand-black"
								},
								// Additional tiles (no image, just background color)
								...(content.additionalSection3Tiles || []).map(tile => ({
									id: tile.id,
									title: tile.title,
									titleBold: tile.titleBold,
									summary: tile.description,
									summaryBold: tile.descriptionBold,
									url: "#",
									image: "", // No image for additional tiles
									color: tile.backgroundColor
								}))
							]}
						/>
					</motion.div>
				</div>

				{/* ************************************************************
					BOTTOM ROW - Pagination and Navigation
				************************************************************ */}
				<motion.div
					variants={paginationVariants}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
					className="flex justify-between items-center w-full overflow-hidden"
				>
					{/* ************************************************************
						LEFT COLUMN - Empty space (1/3 width)
					************************************************************ */}
					<div className="flex-1 lg:w-1/3" id="section3"></div>

					{/* ************************************************************
						CENTER COLUMN - Pagination Icons (1/3 width)
					************************************************************ */}
					<div className="flex-1 lg:w-1/3 flex justify-center mt-6">
						<div className="flex items-center gap-2 bg-gray-200 rounded-full p-4">
							{/* Dynamic Pagination Icons */}
							{Array.from({ length: 3 + (content.additionalSection3Tiles?.length || 0) }, (_, index) => (
								<div
									key={index}
									className={`transition-all duration-300 bg ${index === currentSlide
										? "w-8 h-1.5 bg-brand-black rounded-full"
										: "w-1.5 h-1.5 rounded-full bg-gray-400"
										}`}
								/>
							))}
						</div>
					</div>

					{/* ************************************************************
						RIGHT COLUMN - Navigation Buttons (1/3 width)
					************************************************************ */}
					<div className="flex-1 lg:w-1/3 flex justify-end mt-4">
						<div className="flex gap-2">
							<button
								onClick={() => carouselApi?.scrollPrev()}
								className="w-10 h-10  border border-gray-400 rounded-full flex items-center justify-center  hover:border-black transition-all duration-300 group"
							>
								<svg className="w-5 h-5 text-gray-400 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
								</svg>
							</button>
							<button
								onClick={() => carouselApi?.scrollNext()}
								className="w-10 h-10  border border-gray-400 rounded-full flex items-center justify-center hover:border-black transition-all duration-300 group"
							>
								<svg className="w-5 h-5 text-gray-400 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</button>
						</div>
					</div>
				</motion.div>

			</div>
		</section>
	);
}

/* ************************************************************
						EXPORTS
************************************************************ */
// Default export is already declared above





