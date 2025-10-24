/* ************************************************************
                        NOTES
************************************************************ */
// Privacy Policy admin inputs component
// Features: Individual input fields for each privacy policy section
// Layout: Matches home inputs styling with sections and fields
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { useState } from "react";
import { SaveBanner } from "@/components/core/save-banner";
import { EditableElement } from "@/components/core/input";
import useUpdatePage from "@/utils/hooks/useUpdatePage";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface PrivacyPolicyContent {
    section1: string;
    section2: string;
    section3: string;
    section4: string;
    section5: string;
    section6: string;
    section7: string;
    section8: string;
    section9: string;
    section10: string;
    section11: string;
    section12: string;
    section13: string;
    section14: string;
    section15: string;
    section16: string;
    section17: string;
    section18: string;
    section19: string;
    section20: string;
    section21: string;
    section22: string;
    section23: string;
}

interface PrivacyPolicyProps {
    title: string;
    description: string;
    slug: string;
    content: PrivacyPolicyContent;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function PrivacyPolicyInputs(props: PrivacyPolicyProps) {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const [section1, setSection1] = useState(props.content.section1);
    const [section2, setSection2] = useState(props.content.section2);
    const [section3, setSection3] = useState(props.content.section3);
    const [section4, setSection4] = useState(props.content.section4);
    const [section5, setSection5] = useState(props.content.section5);
    const [section6, setSection6] = useState(props.content.section6);
    const [section7, setSection7] = useState(props.content.section7);
    const [section8, setSection8] = useState(props.content.section8);
    const [section9, setSection9] = useState(props.content.section9);
    const [section10, setSection10] = useState(props.content.section10);
    const [section11, setSection11] = useState(props.content.section11);
    const [section12, setSection12] = useState(props.content.section12);
    const [section13, setSection13] = useState(props.content.section13);
    const [section14, setSection14] = useState(props.content.section14);
    const [section15, setSection15] = useState(props.content.section15);
    const [section16, setSection16] = useState(props.content.section16);
    const [section17, setSection17] = useState(props.content.section17);
    const [section18, setSection18] = useState(props.content.section18);
    const [section19, setSection19] = useState(props.content.section19);
    const [section20, setSection20] = useState(props.content.section20);
    const [section21, setSection21] = useState(props.content.section21);
    const [section22, setSection22] = useState(props.content.section22);
    const [section23, setSection23] = useState(props.content.section23);

    const { isSaving, updatePage } = useUpdatePage<PrivacyPolicyContent>("privacy-policy");

    /* ************************************************************
                            FUNCTIONS
    ************************************************************ */
    const handleSave = async () => {
        await updatePage({
            title: props.title,
            description: props.description,
            slug: props.slug,
            content: {
                section1,
                section2,
                section3,
                section4,
                section5,
                section6,
                section7,
                section8,
                section9,
                section10,
                section11,
                section12,
                section13,
                section14,
                section15,
                section16,
                section17,
                section18,
                section19,
                section20,
                section21,
                section22,
                section23,
            }
        });
    };

    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <div>
            <SaveBanner
                pageTitle="Privacy Policy"
                onSave={handleSave}
                isSaving={isSaving}
            />

            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    {/* ***************************************************************
              SECTION 1: WHAT WE COLLECT
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 1 - What We Collect</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection1}
                                    defaultValue={section1}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Information about what personal data we collect
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 2: HOW WE COLLECT INFORMATION
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 2 - How We Collect Information</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection2}
                                    defaultValue={section2}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Methods and sources of data collection
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 3: WHY WE COLLECT, USE & DISCLOSE
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 3 - Why We Collect, Use & Disclose</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection3}
                                    defaultValue={section3}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Purposes for collecting and using personal information
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 4: CREDIT-RELATED INFORMATION
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 4 - Credit-Related Information</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection4}
                                    defaultValue={section4}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Handling of credit-related information
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 5: DISCLOSURES TO THIRD PARTIES
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 5 - Disclosures to Third Parties</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection5}
                                    defaultValue={section5}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    When and how we share information with third parties
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 6: OVERSEAS DISCLOSURES
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 6 - Overseas Disclosures</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection6}
                                    defaultValue={section6}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    International data transfers and storage
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 7: MARKETING
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 7 - Marketing</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection7}
                                    defaultValue={section7}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Marketing communications and opt-out options
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 8: COOKIES & WEBSITE ANALYTICS
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 8 - Cookies & Website Analytics</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection8}
                                    defaultValue={section8}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Use of cookies and website tracking
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 9: SECURITY
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 9 - Security</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection9}
                                    defaultValue={section9}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Data security measures and protections
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 10: ACCESS & CORRECTION
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 10 - Access & Correction</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection10}
                                    defaultValue={section10}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    User rights to access and correct personal information
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 11: RETENTION
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 11 - Retention</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection11}
                                    defaultValue={section11}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How long we keep personal information
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 12: NOTIFIABLE DATA BREACHES
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 12 - Notifiable Data Breaches</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection12}
                                    defaultValue={section12}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Data breach notification procedures
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 13: COMPLAINTS
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 13 - Complaints</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection13}
                                    defaultValue={section13}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How to make privacy complaints
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 14: CHANGES TO THIS POLICY
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 14 - Changes to this Policy</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection14}
                                    defaultValue={section14}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How we notify users of policy changes
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 15: CONTACT US
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 15 - Contact Us</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Contact Information
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection15}
                                    defaultValue={section15}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Contact information for privacy inquiries
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 16: INDEMNITY
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 16 - Indemnity</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection16}
                                    defaultValue={section16}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Indemnity clauses
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 17: PROHIBITED CONDUCT
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 17 - Prohibited Conduct</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection17}
                                    defaultValue={section17}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Prohibited uses of the website
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 18: VARIATION OF TERMS
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 18 - Variation of Terms</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection18}
                                    defaultValue={section18}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How terms may be changed
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 19: SURVIVAL CLAUSE
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 19 - Survival Clause</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection19}
                                    defaultValue={section19}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Clauses that survive termination
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 20: NOTICES
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 20 - Notices</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection20}
                                    defaultValue={section20}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How notices are delivered
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 21: SEVERABILITY
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 21 - Severability</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection21}
                                    defaultValue={section21}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Severability of terms
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 22: ENTIRE AGREEMENT
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 22 - Entire Agreement</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection22}
                                    defaultValue={section22}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Entire agreement clause
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 23: DATA BREACH NOTIFICATION
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 23 - Data Breach Notification</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection23}
                                    defaultValue={section23}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Data breach notification requirements
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */