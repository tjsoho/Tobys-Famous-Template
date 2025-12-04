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
        <div className="flex justify-between items-center h-14 w-full">
          {/* Back to Admin Dashboard */}
          <Link
            href="/admin"
            className="flex items-center gap-2 px-4 py-2 bg-brand-yellow text-brand-black rounded-lg font-semibold hover:bg-brand-yellow/80 transition-colors duration-300 shadow-md"
          >
            <Home className="w-4 h-4" />
            Admin
          </Link>

          {/* Page Title with Dropdown */}
          

          {/* Save Button */}
          <button
            onClick={onSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors duration-300 shadow-md ${saveStatus === 'success'
              ? 'bg-green-500 text-white'
              : saveStatus === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-brand-yellow text-brand-black hover:bg-brand-yellow/80'
              } disabled:opacity-50`}
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : saveStatus === 'success' ? "Saved!" : saveStatus === 'error' ? "Error" : "Save Page"}
          </button>
        </div>
      </div>
    </div>
  );
}
