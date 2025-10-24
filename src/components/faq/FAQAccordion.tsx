'use client';

import { useState } from 'react';
import { FAQ } from '@/app/types/faq';

interface FAQAccordionProps {
    faq: FAQ;
}

export default function FAQAccordion({ faq }: FAQAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/20 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
            >
                <h3 className="text-lg font-medium text-white group-hover:text-white/90 transition-colors pr-8">
                    {faq.question}
                </h3>
                <div className={`transform transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                    <svg
                        className="w-6 h-6 text-white/70 group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </div>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'
                    }`}
            >
                <p className="text-white/70">{faq.answer}</p>
            </div>
        </div>
    );
}
