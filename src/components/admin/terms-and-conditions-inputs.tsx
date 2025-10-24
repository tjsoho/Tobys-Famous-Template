/* ************************************************************
                        NOTES
************************************************************ */
// Terms & Conditions admin inputs component
// Features: Individual input fields for each terms section
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
interface TermsAndConditionsContent {
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
    section24: string;
    section25: string;
    section26: string;
}

interface TermsAndConditionsProps {
    title: string;
    description: string;
    slug: string;
    content: TermsAndConditionsContent;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function TermsAndConditionsInputs(props: TermsAndConditionsProps) {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const [section1, setSection1] = useState(props.content.section1 || "These Terms & Conditions (Terms) apply to quotes, products and services provided by Brightwork Group Pty Ltd trading as Bright Leasing (Bright Leasing, we, us) including novated leasing and related salary-packaging services. By requesting or accepting a quote, proceeding with an application, or using our services, you agree to these Terms.");
    const [section2, setSection2] = useState(props.content.section2 || "We arrange novated leasing solutions and related services and may act as an introducer or broker to lenders, salary-packaging providers, dealers and insurers (Third Parties). We do not provide legal, tax or financial advice. Consider your circumstances and seek independent advice.");
    const [section3, setSection3] = useState(props.content.section3 || "Eligibility is subject to your employment status, employer participation in salary packaging, credit assessment, lending criteria and vehicle availability. You confirm information you provide is true, complete and not misleading.");
    const [section4, setSection4] = useState(props.content.section4 || "Quotes are illustrative only and subject to change until final approval and documentation by the relevant Third Parties.");
    const [section5, setSection5] = useState(props.content.section5 || "Fees and charges may be payable to us and/or Third Parties. We may receive commissions or other benefits from Third Parties. You may request details of such benefits.");
    const [section6, setSection6] = useState(props.content.section6 || "Novated leasing requires a deed of novation with your employer. If your employer does not participate or withdraws participation, your quote or arrangement may not proceed.");
    const [section7, setSection7] = useState(props.content.section7 || "Vehicle images and specifications are for illustration. Availability, price, specifications and delivery timeframes are set by dealers/manufacturers and are subject to change.");
    const [section8, setSection8] = useState(props.content.section8 || "Comprehensive insurance is typically required for financed vehicles. Inclusion of running costs in a budget does not guarantee coverage of actual expenses.");
    const [section9, setSection9] = useState(props.content.section9 || "Changes in employment, remuneration, tax rates, usage, interest rates or supplier pricing may affect your arrangement.");
    const [section10, setSection10] = useState(props.content.section10 || "Nothing in these Terms excludes or limits consumer guarantees under the Australian Consumer Law (ACL).");
    const [section11, setSection11] = useState(props.content.section11 || "To the maximum extent permitted by law, we are not liable for indirect or consequential loss.");
    const [section12, setSection12] = useState(props.content.section12 || "You must provide accurate and timely information and notify us of changes to your employment or contact details.");
    const [section13, setSection13] = useState(props.content.section13 || "We handle personal information in accordance with our Privacy Policy.");
    const [section14, setSection14] = useState(props.content.section14 || "We and/or our partners may be required to verify your identity and report certain transactions under Australian law.");
    const [section15, setSection15] = useState(props.content.section15 || "If you have a concern, contact us. We'll aim to resolve it promptly and may refer you to external dispute resolution schemes.");
    const [section16, setSection16] = useState(props.content.section16 || "We may update these Terms from time to time.");
    const [section17, setSection17] = useState(props.content.section17 || "These Terms are governed by the laws of New South Wales, Australia.");
    const [section18, setSection18] = useState(props.content.section18 || "Brightwork Group Pty Ltd trading as Bright Leasing (ABN 20 688 482 975)\nEmail: hello@brightleasing.com.au\nPhone: 1300 988 938\nAddress: PO Box 3107, Putney NSW 2112");
    const [section19, setSection19] = useState(props.content.section19 || "You agree to indemnify Bright Leasing and its officers, employees and agents against all claims, losses, damages, costs (including legal costs) arising out of your breach of these Terms or misuse of our services.");
    const [section20, setSection20] = useState(props.content.section20 || "You must not use robots, spiders, data-mining tools or other automated means to access, extract or copy content from our website or services without our prior written consent.");
    const [section21, setSection21] = useState(props.content.section21 || "We may change these Terms, Privacy Policy or Terms of Use at any time by publishing a revised version on our Site with an updated effective date. Continued use after the revision indicates your acceptance. We may also notify you via email or site banner.");
    const [section22, setSection22] = useState(props.content.section22 || "Clauses such as liability, indemnity, confidentiality, intellectual property, and governing law survive termination or expiry of these agreements.");
    const [section23, setSection23] = useState(props.content.section23 || "All notices under these agreements must be in writing, and delivered via email (to your registered email), or by post to the address provided. Notices are effective on receipt (or 3 business days if by post).");
    const [section24, setSection24] = useState(props.content.section24 || "If a provision is invalid or unenforceable, it must be read down or severed, and the rest of the Terms remain in force.");
    const [section25, setSection25] = useState(props.content.section25 || "These Terms, together with any proposal or documentation expressly referring to them, constitute the entire agreement. In the event of conflict, these Terms prevail unless otherwise stated in the proposal.");
    const [section26, setSection26] = useState(props.content.section26 || "If a data breach is likely to result in serious harm, we will notify affected individuals and the OAIC in accordance with the Notifiable Data Breaches scheme under the Privacy Act.");

    const { isSaving, updatePage } = useUpdatePage<TermsAndConditionsContent>("terms-and-conditions");

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
                section24,
                section25,
                section26,
            }
        });
    };

    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <div>
            <SaveBanner
                pageTitle="Terms & Conditions"
                onSave={handleSave}
                isSaving={isSaving}
            />

            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    {/* ***************************************************************
              SECTION 1: ABOUT THESE TERMS
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 1 - About these Terms</h2>
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
                                    Introduction to the terms and conditions
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 2: OUR ROLE
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 2 - Our Role</h2>
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
                                    Description of our role as a broker
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 3: ELIGIBILITY & APPLICATIONS
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 3 - Eligibility & Applications</h2>
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
                                    Eligibility requirements for services
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 4: QUOTES & ESTIMATES
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 4 - Quotes & Estimates</h2>
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
                                    Information about quotes and estimates
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 5: FEES, CHARGES & COMMISSIONS
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 5 - Fees, Charges & Commissions</h2>
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
                                    Fee structure and commission information
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 6: EMPLOYER PARTICIPATION
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 6 - Employer Participation</h2>
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
                                    Requirements for employer participation
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 7: VEHICLES, DELIVERY & TITLE
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 7 - Vehicles, Delivery & Title</h2>
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
                                    Vehicle information and delivery terms
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 8: INSURANCE & RUNNING COSTS
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 8 - Insurance & Running Costs</h2>
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
                                    Insurance requirements and running costs
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 9: CHANGES, CANCELLATIONS & EARLY TERMINATION
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 9 - Changes, Cancellations & Early Termination</h2>
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
                                    Terms for changes and cancellations
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 10: CONSUMER GUARANTEES
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 10 - Consumer Guarantees</h2>
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
                                    Consumer law guarantees
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 11: LIABILITY
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 11 - Liability</h2>
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
                                    Liability limitations
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 12: YOUR OBLIGATIONS
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 12 - Your Obligations</h2>
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
                                    Customer obligations and responsibilities
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 13: PRIVACY
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 13 - Privacy</h2>
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
                                    Privacy policy reference
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 14: ANTI-MONEY LAUNDERING & COUNTER-TERRORISM FINANCING
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 14 - Anti-Money Laundering & Counter-Terrorism Financing</h2>
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
                                    AML/CTF compliance requirements
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 15: COMPLAINTS
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 15 - Complaints</h2>
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
                                    Complaint handling procedures
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 16: AMENDMENTS
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 16 - Amendments</h2>
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
                                    How terms can be amended
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 17: GOVERNING LAW
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 17 - Governing Law</h2>
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
                                    Applicable law and jurisdiction
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 18: CONTACT US
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 18 - Contact Us</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Contact Information
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection18}
                                    defaultValue={section18}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How to contact us about terms
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 19: INDEMNITY
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 19 - Indemnity</h2>
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
                                    Indemnity clause for terms and conditions
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 20: PROHIBITED CONDUCT
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 20 - Prohibited Conduct</h2>
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
                                    Prohibited uses of our services
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 21: VARIATION OF TERMS
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 21 - Variation of Terms</h2>
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
                                    How we can change our terms
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 22: SURVIVAL CLAUSE
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 22 - Survival Clause</h2>
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
                                    Which clauses survive termination
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 23: NOTICES
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 23 - Notices</h2>
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
                                    How we send notices to you
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 24: SEVERABILITY
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 24 - Severability</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection24}
                                    defaultValue={section24}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    What happens if part of the terms is invalid
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 25: ENTIRE AGREEMENT
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 25 - Entire Agreement</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection25}
                                    defaultValue={section25}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    This agreement constitutes the entire agreement
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 26: DATA BREACH NOTIFICATION
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 26 - Data Breach Notification</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection26}
                                    defaultValue={section26}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Our data breach notification obligations
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
