"use client";

/**
 * Admin Inputs Design System — shared primitives.
 *
 * One shell, one set of input components, one CTA pattern. Compose these
 * across every admin page so they share the same look, behaviour, and
 * "Save" pattern. See docs/ADMIN_INPUTS_DESIGN_SYSTEM.md for the rationale.
 *
 * Colours are intentionally hard-coded to avoid clashing with shadcn's
 * `primary` token in the rest of the app. The admin teal is #1198A9 and
 * the admin navy is #2d3380.
 */

import { ReactNode } from "react";
import { Pencil, ChevronDown, ExternalLink, Sparkles } from "lucide-react";
import { SITE_PAGE_OPTIONS, isPopupAction } from "@/lib/site-pages";

const TEAL = "#1198A9";
const TEAL_BORDER = "rgba(17,152,169,0.30)";
const TEAL_BG_SOFT = "rgba(17,152,169,0.10)";
const TEAL_RING = "rgba(17,152,169,0.20)";
const NAVY = "#2d3380";
const NAVY_60 = "rgba(45,51,128,0.60)";
const NAVY_70 = "rgba(45,51,128,0.70)";
const NAVY_55 = "rgba(45,51,128,0.55)";
const NAVY_45 = "rgba(45,51,128,0.45)";
const NAVY_30 = "rgba(45,51,128,0.30)";

/* ═══════════════════════════════════════════════════════════════
   AdminPageShell — wraps every admin page body.
   Soft wash + constrained max-w-3xl column.
   ═══════════════════════════════════════════════════════════════ */
