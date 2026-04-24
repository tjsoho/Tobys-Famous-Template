"use client";

import { useState, useRef, useEffect } from "react";
import { X, Check, Crosshair } from "lucide-react";
import type { FocalPoint } from "@/utils/focal-point";

interface FocalPointPickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (focus: FocalPoint) => void;
    imageUrl: string;
    initialFocus?: FocalPoint;
    /** Aspect ratio used by the public-facing container (width/height). Default 16/9. */
    previewAspect?: number;
}

export default function FocalPointPicker({
    isOpen,
    onClose,
    onSave,
    imageUrl,
    initialFocus = { x: 50, y: 50 },
    previewAspect = 16 / 9,
}: FocalPointPickerProps) {
    const [focus, setFocus] = useState<FocalPoint>(initialFocus);
    const [isDragging, setIsDragging] = useState(false);
    const imgWrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) setFocus(initialFocus);
    }, [isOpen, initialFocus]);

    if (!isOpen) return null;

    const updateFocus = (clientX: number, clientY: number) => {
        const el = imgWrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
        setFocus({ x: Math.round(x), y: Math.round(y) });
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
            <div className="bg-neutral-900 w-full max-w-5xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Crosshair className="w-5 h-5 text-brand-yellow" />
                        <div>
                            <h2 className="text-lg text-white font-semibold">Set focal point</h2>
                            <p className="text-white/50 text-xs">
                                Click or drag on the left — preview on the right
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/70 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 flex-1 overflow-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2 min-w-0">
                        <p className="text-white/50 text-xs">Source image</p>
                        <div
                            ref={imgWrapRef}
                            className="relative select-none cursor-crosshair rounded-xl overflow-hidden bg-black flex items-center justify-center"
                            onMouseDown={(e) => {
                                setIsDragging(true);
                                updateFocus(e.clientX, e.clientY);
                            }}
                            onMouseMove={(e) => isDragging && updateFocus(e.clientX, e.clientY)}
                            onMouseUp={() => setIsDragging(false)}
                            onMouseLeave={() => setIsDragging(false)}
                            onTouchStart={(e) => {
                                const t = e.touches[0];
                                updateFocus(t.clientX, t.clientY);
                            }}
                            onTouchMove={(e) => {
                                const t = e.touches[0];
                                updateFocus(t.clientX, t.clientY);
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={imageUrl}
                                alt=""
                                className="w-full h-auto pointer-events-none max-h-[60vh] object-contain"
                            />

                            <div
                                className="absolute pointer-events-none"
                                style={{
                                    left: `${focus.x}%`,
                                    top: `${focus.y}%`,
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-brand-yellow/40 backdrop-blur-sm flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                </div>
                                <div className="absolute top-1/2 left-1/2 w-16 h-px bg-white/50 -translate-x-1/2 -translate-y-1/2" />
                                <div className="absolute top-1/2 left-1/2 w-px h-16 bg-white/50 -translate-x-1/2 -translate-y-1/2" />
                            </div>

                            <div className="absolute bottom-3 left-3 bg-black/70 rounded-full px-3 py-1 text-white text-xs font-mono">
                                {focus.x}% × {focus.y}%
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 min-w-0">
                        <p className="text-white/50 text-xs">Crop preview (approx. public display)</p>
                        <div
                            className="w-full rounded-xl overflow-hidden bg-black"
                            style={{ aspectRatio: previewAspect }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={imageUrl}
                                alt=""
                                className="w-full h-full object-cover"
                                style={{ objectPosition: `${focus.x}% ${focus.y}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-white/10 flex justify-between items-center bg-neutral-900">
                    <button
                        type="button"
                        onClick={() => setFocus({ x: 50, y: 50 })}
                        className="text-white/50 text-xs uppercase tracking-wide hover:text-white"
                    >
                        Reset to center
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                onSave(focus);
                                onClose();
                            }}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-yellow text-brand-black text-sm font-semibold hover:bg-brand-yellow/80"
                        >
                            <Check className="w-4 h-4" />
                            Save focus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
