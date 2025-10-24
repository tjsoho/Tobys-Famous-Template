"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BWestSmallButton } from "../ui/b-west-small";
// import BubbleMenu from "./BubbleMenu";
// import BubbleMenuMobile from "./BubbleMenuMobile";

interface HeaderProps {
	headerButtonText?: string;
}

const Header = ({ headerButtonText = "Start in 60 Seconds" }: HeaderProps) => {
	// const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	// Don't render header on admin pages
	if (pathname?.startsWith('/admin')) {
		return null;
	}

	// coding notes format

	/************************************************************
		RENDER
	************************************************************/

	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
				<div className="max-w-7xl mx-auto flex justify-between items-center">
					{ /* ************************************************************
								Mobile - Logo Only
					************************************************************/}
					<motion.div
						className="flex items-center gap-6 bg-brand-teal rounded-full pl-4 lg:px-6 py-4 justify-center  lg:justify-between relative overflow-hidden"
						initial={{ scaleX: 0, opacity: 0 }}
						animate={isLoaded ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
						transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
						style={{ transformOrigin: "left center" }}
					>
						{/* Content that appears as bubble grows */}
						<motion.div
							className="flex items-center gap-6 relative z-10"
							initial={{ opacity: 0 }}
							animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
							transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
						>
							<div>
								{/* Logo */}
								<Link href="/" className="flex items-center gap-3">
									<Image src="/images/brightlogo.png" alt="Logo" width={120} height={100} className="w-[80%] lg:w-full h-auto" />
								</Link>
							</div>
							{/* Navigation Tabs - Hidden on mobile */}
							<div className="hidden lg:flex bg-brand-teal rounded-full p-1">
								<Link href="/contact" className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-brand-yellow hover:text-brand-black hover:scale-105 group">
									Employees
									{/* add a plus icon to the right of the text */}
									<svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
									</svg>
								</Link>
								<Link href="/contact" className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-brand-yellow hover:text-brand-black hover:scale-105 group">
									Employers
									{/* add a plus icon to the right of the text */}
									<svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
									</svg>
								</Link>
							</div>
						</motion.div>
					</motion.div>

					{/* ************************************************************
						Right Column - Action Buttons (Hidden on mobile)
					************************************************************/}
					<div className="hidden lg:flex items-center gap-4 bg-brand-cream rounded-full px-6 py-5">
						<BWestSmallButton
							text={headerButtonText}
							onClick={() => window.location.href = '/contact'}
						/>
						{/* <button className=" border border-brand-black rounded-full text-brand-black hover:bg-brand-black hover:text-white transition-colors text-sm px-8 py-2">
							Login
						</button> */}
						<div className="relative ">
							<button
								onClick={() => {
									const section3 = document.getElementById('section3');
									if (section3) {
										section3.scrollIntoView({ behavior: 'smooth' });
									}
								}}
								className="w-10 h-10 border border-brand-black rounded-full flex items-center justify-center hover:bg-brand-black hover:text-white transition-colors relative z-20"
								aria-label="Scroll to Section 3"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							</button>

							{/* Desktop Bubble Menu - Temporarily disabled */}
							{/* <BubbleMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} /> */}
						</div>
					</div>

					{/* ************************************************************
						Mobile Menu Button
					************************************************************/}
					<div className="lg:hidden relative bg-brand-teal rounded-full p-2">
						<button
							onClick={() => {
								const section3 = document.getElementById('section3');
								if (section3) {
									section3.scrollIntoView({ behavior: 'smooth' });
								}
							}}
							className=" p-2 rounded-full  flex items-center justify-center hover:bg-brand-teal/80 transition-colors relative z-20"
							aria-label="Scroll to Section 3"
						>
							<svg className="w-5 h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>

						{/* Mobile Bubble Menu - Temporarily disabled */}
						{/* <BubbleMenuMobile isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} /> */}
					</div>
				</div>
			</header>

		</>
	);
};

export default Header;
