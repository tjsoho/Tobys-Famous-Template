/* ************************************************************
                        NOTES
************************************************************ */
// Footer admin inputs component for managing footer content
// Features brand-consistent design with editable elements
// Follows the same pattern as other admin inputs
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { SaveBanner } from "../core/save-banner";
import { useState } from "react";
import EditableImage from "@/components/core/editable-image";
import { EditableElement } from "@/components/core/input";
import { FooterContent, FooterProps } from "@/app/_config";
import useUpdatePage from "@/utils/hooks/useUpdatePage";

/* ************************************************************
                        INTERFACES
************************************************************ */
// No additional interfaces needed - using imported types

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function FooterAdminInputs(props: FooterProps) {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const [logoImage, setLogoImage] = useState(props.content.logoImage);
    const [tagline, setTagline] = useState(props.content.tagline);
    const [taglineBold, setTaglineBold] = useState(props.content.taglineBold ?? false);
    const [phone, setPhone] = useState(props.content.phone);
    const [phoneBold, setPhoneBold] = useState(props.content.phoneBold ?? false);
    const [address, setAddress] = useState(props.content.address);
    const [addressBold, setAddressBold] = useState(props.content.addressBold ?? false);
    const [abn, setAbn] = useState(props.content.abn);
    const [abnBold, setAbnBold] = useState(props.content.abnBold ?? false);
    const [acn, setAcn] = useState(props.content.acn);
    const [acnBold, setAcnBold] = useState(props.content.acnBold ?? false);
    const [copyright, setCopyright] = useState(props.content.copyright);
    const [copyrightBold, setCopyrightBold] = useState(props.content.copyrightBold ?? false);

    const { isSaving, updatePage } = useUpdatePage<FooterContent>("footer");

    /* ************************************************************
                            FUNCTIONS
    ************************************************************ */
    const handleSave = async () => {
        await updatePage({
            ...props,
            content: {
                ...props.content,
                logoImage,
                tagline,
                taglineBold,
                phone,
                phoneBold,
                address,
                addressBold,
                abn,
                abnBold,
                acn,
                acnBold,
                copyright,
                copyrightBold,
            },
        });
    };

    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <div>
            <SaveBanner
                pageTitle="Footer Content"
                onSave={handleSave}
                isSaving={isSaving}
            />
            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    {/* ***************************************************************
					   FOOTER LOGO SECTION
					****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-6 rounded-2xl mb-8">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Footer Logo</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Footer Logo Image
                                </label>

                                {/* Image Preview */}
                                <div className="bg-brand-black/50 rounded-lg overflow-hidden max-w-md mb-4">
                                    <EditableImage
                                        src={logoImage}
                                        alt="Footer Logo"
                                        width={320}
                                        height={240}
                                        className="w-full h-auto object-contain hover:opacity-90 transition-opacity border-2 p-1 border-brand-yellow"
                                        onImageChange={setLogoImage}
                                        usage="footer"
                                    />
                                </div>

                                {/* Image URL Input */}
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-brand-black/70 text-xs mb-1">
                                            Or paste an image URL directly
                                        </label>
                                        <input
                                            type="url"
                                            value={logoImage}
                                            onChange={(e) => setLogoImage(e.target.value)}
                                            className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                                            placeholder="https://example.com/logo.png"
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // Clear the current image
                                                setLogoImage("/images/bwlogo.png");
                                            }}
                                            className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-colors"
                                        >
                                            Reset Logo
                                        </button>
                                    </div>
                                </div>

                                <p className="text-gray-400 text-xs mt-2">
                                    Click image to choose from library, or paste a direct URL above
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
					   FOOTER CONTENT SECTION
					****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">
                            Footer Content
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Tagline
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-20"
                                    onTextChange={setTagline}
                                    defaultValue={tagline}
                                />
                                <div className="mt-2">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={taglineBold}
                                            onChange={(e) => setTaglineBold(e.target.checked)}
                                            className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
                                        />
                                        <span className="text-brand-black text-sm">Make tagline bold (500 weight)</span>
                                    </label>
                                </div>
                                <p className="text-gray-400 text-xs mt-1">
                                    Company tagline that appears below the logo
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-brand-black text-sm font-medium mb-2">
                                        Phone Number
                                    </label>
                                    <EditableElement
                                        as="input"
                                        className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
                                        onTextChange={setPhone}
                                        defaultValue={phone}
                                    />
                                    <div className="mt-2">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={phoneBold}
                                                onChange={(e) => setPhoneBold(e.target.checked)}
                                                className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
                                            />
                                            <span className="text-brand-black text-sm">Make phone bold (500 weight)</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-brand-black text-sm font-medium mb-2">
                                        Address
                                    </label>
                                    <EditableElement
                                        as="input"
                                        className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
                                        onTextChange={setAddress}
                                        defaultValue={address}
                                    />
                                    <div className="mt-2">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={addressBold}
                                                onChange={(e) => setAddressBold(e.target.checked)}
                                                className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
                                            />
                                            <span className="text-brand-black text-sm">Make address bold (500 weight)</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-brand-black text-sm font-medium mb-2">
                                        ABN
                                    </label>
                                    <EditableElement
                                        as="input"
                                        className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
                                        onTextChange={setAbn}
                                        defaultValue={abn}
                                    />
                                    <div className="mt-2">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={abnBold}
                                                onChange={(e) => setAbnBold(e.target.checked)}
                                                className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
                                            />
                                            <span className="text-brand-black text-sm">Make ABN bold (500 weight)</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-brand-black text-sm font-medium mb-2">
                                        ACN
                                    </label>
                                    <EditableElement
                                        as="input"
                                        className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
                                        onTextChange={setAcn}
                                        defaultValue={acn}
                                    />
                                    <div className="mt-2">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={acnBold}
                                                onChange={(e) => setAcnBold(e.target.checked)}
                                                className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
                                            />
                                            <span className="text-brand-black text-sm">Make ACN bold (500 weight)</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Copyright Text
                                </label>
                                <EditableElement
                                    as="input"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
                                    onTextChange={setCopyright}
                                    defaultValue={copyright}
                                />
                                <div className="mt-2">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={copyrightBold}
                                            onChange={(e) => setCopyrightBold(e.target.checked)}
                                            className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
                                        />
                                        <span className="text-brand-black text-sm">Make copyright bold (500 weight)</span>
                                    </label>
                                </div>
                                <p className="text-gray-400 text-xs mt-1">
                                    Copyright notice that appears at the bottom of the footer
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
