"use client";

import { HomePageProps } from "@/app/_config";
import { motion, useInView } from "framer-motion";
import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { RenderLineBreaks } from "@/utils/render-line-breaks";

interface Section7Props {
	content: HomePageProps["content"];
}

export default function Section7({ content }: Section7Props) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, {
		amount: 0.3,
	});

	const titleVariants = {
		hidden: {
			opacity: 0,
			y: 40,
			scale: 0.95,
		},
		show: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 1.2,
				ease: [0.4, 0, 0.2, 1] as const,
			},
		},
	};

	const faqVariants = {
		hidden: {
			opacity: 0,
			y: 30,
			scale: 0.9,
			rotateX: -10,
		},
		show: {
			opacity: 1,
			y: 0,
			scale: 1,
			rotateX: 0,
			transition: {
				duration: 1.0,
				ease: [0.4, 0, 0.2, 1] as const,
			},
		},
	};

	const containerVariants = {
		hidden: {},
		show: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const staticFaqs = [
		{
			question: content.section7faq1question,
			answer: content.section7faq1answer,
			number: "01",
			questionBold: content.section7faq1questionBold,
			answerBold: content.section7faq1answerBold,
		},
		{
			question: content.section7faq2question,
			answer: content.section7faq2answer,
			number: "02",
			questionBold: content.section7faq2questionBold,
			answerBold: content.section7faq2answerBold,
		},
		{
			question: content.section7faq3question,
			answer: content.section7faq3answer,
			number: "03",
			questionBold: content.section7faq3questionBold,
			answerBold: content.section7faq3answerBold,
		},
		{
			question: content.section7faq4question,
			answer: content.section7faq4answer,
			number: "04",
			questionBold: content.section7faq4questionBold,
			answerBold: content.section7faq4answerBold,
		},
	];

	// Add additional FAQs with dynamic numbering
	const additionalFaqs = (content.additionalSection7Faqs || []).map((faq, index) => ({
		question: faq.question,
		answer: faq.answer,
		number: String(5 + index).padStart(2, '0'),
		questionBold: faq.questionBold,
		answerBold: faq.answerBold,
	}));

	const faqs = [...staticFaqs, ...additionalFaqs];

	return (
		<section className="py-16 bg-white" ref={ref}>
			<div className="max-w-4xl mx-auto px-4">
				{/* Section Title */}
				<motion.h2
					className={`text-gray-800 mb-12 ${content.section7titleBold ? 'h2-bold' : ''}`}
					variants={titleVariants}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
				>
					<RenderLineBreaks text={content.section7title} />
				</motion.h2>

				{/* FAQ Accordion */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
				>
					<Accordion type="single" collapsible className="w-full">
						{faqs.map((faq, index) => (
							<motion.div
								key={index}
								variants={faqVariants}
							>
								<AccordionItem
									value={`item-${index}`}
									className="border-b border-gray-200 bg-white data-[state=open]:bg-brand-cream px-4 py-4"
								>
									<AccordionTrigger className="hover:no-underline [&>svg]:bg-brand-yellow [&>svg]:text-white [&>svg]:rounded-full [&>svg]:border-2 [&>svg]:border-brand-yellow [&>svg]:p-2 [&>svg]:w-8 [&>svg]:h-8">
										<div className="flex items-center space-x-4 text-left">
											<span className="text-brand-yellow font-bold text-lg">
												{faq.number}
											</span>
											<h4 className={`text-gray-800 ${faq.questionBold ? 'h4-bold' : ''}`}>
												<RenderLineBreaks text={faq.question} />
											</h4>
										</div>
									</AccordionTrigger>
									<AccordionContent className="text-muted-foreground">
										<div className="ml-12">
											<p className={`text-gray-600 leading-relaxed ${faq.answerBold ? 'p-bold' : ''}`}>
												<RenderLineBreaks text={faq.answer} />
											</p>
										</div>
									</AccordionContent>
								</AccordionItem>
							</motion.div>
						))}
					</Accordion>
				</motion.div>
			</div>
		</section>
	);
}
