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

/* ************************************************************
                        INTERFACES
************************************************************ */
interface BubbleMenuProps {
    isOpen: boolean;
    onClose: () => void;
    headerButtonText?: string;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
const BubbleMenu = ({ isOpen, onClose, headerButtonText = "Start In 60 Seconds" }: BubbleMenuProps) => {
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
                            <Link href="/" className="flex items-center">
                                <Image src="/images/bwlogo.png" alt="Logo" width={120} height={100} className="w-[150px] h-auto" />
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
                                    <a href="#" className="hover:text-brand-teal transition-colors" aria-label="Facebook">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="hover:text-brand-teal transition-colors" aria-label="Twitter">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="hover:text-brand-teal transition-colors" aria-label="LinkedIn">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
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
