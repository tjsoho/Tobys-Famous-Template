"use client";

import { useState } from "react";
import { SaveBanner } from "@/components/core/save-banner";
import { EditableElement } from "@/components/core/input";
import useUpdatePage from "@/utils/hooks/useUpdatePage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Pencil } from "lucide-react";

interface PrivacyPolicyContent {
	section1: string;
	section2: string;
	section3: string;
	section4: string;
	section5: string;
	section6: string;
	section7: string;
	section8: string;
	section9: string;
	section10: string;
	section11: string;
	section12: string;
	section13: string;
	section14: string;
	section15: string;
	section16: string;
	section17: string;
	section18: string;
	section19: string;
	section20: string;
	section21: string;
	section22: string;
	section23: string;
	sectionTitles?: {
		[key: string]: string;
	};
}

interface PrivacyPolicyProps {
	title: string;
	description: string;
	slug: string;
	content: PrivacyPolicyContent;
}

const sectionLabels = [
	"What We Collect",
	"How We Collect Information",
	"Why We Collect, Use & Disclose",
	"Credit-Related Information",
	"Disclosures to Third Parties",
	"Overseas Disclosures",
	"Marketing",
	"Cookies & Website Analytics",
	"Security",
	"Access & Correction",
	"Retention",
	"Notifiable Data Breaches",
	"Complaints",
	"Changes to this Policy",
	"Contact Us",
	"Indemnity",
	"Prohibited Conduct",
	"Variation of Terms",
	"Survival Clause",
	"Notices",
	"Severability",
	"Entire Agreement",
	"Data Breach Notification",
];

