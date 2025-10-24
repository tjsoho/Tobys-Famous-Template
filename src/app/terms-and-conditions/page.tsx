/* ************************************************************
                        NOTES
************************************************************ */
// Terms & Conditions public page
// Features: Dynamic content from database with fallback
// Layout: Brand-styled sections with alternating colors
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// Default content for Terms & Conditions
const termsAndConditionsFallbackData = {
    title: "Terms & Conditions",
    description: "Terms and conditions for Bright Leasing services",
    slug: "terms-and-conditions",
    content: {
        section1: "These Terms & Conditions (Terms) apply to quotes, products and services provided by Brightwork Group Pty Ltd trading as Bright Leasing (Bright Leasing, we, us) including novated leasing and related salary-packaging services. By requesting or accepting a quote, proceeding with an application, or using our services, you agree to these Terms.",
        section2: "We arrange novated leasing solutions and related services and may act as an introducer or broker to lenders, salary-packaging providers, dealers and insurers (Third Parties). We do not provide legal, tax or financial advice. Consider your circumstances and seek independent advice.",
        section3: "Eligibility is subject to your employment status, employer participation in salary packaging, credit assessment, lending criteria and vehicle availability. You confirm information you provide is true, complete and not misleading.",
        section4: "Quotes are illustrative only and subject to change until final approval and documentation by the relevant Third Parties.",
        section5: "Fees and charges may be payable to us and/or Third Parties. We may receive commissions or other benefits from Third Parties. You may request details of such benefits.",
        section6: "Novated leasing requires a deed of novation with your employer. If your employer does not participate or withdraws participation, your quote or arrangement may not proceed.",
        section7: "Vehicle images and specifications are for illustration. Availability, price, specifications and delivery timeframes are set by dealers/manufacturers and are subject to change.",
        section8: "Comprehensive insurance is typically required for financed vehicles. Inclusion of running costs in a budget does not guarantee coverage of actual expenses.",
        section9: "Changes in employment, remuneration, tax rates, usage, interest rates or supplier pricing may affect your arrangement.",
        section10: "Nothing in these Terms excludes or limits consumer guarantees under the Australian Consumer Law (ACL).",
        section11: "To the maximum extent permitted by law, we are not liable for indirect or consequential loss.",
        section12: "You must provide accurate and timely information and notify us of changes to your employment or contact details.",
        section13: "We handle personal information in accordance with our Privacy Policy.",
        section14: "We and/or our partners may be required to verify your identity and report certain transactions under Australian law.",
        section15: "If you have a concern, contact us. We'll aim to resolve it promptly and may refer you to external dispute resolution schemes.",
        section16: "We may update these Terms from time to time.",
        section17: "These Terms are governed by the laws of New South Wales, Australia.",
        section18: "Brightwork Group Pty Ltd trading as Bright Leasing (ABN 20 688 482 975)\nEmail: hello@brightleasing.com.au\nPhone: 1300 988 938\nAddress: PO Box 3107, Putney NSW 2112",
        section19: "You agree to indemnify Bright Leasing and its officers, employees and agents against all claims, losses, damages, costs (including legal costs) arising out of your breach of these Terms or misuse of our services.",
        section20: "You must not use robots, spiders, data-mining tools or other automated means to access, extract or copy content from our website or services without our prior written consent.",
        section21: "We may change these Terms, Privacy Policy or Terms of Use at any time by publishing a revised version on our Site with an updated effective date. Continued use after the revision indicates your acceptance. We may also notify you via email or site banner.",
        section22: "Clauses such as liability, indemnity, confidentiality, intellectual property, and governing law survive termination or expiry of these agreements.",
        section23: "All notices under these agreements must be in writing, and delivered via email (to your registered email), or by post to the address provided. Notices are effective on receipt (or 3 business days if by post).",
        section24: "If a provision is invalid or unenforceable, it must be read down or severed, and the rest of the Terms remain in force.",
        section25: "These Terms, together with any proposal or documentation expressly referring to them, constitute the entire agreement. In the event of conflict, these Terms prevail unless otherwise stated in the proposal.",
        section26: "If a data breach is likely to result in serious harm, we will notify affected individuals and the OAIC in accordance with the Notifiable Data Breaches scheme under the Privacy Act."
    }
};

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function TermsAndConditionsPage() {
    const [content, setContent] = useState(termsAndConditionsFallbackData.content);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data, error } = await supabase
                    .from('pages')
                    .select('content')
                    .eq('slug', 'terms-and-conditions')
                    .single();

                if (error) {
                    if (error.code === 'PGRST116') {
                        console.log('No terms and conditions found, using fallback content');
                    } else {
                        console.error('Error fetching terms and conditions:', error);
                    }
                } else if (data?.content) {
                    setContent(data.content);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, []);

    /* ************************************************************
                            ANIMATION VARIANTS
    ************************************************************ */
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    /* ************************************************************
                            RENDER
    ************************************************************ */
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow mx-auto mb-4"></div>
                    <p className="text-brand-black/70">Loading terms and conditions...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* ************************************************************
                          HERO SECTION
      ************************************************************ */}
            <section className="bg-gradient-to-br from-brand-cream/30 via-white to-brand-yellow/10 py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={containerVariants}
                        className="text-center"
                    >
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black mb-6"
                        >
                            Terms & Conditions
                        </motion.h1>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-2xl text-brand-black/70 max-w-4xl mx-auto"
                        >
                            Brightwork Group Pty Ltd trading as Bright Leasing (ABN 20 688 482 975)
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ************************************************************
                          CONTENT SECTION
      ************************************************************ */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={containerVariants}
                        className="space-y-8"
                    >
                        {/* Section 1 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">1. About these Terms</h2>
                            <p className="text-brand-black/80">
                                {content.section1}
                            </p>
                        </motion.div>

                        {/* Section 2 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">2. Our Role</h2>
                            <p className="text-brand-black/80">
                                {content.section2}
                            </p>
                        </motion.div>

                        {/* Section 3 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">3. Eligibility & Applications</h2>
                            <p className="text-brand-black/80">
                                {content.section3}
                            </p>
                        </motion.div>

                        {/* Section 4 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">4. Quotes & Estimates</h2>
                            <p className="text-brand-black/80">
                                {content.section4}
                            </p>
                        </motion.div>

                        {/* Section 5 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">5. Fees, Charges & Commissions</h2>
                            <p className="text-brand-black/80">
                                {content.section5}
                            </p>
                        </motion.div>

                        {/* Section 6 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">6. Employer Participation</h2>
                            <p className="text-brand-black/80">
                                {content.section6}
                            </p>
                        </motion.div>

                        {/* Section 7 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">7. Vehicles, Delivery & Title</h2>
                            <p className="text-brand-black/80">
                                {content.section7}
                            </p>
                        </motion.div>

                        {/* Section 8 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">8. Insurance & Running Costs</h2>
                            <p className="text-brand-black/80">
                                {content.section8}
                            </p>
                        </motion.div>

                        {/* Section 9 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">9. Changes, Cancellations & Early Termination</h2>
                            <p className="text-brand-black/80">
                                {content.section9}
                            </p>
                        </motion.div>

                        {/* Section 10 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">10. Consumer Guarantees</h2>
                            <p className="text-brand-black/80">
                                {content.section10}
                            </p>
                        </motion.div>

                        {/* Section 11 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">11. Liability</h2>
                            <p className="text-brand-black/80">
                                {content.section11}
                            </p>
                        </motion.div>

                        {/* Section 12 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">12. Your Obligations</h2>
                            <p className="text-brand-black/80">
                                {content.section12}
                            </p>
                        </motion.div>

                        {/* Section 13 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">13. Privacy</h2>
                            <p className="text-brand-black/80">
                                {content.section13}
                            </p>
                        </motion.div>

                        {/* Section 14 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">14. Anti-Money Laundering & Counter-Terrorism Financing</h2>
                            <p className="text-brand-black/80">
                                {content.section14}
                            </p>
                        </motion.div>

                        {/* Section 15 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">15. Complaints</h2>
                            <p className="text-brand-black/80">
                                {content.section15}
                            </p>
                        </motion.div>

                        {/* Section 16 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">16. Amendments</h2>
                            <p className="text-brand-black/80">
                                {content.section16}
                            </p>
                        </motion.div>

                        {/* Section 17 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">17. Governing Law</h2>
                            <p className="text-brand-black/80">
                                {content.section17}
                            </p>
                        </motion.div>

                        {/* Section 18 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">18. Contact Us</h2>
                            <p className="text-brand-black/80 whitespace-pre-line">
                                {content.section18}
                            </p>
                        </motion.div>

                        {/* Section 19 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">19. Indemnity</h2>
                            <p className="text-brand-black/80">
                                {content.section19}
                            </p>
                        </motion.div>

                        {/* Section 20 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">20. Prohibited Conduct</h2>
                            <p className="text-brand-black/80">
                                {content.section20}
                            </p>
                        </motion.div>

                        {/* Section 21 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">21. Variation of Terms</h2>
                            <p className="text-brand-black/80">
                                {content.section21}
                            </p>
                        </motion.div>

                        {/* Section 22 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">22. Survival Clause</h2>
                            <p className="text-brand-black/80">
                                {content.section22}
                            </p>
                        </motion.div>

                        {/* Section 23 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">23. Notices</h2>
                            <p className="text-brand-black/80">
                                {content.section23}
                            </p>
                        </motion.div>

                        {/* Section 24 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">24. Severability</h2>
                            <p className="text-brand-black/80">
                                {content.section24}
                            </p>
                        </motion.div>

                        {/* Section 25 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">25. Entire Agreement</h2>
                            <p className="text-brand-black/80">
                                {content.section25}
                            </p>
                        </motion.div>

                        {/* Section 26 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">26. Data Breach Notification</h2>
                            <p className="text-brand-black/80">
                                {content.section26}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */