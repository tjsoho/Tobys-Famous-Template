/* ************************************************************
						NOTES
************************************************************ */
// Admin dashboard page with home page styling
// Features brand-consistent design with animated tiles
/* ************************************************************
						IMPORTS
************************************************************ */
"use client";

import { motion, useInView } from "framer-motion";
import React from "react";
import Image from "next/image";
import AdminTiles from "@/components/admin/AdminTiles";
import AdminNavigation from "@/components/admin/AdminNavigation";

/* ************************************************************
						COMPONENTS
************************************************************ */
export default function Admin() {
	const ref = React.useRef(null);
	const isInView = useInView(ref, {
		amount: 0.3,
	});

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

	/* ************************************************************
							RENDER
	************************************************************ */
	return (
		<main className=" bg-white">
			<div className="max-w-7xl mx-auto px-4 py-8">

				{/* ************************************************************
                    TITLE SECTION WITH LOGO
                ************************************************************ */}
				<motion.div
					ref={ref}
					variants={titleVariants}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
					className="text-center mb-8"
				>
					<div className="flex flex-col items-center justify-center gap-4 mb-4">
						<Image
							src="/images/brightlogo.png"
							alt="Bright Leasing Logo"
							width={100}
							height={50}
							className="w-[150px] h-auto"
						/>
						<h1 className="text-brand-black leading-tight">
							Content Management
						</h1>
					</div>
					<p className="text-brand-black/70 text-small max-w-2xl mx-auto">
						Take control of your website content and make updates in real-time
					</p>
				</motion.div>

				{/* ************************************************************
                    NAVIGATION SECTION
                ************************************************************ */}
				<div className="mb-12">
					<AdminNavigation />
				</div>

				{/* ************************************************************
                    TILES SECTION
                ************************************************************ */}
				<AdminTiles />
			</div>
		</main>
	);
}