"use client";

import { HomePageProps } from "@/app/_config";
import { motion, useInView } from "framer-motion";
import React from "react";
import Image from "next/image";
import { BWestSmallButton } from "../ui/b-west-small";
import { RenderLineBreaks } from "@/utils/render-line-breaks";

interface Section5Props {
	content: HomePageProps["content"];
}

export default function Section5({ content }: Section5Props) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, {
		amount: 0.3,
	});

	const textVariants = {
		initial: { opacity: 0, y: 40, x: -30, scale: 0.95 },
		animate: {
			opacity: 1,
			y: 0,
			x: 0,
			scale: 1,
			transition: {
				duration: 1.2,
				ease: [0.4, 0, 0.2, 1] as const,
				staggerChildren: 0.2
			}
		},
	};

	const titleVariants = {
		initial: { opacity: 0, y: 30, scale: 0.9 },
		animate: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 1.0,
				ease: [0.4, 0, 0.2, 1] as const,
				delay: 0.2
			}
		},
	};

	const paragraphVariants = {
		initial: { opacity: 0, y: 20, x: -20 },
		animate: {
			opacity: 1,
			y: 0,
			x: 0,
			transition: {
				duration: 1.0,
				ease: [0.4, 0, 0.2, 1] as const,
				delay: 0.4
			}
		},
	};

	const buttonVariants = {
		initial: { opacity: 0, y: 20, scale: 0.8 },
		animate: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.8,
				ease: [0.4, 0, 0.2, 1] as const,
				delay: 0.6
			}
		},
	};

	const imageVariants = {
		initial: { opacity: 0, scale: 0.8, rotateY: 15, x: 30 },
		animate: {
			opacity: 1,
			scale: 1,
			rotateY: 0,
			x: 0,
			transition: {
				duration: 1.4,
				ease: [0.4, 0, 0.2, 1] as const,
				delay: 0.3
			}
		},
	};

	return (
		<section className="py-16" ref={ref}>
			{/* ***************************************************************
               SECTION 5 CONTAINER - Flex layout with content left, image right
            ****************************************************************/}
			<div className="flex flex-col lg:flex-row h-auto lg:h-[600px] w-full items-center bg-white px-2">
				{/* ***************************************************************
                    CONTENT SECTION - Left side
                ****************************************************************/}
				<motion.div
					initial="initial"
					animate={isInView ? "animate" : "initial"}
					variants={textVariants}
					className="flex-1 flex items-center justify-center p-4 md:p-12"
				>
					<div className="max-w-lg">
						<motion.h2
							variants={titleVariants}
							className={`text-gray-800 mb-4 ${content.section5titleBold ? 'h2-bold' : ''}`}
						>
							<RenderLineBreaks text={content.section5title} />
						</motion.h2>
						<motion.p
							variants={paragraphVariants}
							className={`text-gray-600 text-left w-full leading-relaxed mb-6 ${content.section5descriptionBold ? 'p-bold' : ''}`}
						>
							<RenderLineBreaks text={content.section5description} />
						</motion.p>
						<motion.div
							variants={buttonVariants}
						>
							<BWestSmallButton
								text={content.section5buttonText}
								onClick={() => window.location.href = '/contact'}
							/>
						</motion.div>
					</div>
				</motion.div>

				{/* ***************************************************************
                    IMAGE SECTION - Right side
                ****************************************************************/}
				<motion.div
					initial="initial"
					animate={isInView ? "animate" : "initial"}
					variants={imageVariants}
					className="flex-1 relative h-64 sm:h-80 md:h-96 lg:h-full order-2 w-full flex justify-center items-center"
				>
					<div className="relative w-[500px] h-[300px] lg:w-full lg:h-full">
						<Image
							src={content.section5image}
							alt="Promotional Image"
							fill
							className="object-cover rounded-2xl"
						/>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
