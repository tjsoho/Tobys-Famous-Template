/* ************************************************************
                        NOTES
************************************************************ */
// Terms of Use admin inputs component
// Features: Individual input fields for each terms of use section
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
interface TermsOfUseContent {
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
}

interface TermsOfUseProps {
    title: string;
    description: string;
    slug: string;
    content: TermsOfUseContent;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function TermsOfUseInputs(props: TermsOfUseProps) {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const [section1, setSection1] = useState(props.content.section1 || "Information on the Site is of a general nature and is not legal, tax or financial advice.");
    const [section2, setSection2] = useState(props.content.section2 || "You must not use the Site for unlawful purposes or disrupt its operation.");
    const [section3, setSection3] = useState(props.content.section3 || "You are responsible for maintaining the security of your account credentials.");
    const [section4, setSection4] = useState(props.content.section4 || "We own or license all IP in the Site. You may view but not reproduce content without consent.");
    const [section5, setSection5] = useState(props.content.section5 || "We are not responsible for Third-Party websites or tools linked from our Site.");
    const [section6, setSection6] = useState(props.content.section6 || "Our Privacy Policy explains how we collect, use and disclose personal information.");
    const [section7, setSection7] = useState(props.content.section7 || "The Site is provided 'as is'. Liability is excluded to the extent permitted by law.");
    const [section8, setSection8] = useState(props.content.section8 || "We may modify or discontinue the Site at any time without notice.");
    const [section9, setSection9] = useState(props.content.section9 || "These Terms of Use are governed by the laws of New South Wales, Australia.");
    const [section10, setSection10] = useState(props.content.section10 || "Brightwork Group Pty Ltd trading as Bright Leasing (ABN 20 688 482 975)\nEmail: hello@brightleasing.com.au\nPhone: 1300 988 938");
    const [section11, setSection11] = useState(props.content.section11 || "You agree to indemnify Bright Leasing and its officers, employees and agents against all claims, losses, damages, costs (including legal costs) arising out of your breach of these Terms or misuse of our services.");
    const [section12, setSection12] = useState(props.content.section12 || "You must not use robots, spiders, data-mining tools or other automated means to access, extract or copy content from our website or services without our prior written consent.");
    const [section13, setSection13] = useState(props.content.section13 || "We may change these Terms, Privacy Policy or Terms of Use at any time by publishing a revised version on our Site with an updated effective date. Continued use after the revision indicates your acceptance. We may also notify you via email or site banner.");
    const [section14, setSection14] = useState(props.content.section14 || "Clauses such as liability, indemnity, confidentiality, intellectual property, and governing law survive termination or expiry of these agreements.");
    const [section15, setSection15] = useState(props.content.section15 || "All notices under these agreements must be in writing, and delivered via email (to your registered email), or by post to the address provided. Notices are effective on receipt (or 3 business days if by post).");
    const [section16, setSection16] = useState(props.content.section16 || "If a provision is invalid or unenforceable, it must be read down or severed, and the rest of the Terms remain in force.");
    const [section17, setSection17] = useState(props.content.section17 || "These Terms, together with any proposal or documentation expressly referring to them, constitute the entire agreement. In the event of conflict, these Terms prevail unless otherwise stated in the proposal.");
    const [section18, setSection18] = useState(props.content.section18 || "If a data breach is likely to result in serious harm, we will notify affected individuals and the OAIC in accordance with the Notifiable Data Breaches scheme under the Privacy Act.");

    const { isSaving, updatePage } = useUpdatePage<TermsOfUseContent>("terms-of-use");

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
            }
        });
    };

    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <div>
            <SaveBanner
                pageTitle="Terms of Use"
                onSave={handleSave}
                isSaving={isSaving}
            />

            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    {/* ***************************************************************
              SECTION 1: SITE CONTENT
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 1 - Site Content (General Information Only)</h2>
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
                                    General information disclaimer
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 2: YOUR USE OF THE SITE
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 2 - Your Use of the Site</h2>
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
                                    User obligations and restrictions
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 3: ACCOUNTS & SECURITY
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 3 - Accounts & Security</h2>
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
                                    Account security responsibilities
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 4: INTELLECTUAL PROPERTY
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 4 - Intellectual Property</h2>
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
                                    IP rights and usage restrictions
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 5: THIRD-PARTY LINKS & TOOLS
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 5 - Third-Party Links & Tools</h2>
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
                                    Third-party content disclaimer
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 6: PRIVACY
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 6 - Privacy</h2>
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
                                    Privacy policy reference
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 7: DISCLAIMERS & LIABILITY
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 7 - Disclaimers & Liability</h2>
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
                                    Liability limitations
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 8: CHANGES TO THE SITE
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 8 - Changes to the Site</h2>
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
                                    Site modification rights
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 9: GOVERNING LAW
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 9 - Governing Law</h2>
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
                                    Applicable law and jurisdiction
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 10: CONTACT
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 10 - Contact</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Contact Information
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection10}
                                    defaultValue={section10}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Contact information
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 11: INDEMNITY
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 11 - Indemnity</h2>
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
                                    Indemnity clauses
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 12: PROHIBITED CONDUCT
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 12 - Prohibited Conduct</h2>
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
                                    Prohibited uses of the website
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 13: VARIATION OF TERMS
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 13 - Variation of Terms</h2>
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
                                    How terms may be changed
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 14: SURVIVAL CLAUSE
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 14 - Survival Clause</h2>
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
                                    Clauses that survive termination
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 15: NOTICES
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 15 - Notices</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection15}
                                    defaultValue={section15}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How notices are delivered
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 16: SEVERABILITY
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 16 - Severability</h2>
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
                                    Severability of terms
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 17: ENTIRE AGREEMENT
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 17 - Entire Agreement</h2>
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
                                    Entire agreement clause
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 18: DATA BREACH NOTIFICATION
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 18 - Data Breach Notification</h2>
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