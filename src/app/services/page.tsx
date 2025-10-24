import getPage from "@/server-actions/page";
import { servicesPageFallbackData, ServicesPageProps } from "./_config";

// Disable caching for this page to ensure fresh content
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Services() {
  const servicesPage = await getPage<ServicesPageProps>(
    "services",
    servicesPageFallbackData
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            {servicesPage.content.mainTitle}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-blue-600">
              {servicesPage.content.service1Title}
            </h2>
            <p className="text-gray-600">
              Description for service 1 would go here.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-blue-600">
              {servicesPage.content.service2Title}
            </h2>
            <p className="text-gray-600">
              Description for service 2 would go here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
