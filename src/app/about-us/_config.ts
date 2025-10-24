import { BasePage } from "../types";

export type AboutUsPageContent = {
  youtubeVideoId?: string;
  title: string;
  heroImage: string;
  ourStoryParagraph: string;
  AboutUsbuttonText: string;
  tab1title: string;
  tab1content: string;
  tab1image: string;
  tab2title: string;
  tab2content: string;
  tab2image: string;
  tab3title: string;
  tab3content: string;
  tab3image: string;
  tab4title: string;
  tab4content: string;
  tab4image: string;
  tab5title: string;
  tab5content: string;
  tab5image: string;
};

export type AboutUsPageProps = BasePage<AboutUsPageContent>;

export const aboutUsPageFallbackData: AboutUsPageProps = {
  title: "About",
  description: "About the company",
  slug: "about",
  content: {
    youtubeVideoId: "",
    title: "OUR STORY",
    heroImage: "/placeholder.jpg",
    ourStoryParagraph:
      "STAIT was born in 2018 with the aim of giving anyone the best chance of being an elite performer in any and every area of life. It all started with Shaun Sargent, our co-founder. Approaching his 50s, and busy with a demanding corporate career, Shaun was aware that ageing might start to affect his performance day-to-day. Whilst most people might consider this a normal part of the ageing process, Shaun chose differently. Why give up on feeling and being your best just because you're getting older? As a busy CEO, Shaun had always been determined to outperform himself each day. Having failed to find a product to support his health in the way he needed, it was his wife and co-founder Samantha who suggested he should create something for himself. 'Instead of moaning about it, if it's such an issue for you, why don't you find a solution?' she said. Which is exactly what he did.",
    AboutUsbuttonText: "Keep Reading",
    tab1title: "The Process",
    tab1content:
      "The aim was to create a product that would help people unlock their full potential and perform at their best. And there was no question the supplement had to be the best of the best. It was a chance meeting with a PHD scientist who happened to specialise in male andropause (male ageing) that really got the ball rolling. Working together with a team of Australian scientists who specialise in hormone health, the search for the perfect solution began in earnest. And so, the idea of STAIT became a reality.",
    tab2title: "For Men",
    tab2content:
      "Many months of research and development led to the launch of STAIT for Men, a completely natural, TGA-listed supplement inspired by the efficacy of Traditional Chinese Medicine and Ayurveda. STAIT for Men contains a unique blend of 10 clinically-proven ingredients which optimise hormones, help to reduce stress, boost energy and endurance, and enhance performance. And it works. Shaun began testing STAIT for himself and saw an incredible change in his health. Not only did his physical health improve, but he felt more positive, more focused, and he slept better than ever before. And Shaun is not alone: 'The daily [STAIT for Men] capsules are powerful. The reduction in cortisol I get and the increase in free testosterone, energy, and muscle recovery is exactly what I would expect from such high quality. Far better than the many supps I have ordered from the USA in the past and all in one simple capsule. Thank you for creating something that finally works.' - Damian Porter, High Performance Living Coach",
    tab3title: "For Women",
    tab3content:
      "Although STAIT for Men was initially designed for men, it wasn't long before our customers started asking about a women's formula. After meeting with the science team, we learnt that the formula is equally beneficial for women as it is men. So, STAIT for Women was launched. Shaun's wife, Sam, was the first to try it out. Sure enough, the results didn't disappoint. Prior to STAIT, Sam used to suffer from headaches and back pain during her menstrual cycle, leaving her 'knocked for 6' without any remedy to ease it. This had become normal for Sam, as it does for many other women. And when we view something as 'normal', we often don't try to change it. That's why many of us accept that, as we get older, we'll become weaker, more fatigued, and feel less like ourselves. But this doesn't have to be the case. We founded STAIT because we wanted everyone to discover their own new and better version of normal. No matter what age you are, you should always feel like yourself. Since taking STAIT for Women, Sam's life has changed for the better... 'I felt in harmony with my body; to say STAIT for Women has changed my life is an understatement. To cruise through the months without the dreaded one-day-a-month being a write off is a miracle for me.' - Sam Sargent",

    tab4title: "The Final Product",
    tab4content:
      "At STAIT, we are all about natural health and proven results, backed by science. Our formula contains everything you need and nothing you don't. We don't use fillers or binders or cheap, ineffective ingredients. Instead we give your body what it needs to perform at its peak. Even our capsules are 100% vegan approved, meaning they have no nasty side effects. They dissolve quickly in your stomach, unlike other capsules which contain harmful gelling agents. When it comes to your health, you need to be careful what you put in your body, but you're safe with STAIT. If you are ready to take the world by storm and perform at your peak, start now. Define your new normal with STAIT.",
    tab5title: "Who is STAIT for",
    tab5content:
      "STAIT is for anyone who wants to outperform themselves, whether you're a CEO, a builder or an athlete. We all want to be the best version of ourselves, but becoming that person takes time and effort. Nothing worth having ever happens without having to put in consistent work. STAIT works best if you're already healthy—it's not a substitute for a bad lifestyle. So, you need to be prepared to push yourself to the limit. But if you want to change things for the better, then this is the supplement for you. Not only does STAIT give you the energy and endurance to perform, it also gives you the mental clarity and focus you need to achieve your goals. We believe it's imperative that you start putting your health first. STAIT will get you halfway there. The rest is up to you.",
    tab1image: "/placeholder.jpg",
    tab2image: "/placeholder.jpg",
    tab3image: "/placeholder.jpg",
    tab4image: "/placeholder.jpg",
    tab5image: "/placeholder.jpg",
  },
};
