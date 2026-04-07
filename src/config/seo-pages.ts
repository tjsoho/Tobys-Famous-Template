export type SeoPageConfig = {
  slug: string;
  path: string;
  label: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords?: string;
  revalidatePaths?: string[];
};

export const seoPages: SeoPageConfig[] = [
  {
    slug: "home",
    path: "/",
    label: "Home",
    defaultTitle: "",
    defaultDescription: "",
    defaultKeywords: "",
  },
  {
    slug: "about",
    path: "/about-us",
    label: "About Us",
    defaultTitle: "",
    defaultDescription: "",
    defaultKeywords: "",
  },
  {
    slug: "contact",
    path: "/contact",
    label: "Contact",
    defaultTitle: "",
    defaultDescription: "",
    defaultKeywords: "",
  },
  {
    slug: "blog",
    path: "/blog",
    label: "Blog",
    defaultTitle: "",
    defaultDescription: "",
    defaultKeywords: "",
  },
  {
    slug: "faqs",
    path: "/faqs",
    label: "FAQs",
    defaultTitle: "",
    defaultDescription: "",
    defaultKeywords: "",
  },
];

