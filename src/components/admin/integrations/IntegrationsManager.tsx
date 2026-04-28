"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { upsertSiteIntegrationsAction } from "@/server-actions/integrations";
import type {
    SiteIntegrationsRecord,
    SaveSiteIntegrationsInput,
} from "@/data/integrations";

interface IntegrationsManagerProps {
    initial: SiteIntegrationsRecord;
}

const FIELDS: {
    key: keyof Omit<SaveSiteIntegrationsInput, "ga4_enabled" | "gtm_enabled" | "meta_pixel_enabled" | "hotjar_enabled">;
    enabledKey: keyof Pick<SaveSiteIntegrationsInput, "ga4_enabled" | "gtm_enabled" | "meta_pixel_enabled" | "hotjar_enabled">;
    label: string;
    placeholder: string;
    docsUrl: string;
    formatHint: string;
}[] = [
        {
            key: "ga4_measurement_id",
            enabledKey: "ga4_enabled",
            label: "Google Analytics 4 (GA4)",
            placeholder: "G-XXXXXXXXXX",
            docsUrl: "https://support.google.com/analytics/answer/9539598",
            formatHint: "Format: G- + alphanumeric (e.g. G-XXXXXXXXXX)",
        },
        {
            key: "gtm_container_id",
            enabledKey: "gtm_enabled",
            label: "Google Tag Manager",
            placeholder: "GTM-XXXXXXX",
            docsUrl: "https://support.google.com/tagmanager/answer/6103696",
            formatHint: "Format: GTM- + alphanumeric (e.g. GTM-XXXXXXX)",
        },
        {
            key: "meta_pixel_id",
            enabledKey: "meta_pixel_enabled",
            label: "Meta (Facebook) Pixel",
            placeholder: "1234567890123456",
            docsUrl: "https://www.facebook.com/business/help/952192354843755",
            formatHint: "Format: 6–20 digits",
        },
        {
            key: "hotjar_site_id",
            enabledKey: "hotjar_enabled",
            label: "Hotjar",
            placeholder: "1234567",
            docsUrl: "https://help.hotjar.com/hc/en-us/articles/115011867948",
            formatHint: "Format: 4–10 digits",
        },
    ];

export default function IntegrationsManager({ initial }: IntegrationsManagerProps) {
    const [form, setForm] = useState<SaveSiteIntegrationsInput>({
        ga4_measurement_id: initial.ga4_measurement_id,
        ga4_enabled: initial.ga4_enabled,
        gtm_container_id: initial.gtm_container_id,
        gtm_enabled: initial.gtm_enabled,
        meta_pixel_id: initial.meta_pixel_id,
        meta_pixel_enabled: initial.meta_pixel_enabled,
        hotjar_site_id: initial.hotjar_site_id,
        hotjar_enabled: initial.hotjar_enabled,
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const update = <K extends keyof SaveSiteIntegrationsInput>(
        key: K,
        value: SaveSiteIntegrationsInput[K],
    ) => {
        setForm((f) => ({ ...f, [key]: value }));
        setIsDirty(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        const result = await upsertSiteIntegrationsAction(form);
        setIsSaving(false);
        if (result.success) {
            toast.success("Integrations saved");
            setIsDirty(false);
        } else {
            toast.error(`Save failed: ${result.error || "Unknown error"}`);
        }
    };

    return (
        <main className="min-h-screen bg-brand-cream py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-brand-black mb-1">Integrations</h1>
                    <p className="text-brand-black/60 text-sm">
                        Tracking pixel / tag IDs for Google, Meta, and Hotjar. Toggle individual
                        services off without removing their IDs.
                    </p>
                </div>

                <div className="space-y-4">
                    {FIELDS.map((field) => {
                        const idValue = (form[field.key] as string | null) ?? "";
                        const enabledValue = form[field.enabledKey] as boolean;
                        return (
                            <div key={field.key} className="bg-white rounded-2xl shadow-sm border border-brand-yellow/20 p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h2 className="text-lg font-semibold text-brand-black">
                                            {field.label}
                                        </h2>
                                        <a
                                            href={field.docsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-brand-teal hover:underline"
                                        >
                                            Where do I find this? →
                                        </a>
                                    </div>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={enabledValue}
                                            onChange={(e) => update(field.enabledKey, e.target.checked)}
                                        />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-teal" />
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    value={idValue}
                                    onChange={(e) =>
                                        update(field.key, e.target.value || null)
                                    }
                                    placeholder={field.placeholder}
                                    className="w-full px-3 py-2 border border-brand-yellow/30 rounded-lg text-brand-black focus:outline-none focus:border-brand-yellow"
                                />
                                <p className="text-xs text-brand-black/50 mt-1">{field.formatHint}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 flex justify-end gap-3">
                    <button
                        onClick={handleSave}
                        disabled={!isDirty || isSaving}
                        className="px-6 py-3 bg-brand-yellow hover:bg-brand-yellow/80 disabled:opacity-50 disabled:cursor-not-allowed text-brand-black font-semibold rounded-full"
                    >
                        {isSaving ? "Saving..." : "Save changes"}
                    </button>
                </div>
            </div>
        </main>
    );
}
