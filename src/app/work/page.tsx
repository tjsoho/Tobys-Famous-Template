import getPage from "@/server-actions/page";
import { workPageFallbackData, WorkPageProps } from "./_config";

// Disable caching for this page to ensure fresh content
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function WorkPage() {
  const workPage = await getPage<WorkPageProps>("work", workPageFallbackData);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 p-8 rounded-xl shadow-lg max-w-xl mx-auto mt-12">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 tracking-tight">
        {workPage.content.workPageTitle}
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        {workPage.content.workPageDescription}
      </p>
      <p className="text-base text-purple-400 italic">
        {workPage.content.workPageShowingToby}
      </p>
    </div>
  );
}
