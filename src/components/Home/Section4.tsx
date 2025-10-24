"use client";

import { HomePageProps } from "@/app/_config";
import { motion, useInView } from "framer-motion";
import React from "react";
import Image from "next/image";
import { RenderLineBreaks } from "@/utils/render-line-breaks";

interface Section4Props {
	content: HomePageProps["content"];
}

export default function Section4({ content }: Section4Props) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, {
		amount: 0.3,
	});

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

	const stepVariants = {
		hidden: {
			opacity: 0,
			y: 50,
			scale: 0.8,
			rotateX: -15,
		},
		show: {
			opacity: 1,
			y: 0,
			scale: 1,
			rotateX: 0,
			transition: {
				duration: 1.0,
				ease: [0.4, 0, 0.2, 1] as const,
			},
		},
	};

	const containerVariants = {
		hidden: {},
		show: {
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const steps = [
		{
			title: content.section4step1title,
			description: content.section4step1description,
			icon: content.section4step1icon,
			number: "01",
			titleBold: content.section4step1titleBold,
			descriptionBold: content.section4step1descriptionBold,
		},
		{
			title: content.section4step2title,
			description: content.section4step2description,
			icon: content.section4step2icon,
			number: "02",
			titleBold: content.section4step2titleBold,
			descriptionBold: content.section4step2descriptionBold,
		},
		{
			title: content.section4step3title,
			description: content.section4step3description,
			icon: content.section4step3icon,
			number: "03",
			titleBold: content.section4step3titleBold,
			descriptionBold: content.section4step3descriptionBold,
		},
		{
			title: content.section4step4title,
			description: content.section4step4description,
			icon: content.section4step4icon,
			number: "04",
			titleBold: content.section4step4titleBold,
			descriptionBold: content.section4step4descriptionBold,
		},
	];

	return (
		<section className="py-16 bg-gray-100 rounded-2xl" ref={ref}>
			<div className="max-w-6xl mx-auto px-4">
				{/* Section Title */}
				<motion.h2
					className={`text-black text-left mb-16 ${content.section4titleBold ? 'h2-bold' : ''}`}
					variants={titleVariants}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
				>
					<RenderLineBreaks text={content.section4title} />
				</motion.h2>

				{/* Steps Container */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  "
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
				>
					{steps.map((step, index) => (
						<motion.div
							key={index}
							className="bg-white rounded-2xl p-6 relative overflow-hidden h-[400px] w-[300px] lg:w-full mx-auto"
							variants={stepVariants}
						>
							<div className="flex flex-col items-center text-center h-[300px]">
								{/* Icon */}
								<div className="mb-4">
									<div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center overflow-hidden">
										<Image
											src={step.icon}
											alt={`${step.title} icon`}
											width={32}
											height={32}
											className="object-contain"
										/>
									</div>
								</div>

								{/* Content */}
								<div className="flex-1 flex flex-col justify-start">
									<h4 className={`text-black mb-3 ${step.titleBold ? 'h4-bold' : ''}`}>
										<RenderLineBreaks text={step.title} />
									</h4>
									<p className={`lg:text-small text-gray-600 text-left leading-relaxed ${step.descriptionBold ? 'p-bold' : ''}`}>
										<RenderLineBreaks text={step.description} />
									</p>
								</div>

								{/* Step Number */}
								<div className="absolute -bottom-4 -left-3 text-[112px] lg:text-[92px] text-gray-300 leading-none opacity-30" style={{ fontFamily: 'var(--font-avant-garde-bold)', fontWeight: 700 }}>
									{step.number}
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
