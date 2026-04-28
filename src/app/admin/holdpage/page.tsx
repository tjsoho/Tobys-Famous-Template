import { fetchSiteSettings } from "@/data/site-settings";
import HoldPageManager from "@/components/admin/holdpage/HoldPageManager";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";

export default async function AdminHoldPage() {
    const settings = await fetchSiteSettings();
    return (
        <ImageLibraryProvider>
            <HoldPageManager initial={settings} />
        </ImageLibraryProvider>
    );
}
