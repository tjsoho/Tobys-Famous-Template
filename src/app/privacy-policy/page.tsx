/* ************************************************************
                        NOTES
************************************************************ */
// Privacy Policy page with dynamic content from database
// Features: Clean layout with company branding and contact info
// Layout: Hero section, content sections, and contact details
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

// Default content for Privacy Policy
const privacyPolicyFallbackData = {
    title: "Privacy Policy",
    description: "Privacy policy for Bright Leasing services",
    slug: "privacy-policy",
    content: {
        section1: "We may collect personal information including identity, employment, financial, vehicle, communications, analytics and supporting documents.",
        section2: "We collect information directly from you, your employer, dealers, lenders, insurers and via website cookies.",
        section3: "To provide novated leasing services, verify identity, manage payroll, communicate and comply with legal obligations.",
        section4: "Handled in accordance with the Privacy Act and relevant credit reporting rules.",
        section5: "We may disclose information to lenders, dealers, employers, IT providers and regulators.",
        section6: "Some service providers may store or access data outside Australia.",
        section7: "We may send you updates about products, offers and tips. You can opt out at any time.",
        section8: "We use cookies and similar technologies to operate and improve the site.",
        section9: "We use reasonable measures to protect information from misuse or unauthorised access.",
        section10: "You may request access to or correction of your personal information.",
        section11: "We keep information as needed to meet legal and operational requirements.",
        section12: "If a data breach is likely to cause serious harm, we will notify affected individuals and the OAIC.",
        section13: "If you are concerned about privacy, contact us. You may also contact OAIC if unsatisfied.",
        section14: "We may update this Privacy Policy from time to time.",
        section15: "Brightwork Group Pty Ltd trading as Bright Leasing (ABN 20 688 482 975)\nEmail: privacy@brightleasing.com.au\nPhone: 1300 988 938\nAddress: PO Box 3107, Putney NSW 2112",
        section16: "You agree to indemnify Bright Leasing and its officers, employees and agents against all claims, losses, damages, costs (including legal costs) arising out of your breach of these Terms or misuse of our services.",
        section17: "You must not use robots, spiders, data-mining tools or other automated means to access, extract or copy content from our website or services without our prior written consent.",
        section18: "We may change these Terms, Privacy Policy or Terms of Use at any time by publishing a revised version on our Site with an updated effective date. Continued use after the revision indicates your acceptance. We may also notify you via email or site banner.",
        section19: "Clauses such as liability, indemnity, confidentiality, intellectual property, and governing law survive termination or expiry of these agreements.",
        section20: "All notices under these agreements must be in writing, and delivered via email (to your registered email), or by post to the address provided. Notices are effective on receipt (or 3 business days if by post).",
        section21: "If a provision is invalid or unenforceable, it must be read down or severed, and the rest of the Terms remain in force.",
        section22: "These Terms, together with any proposal or documentation expressly referring to them, constitute the entire agreement. In the event of conflict, these Terms prevail unless otherwise stated in the proposal.",
        section23: "If a data breach is likely to result in serious harm, we will notify affected individuals and the OAIC in accordance with the Notifiable Data Breaches scheme under the Privacy Act."
    }
};

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function PrivacyPolicy() {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const [content, setContent] = useState(privacyPolicyFallbackData.content);
    const [isLoading, setIsLoading] = useState(true);

    /* ************************************************************
                            FUNCTIONS
    ************************************************************ */
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data, error } = await supabase
                    .from('pages')
                    .select('content')
                    .eq('slug', 'privacy-policy')
                    .single();

                if (error) {
                    if (error.code === 'PGRST116') {
                        console.log('No privacy policy found, using fallback content');
                    } else {
                        console.error('Error fetching privacy policy:', error);
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
                    <p className="text-brand-black/70">Loading privacy policy...</p>
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
                            Privacy Policy
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
                            <h2 className="text-2xl font-bold text-brand-black mb-4">1. What We Collect</h2>
                            <p className="text-brand-black/80">
                                {content.section1}
                            </p>
                        </motion.div>

                        {/* Section 2 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">2. How We Collect Information</h2>
                            <p className="text-brand-black/80">
                                {content.section2}
                            </p>
                        </motion.div>

                        {/* Section 3 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">3. Why We Collect, Use & Disclose</h2>
                            <p className="text-brand-black/80">
                                {content.section3}
                            </p>
                        </motion.div>

                        {/* Section 4 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">4. Credit-Related Information</h2>
                            <p className="text-brand-black/80">
                                {content.section4}
                            </p>
                        </motion.div>

                        {/* Section 5 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">5. Disclosures to Third Parties</h2>
                            <p className="text-brand-black/80">
                                {content.section5}
                            </p>
                        </motion.div>

                        {/* Section 6 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">6. Overseas Disclosures</h2>
                            <p className="text-brand-black/80">
                                {content.section6}
                            </p>
                        </motion.div>

                        {/* Section 7 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">7. Marketing</h2>
                            <p className="text-brand-black/80">
                                {content.section7}
                            </p>
                        </motion.div>

                        {/* Section 8 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">8. Cookies & Website Analytics</h2>
                            <p className="text-brand-black/80">
                                {content.section8}
                            </p>
                        </motion.div>

                        {/* Section 9 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">9. Security</h2>
                            <p className="text-brand-black/80">
                                {content.section9}
                            </p>
                        </motion.div>

                        {/* Section 10 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">10. Access & Correction</h2>
                            <p className="text-brand-black/80">
                                {content.section10}
                            </p>
                        </motion.div>

                        {/* Section 11 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">11. Retention</h2>
                            <p className="text-brand-black/80">
                                {content.section11}
                            </p>
                        </motion.div>

                        {/* Section 12 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">12. Notifiable Data Breaches</h2>
                            <p className="text-brand-black/80">
                                {content.section12}
                            </p>
                        </motion.div>

                        {/* Section 13 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">13. Complaints</h2>
                            <p className="text-brand-black/80">
                                {content.section13}
                            </p>
                        </motion.div>

                        {/* Section 14 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">14. Changes to this Policy</h2>
                            <p className="text-brand-black/80">
                                {content.section14}
                            </p>
                        </motion.div>

                        {/* Section 15 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">15. Contact Us</h2>
                            <p className="text-brand-black/80 whitespace-pre-line">
                                {content.section15}
                            </p>
                        </motion.div>

                        {/* Section 16 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">16. Indemnity</h2>
                            <p className="text-brand-black/80">
                                {content.section16}
                            </p>
                        </motion.div>

                        {/* Section 17 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">17. Prohibited Conduct</h2>
                            <p className="text-brand-black/80">
                                {content.section17}
                            </p>
                        </motion.div>

                        {/* Section 18 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">18. Variation of Terms</h2>
                            <p className="text-brand-black/80">
                                {content.section18}
                            </p>
                        </motion.div>

                        {/* Section 19 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">19. Survival Clause</h2>
                            <p className="text-brand-black/80">
                                {content.section19}
                            </p>
                        </motion.div>

                        {/* Section 20 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">20. Notices</h2>
                            <p className="text-brand-black/80">
                                {content.section20}
                            </p>
                        </motion.div>

                        {/* Section 21 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">21. Severability</h2>
                            <p className="text-brand-black/80">
                                {content.section21}
                            </p>
                        </motion.div>

                        {/* Section 22 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">22. Entire Agreement</h2>
                            <p className="text-brand-black/80">
                                {content.section22}
                            </p>
                        </motion.div>

                        {/* Section 23 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-brand-black mb-4">23. Data Breach Notification</h2>
                            <p className="text-brand-black/80">
                                {content.section23}
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