export function AdminPageShell({ children }: { children: ReactNode }) {
    return (
        <div className="bg-[#f7f8fb] px-4 py-6 md:px-6 md:py-8">
            <div className="mx-auto max-w-3xl space-y-6">{children}</div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   FieldLabel — uppercase tracked-out caption with optional hint.
   ═══════════════════════════════════════════════════════════════ */
export function FieldLabel({
    children,
    hint,
}: {
    children: ReactNode;
    hint?: string;
}) {
    return (
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
            <label
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: NAVY_60 }}
            >
                {children}
            </label>
            {hint && (
                <span className="text-[11px]" style={{ color: NAVY_45 }}>
                    {hint}
                </span>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   inputClass — every text/select/textarea uses this base.
   Single source of truth for input styling. Focus state in inline style.
   ═══════════════════════════════════════════════════════════════ */
export const inputClass =
    "w-full rounded-lg border border-[#e2e2e2] bg-white px-3 py-2.5 text-sm " +
    "text-[#2d3380] placeholder:text-[#2d3380]/30 " +
    "focus:outline-none focus:border-[#1198A9] focus:ring-2 focus:ring-[#1198A9]/20 " +
    "transition-colors";

/* ═══════════════════════════════════════════════════════════════
   TextInput — labelled single-line input.
   `size` constrains width: sm | md | full (default).
   ═══════════════════════════════════════════════════════════════ */
export function TextInput({
    label,
    value,
    onChange,
    placeholder,
    hint,
    size = "full",
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    hint?: string;
    size?: "sm" | "md" | "full";
    type?: "text" | "email" | "url" | "tel" | "number";
}) {
    const max =
        size === "sm" ? "max-w-xs" : size === "md" ? "max-w-md" : "w-full";
    return (
        <div>
            <FieldLabel hint={hint}>{label}</FieldLabel>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`${inputClass} ${max}`}
            />
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   TextAreaInput — same anatomy, multi-line.
   ═══════════════════════════════════════════════════════════════ */
export function TextAreaInput({
    label,
    value,
    onChange,
    rows = 4,
    placeholder,
    hint,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    rows?: number;
    placeholder?: string;
    hint?: string;
}) {
    return (
        <div>
            <FieldLabel hint={hint}>{label}</FieldLabel>
            <textarea
                rows={rows}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`${inputClass} resize-none`}
            />
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   FieldGroup — the card primitive.
   Title + optional description + optional right-aligned toolbar.
   Children get space-y-4.
   ═══════════════════════════════════════════════════════════════ */
export function FieldGroup({
    title,
    description,
    toolbar,
    children,
}: {
    title?: string;
    description?: string;
    toolbar?: ReactNode;
    children: ReactNode;
}) {
    return (
        <div className="rounded-xl border border-[#e2e2e2] bg-white p-5">
            {(title || toolbar) && (
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                        {title && (
                            <h3
                                className="text-sm font-semibold"
                                style={{ color: NAVY }}
                            >
                                {title}
                            </h3>
                        )}
                        {description && (
                            <p
                                className="mt-0.5 text-xs"
                                style={{ color: NAVY_55 }}
                            >
                                {description}
                            </p>
                        )}
                    </div>
                    {toolbar && <div className="shrink-0">{toolbar}</div>}
                </div>
            )}
            <div className="space-y-4">{children}</div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   ButtonActionPicker — page picker dropdown (uses SITE_PAGE_OPTIONS).
   ═══════════════════════════════════════════════════════════════ */
export function ButtonActionPicker({
    value,
    onChange,
    label = "Links to",
}: {
    value?: string;
    onChange: (value: string) => void;
    label?: string;
}) {
    return (
        <div>
            <FieldLabel>{label}</FieldLabel>
            <div className="relative">
                <select
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className={`${inputClass} cursor-pointer appearance-none pr-9`}
                >
                    <option value="">— Choose a destination —</option>
                    {SITE_PAGE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "rgba(45,51,128,0.50)" }}
                />
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   CtaField — combined button text + destination picker.
   Status pill underneath confirms what will happen.
   ═══════════════════════════════════════════════════════════════ */
export function CtaField({
    label,
    text,
    action,
    onTextChange,
    onActionChange,
    textPlaceholder = "e.g. Get Started",
}: {
    label: string;
    text: string;
    action?: string;
    onTextChange: (v: string) => void;
    onActionChange: (v: string) => void;
    textPlaceholder?: string;
}) {
    const isPopup = isPopupAction(action);
    return (
        <div className="rounded-xl border border-[#e2e2e2] bg-[#fafbfc] p-4">
            <p
                className="mb-3 text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: NAVY_70 }}
            >
                {label}
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[3fr_4fr]">
                <div>
                    <FieldLabel>Button Text</FieldLabel>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => onTextChange(e.target.value)}
                        placeholder={textPlaceholder}
                        className={inputClass}
                    />
                </div>
                <ButtonActionPicker
                    value={action}
                    onChange={onActionChange}
                />
            </div>
            <div
                className="mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={
                    isPopup
                        ? {
                            border: "1px solid rgb(253, 230, 138)",
                            backgroundColor: "rgb(255, 251, 235)",
                            color: "rgb(180, 83, 9)",
                        }
                        : {
                            border: `1px solid ${TEAL_BORDER}`,
                            backgroundColor: TEAL_BG_SOFT,
                            color: TEAL,
                        }
                }
            >
                {isPopup ? (
                    <>
                        <Sparkles size={11} />
                        Opens &ldquo;Coming Soon&rdquo; popup
                    </>
                ) : (
                    <>
                        <ExternalLink size={11} />
                        Goes to {action || "(no destination)"}
                    </>
                )}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   SectionTitleHeader — large heading with optional rename pencil.
   ═══════════════════════════════════════════════════════════════ */
export function SectionTitleHeader({
    title,
    isEditing = false,
    editValue = "",
    onEdit,
    onSave,
    onCancel,
    onEditValueChange,
}: {
    title: string;
    isEditing?: boolean;
    editValue?: string;
    onEdit?: () => void;
    onSave?: () => void;
    onCancel?: () => void;
    onEditValueChange?: (value: string) => void;
}) {
    if (isEditing && onSave && onCancel && onEditValueChange) {
        return (
            <div className="mb-5 flex items-center gap-2">
                <input
                    type="text"
                    value={editValue}
                    onChange={(e) => onEditValueChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") onSave();
                        if (e.key === "Escape") onCancel();
                    }}
                    className={`flex-1 ${inputClass}`}
                    autoFocus
                />
                <button
                    onClick={onSave}
                    className="rounded-lg px-3 py-2 text-xs font-semibold"
                    style={{
                        border: `1px solid ${TEAL_BORDER}`,
                        backgroundColor: TEAL_BG_SOFT,
                        color: TEAL,
                    }}
                >
                    Save
                </button>
                <button
                    onClick={onCancel}
                    className="rounded-lg border border-[#e2e2e2] bg-white px-3 py-2 text-xs font-semibold hover:bg-[#f5f6fa]"
                    style={{ color: NAVY_70 }}
                >
                    Cancel
                </button>
            </div>
        );
    }
    return (
        <div className="mb-5 flex items-center gap-2">
            <h2 className="text-lg font-semibold" style={{ color: NAVY }}>
                {title}
            </h2>
            {onEdit && (
                <button
                    onClick={onEdit}
                    className="flex items-center justify-center rounded-full p-1.5 hover:opacity-100"
                    style={{ color: NAVY_45 }}
                    title={`Rename ${title}`}
                >
                    <Pencil size={13} />
                </button>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   TabPills — generic tab bar.
   ═══════════════════════════════════════════════════════════════ */
export function TabPills<T extends string>({
    tabs,
    active,
    onChange,
}: {
    tabs: Array<{ value: T; label: string }>;
    active: T;
    onChange: (v: T) => void;
}) {
    return (
        <div className="rounded-xl border border-[#e2e2e2] bg-white p-2">
            <div className="flex flex-wrap gap-1">
                {tabs.map((tab) => {
                    const isActive = active === tab.value;
                    return (
                        <button
                            key={tab.value}
                            type="button"
                            onClick={() => onChange(tab.value)}
                            className="rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                            style={
                                isActive
                                    ? {
                                        backgroundColor: TEAL,
                                        color: "white",
                                        boxShadow:
                                            "0 1px 2px rgba(0,0,0,0.05)",
                                    }
                                    : { color: NAVY_70 }
                            }
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   SubtleButton — inline secondary action.
   ═══════════════════════════════════════════════════════════════ */
export function SubtleButton({
    children,
    onClick,
    variant = "default",
    type = "button",
    title,
}: {
    children: ReactNode;
    onClick?: () => void;
    variant?: "default" | "primary" | "danger";
    type?: "button" | "submit";
    title?: string;
}) {
    const styles: Record<string, React.CSSProperties> = {
        default: {
            border: "1px solid #e2e2e2",
            backgroundColor: "white",
            color: NAVY_70,
        },
        primary: {
            border: `1px solid ${TEAL_BORDER}`,
            backgroundColor: TEAL_BG_SOFT,
            color: TEAL,
        },
        danger: {
            border: "1px solid rgb(254, 202, 202)",
            backgroundColor: "rgb(254, 242, 242)",
            color: "rgb(185, 28, 28)",
        },
    };
    return (
        <button
            type={type}
            onClick={onClick}
            title={title}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
            style={styles[variant]}
        >
            {children}
        </button>
    );
}

// Exposed for consumers that want to align inline-styled bits to the system.
export const adminTokens = {
    teal: TEAL,
    navy: NAVY,
    navy60: NAVY_60,
    navy55: NAVY_55,
    navy30: NAVY_30,
    pageBg: "#f7f8fb",
    cardBg: "#ffffff",
    ctaBg: "#fafbfc",
    border: "#e2e2e2",
    focusRing: TEAL_RING,
};
