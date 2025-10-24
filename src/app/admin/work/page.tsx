import WorkPageInputs from "@/components/admin/work-inputs";
import { workPageFallbackData, WorkPageProps } from "@/app/work/_config";
import getPage from "@/server-actions/page";

export default async function WorkPage() {
  const workPage = await getPage<WorkPageProps>("work", workPageFallbackData);

  return (
    <WorkPageInputs
      title={workPage.title}
      description={workPage.description}
      slug={workPage.slug}
      content={workPage.content}
    />
  );
}
