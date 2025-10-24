"use client";

import { WorkPageContent, WorkPageProps } from "@/app/work/_config";
import { EditableElement } from "../core/input";
import { SaveBanner } from "../core/save-banner";
import useUpdatePage from "@/utils/hooks/useUpdatePage";
import { useState } from "react";

export default function WorkPageInputs(props: WorkPageProps) {
  const [title, setTitle] = useState(props.content.workPageTitle);
  const [description, setDescription] = useState(
    props.content.workPageDescription
  );
  const [showingToby, setShowingToby] = useState(
    props.content.workPageShowingToby
  );

  const { isSaving, updatePage } = useUpdatePage<WorkPageContent>("work");

  const handleSave = async () => {
    await updatePage({
      ...props,
      content: {
        ...props.content,
        workPageTitle: title,
        workPageDescription: description,
        workPageShowingToby: showingToby,
      },
    });
  };

  return (
    <div>
      <SaveBanner
        pageTitle="Work Page"
        onSave={handleSave}
        isSaving={isSaving}
      />
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 p-8 rounded-xl shadow-lg max-w-xl mx-auto mt-12">
        <EditableElement
          onTextChange={setTitle}
          as="h2"
          className="text-4xl font-bold mb-4 text-gray-900 tracking-tight"
          defaultValue={title}
        />
        <EditableElement
          onTextChange={setDescription}
          as="p"
          className="text-lg text-gray-700 mb-6 text-center"
          defaultValue={description}
        />
        <EditableElement
          onTextChange={setShowingToby}
          as="p"
          className="text-base text-purple-400 italic"
          defaultValue={showingToby}
        />
      </div>
    </div>
  );
}
