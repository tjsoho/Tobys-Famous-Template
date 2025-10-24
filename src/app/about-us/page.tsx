'use client';

import getPage from "@/server-actions/page";
import { aboutUsPageFallbackData, AboutUsPageProps } from "./_config";
import AboutTabs, { AboutTabItem } from "@/components/about/AboutTabs";
import Image from "next/image";
// import LuxeButton from "@/ui/LuxeButton";
import DynamicYoutubeVideo from "@/components/about/DynamicYoutubeVideo";
import { motion, useInView, easeOut } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function About() {
	const [aboutPage, setAboutPage] = useState<AboutUsPageProps>(aboutUsPageFallbackData);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getPage<AboutUsPageProps>("about-us", aboutUsPageFallbackData);
			setAboutPage(data);
		};
		fetchData();
	}, []);
	const section1Ref = React.useRef(null);
	const section2Ref = React.useRef(null);
	const section3Ref = React.useRef(null);

	const isSection1InView = useInView(section1Ref, { amount: 0.3 });
	const isSection2InView = useInView(section2Ref, { amount: 0.3 });
	const isSection3InView = useInView(section3Ref, { amount: 0.3 });

	const imageContainerVariants = {
		hidden: {},
		show: {
			transition: {
				staggerChildren: 0.2
			}
		}
	};

	const imageVariants = {
		hidden: {
			opacity: 0,
			scale: 0.95,
			y: 20
		},
		show: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: easeOut
			}
		}
	};

	const titleVariants = {
		hidden: {
			opacity: 0,
			y: 20
		},
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: easeOut
			}
		}
	};

	const paragraphVariants = {
		hidden: {
			opacity: 0,
			y: 20
		},
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: easeOut,
				delay: 0.3
			}
		}
	};

	const tabsVariants = {
		hidden: {
			opacity: 0,
			y: 20
		},
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: easeOut
			}
		}
	};

	const videoVariants = {
		hidden: {
			opacity: 0,
			scale: 0.95
		},
		show: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 1.2,
				ease: easeOut
			}
		}
	};
	const highlightPhrases = (text: string) => {
		const phrases = [
			"STAIT",
			"Shaun Sargent",
			"Why give up on feeling and being your best just because you're getting older?",
			"Which is exactly what he did.",
			// Add more phrases here as needed
		];

		let result = text;
		phrases.forEach((phrase) => {
			const regex = new RegExp(`(${phrase})`, "gi");
			result = result.replace(regex, '<span class="text-white">$1</span>');
		});
		return result;
	};

	const tabItems: AboutTabItem[] = [
		{
			key: "process",
			title: aboutPage.content.tab1title,
			imageSrc: aboutPage.content.tab1image || "/placeholder.jpg",
			content: aboutPage.content.tab1content,
		},
		{
			key: "for-men",
			title: aboutPage.content.tab2title,
			imageSrc: aboutPage.content.tab2image || "/placeholder.jpg",
			content: aboutPage.content.tab2content,
		},
		{
			key: "for-women",
			title: aboutPage.content.tab3title,
			imageSrc: aboutPage.content.tab3image || "/placeholder.jpg",
			content: aboutPage.content.tab3content,
		},
		{
			key: "final-product",
			title: aboutPage.content.tab4title,
			imageSrc: aboutPage.content.tab4image || "/placeholder.jpg",
			content: aboutPage.content.tab4content,
		},
		{
			key: "who-for",
			title: aboutPage.content.tab5title,
			imageSrc: aboutPage.content.tab5image || "/placeholder.jpg",
			content: aboutPage.content.tab5content,
		},
	];

	return (
		<section className="bg-black">
			<div className="max-w-[1540px] mx-auto py-12">
				<div className="space-y-8">
					{/* ***************************************************************
				   SECTION 1 
				****************************************************************/}
					<section className="py-8 lg:py-16 px-2" ref={section1Ref}>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
							{/*********************  LEFT SIDE - IMAGE *********************/}
							<motion.div
								className="flex justify-center items-start h-full"
								variants={imageVariants}
								initial="hidden"
								animate={isSection1InView ? "show" : "hidden"}
							>
								<Image
									src={aboutPage.content.heroImage || "/placeholder.jpg"}
									alt="Mission image"
									width={1920}
									height={1080}
									className="lg:w-2/3 h-auto object-cover"
								/>
							</motion.div>

							{/*********************  RIGHT SIDE - CONTENT *********************/}
							<div className="space-y-6">
								<motion.h2
									className="text-4xl font-bold text-white mb-6"
									variants={titleVariants}
									initial="hidden"
									animate={isSection1InView ? "show" : "hidden"}
								>
									{aboutPage.content.title}
								</motion.h2>
								<motion.p
									className="text-[16px] text-white/70 leading-relaxed whitespace-pre-wrap"
									dangerouslySetInnerHTML={{
										__html: highlightPhrases(
											aboutPage.content.ourStoryParagraph,
										),
									}}
									variants={paragraphVariants}
									initial="hidden"
									animate={isSection1InView ? "show" : "hidden"}
								/>
							</div>
						</div>
					</section>
					{/* ***************************************************************
				   SECTION 2 -tabs
				****************************************************************/}
					<section ref={section2Ref}>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
							<motion.div
								className="lg:col-span-2"
								variants={imageContainerVariants}
								initial="hidden"
								animate={isSection2InView ? "show" : "hidden"}
							>
								<motion.div
									variants={tabsVariants}
								>
									<AboutTabs items={tabItems} />
								</motion.div>
							</motion.div>
						</div>
					</section>
				</div>
				{/* ***************************************************************
				   Dynamic Youtube Video
				****************************************************************/}
				<section className="py-8 lg:py-16 px-2 max-w-4xl mx-auto" ref={section3Ref}>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
						<motion.div
							className="lg:col-span-2 border border-white/50"
							variants={videoVariants}
							initial="hidden"
							animate={isSection3InView ? "show" : "hidden"}
						>
							<DynamicYoutubeVideo videoId={aboutPage.content.youtubeVideoId} />
						</motion.div>
					</div>
				</section>
			</div>
		</section>
	);
}
