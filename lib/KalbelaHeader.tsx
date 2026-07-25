"use client";

/**
 * plugin/kalbela/lib/KalbelaHeader.tsx
 *
 * Reusable Header component for Kalbela elements:
 * - Renders section title if provided.
 * - Renders category tabs ONLY if 2 or more categories are selected (tabs.length >= 2).
 * - Hides header container if no title and less than 2 tabs.
 */

import React from "react";
import { Tab, NewsColors } from "./types";

interface KalbelaHeaderProps {
    title?: string;
    tabs?: Tab[];
    activeTab: string;
    onTabChange: (id: string) => void;
    colors?: NewsColors;
}

export function KalbelaHeader({
    title = "",
    tabs = [],
    activeTab,
    onTabChange,
    colors = {},
}: KalbelaHeaderProps) {
    const hasTitle = Boolean(title && title.trim().length > 0);
    const showTabs = tabs && tabs.length >= 2;

    if (!hasTitle && !showTabs) {
        return null;
    }

    const activeBg = colors.active || "#2563eb";
    const activeText = colors.activeText || "#ffffff";
    const inactiveBg = colors.inactive || "transparent";
    const inactiveText = colors.inactiveText || "#374151";

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-2.5">
            {hasTitle && (
                <div className="flex items-center gap-2">
                    <span className="h-5 w-1.5 bg-blue-600 rounded-sm" />
                    <h3 className="text-xl font-bold tracking-tight" style={{ color: colors.title || undefined }}>
                        {title}
                    </h3>
                </div>
            )}
            {showTabs && (
                <div className="flex flex-wrap items-center gap-1">
                    {tabs.map((tab) => {
                        const isActive = tab._id === activeTab;
                        return (
                            <button
                                key={tab._id}
                                type="button"
                                onClick={() => onTabChange(tab._id)}
                                className="px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer"
                                style={{
                                    backgroundColor: isActive ? activeBg : inactiveBg,
                                    color: isActive ? activeText : inactiveText,
                                }}
                            >
                                {tab.title}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
