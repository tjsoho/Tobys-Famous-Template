/* ************************************************************
                        NOTES
************************************************************ */
// Privacy Policy admin page
// Features: Hosts the PrivacyPolicyInputs component
// Layout: Wrapped with ImageLibraryProvider for rich text editing
/* ************************************************************
                        IMPORTS
************************************************************ */
import PrivacyPolicyInputs from "@/components/admin/privacy-policy-inputs";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";
import getPage from "@/server-actions/page";

// Default content for Privacy Policy
const privacyPolicyFallbackData = {
    title: "Privacy Policy",
    description: "Manage privacy policy content",
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
export default async function PrivacyPolicyAdminPage() {
    const privacyPolicyPage = await getPage("privacy-policy", privacyPolicyFallbackData);

    /* ************************************************************
                              RENDER
    ************************************************************ */
    return (
        <ImageLibraryProvider>
            <PrivacyPolicyInputs
                title={privacyPolicyPage.title}
                description={privacyPolicyPage.description}
                slug={privacyPolicyPage.slug}
                content={privacyPolicyPage.content}
            />
        </ImageLibraryProvider>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */