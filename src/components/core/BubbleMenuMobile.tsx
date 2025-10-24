/* ************************************************************
                        NOTES
************************************************************ */
// Mobile-specific bubble menu component with optimized mobile styling
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
interface BubbleMenuMobileProps {
    isOpen: boolean;
    onClose: () => void;
    headerButtonText?: string;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
const BubbleMenuMobile = ({ isOpen, onClose, headerButtonText = "Start In 60 Seconds" }: BubbleMenuMobileProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Mobile Bubble Menu */}

                    <motion.div
                        className="fixed inset-0 bg-brand-yellow z-10 flex flex-col "
                        initial={{
                            scale: 0,
                            opacity: 0
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1
                        }}
                        exit={{
                            scale: 0,
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
                            className="absolute top-4 right-4 w-12 h-12 bg-brand-black text-white rounded-full flex items-center justify-center hover:bg-brand-black/80 transition-colors z-20"
                            aria-label="Close menu"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0, transition: { delay: 0.4, duration: 0.2 } }}
                            transition={{ delay: 0.8, duration: 0.3 }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>

                        {/* Logo - Top Left */}
                        <motion.div
                            className="absolute top-4 left-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20, transition: { delay: 0.1, duration: 0.2 } }}
                            transition={{ delay: 0.3, duration: 0.3 }}
                        >
                            <Link href="/" className="flex items-center">
                                <Image src="/images/bwlogo.png" alt="Logo" width={100} height={80} className="w-[120px] h-auto" />
                            </Link>
                        </motion.div>

                        {/* Menu Content - Middle */}
                        <motion.div
                            className="flex flex-col items-center justify-center h-full text-brand-black px-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20, transition: { delay: 0.1, duration: 0.2 } }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >


                            {/* Navigation Links - Mobile Optimized */}
                            <motion.div
                                className="flex flex-col gap-2 w-full max-w-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { delay: 0.1, duration: 0.2 } }}
                                transition={{ delay: 0.4, duration: 0.3 }}
                            >
                                {navigationLinks.filter(link => link.href !== '/admin').map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 30, transition: { delay: 0.1, duration: 0.2 } }}
                                        transition={{
                                            delay: 0.5 + (index * 0.1),
                                            duration: 0.3,
                                            ease: "easeOut"
                                        }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="block text-xl font-medium text-brand-black hover:text-brand-teal transition-all duration-300 py-4 px-6 rounded-full hover:bg-brand-teal/10 hover:scale-105 border-2 border-transparent hover:border-brand-teal/20 text-center"
                                            onClick={onClose}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Action Button - Mobile */}
                            <motion.div
                                className="mt-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20, transition: { delay: 0.1, duration: 0.2 } }}
                                transition={{ delay: 0.8, duration: 0.3 }}
                            >
                                <BWestSmallButton text={headerButtonText} variant="inverted" onClick={() => window.location.href = '/contact'} />
                            </motion.div>
                        </motion.div>

                        {/* Legal Links - Bottom */}
                        <motion.div
                            className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-brand-black/70"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { delay: 0.1, duration: 0.2 } }}
                            transition={{ delay: 0.9, duration: 0.3 }}
                        >
                            <div className="flex gap-4">
                                <Link href="/privacy" className="hover:text-brand-black transition-colors" onClick={onClose}>
                                    Privacy Policy
                                </Link>
                                <Link href="/terms" className="hover:text-brand-black transition-colors" onClick={onClose}>
                                    Terms of Service
                                </Link>
                            </div>
                            <div className="flex gap-4">
                                <Link href="/linkedin" className="hover:text-brand-black transition-colors" onClick={onClose}>
                                    LinkedIn
                                </Link>
                                <Link href="/twitter" className="hover:text-brand-black transition-colors" onClick={onClose}>
                                    Twitter
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BubbleMenuMobile;

