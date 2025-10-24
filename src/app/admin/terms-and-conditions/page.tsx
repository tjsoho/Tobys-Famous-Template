/* ************************************************************
                        NOTES
************************************************************ */
// Terms & Conditions admin page
// Features: Hosts the TermsAndConditionsInputs component
// Layout: Wrapped with ImageLibraryProvider for rich text editing
/* ************************************************************
                        IMPORTS
************************************************************ */
import TermsAndConditionsInputs from "@/components/admin/terms-and-conditions-inputs";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";
import getPage from "@/server-actions/page";

// Default content for Terms & Conditions
const termsAndConditionsFallbackData = {
    title: "Terms & Conditions",
    description: "Manage terms and conditions content",
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
export default async function TermsAndConditionsAdminPage() {
    const termsAndConditionsPage = await getPage("terms-and-conditions", termsAndConditionsFallbackData);

    /* ************************************************************
                              RENDER
    ************************************************************ */
    return (
        <ImageLibraryProvider>
            <TermsAndConditionsInputs
                title={termsAndConditionsPage.title}
                description={termsAndConditionsPage.description}
                slug={termsAndConditionsPage.slug}
                content={termsAndConditionsPage.content}
            />
        </ImageLibraryProvider>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */
