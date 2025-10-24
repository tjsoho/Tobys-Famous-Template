/* ************************************************************
                        NOTES
************************************************************ */
// Terms of Use admin page
// Features: Hosts the TermsOfUseInputs component
// Layout: Wrapped with ImageLibraryProvider for rich text editing
/* ************************************************************
                        IMPORTS
************************************************************ */
import TermsOfUseInputs from "@/components/admin/terms-of-use-inputs";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";
import getPage from "@/server-actions/page";

// Default content for Terms of Use
const termsOfUseFallbackData = {
    title: "Terms of Use",
    description: "Manage terms of use content",
    slug: "terms-of-use",
    content: {
        section1: "Information on the Site is of a general nature and is not legal, tax or financial advice.",
        section2: "You must not use the Site for unlawful purposes or disrupt its operation.",
        section3: "You are responsible for maintaining the security of your account credentials.",
        section4: "We own or license all IP in the Site. You may view but not reproduce content without consent.",
        section5: "We are not responsible for Third-Party websites or tools linked from our Site.",
        section6: "Our Privacy Policy explains how we collect, use and disclose personal information.",
        section7: "The Site is provided 'as is'. Liability is excluded to the extent permitted by law.",
        section8: "We may modify or discontinue the Site at any time without notice.",
        section9: "These Terms of Use are governed by the laws of New South Wales, Australia.",
        section10: "Brightwork Group Pty Ltd trading as Bright Leasing (ABN 20 688 482 975)\nEmail: hello@brightleasing.com.au\nPhone: 1300 988 938",
        section11: "You agree to indemnify Bright Leasing and its officers, employees and agents against all claims, losses, damages, costs (including legal costs) arising out of your breach of these Terms or misuse of our services.",
        section12: "You must not use robots, spiders, data-mining tools or other automated means to access, extract or copy content from our website or services without our prior written consent.",
        section13: "We may change these Terms, Privacy Policy or Terms of Use at any time by publishing a revised version on our Site with an updated effective date. Continued use after the revision indicates your acceptance. We may also notify you via email or site banner.",
        section14: "Clauses such as liability, indemnity, confidentiality, intellectual property, and governing law survive termination or expiry of these agreements.",
        section15: "All notices under these agreements must be in writing, and delivered via email (to your registered email), or by post to the address provided. Notices are effective on receipt (or 3 business days if by post).",
        section16: "If a provision is invalid or unenforceable, it must be read down or severed, and the rest of the Terms remain in force.",
        section17: "These Terms, together with any proposal or documentation expressly referring to them, constitute the entire agreement. In the event of conflict, these Terms prevail unless otherwise stated in the proposal.",
        section18: "If a data breach is likely to result in serious harm, we will notify affected individuals and the OAIC in accordance with the Notifiable Data Breaches scheme under the Privacy Act."
    }
};

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default async function TermsOfUseAdminPage() {
    const termsOfUsePage = await getPage("terms-of-use", termsOfUseFallbackData);

    /* ************************************************************
                              RENDER
    ************************************************************ */
    return (
        <ImageLibraryProvider>
            <TermsOfUseInputs
                title={termsOfUsePage.title}
                description={termsOfUsePage.description}
                slug={termsOfUsePage.slug}
                content={termsOfUsePage.content}
            />
        </ImageLibraryProvider>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */