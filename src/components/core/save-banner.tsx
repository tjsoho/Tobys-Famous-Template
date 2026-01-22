"use client";

import Link from "next/link";
import {  Save, Home } from "lucide-react";

interface SaveBannerProps {
  pageTitle: string;
  onSave: () => void;
  isSaving?: boolean;
  saveStatus?: 'idle' | 'success' | 'error';
}



export function SaveBanner({
  
  onSave,
  isSaving = false,
  saveStatus = 'idle',
}: SaveBannerProps) {
  

  return (
    <div className="bg-white border-b border-brand-black/10 shadow-sm z-50 sticky top-0">
      <div className="mx-auto px-4 lg:px-6 flex justify-center items-center w-full h-full">
        <div className="flex justify-between items-center h-14 w-full gap-4">
          {/* Back to Admin Dashboard */}
          <Link
            href="/admin"
            aria-label="Go to Admin Dashboard"
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-black/80 transition-colors duration-300 shadow-md"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Admin
          </Link>

          {/* Website Home Button - Middle */}
          <Link
            href="/"
            aria-label="Go to Website Home"
            className="flex items-center gap-2 px-4 py-2 bg-white text-black border-2 border-black rounded-lg font-semibold hover:bg-black hover:text-white transition-colors duration-300 shadow-md"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Website Home
          </Link>

          {/* Save Button */}
          <button
            onClick={onSave}
            disabled={isSaving}
            aria-label={isSaving ? "Saving changes" : saveStatus === 'success' ? "Changes saved successfully" : saveStatus === 'error' ? "Error saving changes" : "Save page changes"}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors duration-300 shadow-md ${saveStatus === 'success'
              ? 'bg-black text-white'
              : saveStatus === 'error'
                ? 'bg-black text-white'
                : 'bg-black text-white hover:bg-black/80'
              } disabled:opacity-50`}
          >
            <Save className="w-4 h-4" aria-hidden="true" />
            {isSaving ? "Saving..." : saveStatus === 'success' ? "Saved!" : saveStatus === 'error' ? "Error" : "Save Page"}
          </button>
        </div>
      </div>
    </div>
  );
}
