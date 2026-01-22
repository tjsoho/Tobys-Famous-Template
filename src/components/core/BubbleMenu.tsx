/* ************************************************************
                        NOTES
************************************************************ */
// Bubble menu component with Framer Motion animations and delayed text appearance
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { navigationLinks } from "@/components/core/navigation";
import { BWestSmallButton } from "../ui/b-west-small";
import { ensureAbsoluteUrl } from "@/utils/url";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface BubbleMenuProps {
    isOpen: boolean;
    onClose: () => void;
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

/* ************************************************************
                        COMPONENTS
************************************************************ */
const BubbleMenu = ({ isOpen, onClose, headerButtonText = "Start In 60 Seconds", siteLogo = "/images/brightlogo.png", socialMedia }: BubbleMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black bg-opacity-70"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Bubble Menu */}
                    <motion.div
                        className="bg-brand-yellow rounded-2xl relative z-10 flex flex-col"
                        style={{
                            width: '98vw',
                            height: '98vh',
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 10
                        }}
                        initial={{
                            width: '40px',
                            height: '40px',
                            opacity: 0
                        }}
                        animate={{
                            width: '95vw',
                            height: '95vh',
                            opacity: 1
                        }}
                        exit={{
                            width: '40px',
                            height: '40px',
                            opacity: 0,
                            transition: { delay: 0.3, duration: 0.6, ease: "easeOut" }
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut"
                        }}
                    >
                        {/* Close Button */}
                        <motion.button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-10 h-10 bg-brand-black text-white rounded-full flex items-center justify-center hover:bg-brand-black/80 transition-colors z-20"
                            aria-label="Close menu"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0, transition: { delay: 0.4, duration: 0.2 } }}
                            transition={{ delay: 0.8, duration: 0.3 }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>

                        {/* Logo - Top Left */}
                        <motion.div
                            className="absolute top-6 left-6"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20, transition: { delay: 0.1, duration: 0.2 } }}
                            transition={{ delay: 0.3, duration: 0.3 }}
                        >
                            <Link href="/" aria-label="Bright Leasing Home" className="flex items-center">
                                <Image src={siteLogo} alt="Bright Leasing Logo" width={120} height={100} className="w-[150px] h-auto" />
                            </Link>
                        </motion.div>

                        {/* Menu Content - Middle */}
                        <motion.div
                            className="flex flex-col items-center justify-center h-full text-brand-black px-4 sm:px-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20, transition: { delay: 0.1, duration: 0.2 } }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            <motion.h2
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 lg:mb-16 text-center text-brand-black"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20, transition: { delay: 0.1, duration: 0.2 } }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                            >
                                Menu
                            </motion.h2>

                            {/* Navigation Links */}
                            <motion.div
                                className="flex flex-col lg:flex-row gap-4 lg:gap-8 max-w-6xl w-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { delay: 0.1, duration: 0.2 } }}
                                transition={{ delay: 0.4, duration: 0.3 }}
                            >
                                {/* Left Column */}
                                <div className="flex-1 flex flex-col gap-4">
                                    {navigationLinks.slice(0, Math.ceil(navigationLinks.length / 3)).map((link, index) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -30, transition: { delay: 0.1, duration: 0.2 } }}
                                            transition={{
                                                delay: 0.5 + (index * 0.05),
                                                duration: 0.3,
                                                ease: "easeOut"
                                            }}
                                        >
                                            <Link
                                                href={link.href}
                                                className="block text-lg lg:text-xl font-medium text-brand-black hover:text-brand-teal transition-all duration-300 py-3 px-4 lg:px-6 rounded-full hover:bg-brand-teal/10 hover:scale-105 border-2 border-transparent hover:border-brand-teal/20 text-center lg:text-left"
                                                onClick={onClose}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* First Divider */}
                                <div className="hidden lg:block w-px bg-brand-black/20"></div>

                                {/* Middle Column */}
                                <div className="flex-1 flex flex-col gap-4">
                                    {navigationLinks.slice(Math.ceil(navigationLinks.length / 3), Math.ceil(navigationLinks.length / 3) * 2).map((link, index) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 30, transition: { delay: 0.1, duration: 0.2 } }}
                                            transition={{
                                                delay: 0.5 + ((index + Math.ceil(navigationLinks.length / 3)) * 0.05),
                                                duration: 0.3,
                                                ease: "easeOut"
                                            }}
                                        >
                                            <Link
                                                href={link.href}
                                                className="block text-lg lg:text-xl font-medium text-brand-black hover:text-brand-teal transition-all duration-300 py-3 px-4 lg:px-6 rounded-full hover:bg-brand-teal/10 hover:scale-105 border-2 border-transparent hover:border-brand-teal/20 text-center lg:text-left"
                                                onClick={onClose}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Second Divider */}
                                <div className="hidden lg:block w-px bg-brand-black/20"></div>

                                {/* Right Column */}
                                <div className="flex-1 flex flex-col gap-4">
                                    {navigationLinks.slice(Math.ceil(navigationLinks.length / 3) * 2).map((link, index) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 30, transition: { delay: 0.1, duration: 0.2 } }}
                                            transition={{
                                                delay: 0.5 + ((index + Math.ceil(navigationLinks.length / 3) * 2) * 0.05),
                                                duration: 0.3,
                                                ease: "easeOut"
                                            }}
                                        >
                                            <Link
                                                href={link.href}
                                                className="block text-lg lg:text-xl font-medium text-brand-black hover:text-brand-teal transition-all duration-300 py-3 px-4 lg:px-6 rounded-full hover:bg-brand-teal/10 hover:scale-105 border-2 border-transparent hover:border-brand-teal/20 text-center lg:text-left"
                                                onClick={onClose}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Action Button */}
                            <motion.div
                                className="mt-16"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8, transition: { delay: 0.1, duration: 0.2 } }}
                                transition={{ delay: 0.7, duration: 0.3 }}
                            >
                                <BWestSmallButton text={headerButtonText} variant="inverted" onClick={() => window.location.href = '/contact'} />
                            </motion.div>
                        </motion.div>

                        {/* Divider and Legal Links - Bottom */}
                        <motion.div
                            className="absolute bottom-6 left-6 right-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20, transition: { delay: 0.1, duration: 0.2 } }}
                            transition={{ delay: 0.8, duration: 0.3 }}
                        >
                            {/* Divider */}
                            <div className="border-t border-brand-black/20 mb-4"></div>

                            {/* Legal Links and Socials */}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-brand-black/70">
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/privacy" className="hover:text-brand-teal transition-colors">Privacy Policy</Link>
                                    <Link href="/terms" className="hover:text-brand-teal transition-colors">Terms of Service</Link>
                                    <Link href="/cookies" className="hover:text-brand-teal transition-colors">Cookie Policy</Link>
                                </div>

                                {/* Social Links */}
                                <div className="flex gap-4">
                                    {socialMedia?.instagram && ensureAbsoluteUrl(socialMedia.instagram) && (
                                        <a href={ensureAbsoluteUrl(socialMedia.instagram)} target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition-colors" aria-label="Instagram">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                            </svg>
                                        </a>
                                    )}
                                    {socialMedia?.facebook && ensureAbsoluteUrl(socialMedia.facebook) && (
                                        <a href={ensureAbsoluteUrl(socialMedia.facebook)} target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition-colors" aria-label="Facebook">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                        </a>
                                    )}
                                    {socialMedia?.youtube && ensureAbsoluteUrl(socialMedia.youtube) && (
                                        <a href={ensureAbsoluteUrl(socialMedia.youtube)} target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition-colors" aria-label="YouTube">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                            </svg>
                                        </a>
                                    )}
                                    {socialMedia?.pinterest && ensureAbsoluteUrl(socialMedia.pinterest) && (
                                        <a href={ensureAbsoluteUrl(socialMedia.pinterest)} target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition-colors" aria-label="Pinterest">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12c5.084 0 9.426-3.163 11.174-7.637-.15-.785-.298-1.98.062-2.82.366-.84 2.31-14.4 2.31-14.4s-.58-1.15-1.58-1.15c-1.38 0-3.8.84-5.38 3.9-1.02 1.98-.72 3.6-.52 4.2.35 1.5 1.48 1.82 2.72 1.1 1.5-1.08 2.1-2.68 2.1-4.82 0-2.4-1.6-4.08-3.9-4.08-2.7 0-4.4 2.04-4.4 4.8 0 1.8.68 3.12 1.7 3.68.2.12.3.06.35-.1l.35-1.4c.05-.2.03-.28-.15-.45-.42-.5-.7-1.26-.7-2.28 0-3.12 2.25-5.88 5.88-5.88 3.1 0 5.4 2.16 5.4 5.04 0 3.12-1.96 5.76-4.8 5.76-.94 0-1.84-.5-2.14-1.1l-.58 2.2c-.2.8-.75 1.8-1.12 2.4.84.26 1.74.4 2.68.4 6.627 0 12-5.372 12-12S18.627 0 12 0z"/>
                                            </svg>
                                        </a>
                                    )}
                                    {socialMedia?.linkedin && ensureAbsoluteUrl(socialMedia.linkedin) && (
                                        <a href={ensureAbsoluteUrl(socialMedia.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition-colors" aria-label="LinkedIn">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        </a>
                                    )}
                                    {socialMedia?.tiktok && ensureAbsoluteUrl(socialMedia.tiktok) && (
                                        <a href={ensureAbsoluteUrl(socialMedia.tiktok)} target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition-colors" aria-label="TikTok">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

/* ************************************************************
                        EXPORTS
************************************************************ */
export default BubbleMenu;
