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
    defaultTitle: "Bright Leasing | Novated Leasing Made Easy",
    defaultDescription: "The smartest way to own and run a car. Novated leasing made easy — save money, skip the hassle, and enjoy the car you really want.",
    defaultKeywords: "novated leasing, salary packaging, car leasing, vehicle finance, Bright Leasing",
  },
  {
    slug: "about",
    path: "/about-us",
    label: "About Us",
    defaultTitle: "About Us | Bright Leasing",
    defaultDescription: "Learn about Bright Leasing and our mission to make car ownership simple and affordable through novated leasing.",
    defaultKeywords: "about Bright Leasing, novated leasing company, car leasing experts",
  },
  {
    slug: "contact",
    path: "/contact",
    label: "Contact",
    defaultTitle: "Contact Us | Bright Leasing",
    defaultDescription: "Get in touch with Bright Leasing. Have questions about novated leasing? We're here to help!",
    defaultKeywords: "contact Bright Leasing, novated leasing inquiry, car leasing contact",
  },
  {
    slug: "blog",
    path: "/blog",
    label: "Blog",
    defaultTitle: "Blog | Bright Leasing",
    defaultDescription: "Read the latest articles and insights about novated leasing, car ownership, and vehicle finance.",
    defaultKeywords: "novated leasing blog, car leasing articles, vehicle finance tips",
  },
  {
    slug: "faqs",
    path: "/faqs",
    label: "FAQs",
    defaultTitle: "Frequently Asked Questions | Bright Leasing",
    defaultDescription: "Find answers to common questions about novated leasing, salary packaging, and car ownership.",
    defaultKeywords: "novated leasing FAQ, salary packaging questions, car leasing FAQ",
  },
  {
    slug: "team",
    path: "/team",
    label: "Team",
    defaultTitle: "Our Team | Bright Leasing",
    defaultDescription: "Meet the team at Bright Leasing, dedicated to making your car ownership journey simple and affordable.",
    defaultKeywords: "Bright Leasing team, novated leasing experts, car leasing professionals",
  },
  {
    slug: "privacy-policy",
    path: "/privacy-policy",
    label: "Privacy Policy",
    defaultTitle: "Privacy Policy | Bright Leasing",
    defaultDescription: "Read our privacy policy to understand how Bright Leasing collects, uses, and protects your personal information.",
    defaultKeywords: "privacy policy, data protection, Bright Leasing privacy",
  },
  {
    slug: "terms-and-conditions",
    path: "/terms-and-conditions",
    label: "Terms and Conditions",
    defaultTitle: "Terms and Conditions | Bright Leasing",
    defaultDescription: "Review the terms and conditions for using Bright Leasing services and novated leasing products.",
    defaultKeywords: "terms and conditions, Bright Leasing terms, novated leasing terms",
  },
  {
    slug: "terms-of-use",
    path: "/terms-of-use",
    label: "Terms of Use",
    defaultTitle: "Terms of Use | Bright Leasing",
    defaultDescription: "Read the terms of use for the Bright Leasing website and online services.",
    defaultKeywords: "terms of use, website terms, Bright Leasing terms",
  },
];

