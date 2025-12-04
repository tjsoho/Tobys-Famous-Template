/* ************************************************************
                        NOTES
************************************************************ */
// Contact page server component that fetches dynamic content
// Separates server-side data fetching from client-side interactivity
/* ************************************************************
                        IMPORTS
************************************************************ */
import type { Metadata } from "next";
import { contactPageFallbackData, ContactPageProps } from "@/app/_config";
import getPage from "@/server-actions/page";
import ContactClient from "./ContactClient";
import { buildPageMetadata } from "@/utils/seo";

/* ************************************************************
                        METADATA
************************************************************ */
export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("contact");
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default async function ContactPage() {
    const contactPage = await getPage<ContactPageProps>("contact", contactPageFallbackData);

    return <ContactClient content={contactPage.content} />;
}
