"use client";

/**
 * plugin/kalbela/elements/kalbela10.tsx
 *
 * Kalbela Element 10: Two-Tier Grid Section (Top Primary Row + Bottom Secondary Row)
 */

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import {
    Text,
    NumberControl,
    Section,
    ColorPickerPopup,
    Toggle,
} from "@/components/builder/controls";
import { CategorySorter } from "../lib/CategorySorter";
import { Tab, TabPost, NewsColors } from "../lib/types";
import { useKalbelaPosts } from "../hooks/useKalbelaPosts";
import { KalbelaHeader } from "../lib/KalbelaHeader";

interface Kalbela10Props {
    title?: string;
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
    topCount?: number;
    topColumnsDesktop?: number;
    topColumnsTablet?: number;
    topColumnsMobile?: number;
    bottomColumnsDesktop?: number;
    bottomColumnsTablet?: number;
    bottomColumnsMobile?: number;
    colors?: NewsColors;
    showDate?: boolean;
    showLink?: boolean;
}

export function Kalbela10UI({
    title = "",
    tabs = [],
    postsByCategory = {},
    topCount = 3,
    topColumnsDesktop = 3,
    topColumnsTablet = 2,
    topColumnsMobile = 1,
    bottomColumnsDesktop = 4,
    bottomColumnsTablet = 2,
    bottomColumnsMobile = 1,
    colors = {},
    showDate = true,
    showLink = true,
}: Kalbela10Props) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?._id ?? "");

    useEffect(() => {
        if (tabs.length > 0 && !tabs.some((t) => t._id === activeTab)) {
            setActiveTab(tabs[0]._id);
        }
    }, [tabs, activeTab]);

    const posts = postsByCategory[activeTab] ?? [];

    const topCountNum = Math.min(Number(topCount) || 3, posts.length);
    const topPosts = posts.slice(0, topCountNum);
    const bottomPosts = posts.slice(topCountNum);

    // Top Grid Class
    const topDeskColsClass =
        topColumnsDesktop === 4 ? "lg:grid-cols-4" :
        topColumnsDesktop === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

    const topTabColsClass =
        topColumnsTablet === 3 ? "md:grid-cols-3" :
        topColumnsTablet === 1 ? "md:grid-cols-1" : "md:grid-cols-2";

    const topMobColsClass =
        topColumnsMobile === 2 ? "grid-cols-2" : "grid-cols-1";

    const topGridClass = `${topMobColsClass} ${topTabColsClass} ${topDeskColsClass}`;

    // Bottom Grid Class
    const btmDeskColsClass =
        bottomColumnsDesktop === 5 ? "lg:grid-cols-5" :
        bottomColumnsDesktop === 3 ? "lg:grid-cols-3" :
        bottomColumnsDesktop === 2 ? "lg:grid-cols-2" : "lg:grid-cols-4";

    const btmTabColsClass =
        bottomColumnsTablet === 3 ? "md:grid-cols-3" :
        bottomColumnsTablet === 1 ? "md:grid-cols-1" : "md:grid-cols-2";

    const btmMobColsClass =
        bottomColumnsMobile === 2 ? "grid-cols-2" : "grid-cols-1";

    const bottomGridClass = `${btmMobColsClass} ${btmTabColsClass} ${btmDeskColsClass}`;

    return (
        <div className="w-full flex flex-col gap-5 py-3 text-gray-900">
            {/* Header */}
            <KalbelaHeader
                title={title}
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                colors={colors}
            />

            {/* Top Row Primary Grid */}
            {topPosts.length > 0 && (
                <div className={`grid ${topGridClass} gap-5 border-b border-gray-200 pb-6`}>
                    {topPosts.map((post) => (
                        <div
                            key={post._id}
                            className="group flex flex-col gap-2.5 border-r border-gray-100 pr-3 last:border-none"
                        >
                            {post.image && (
                                <div className="aspect-16/10 w-full overflow-hidden rounded-xl bg-gray-100">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <h3
                                className="text-base md:text-lg font-extrabold text-blue-600 hover:text-blue-700 leading-snug transition-colors"
                                style={{ color: colors.title || undefined }}
                            >
                                {showLink ? <a href={post.postUrl || "#"}>{post.title}</a> : post.title}
                            </h3>
                        </div>
                    ))}
                </div>
            )}

            {/* Bottom Row Secondary Grid */}
            {bottomPosts.length > 0 && (
                <div className={`grid ${bottomGridClass} gap-5 pt-1`}>
                    {bottomPosts.map((post) => (
                        <div
                            key={post._id}
                            className="group flex flex-col gap-2.5 border-r border-gray-100 pr-3 last:border-none"
                        >
                            {post.image && (
                                <div className="aspect-16/10 w-full overflow-hidden rounded-xl bg-gray-100">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <h4
                                className="text-xs md:text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors"
                                style={{ color: colors.title || undefined }}
                            >
                                {showLink ? <a href={post.postUrl || "#"}>{post.title}</a> : post.title}
                            </h4>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function Kalbela10CanvasPreview({ element }: { element: any }) {
    const c = element.schema?.content ?? {};
    const s = element.schema?.style ?? {};

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = c.limit ?? 7;

    const { tabs, postsByCategory, loading } = useKalbelaPosts(categoryIds, limit);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10 gap-2 text-gray-400">
                <Icon icon="svg-spinners:ring-resize" width={20} />
                <span className="text-xs">Loading Kalbela 10...</span>
            </div>
        );
    }

    return (
        <Kalbela10UI
            title={c.title ?? ""}
            tabs={tabs}
            postsByCategory={postsByCategory}
            topCount={Number(c.topCount) || 3}
            topColumnsDesktop={Number(c.topColumnsDesktop) || 3}
            topColumnsTablet={Number(c.topColumnsTablet) || 2}
            topColumnsMobile={Number(c.topColumnsMobile) || 1}
            bottomColumnsDesktop={Number(c.bottomColumnsDesktop) || 4}
            bottomColumnsTablet={Number(c.bottomColumnsTablet) || 2}
            bottomColumnsMobile={Number(c.bottomColumnsMobile) || 1}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                inactive: s.inactiveTabColor || "",
                inactiveText: s.inactiveTabTextColor || "",
                title: s.titleColor || "",
                titleHover: s.titleHoverColor || "",
            }}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
}

const kalbela10Element = {
    type: "kalbela-10",
    category: "kalbela",
    label: "Kalbela 10 (Two-Tier Grid Section)",
    icon: "solar:widget-3-bold",

    schema: {
        content: {
            title: "",
            categoryIds: [] as string[],
            limit: 7,
            topCount: 3,
            topColumnsDesktop: 3,
            topColumnsTablet: 2,
            topColumnsMobile: 1,
            bottomColumnsDesktop: 4,
            bottomColumnsTablet: 2,
            bottomColumnsMobile: 1,
            showDate: "true",
            showLink: "true",
        },
        style: {
            titleColor: "",
            titleHoverColor: "",
            activeTabColor: "#2563eb",
            activeTabTextColor: "#ffffff",
            inactiveTabColor: "",
            inactiveTabTextColor: "",
            border: {},
        },
    },

    controls: [
        {
            tab: "Layout",
            section: "Content",
            controls: [
                {
                    name: "title",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Section Title" defaultOpen>
                            <Text label="Title" value={value ?? ""} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "categoryIds",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Categories" defaultOpen>
                            <CategorySorter value={value ?? []} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "limit",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Total Posts Limit">
                            <NumberControl label="Limit" value={value ?? 7} onChange={onChange} min={2} max={30} />
                        </Section>
                    ),
                },
                {
                    name: "topCount",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Top Section Post Count">
                            <NumberControl label="Top Count" value={value ?? 3} onChange={onChange} min={1} max={6} />
                        </Section>
                    ),
                },
                {
                    name: "topColumnsDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Top Grid Columns (Desktop)">
                            <NumberControl label="Desktop Columns" value={value ?? 3} onChange={onChange} min={1} max={4} />
                        </Section>
                    ),
                },
                {
                    name: "topColumnsTablet",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Top Grid Columns (Tablet)">
                            <NumberControl label="Tablet Columns" value={value ?? 2} onChange={onChange} min={1} max={3} />
                        </Section>
                    ),
                },
                {
                    name: "topColumnsMobile",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Top Grid Columns (Mobile)">
                            <NumberControl label="Mobile Columns" value={value ?? 1} onChange={onChange} min={1} max={2} />
                        </Section>
                    ),
                },
                {
                    name: "bottomColumnsDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Bottom Grid Columns (Desktop)">
                            <NumberControl label="Desktop Columns" value={value ?? 4} onChange={onChange} min={2} max={5} />
                        </Section>
                    ),
                },
                {
                    name: "bottomColumnsTablet",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Bottom Grid Columns (Tablet)">
                            <NumberControl label="Tablet Columns" value={value ?? 2} onChange={onChange} min={1} max={3} />
                        </Section>
                    ),
                },
                {
                    name: "bottomColumnsMobile",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Bottom Grid Columns (Mobile)">
                            <NumberControl label="Mobile Columns" value={value ?? 1} onChange={onChange} min={1} max={2} />
                        </Section>
                    ),
                },
                {
                    name: "showDate",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Display">
                            <Toggle label="Show Date" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                        </Section>
                    ),
                },
            ],
        },
        {
            tab: "Style",
            section: "Colors",
            controls: [
                {
                    name: "titleColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Title Color" defaultOpen>
                            <ColorPickerPopup label="Color" value={value ?? ""} onChange={onChange} />
                        </Section>
                    ),
                },
            ],
        },
    ],

    render: (element: any) => <Kalbela10CanvasPreview element={element} />,
};

export default kalbela10Element;
