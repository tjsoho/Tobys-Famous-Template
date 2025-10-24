/* ************************************************************
                        NOTES
************************************************************ */
// Contact admin page for managing contact page content
// Features dynamic content management with fallback data
// Follows the same pattern as admin/home/page.tsx
/* ************************************************************
                        IMPORTS
************************************************************ */
import { contactPageFallbackData, ContactPageProps } from "@/app/_config";
import ContactAdminInputs from "@/components/admin/contact-inputs";
import getPage from "@/server-actions/page";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default async function ContactAdmin() {
    const contactPage = await getPage<ContactPageProps>("contact", contactPageFallbackData);

    return (
        <ImageLibraryProvider>
            <div>
                <ContactAdminInputs
                    title={contactPage.title}
                    description={contactPage.description}
                    slug={contactPage.slug}
                    content={contactPage.content}
                />
            </div>
        </ImageLibraryProvider>
    );
}
