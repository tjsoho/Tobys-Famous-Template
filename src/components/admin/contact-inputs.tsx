/* ************************************************************
                        NOTES
************************************************************ */
// Contact admin inputs component for managing contact page content
// Features brand-consistent design with editable elements
// Follows the same pattern as home-inputs.tsx
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { SaveBanner } from "../core/save-banner";
import { useState } from "react";
import EditableImage from "@/components/core/editable-image";
import { EditableElement } from "@/components/core/input";
import { ContactPageContent, ContactPageProps } from "@/app/_config";
import useUpdatePage from "@/utils/hooks/useUpdatePage";

/* ************************************************************
                        INTERFACES
************************************************************ */
// No additional interfaces needed - using imported types

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function ContactAdminInputs(props: ContactPageProps) {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const [heroTitle, setHeroTitle] = useState(props.content.heroTitle);
    const [heroTitleBold, setHeroTitleBold] = useState(props.content.heroTitleBold ?? false);
    const [heroSubtitle, setHeroSubtitle] = useState(props.content.heroSubtitle);
    const [heroSubtitleBold, setHeroSubtitleBold] = useState(props.content.heroSubtitleBold ?? false);
    const [heroDescription, setHeroDescription] = useState(props.content.heroDescription);
    const [heroDescriptionBold, setHeroDescriptionBold] = useState(props.content.heroDescriptionBold ?? false);
    const [contactTitle, setContactTitle] = useState(props.content.contactTitle);
    const [contactTitleBold, setContactTitleBold] = useState(props.content.contactTitleBold ?? false);
    const [contactDescription, setContactDescription] = useState(props.content.contactDescription);
    const [contactDescriptionBold, setContactDescriptionBold] = useState(props.content.contactDescriptionBold ?? false);
    const [contactImage, setContactImage] = useState(props.content.contactImage);

    const { isSaving, updatePage } = useUpdatePage<ContactPageContent>("contact");

    /* ************************************************************
                            FUNCTIONS
    ************************************************************ */
    const handleSave = async () => {
        await updatePage({
            ...props,
            content: {
                ...props.content,
                heroTitle,
                heroTitleBold,
                heroSubtitle,
                heroSubtitleBold,
                heroDescription,
                heroDescriptionBold,
                contactTitle,
                contactTitleBold,
                contactDescription,
                contactDescriptionBold,
                contactImage,
            },
        });
    };

    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <div>
            <SaveBanner
                pageTitle="Contact Page"
                onSave={handleSave}
                isSaving={isSaving}
            />
            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    {/* ***************************************************************
					   HERO SECTION
					****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-6 rounded-2xl mb-8">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Hero Section</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Hero Subtitle
                                </label>
                                <EditableElement
                                    as="input"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
                                    onTextChange={setHeroSubtitle}
                                    defaultValue={heroSubtitle}
                                />
                                <div className="mt-2">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={heroSubtitleBold}
                                            onChange={(e) => setHeroSubtitleBold(e.target.checked)}
                                            className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
                                        />
                                        <span className="text-brand-black text-sm">Make subtitle bold (500 weight)</span>
                                    </label>
                                </div>
                                <p className="text-gray-400 text-xs mt-1">
                                    Small text that appears above the main title
                                </p>
                            </div>

                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Hero Title
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
                                    onTextChange={setHeroTitle}
                                    defaultValue={heroTitle}
                                />
                                <div className="mt-2">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={heroTitleBold}
                                            onChange={(e) => setHeroTitleBold(e.target.checked)}
                                            className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
                                        />
                                        <span className="text-brand-black text-sm">Make title bold (500 weight)</span>
                                    </label>
                                </div>
                                <p className="text-gray-400 text-xs mt-1">
                                    Main hero title with highlighted text
                                </p>
                            </div>

                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Hero Description
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-24"
                                    onTextChange={setHeroDescription}
                                    defaultValue={heroDescription}
                                />
                                <div className="mt-2">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={heroDescriptionBold}
                                            onChange={(e) => setHeroDescriptionBold(e.target.checked)}
                                            className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
                                        />
                                        <span className="text-brand-black text-sm">Make description bold (500 weight)</span>
                                    </label>
                                </div>
                                <p className="text-gray-400 text-xs mt-1">
                                    Description text below the hero title
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
					   CONTACT INFO SECTION
					****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">
                            Contact Information Section
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Contact Section Title
                                </label>
                                <EditableElement
                                    as="input"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
                                    onTextChange={setContactTitle}
                                    defaultValue={contactTitle}
                                />
                                <div className="mt-2">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={contactTitleBold}
                                            onChange={(e) => setContactTitleBold(e.target.checked)}
                                            className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
                                        />
                                        <span className="text-brand-black text-sm">Make title bold (500 weight)</span>
                                    </label>
                                </div>
                                <p className="text-gray-400 text-xs mt-1">
                                    Title for the contact information section
                                </p>
                            </div>

                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Contact Description
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-24"
                                    onTextChange={setContactDescription}
                                    defaultValue={contactDescription}
                                />
                                <div className="mt-2">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={contactDescriptionBold}
                                            onChange={(e) => setContactDescriptionBold(e.target.checked)}
                                            className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
                                        />
                                        <span className="text-brand-black text-sm">Make description bold (500 weight)</span>
                                    </label>
                                </div>
                                <p className="text-gray-400 text-xs mt-1">
                                    Description text for the contact section
                                </p>
                            </div>

                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Contact Image
                                </label>

                                {/* Image Preview */}
                                <div className="bg-brand-black/50 rounded-lg overflow-hidden max-w-md mb-4">
                                    <EditableImage
                                        src={contactImage}
                                        alt="Contact Section Image"
                                        width={400}
                                        height={300}
                                        className="w-full h-auto object-contain hover:opacity-90 transition-opacity border-2 p-1 border-brand-yellow"
                                        onImageChange={setContactImage}
                                        usage="contact"
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
                                            value={contactImage}
                                            onChange={(e) => setContactImage(e.target.value)}
                                            className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // Clear the current image
                                                setContactImage("/placeholder.jpg");
                                            }}
                                            className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-colors"
                                        >
                                            Clear Image
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // Set the example URL you provided
                                                setContactImage("https://cdn.imagin.studio/getImage?customer=au-karia&make=toyota&modelFamily=corolla&modelRange=GR&modelVariant=ca&modelYear=2025&countryCode=0&licensePlateType=eu&paintId=Yellow&angle=204&tailoring=karia&width=3456&zoomLevel=1&billingTag=brightleasing-website");
                                            }}
                                            className="px-3 py-1 bg-brand-yellow/20 text-brand-black rounded text-xs hover:bg-brand-yellow/30 transition-colors"
                                        >
                                            Use Example
                                        </button>
                                    </div>
                                </div>

                                <p className="text-gray-400 text-xs mt-2">
                                    Click image to choose from library, or paste a direct URL above
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