export default function PrivacyPolicyInputs(props: PrivacyPolicyProps) {
	const [section1, setSection1] = useState(props.content.section1);
	const [section2, setSection2] = useState(props.content.section2);
	const [section3, setSection3] = useState(props.content.section3);
	const [section4, setSection4] = useState(props.content.section4);
	const [section5, setSection5] = useState(props.content.section5);
	const [section6, setSection6] = useState(props.content.section6);
	const [section7, setSection7] = useState(props.content.section7);
	const [section8, setSection8] = useState(props.content.section8);
	const [section9, setSection9] = useState(props.content.section9);
	const [section10, setSection10] = useState(props.content.section10);
	const [section11, setSection11] = useState(props.content.section11);
	const [section12, setSection12] = useState(props.content.section12);
	const [section13, setSection13] = useState(props.content.section13);
	const [section14, setSection14] = useState(props.content.section14);
	const [section15, setSection15] = useState(props.content.section15);
	const [section16, setSection16] = useState(props.content.section16);
	const [section17, setSection17] = useState(props.content.section17);
	const [section18, setSection18] = useState(props.content.section18);
	const [section19, setSection19] = useState(props.content.section19);
	const [section20, setSection20] = useState(props.content.section20);
	const [section21, setSection21] = useState(props.content.section21);
	const [section22, setSection22] = useState(props.content.section22);
	const [section23, setSection23] = useState(props.content.section23);

	const sections = [
		{ value: section1, setValue: setSection1 },
		{ value: section2, setValue: setSection2 },
		{ value: section3, setValue: setSection3 },
		{ value: section4, setValue: setSection4 },
		{ value: section5, setValue: setSection5 },
		{ value: section6, setValue: setSection6 },
		{ value: section7, setValue: setSection7 },
		{ value: section8, setValue: setSection8 },
		{ value: section9, setValue: setSection9 },
		{ value: section10, setValue: setSection10 },
		{ value: section11, setValue: setSection11 },
		{ value: section12, setValue: setSection12 },
		{ value: section13, setValue: setSection13 },
		{ value: section14, setValue: setSection14 },
		{ value: section15, setValue: setSection15 },
		{ value: section16, setValue: setSection16 },
		{ value: section17, setValue: setSection17 },
		{ value: section18, setValue: setSection18 },
		{ value: section19, setValue: setSection19 },
		{ value: section20, setValue: setSection20 },
		{ value: section21, setValue: setSection21 },
		{ value: section22, setValue: setSection22 },
		{ value: section23, setValue: setSection23 },
	];

	// Section title states
	const [sectionTitles, setSectionTitles] = useState<Record<string, string>>(() => {
		const titles: Record<string, string> = {};
		sectionLabels.forEach((label, index) => {
			const key = `section${index + 1}`;
			titles[key] = props.content.sectionTitles?.[key] || `Section ${index + 1} - ${label}`;
		});
		return titles;
	});
	const [editingSection, setEditingSection] = useState<string | null>(null);
	const [editTitleValue, setEditTitleValue] = useState("");

	const { isSaving, updatePage } = useUpdatePage<PrivacyPolicyContent>("privacy-policy");

	const handleTitleEdit = (sectionKey: string) => {
		setEditingSection(sectionKey);
		setEditTitleValue(sectionTitles[sectionKey] || "");
	};

	const handleTitleSave = (sectionKey: string) => {
		setSectionTitles((prev) => ({
			...prev,
			[sectionKey]: editTitleValue,
		}));
		setEditingSection(null);
		setEditTitleValue("");
	};

	const handleTitleCancel = () => {
		setEditingSection(null);
		setEditTitleValue("");
	};

	const handleSave = async () => {
		await updatePage({
			title: props.title,
			description: props.description,
			slug: props.slug,
			content: {
				section1,
				section2,
				section3,
				section4,
				section5,
				section6,
				section7,
				section8,
				section9,
				section10,
				section11,
				section12,
				section13,
				section14,
				section15,
				section16,
				section17,
				section18,
				section19,
				section20,
				section21,
				section22,
				section23,
				sectionTitles,
			}
		});
	};

	return (
		<div>
			<SaveBanner
				pageTitle="Privacy Policy"
				onSave={handleSave}
				isSaving={isSaving}
			/>

			<div className="min-h-screen bg-white">
				<div className="max-w-7xl mx-auto px-4 py-4">
					<Accordion type="multiple" className="space-y-8">
						{sections.map((section, index) => {
							const sectionKey = `section${index + 1}`;
							const isYellow = index % 2 === 0;
							return (
								<AccordionItem
									key={sectionKey}
									value={sectionKey}
									className={`${isYellow ? 'bg-brand-yellow/10 border border-brand-yellow/20' : 'bg-brand-teal/10 border border-brand-teal/20'} p-8 rounded-2xl`}
								>
									<AccordionTrigger 
										className="text-xl text-brand-black font-bold hover:no-underline"
										editIcon={editingSection !== sectionKey ? (
											<button
												onClick={(e) => {
													e.stopPropagation();
													handleTitleEdit(sectionKey);
												}}
												className="p-2 hover:bg-black/10 rounded-full border border-brand-yellow transition-colors w-8 h-8 flex items-center justify-center"
											>
												<Pencil size={16} className="text-brand-black" />
											</button>
										) : null}
									>
										{editingSection === sectionKey ? (
											<div className="flex items-center gap-3 flex-1" onClick={(e) => e.stopPropagation()}>
												<input
													type="text"
													value={editTitleValue}
													onChange={(e) => setEditTitleValue(e.target.value)}
													onKeyDown={(e) => {
														if (e.key === "Enter") handleTitleSave(sectionKey);
														if (e.key === "Escape") handleTitleCancel();
													}}
													className="flex-1 px-2 py-1 border border-brand-black/20 rounded text-xl font-bold bg-white"
													autoFocus
												/>
												<button
													onClick={(e) => {
														e.stopPropagation();
														handleTitleSave(sectionKey);
													}}
													className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors border border-green-300"
												>
													Save
												</button>
												<button
													onClick={(e) => {
														e.stopPropagation();
														handleTitleCancel();
													}}
													className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors border border-red-300"
												>
													Cancel
												</button>
											</div>
										) : (
											<span>{sectionTitles[sectionKey]}</span>
										)}
									</AccordionTrigger>
									<AccordionContent>
										<section className="pt-4">
											<div>
												<label className="block text-brand-black text-sm font-medium mb-2">
													Section Content
												</label>
												<EditableElement
													as="textarea"
													className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
													onTextChange={section.setValue}
													defaultValue={section.value}
												/>
											</div>
										</section>
									</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				</div>
			</div>
		</div>
	);
}
