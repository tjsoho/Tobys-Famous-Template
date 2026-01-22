import getPage from "@/server-actions/page";
import { footerFallbackData, FooterProps } from "@/app/_config";
import SiteLogoInputs from "@/components/admin/site-logo-inputs";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";

export default async function SiteLogoAdmin() {
	const footerPage = await getPage<FooterProps>("footer", footerFallbackData);

	return (
		<ImageLibraryProvider>
			<div>
				<SiteLogoInputs
					title={footerPage.title}
					description={footerPage.description}
					slug={footerPage.slug}
					content={footerPage.content}
				/>
			</div>
		</ImageLibraryProvider>
	);
}

