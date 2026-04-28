"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { isPopupAction } from "@/lib/site-pages";
import ComingSoonModal from "./ComingSoonModal";

interface Props {
    /**
     * Destination value as stored in the admin. Either a path like "/about-us"
     * or the literal "popup" sentinel (use {@link isPopupAction}).
     */
    action?: string | null;
    children: React.ReactNode;
    variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
    size?: "sm" | "default" | "lg" | "icon";
    className?: string;
    /** Optional logo override forwarded to the popup. */
    popupLogoSrc?: string;
    /** Optional title/body overrides for the popup. */
    popupTitle?: string;
    popupBody?: string;
}

/**
 * Universal CTA button — checks the admin action and either navigates to
 * an internal page (default link behaviour) or opens the Coming Soon modal.
 */
export default function DynamicCtaButton({
    action,
    children,
    variant = "default",
    size = "default",
    className,
    popupLogoSrc,
    popupTitle,
    popupBody,
}: Props) {
    const [open, setOpen] = useState(false);

    if (isPopupAction(action ?? undefined)) {
        return (
            <>
                <Button
                    variant={variant}
                    size={size}
                    className={className}
                    onClick={() => setOpen(true)}
                >
                    {children}
                </Button>
                <ComingSoonModal
                    open={open}
                    onClose={() => setOpen(false)}
                    title={popupTitle}
                    body={popupBody}
                    logoSrc={popupLogoSrc}
                />
            </>
        );
    }

    return (
        <Button asChild variant={variant} size={size} className={className}>
            <a href={action || "/"}>{children}</a>
        </Button>
    );
}
