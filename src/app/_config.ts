import { BasePage } from "./types";

export type AdditionalTile = {
  id: string;
  title: string;
  titleBold: boolean;
  description: string;
  descriptionBold: boolean;
  backgroundColor: string;
};

export type AdditionalFAQ = {
  id: string;
  question: string;
  questionBold: boolean;
  answer: string;
  answerBold: boolean;
};

export type HomePageContent = {
  heroImage: string;
  heroTitle: string;
  heroTitleBold: boolean;
  heroParagraph: string;
  heroParagraphBold: boolean;
  headerButtonText: string;
  section2title: string;
  section2titleBold: boolean;
  section2paragraph: string;
  section2paragraphBold: boolean;
  section3title: string;
  section3titleBold: boolean;
  section3tile1title: string;
  section3tile1titleBold: boolean;
  section3tile1description: string;
  section3tile1descriptionBold: boolean;
  section3tile1image: string;
  section3tile2title: string;
  section3tile2titleBold: boolean;
  section3tile2description: string;
  section3tile2descriptionBold: boolean;
  section3tile2image: string;
  section3tile3title: string;
  section3tile3titleBold: boolean;
  section3tile3description: string;
  section3tile3descriptionBold: boolean;
  section3tile3image: string;
  additionalSection3Tiles: AdditionalTile[];
  section4title: string;
  section4titleBold: boolean;
  section4step1title: string;
  section4step1titleBold: boolean;
  section4step1description: string;
  section4step1descriptionBold: boolean;
  section4step1icon: string;
  section4step2title: string;
  section4step2titleBold: boolean;
  section4step2description: string;
  section4step2descriptionBold: boolean;
  section4step2icon: string;
  section4step3title: string;
  section4step3titleBold: boolean;
  section4step3description: string;
  section4step3descriptionBold: boolean;
  section4step3icon: string;
  section4step4title: string;
  section4step4titleBold: boolean;
  section4step4description: string;
  section4step4descriptionBold: boolean;
  section4step4icon: string;
  section5title: string;
  section5titleBold: boolean;
  section5description: string;
  section5descriptionBold: boolean;
  section5buttonText: string;
  section5buttonTextBold: boolean;
  section5image: string;
  section6title: string;
  section6titleBold: boolean;
  section6tile1title: string;
  section6tile1titleBold: boolean;
  section6tile1description: string;
  section6tile1descriptionBold: boolean;
  section6tile1image: string;
  section6tile2title: string;
  section6tile2titleBold: boolean;
  section6tile2description: string;
  section6tile2descriptionBold: boolean;
  section6tile2image: string;
  section6tile3title: string;
  section6tile3titleBold: boolean;
  section6tile3description: string;
  section6tile3descriptionBold: boolean;
  section6tile3image: string;
  additionalSection6Tiles: AdditionalTile[];
  section7title: string;
  section7titleBold: boolean;
  section7faq1question: string;
  section7faq1questionBold: boolean;
  section7faq1answer: string;
  section7faq1answerBold: boolean;
  section7faq2question: string;
  section7faq2questionBold: boolean;
  section7faq2answer: string;
  section7faq2answerBold: boolean;
  section7faq3question: string;
  section7faq3questionBold: boolean;
  section7faq3answer: string;
  section7faq3answerBold: boolean;
  section7faq4question: string;
  section7faq4questionBold: boolean;
  section7faq4answer: string;
  section7faq4answerBold: boolean;
  additionalSection7Faqs: AdditionalFAQ[];
};

export type HomePageProps = BasePage<HomePageContent>;

export type ContactPageContent = {
  heroTitle: string;
  heroTitleBold: boolean;
  heroSubtitle: string;
  heroSubtitleBold: boolean;
  heroDescription: string;
  heroDescriptionBold: boolean;
  contactTitle: string;
  contactTitleBold: boolean;
  contactDescription: string;
  contactDescriptionBold: boolean;
  contactImage: string;
};

export type ContactPageProps = BasePage<ContactPageContent>;

export type FooterContent = {
  logoImage: string;
  tagline: string;
  taglineBold: boolean;
  phone: string;
  phoneBold: boolean;
  address: string;
  addressBold: boolean;
  abn: string;
  abnBold: boolean;
  acn: string;
  acnBold: boolean;
  copyright: string;
  copyrightBold: boolean;
};

export type FooterProps = BasePage<FooterContent>;

export const contactPageFallbackData: ContactPageProps = {
  title: "Contact",
  description: "Contact page",
  slug: "contact",
  content: {
    heroTitle: "Let's Connect",
    heroTitleBold: false,
    heroSubtitle: "Get In Touch",
    heroSubtitleBold: false,
    heroDescription:
      "Ready to get started with novated leasing? We're here to help you find the perfect solution for your automotive needs.",
    heroDescriptionBold: false,
    contactTitle: "Get in Touch",
    contactTitleBold: false,
    contactDescription:
      "Have questions about novated leasing? We're here to help! Send us a message and we'll get back to you within 24 hours.",
    contactDescriptionBold: false,
    contactImage: "/images/brightlogo.png",
  },
};

export const footerFallbackData: FooterProps = {
  title: "Footer",
  description: "Footer content",
  slug: "footer",
  content: {
    logoImage: "/images/bwlogo.png",
    tagline: "Intelligent car ownership\nmade simple",
    taglineBold: false,
    phone: "1300 988 938",
    phoneBold: false,
    address: "PO Box 3107, Putney NSW 2112",
    addressBold: false,
    abn: "20 688 482 975",
    abnBold: false,
    acn: "688 482 975",
    acnBold: false,
    copyright: "© Bright Leasing Limited. All Rights Reserved.",
    copyrightBold: false,
  },
};

