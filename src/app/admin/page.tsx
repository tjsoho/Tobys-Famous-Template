/* ************************************************************
						NOTES
************************************************************ */
// Admin dashboard page with home page styling
// Features brand-consistent design with animated tiles
// Fetches site logo from footer content
/* ************************************************************
						IMPORTS
************************************************************ */
import getPage from "@/server-actions/page";
import { footerFallbackData, FooterProps } from "@/app/_config";
import AdminDashboard from "@/components/admin/AdminDashboard";

/* ************************************************************
						COMPONENTS
************************************************************ */
export default async function Admin() {
	const footerPage = await getPage<FooterProps>("footer", footerFallbackData);
	const siteLogo = footerPage.content.siteLogo || "/images/brightlogo.png";

	return <AdminDashboard siteLogo={siteLogo} />;
}