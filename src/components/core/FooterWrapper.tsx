/* ************************************************************
                        NOTES
************************************************************ */
// Footer wrapper component that fetches dynamic footer content
// Separates server-side data fetching from client-side component
/* ************************************************************
                        IMPORTS
************************************************************ */
import { footerFallbackData, FooterProps } from "@/app/_config";
import getPage from "@/server-actions/page";
import Footer from "./Footer";

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default async function FooterWrapper() {
    const footerPage = await getPage<FooterProps>("footer", footerFallbackData);

    return <Footer content={footerPage.content} />;
}
