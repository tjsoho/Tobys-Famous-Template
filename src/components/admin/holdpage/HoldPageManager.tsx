"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import EditableImage from "@/components/core/editable-image";
import { upsertSiteSettingsAction } from "@/server-actions/site-settings";
import type {
    SiteSettingsRecord,
    SaveSiteSettingsInput,
} from "@/data/site-settings";
import HoldPage from "@/components/HoldPage";

interface HoldPageManagerProps {
    initial: SiteSettingsRecord;
}

export default function HoldPageManager({ initial }: HoldPageManagerProps) {
    const [form, setForm] = useState<SaveSiteSettingsInput>({
        holdpage_enabled: initial.holdpage_enabled,
        holdpage_title: initial.holdpage_title,
        holdpage_subtitle: initial.holdpage_subtitle,
        holdpage_image_url: initial.holdpage_image_url,
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const update = <K extends keyof SaveSiteSettingsInput>(
        key: K,
        value: SaveSiteSettingsInput[K],
    ) => {
        setForm((f) => ({ ...f, [key]: value }));
        setIsDirty(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        const result = await upsertSiteSettingsAction(form);
        setIsSaving(false);
        if (result.success) {
            toast.success("Hold page settings saved");
            setIsDirty(false);
        } else {
            toast.error(`Save failed: ${result.error || "Unknown error"}`);
        }
    };

    return (
        <main className="min-h-screen bg-brand-cream py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-brand-black mb-1">Hold Page</h1>
                    <p className="text-brand-black/60 text-sm">
                        When enabled, every public route shows a coming-soon splash. Admin login
                        is unaffected. Search engines are told not to index.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-brand-yellow/20 p-6 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h2 className="text-lg font-semibold text-brand-black">
                                Show hold page
                            </h2>
                            <p className="text-xs text-brand-black/50">
                                {form.holdpage_enabled
                                    ? "ON — public visitors see the splash."
                                    : "OFF — site is live."}
                            </p>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={form.holdpage_enabled}
                                onChange={(e) => update("holdpage_enabled", e.target.checked)}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-teal" />
                        </label>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-brand-yellow/20 p-6 mb-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-brand-black mb-1">
                            Headline (H1)
                        </label>
                        <input
                            type="text"
                            value={form.holdpage_title}
                            onChange={(e) => update("holdpage_title", e.target.value)}
                            className="w-full px-3 py-2 border border-brand-yellow/30 rounded-lg text-brand-black focus:outline-none focus:border-brand-yellow"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-brand-black mb-1">
                            Subtitle (H3)
                        </label>
                        <input
                            type="text"
                            value={form.holdpage_subtitle}
                            onChange={(e) => update("holdpage_subtitle", e.target.value)}
                            className="w-full px-3 py-2 border border-brand-yellow/30 rounded-lg text-brand-black focus:outline-none focus:border-brand-yellow"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-brand-black mb-2">
                            Hero image
                        </label>
                        <div className="bg-brand-cream/40 p-4 rounded-lg flex items-center justify-center">
                            <div className="w-64">
                                <EditableImage
                                    src={form.holdpage_image_url || "/placeholder.jpg"}
                                    alt="Hold page hero"
                                    width={400}
                                    height={300}
                                    className="w-full h-auto object-contain rounded-lg"
                                    onImageChange={(url) => update("holdpage_image_url", url || null)}
                                    usage="holdpage"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-brand-yellow/20 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-brand-black mb-3">Live preview</h2>
                    <div className="relative h-[420px] rounded-xl overflow-hidden border border-brand-yellow/20">
                        <div className="absolute inset-0 scale-50 origin-top-left w-[200%] h-[200%]">
                            <HoldPage
                                title={form.holdpage_title}
                                subtitle={form.holdpage_subtitle}
                                imageUrl={form.holdpage_image_url}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
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
