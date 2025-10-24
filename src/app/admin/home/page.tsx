import { homePageFallbackData, HomePageProps } from "@/app/_config";
import HomeAdminInputs from "@/components/admin/home-inputs";
import getPage from "@/server-actions/page";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";

export default async function HomeAdmin() {
	const homePage = await getPage<HomePageProps>("home", homePageFallbackData);

	return (
		<ImageLibraryProvider>
			<div>
				<HomeAdminInputs
					title={homePage.title}
					description={homePage.description}
					slug={homePage.slug}
					content={homePage.content}
				/>
			</div>
		</ImageLibraryProvider>
	);
}