export const homePageFallbackData: HomePageProps = {
  title: "Home",
  description: "Home page",
  slug: "home",
  content: {
    heroImage: "/placeholder.jpg",
    heroTitle: "The smartest way to own and run a car",
    heroTitleBold: false,
    heroParagraph:
      "Novated leasing made easy — save money, skip the hassle, and enjoy the car you really want.",
    heroParagraphBold: false,
    headerButtonText: "Start in 60 Seconds",
    section2title: "What is novated leasing?",
    section2titleBold: false,
    section2paragraph:
      "A novated lease is a simple three-way agreement between you, your employer, and Bright Leasing. Your lease payments (plus running costs like fuel, servicing, rego, and insurance) are bundled into your pre-tax salary — meaning fewer headaches and lots of savings.",
    section2paragraphBold: false,
    section3title: "Why Choose Bright Leasing",
    section3titleBold: false,
    section3tile1title: "Great value, zero fluff",
    section3tile1titleBold: false,
    section3tile1description:
      "Industry-leading inclusions and sharp fees without the upsell.",
    section3tile1descriptionBold: false,
    section3tile1image: "/placeholder.jpg",
    section3tile2title: "Human when it matters",
    section3tile2titleBold: false,
    section3tile2description: "Talk to a real expert, not a call centre.",
    section3tile2descriptionBold: false,
    section3tile2image: "/placeholder.jpg",
    section3tile3title: "Flexible and transparent",
    section3tile3titleBold: false,
    section3tile3description:
      "Clear terms, no hidden fees, and options that work for you.",
    section3tile3descriptionBold: false,
    section3tile3image: "/placeholder.jpg",
    additionalSection3Tiles: [],
    section4title: "How It Works",
    section4titleBold: false,
    section4step1title: "Choose Your Car",
    section4step1titleBold: false,
    section4step1description: "Bring your dream car or pick from our network.",
    section4step1descriptionBold: false,
    section4step1icon: "/placeholder.jpg",
    section4step2title: "Set Up Your Lease",
    section4step2titleBold: false,
    section4step2description:
      "Three-way agreement between you, your employer, and Bright.",
    section4step2descriptionBold: false,
    section4step2icon: "/placeholder.jpg",
    section4step3title: "Salary Packaging Saves You Money",
    section4step3titleBold: false,
    section4step3description:
      "Lease + running costs come from your pre-tax pay.",
    section4step3descriptionBold: false,
    section4step3icon: "/placeholder.jpg",
    section4step4title: "Drive Away Happy",
    section4step4titleBold: false,
    section4step4description:
      "Pay for your running costs using your Bright digital card and let us handle everything else.",
    section4step4descriptionBold: false,
    section4step4icon: "/placeholder.jpg",
    section5title: "For employers: hassle-free salary packaging",
    section5titleBold: false,
    section5description:
      "Engage and retain talent with a trusted, low-effort benefit. We'll handle onboarding, payroll setup, and employee education end-to-end.",
    section5descriptionBold: false,
    section5buttonText: "Start in 60 seconds",
    section5buttonTextBold: false,
    section5image: "/placeholder.jpg",
    section6title: "Customer Success Stories",
    section6titleBold: false,
    section6tile1title: "Sarah's Journey",
    section6tile1titleBold: false,
    section6tile1description:
      "Saved $3,000 annually with our novated lease program while driving her dream Tesla.",
    section6tile1descriptionBold: false,
    section6tile1image: "/placeholder.jpg",
    section6tile2title: "Mike's Experience",
    section6tile2titleBold: false,
    section6tile2description:
      "Seamless setup process and excellent customer support throughout his lease term.",
    section6tile2descriptionBold: false,
    section6tile2image: "/placeholder.jpg",
    section6tile3title: "Lisa's Savings",
    section6tile3titleBold: false,
    section6tile3description:
      "Reduced her car expenses by 40% with our comprehensive salary packaging solution.",
    section6tile3descriptionBold: false,
    section6tile3image: "/placeholder.jpg",
    additionalSection6Tiles: [],
    section7title: "Frequently Asked Questions",
    section7titleBold: false,
    section7faq1question: "Who can salary-package a novated lease?",
    section7faq1questionBold: false,
    section7faq1answer:
      "Most employees can salary-package a novated lease, but it depends on your employer's policies and your employment agreement. Generally, full-time and part-time employees are eligible, while contractors and casual workers may have restrictions.",
    section7faq1answerBold: false,
    section7faq2question: "Do I have to choose an EV?",
    section7faq2questionBold: false,
    section7faq2answer:
      "No, you can choose any vehicle that meets your employer's novated lease policy. While EVs often provide better tax benefits, you can select from petrol, hybrid, or electric vehicles based on your preferences and budget.",
    section7faq2answerBold: false,
    section7faq3question: "What's included in the budget?",
    section7faq3questionBold: false,
    section7faq3answer:
      "Your novated lease budget typically includes the vehicle lease payments, registration, insurance, maintenance, fuel, and other running costs. We'll help you create a comprehensive budget that covers all your vehicle expenses.",
    section7faq3answerBold: false,
    section7faq4question: "How long does setup take?",
    section7faq4questionBold: false,
    section7faq4answer:
      "The setup process usually takes 2-4 weeks from application to vehicle delivery. This includes employer approval, lease documentation, vehicle sourcing, and final delivery arrangements.",
    section7faq4answerBold: false,
    additionalSection7Faqs: [],
  },
};
