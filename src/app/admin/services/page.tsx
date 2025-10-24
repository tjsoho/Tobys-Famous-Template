import {
  servicesPageFallbackData,
  ServicesPageProps,
} from "@/app/services/_config";
import ServicesAdminInputs from "@/components/admin/services-inputs";
import getPage from "@/server-actions/page";

export default async function ServicesAdmin() {
  const servicesPage = await getPage<ServicesPageProps>(
    "services",
    servicesPageFallbackData
  );

  return (
    <div>
      <ServicesAdminInputs
        title={servicesPage.title}
        description={servicesPage.description}
        slug={servicesPage.slug}
        content={servicesPage.content}
      />
    </div>
  );
}
