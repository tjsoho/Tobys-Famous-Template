import {
	aboutUsPageFallbackData,
	AboutUsPageProps,
} from "@/app/about-us/_config";
import AboutUsAdminInputs from "@/components/admin/about-us-inputs";
import getPage from "@/server-actions/page";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";

export default async function AboutUsAdmin() {
	const aboutPage = await getPage<AboutUsPageProps>(
		"about-us",
		aboutUsPageFallbackData,
	);

	return (
		<ImageLibraryProvider>
			<AboutUsAdminInputs
				title={aboutPage.title}
				description={aboutPage.description}
				slug={aboutPage.slug}
				content={aboutPage.content}
			/>
		</ImageLibraryProvider>
	);
}
