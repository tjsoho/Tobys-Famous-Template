/* ************************************************************
                        NOTES
************************************************************ */
// Server component wrapper for Header to fetch dynamic content
// Fetches header button text from home page content
// Passes content to Header client component
/* ************************************************************
                        IMPORTS
************************************************************ */
import getPage from "@/server-actions/page";
import { homePageFallbackData, HomePageProps } from "@/app/_config";
import Header from "./Header";

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default async function HeaderWrapper() {
    /* ************************************************************
                              FUNCTIONS
    ************************************************************ */
    const homePage = await getPage<HomePageProps>("home", homePageFallbackData);

    /* ************************************************************
                              RENDER
    ************************************************************ */
    return (
        <Header headerButtonText={homePage.content.headerButtonText} />
    );
}
