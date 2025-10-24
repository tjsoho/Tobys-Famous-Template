import { BasePage } from "../types";

export type WorkPageContent = {
  workPageTitle: string;
  workPageDescription: string;
  workPageShowingToby: string;
};

export type WorkPageProps = BasePage<WorkPageContent>;

export const workPageFallbackData: WorkPageProps = {
  title: "Work",
  description: "Work",
  slug: "work",
  content: {
    workPageTitle: "Work",
    workPageDescription: "Work",
    workPageShowingToby: "Work",
  },
};
