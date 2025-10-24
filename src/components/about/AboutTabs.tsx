"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import MobileAboutTabs from "./MobileAboutTabs";
import { motion, AnimatePresence, easeOut } from "framer-motion";

export type AboutTabItem = {
	key: string;
	title: string;
	imageSrc: string;
	content: string;
};

interface AboutTabsProps {
	items: AboutTabItem[];
}

export default function AboutTabs({ items }: AboutTabsProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 1024); // lg breakpoint
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	if (isMobile) {
		return <MobileAboutTabs items={items} />;
	}

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-5 gap-4 max-w-6xl mx-auto">
				{items.map((item, index) => {
					const isActive = index === activeIndex;
					return (
						<button
							key={item.key}
							type="button"
							onClick={() => setActiveIndex(index)}
							className={`group border flex flex-col items-center justify-center gap-3 transition-colors py-4 w-38 ${isActive
								? "bg-black text-white border-white"
								: "bg-black text-white/50 border-white/50 hover:border-white/80 hover:text-white/80"
								}`}
						>
							<Image
								src={item.imageSrc}
								alt={`${item.title} icon`}
								width={40}
								height={40}
								className={`object-contain ${isActive
									? "opacity-100"
									: "opacity-50 group-hover:opacity-100"
									}`}
							/>
							<div
								className={`text-sm font-semibold tracking-wide hover:text-white/80 uppercase text-center ${isActive ? "text-white" : "text-white/50"
									}`}
							>
								{item.title}
							</div>
						</button>
					);
				})}
			</div>

			<div className="max-w-6xl mx-auto py-6 leading-relaxed">
				<AnimatePresence mode="wait">
					<motion.div
						key={activeIndex}
						initial={{ opacity: 0, y: 20 }}
						animate={{
							opacity: 1,
							y: 0,
							transition: {
								duration: 0.5,
								ease: easeOut
							}
						}}
						exit={{
							opacity: 0,
							y: -20,
							transition: {
								duration: 0.3,
								ease: easeOut
							}
						}}
					>
						<motion.h2
							className="text-2xl font-bold mb-4 text-white"
							initial={{ opacity: 0, x: -20 }}
							animate={{
								opacity: 1,
								x: 0,
								transition: {
									duration: 0.5,
									ease: easeOut,
									delay: 0.2
								}
							}}
						>
							{items[activeIndex]?.title}
						</motion.h2>
						<motion.p
							className="text-white/70 whitespace-pre-wrap text-[16px]"
							initial={{ opacity: 0, x: -20 }}
							animate={{
								opacity: 1,
								x: 0,
								transition: {
									duration: 0.5,
									ease: easeOut,
									delay: 0.4
								}
							}}
						>
							{items[activeIndex]?.content}
						</motion.p>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
