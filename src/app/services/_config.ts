import { BasePage } from "../types";

export type ServicesPageContent = {
  mainTitle: string;
  service1Title: string;
  service2Title: string;
};

export type ServicesPageProps = BasePage<ServicesPageContent>;

export const servicesPageFallbackData: ServicesPageProps = {
  title: "Services",
  description: "Services",
  slug: "services",
  content: {
    mainTitle: "Services",
    service1Title: "Service 1",
    service2Title: "Service 2",
  },
};
