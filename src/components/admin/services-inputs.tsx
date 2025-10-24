"use client";

import { SaveBanner } from "@/components/core/save-banner";
import { useState } from "react";
import { EditableElement } from "@/components/core/input";
import { ServicesPageContent, ServicesPageProps } from "@/app/services/_config";
import useUpdatePage from "@/utils/hooks/useUpdatePage";

export default function ServicesAdminInputs(props: ServicesPageProps) {
  const [content, setContent] = useState(props.content);

  const { isSaving, updatePage } =
    useUpdatePage<ServicesPageContent>("services");

  const handleSave = async () => {
    await updatePage({
      ...props,
      content,
    });
  };

  return (
    <div>
      <SaveBanner
        pageTitle={"Services Page"}
        onSave={handleSave}
        isSaving={isSaving}
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <EditableElement
              as="h2"
              className="text-4xl font-bold tracking-tight"
              defaultValue={content.mainTitle}
              onTextChange={(newText) =>
                setContent({
                  ...content,
                  mainTitle: newText,
                })
              }
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <EditableElement
                as="h2"
                className="text-2xl font-semibold text-blue-600"
                defaultValue={content.service1Title}
                onTextChange={(newText) =>
                  setContent({
                    ...content,
                    service1Title: newText,
                  })
                }
              />
              <p className="text-gray-600">
                Description for service 1 would go here.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <EditableElement
                as="h2"
                className="text-2xl font-semibold text-blue-600"
                defaultValue={content.service2Title}
                onTextChange={(newText) =>
                  setContent({
                    ...content,
                    service2Title: newText,
                  })
                }
              />
              <p className="text-gray-600">
                Description for service 2 would go here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
