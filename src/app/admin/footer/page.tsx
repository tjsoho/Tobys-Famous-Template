/* ************************************************************
                        NOTES
************************************************************ */
// Footer admin page for managing footer content
// Features dynamic content management with fallback data
// Follows the same pattern as other admin pages
/* ************************************************************
                        IMPORTS
************************************************************ */
import { footerFallbackData, FooterProps } from "@/app/_config";
import FooterAdminInputs from "@/components/admin/footer-inputs";
import getPage from "@/server-actions/page";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default async function FooterAdmin() {
    const footerPage = await getPage<FooterProps>("footer", footerFallbackData);

    return (
        <ImageLibraryProvider>
            <div>
                <FooterAdminInputs
                    title={footerPage.title}
                    description={footerPage.description}
                    slug={footerPage.slug}
                    content={footerPage.content}
                />
            </div>
        </ImageLibraryProvider>
    );
}
