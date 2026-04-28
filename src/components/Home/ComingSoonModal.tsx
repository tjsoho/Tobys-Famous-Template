"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X, Sparkles } from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
    title?: string;
    body?: string;
    /** Logo shown in the brand band. Falls back to /placeholder.jpg. */
    logoSrc?: string;
}

/**
 * Coming Soon modal — used as the destination for any CTA whose action
 * is set to "popup" in the admin.
 *
 * IMPORTANT: rendered via a React portal to `document.body`. When a parent
 * has a CSS `transform`, `filter`, or `backdrop-filter` (Framer Motion adds
 * these during animations), `position: fixed` becomes contained by that
 * ancestor and the modal visibly drifts. The portal sidesteps that.
 */
export default function ComingSoonModal({
    open,
    onClose,
    title = "Coming Soon",
    body = "This feature is on the way. We're working on it and will let you know as soon as it's ready.",
    logoSrc = "/images/brightlogo.png",
}: Props) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    if (!mounted) return null;

    const overlay = (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="coming-soon-title"
                >
                    <motion.div
                        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl border border-[#e2e2e2]"
                        initial={{ opacity: 0, y: 16, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative h-32 bg-gradient-to-br from-[#0d3d4a] via-[#1f3680] to-[#2d3380] flex items-center justify-center">
                            <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg">
                                <Image
                                    src={logoSrc}
                                    alt=""
                                    width={64}
                                    height={64}
                                    className="w-12 h-auto object-contain"
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="px-6 sm:px-8 py-7 text-center">
                            <span
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-4"
                                style={{
                                    border: "1px solid rgba(45,51,128,0.40)",
                                    color: "#2d3380",
                                }}
                            >
                                <Sparkles className="w-3 h-3" />
                                In the works
                            </span>
                            <h3
                                id="coming-soon-title"
                                className="text-2xl font-medium mb-3"
                                style={{ color: "#2d3380" }}
                            >
                                {title}
                            </h3>
                            <p
                                className="text-sm leading-relaxed"
                                style={{ color: "rgba(45,51,128,0.70)" }}
                            >
                                {body}
                            </p>
                            <button
                                type="button"
                                onClick={onClose}
                                className="mt-7 inline-flex items-center justify-center rounded-full text-white px-6 py-2.5 text-sm font-semibold"
                                style={{ backgroundColor: "#1198A9" }}
                            >
                                Got it
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(overlay, document.body);
}
