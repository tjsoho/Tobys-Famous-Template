/* ************************************************************
                        NOTES
************************************************************ */
// Admin tiles component for the admin dashboard
// Features brand-colored cards with smooth animations
// Matches home page design language and styling
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faPhone,
    faArrowDown,
    faUsers,
    faPenToSquare,
    faCircleQuestion,
    faMagnifyingGlass,
    faImage,
    faChartBar,
} from "@fortawesome/free-solid-svg-icons";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface AdminTile {
    href: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
const AdminTiles = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, {
        amount: 0.3,
    });

    /* ************************************************************
                            ANIMATION VARIANTS
    ************************************************************ */
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
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.9
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1] as const
            }
        }
    };

    /* ************************************************************
                            TILE DATA
    ************************************************************ */
    const adminTiles: AdminTile[] = [
        {
            href: "/admin/home",
            icon: <FontAwesomeIcon icon={faHouse} />,
            title: "Home",
            description: "Manage homepage content",
            color: "bg-brand-yellow text-brand-black"
        },
        {
            href: "/admin/contact",
            icon: <FontAwesomeIcon icon={faPhone} />,
            title: "Contact",
            description: "Manage contact page content",
            color: "bg-brand-teal text-white"
        },
        {
            href: "/admin/footer",
            icon: <FontAwesomeIcon icon={faArrowDown} />,
            title: "Footer",
            description: "Manage footer content",
            color: "bg-gray-300 text-brand-black"
        },
        {
            href: "/admin/about-us",
            icon: <FontAwesomeIcon icon={faUsers} />,
            title: "About Us",
            description: "Manage company information",
            color: "bg-gray-300 text-brand-black"
        },
        {
            href: "/admin/blog",
            icon: <FontAwesomeIcon icon={faPenToSquare} />,
            title: "Articles",
            description: "Manage blog posts and content",
            color: "bg-brand-teal text-white"
        },
        {
            href: "/admin/faqs",
            icon: <FontAwesomeIcon icon={faCircleQuestion} />,
            title: "FAQs",
            description: "Manage FAQs and categories",
            color: "bg-brand-yellow text-brand-black"
        },
        {
            href: "/admin/seo",
            icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
            title: "SEO",
            description: "Manage SEO metadata for all pages",
            color: "bg-brand-yellow text-brand-black"
        },
        {
            href: "/admin/site-logo",
            icon: <FontAwesomeIcon icon={faImage} />,
            title: "Site Logo",
            description: "Manage site logo for header and admin",
            color: "bg-brand-teal text-white"
        },
        {
            href: "/admin/analytics",
            icon: <FontAwesomeIcon icon={faChartBar} />,
            title: "Analytics",
            description: "View site analytics and traffic data",
            color: "bg-green-600 text-white"
        },
    ];

    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="contents"
            >
                {adminTiles.map((tile, index) => (
                    <motion.div key={`${tile.href}-${index}`} variants={itemVariants}>
                        <Link
                            href={tile.href}
                            className={`group flex flex-col justify-center h-32 rounded-xl p-4 ${tile.color} hover:scale-105 transition-all duration-300 hover:shadow-lg block`}
                        >
                            <div className="text-center">
                                <div className="w-8 h-8 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                                    <span className="text-sm">{tile.icon}</span>
                                </div>
                                <h6 className="font-semibold mb-1">{tile.title}</h6>
                                
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default AdminTiles;
