"use client";

import { HomePageProps } from "@/app/_config";
import { motion, useInView } from "framer-motion";
import React from "react";

import { CarouselApi } from "@/components/ui/carousel";
import { Gallery7 } from "../blocks/gallery7";
import { RenderLineBreaks } from "@/utils/render-line-breaks";

interface Section6Props {
	content: HomePageProps["content"];
}

export default function Section6({ content }: Section6Props) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, {
		amount: 0.3,
	});
	const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
	const [currentSlide, setCurrentSlide] = React.useState(0);

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
						<h2 className={`text-brand-black leading-tight lg:pr-[25%] ${content.section6titleBold ? 'h2-bold' : 'h2'}`}>
							<RenderLineBreaks text={content.section6title} />
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
						<Gallery7
							heading=""
							titleTag="p"
							onCarouselApiChange={setCarouselApi}
							items={[
								// Static tiles
								{
									id: "card-1",
									title: content.section6tile1title,
									summary: content.section6tile1description,
									url: "#",
									image: content.section6tile1image,
									color: "bg-brand-yellow text-brand-black",
									titleBold: content.section6tile1titleBold,
									summaryBold: content.section6tile1descriptionBold
								},
								{
									id: "card-2",
									title: content.section6tile2title,
									summary: content.section6tile2description,
									url: "#",
									image: content.section6tile2image,
									color: "bg-brand-teal text-white",
									titleBold: content.section6tile2titleBold,
									summaryBold: content.section6tile2descriptionBold
								},
								{
									id: "card-3",
									title: content.section6tile3title,
									summary: content.section6tile3description,
									url: "#",
									image: content.section6tile3image,
									color: "bg-gray-300 text-brand-black",
									titleBold: content.section6tile3titleBold,
									summaryBold: content.section6tile3descriptionBold
								},
								// Additional tiles (no image, just background color)
								...(content.additionalSection6Tiles || []).map(tile => ({
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
					<div className="flex-1 lg:w-1/3"></div>

					{/* ************************************************************
						CENTER COLUMN - Pagination Icons (1/3 width)
					************************************************************ */}
					<div className="flex-1 lg:w-1/3 flex justify-center mt-6">
						<div className="flex items-center gap-2 bg-gray-200 rounded-full p-4">
							{/* Dynamic Pagination Icons */}
							{Array.from({ length: 3 + (content.additionalSection6Tiles?.length || 0) }, (_, index) => (
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
								className="w-10 h-10  border border-gray-400 rounded-full flex items-center justify-center hover:border-black transition-all duration-300 group"
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
