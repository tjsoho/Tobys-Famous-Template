"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BWestSmallButton } from "../ui/b-west-small";
import BubbleMenu from "./BubbleMenu";
import BubbleMenuMobile from "./BubbleMenuMobile";

interface HeaderProps {
	headerButtonText?: string;
	siteLogo?: string;
	socialMedia?: {
		instagram?: string;
		facebook?: string;
		youtube?: string;
		pinterest?: string;
		linkedin?: string;
		tiktok?: string;
	};
}

const Header = ({ headerButtonText = "Start in 60 Seconds", siteLogo = "/images/brightlogo.png", socialMedia }: HeaderProps) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	// Don't render header on admin pages
	if (pathname?.startsWith('/admin')) {
		return null;
	}

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-brand-teal border-b border-brand-teal/20 shadow-sm">
			<div className="max-w-7xl mx-auto px-4 lg:px-6">
				<motion.div
					className="flex items-center justify-between h-16 lg:h-20"
					initial={{ opacity: 0, y: -20 }}
					animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					{/* ************************************************************
						LEFT: Logo
					************************************************************/}
					<div className="flex items-center">
						<Link href="/" aria-label="Bright Leasing Home" className="flex items-center">
							<Image 
								src={siteLogo} 
								alt="Bright Leasing Logo" 
								width={120} 
								height={100} 
								className="h-10 lg:h-12 w-auto" 
								priority 
							/>
						</Link>
					</div>

					{/* ************************************************************
						CENTER: Navigation Links (Hidden on mobile)
					************************************************************/}
					<nav className="hidden lg:flex items-center gap-1">
						<Link 
							href="/contact" 
							aria-label="Contact for Employees" 
							className="px-4 py-2 text-sm font-medium text-white hover:bg-brand-yellow hover:text-brand-black transition-all duration-300 rounded-md flex items-center gap-2 group"
						>
							Employees
							<svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
							</svg>
						</Link>
						<Link 
							href="/contact" 
							aria-label="Contact for Employers" 
							className="px-4 py-2 text-sm font-medium text-white hover:bg-brand-yellow hover:text-brand-black transition-all duration-300 rounded-md flex items-center gap-2 group"
						>
							Employers
							<svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
							</svg>
						</Link>
					</nav>

					{/* ************************************************************
						RIGHT: Action Button & Menu (Desktop)
					************************************************************/}
					<div className="hidden lg:flex items-center gap-4">
						<BWestSmallButton
							text={headerButtonText}
							onClick={() => window.location.href = '/contact'}
						/>
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="w-10 h-10 border-2 border-white rounded-md flex items-center justify-center hover:bg-white hover:text-brand-teal transition-colors"
							aria-label="Open navigation menu"
							aria-expanded={isMenuOpen}
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>

					{/* ************************************************************
						RIGHT: Mobile Menu Button
					************************************************************/}
					<div className="lg:hidden flex items-center gap-3">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="p-2 rounded-md flex items-center justify-center hover:bg-brand-teal/80 transition-colors"
							aria-label="Open mobile navigation menu"
							aria-expanded={isMenuOpen}
						>
							<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
				</motion.div>
			</div>

			{/* ************************************************************
				Desktop Bubble Menu
			************************************************************/}
			<div className="hidden lg:block">
				<BubbleMenu 
					isOpen={isMenuOpen} 
					onClose={() => setIsMenuOpen(false)} 
					headerButtonText={headerButtonText}
					siteLogo={siteLogo}
					socialMedia={socialMedia}
				/>
			</div>

			{/* ************************************************************
				Mobile Bubble Menu
			************************************************************/}
			<div className="lg:hidden">
				<BubbleMenuMobile 
					isOpen={isMenuOpen} 
					onClose={() => setIsMenuOpen(false)} 
					headerButtonText={headerButtonText}
					siteLogo={siteLogo}
					socialMedia={socialMedia}
				/>
			</div>
		</header>
	);
};

export default Header;
