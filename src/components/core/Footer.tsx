/* ************************************************************
                        NOTES
************************************************************ */
// Footer component with company branding, navigation links, and copyright
// Features animated sections and responsive design
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface FooterLink {
    label: string;
    href: string;
}

interface FooterColumn {
    title: string;
    links: FooterLink[];
}

interface FooterProps {
    content: {
        logoImage: string;
        tagline: string;
        taglineBold: boolean;
        phone: string;
        phoneBold: boolean;
        address: string;
        addressBold: boolean;
        abn: string;
        abnBold: boolean;
        acn: string;
        acnBold: boolean;
        copyright: string;
        copyrightBold: boolean;
    };
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
const Footer = ({ content }: FooterProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3 });

    const footerColumns: FooterColumn[] = [
        {
            title: "Company",
            links: [

                { label: "Blog", href: "/blog" }
            ]
        },
        {
            title: "Services",
            links: [
                { label: "Employees", href: "/contact" },
                { label: "Employers", href: "/contact" },
                { label: "Admin", href: "/admin" }
            ]
        },
        {
            title: "Legal",
            links: [
                { label: "Terms & Conditions", href: "/terms-and-conditions" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Use", href: "/terms-of-use" }
            ]
        },
        {
            title: "Say Hi",
            links: [
                { label: "Instagram", href: "https://instagram.com" },
                { label: "Facebook", href: "https://facebook.com" },
                { label: "Linked In", href: "https://linkedin.com" },
                { label: "Contact", href: "/contact" }
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <footer className="bg-brand-black text-white py-16" ref={ref}>
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12"
                >
                    {/* ************************************************************
              COMPANY BRANDING - Left section
          ************************************************************ */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-1"
                    >
                        <Link href="/" className="block mb-6">
                            <Image
                                src={content.logoImage}
                                alt="Bright Leasing Logo"
                                width={320}
                                height={240}
                                className="w-auto h-16"
                            />
                        </Link>
                        <motion.p
                            variants={itemVariants}
                            className={`text-white/80 leading-relaxed ${content.taglineBold ? 'p-bold' : ''}`}
                        >
                            {content.tagline.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    {index < content.tagline.split('\n').length - 1 && <br />}
                                </span>
                            ))}
                        </motion.p>
                    </motion.div>

                    {/* ************************************************************
              NAVIGATION COLUMNS - Right section
          ************************************************************ */}
                    <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {footerColumns.map((column) => (
                            <motion.div
                                key={column.title}
                                variants={itemVariants}
                                className="space-y-4"
                            >
                                <motion.h3
                                    variants={itemVariants}
                                    className="text-white font-semibold text-lg mb-4"
                                >
                                    {column.title}
                                </motion.h3>
                                <motion.ul
                                    variants={containerVariants}
                                    className="space-y-3"
                                >
                                    {column.links.map((link, index) => (
                                        <motion.li
                                            key={`${link.label}-${link.href}-${index}`}
                                            variants={itemVariants}
                                        >
                                            <Link
                                                href={link.href}
                                                className="text-white/70 hover:text-white transition-colors duration-300 block"
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ************************************************************
                            COMPANY CONTACT DETAILS - Horizontal row
                        ************************************************************ */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 text-sm mt-8"
                >
                    <div className="text-white/70">
                        <span className="font-semibold text-white">Phone:</span> <span className={content.phoneBold ? 'text-small-bold' : ''}>{content.phone}</span>
                    </div>
                    <div className="text-white/70">
                        <span className="font-semibold text-white">Address:</span> <span className={content.addressBold ? 'text-small-bold' : ''}>{content.address}</span>
                    </div>
                    <div className="text-white/70">
                        <span className="font-semibold text-white">ABN:</span> <span className={content.abnBold ? 'text-small-bold' : ''}>{content.abn}</span>
                    </div>
                    <div className="text-white/70">
                        <span className="font-semibold text-white">ACN:</span> <span className={content.acnBold ? 'text-small-bold' : ''}>{content.acn}</span>
                    </div>
                </motion.div>

                {/* ************************************************************
            COPYRIGHT - Bottom section
        ************************************************************ */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mt-12 pt-8 border-t border-white/10"
                >
                    <p className={`text-white/60 text-sm ${content.copyrightBold ? 'text-small-bold' : ''}`}>
                        {content.copyright}
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
