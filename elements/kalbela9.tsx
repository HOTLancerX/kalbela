"use client";

/**
 * plugin/kalbela/elements/kalbela9.tsx
 *
 * Kalbela Element 9: Top Dark Banner Lead + Top 2 Grid Cards + Dynamic Bottom Row Grid
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

interface Kalbela9Colors extends NewsColors {
    leadBg?: string;
    leadTitle?: string;
    leadText?: string;
}

interface Kalbela9Props {
    title?: string;
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
    limit?: number;
    columnsDesktop?: number;
    columnsTablet?: number;
    columnsMobile?: number;
    colors?: Kalbela9Colors;
    showDate?: boolean;
    showLink?: boolean;
}

export function Kalbela9UI({
    title = "",
    tabs = [],
    postsByCategory = {},
    limit,
    columnsDesktop = 4,
    columnsTablet = 2,
    columnsMobile = 1,
    colors = {},
    showDate = true,
    showLink = true,
}: Kalbela9Props) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?._id ?? "");

    useEffect(() => {
        if (tabs.length > 0 && !tabs.some((t) => t._id === activeTab)) {
            setActiveTab(tabs[0]._id);
        }
    }, [tabs, activeTab]);

    const posts = postsByCategory[activeTab] ?? [];

    const leadPost = posts[0];
    const topSubPosts = posts.slice(1, 3);
    const bottomPosts = posts.slice(3);

    const deskColsClass =
        columnsDesktop === 5 ? "lg:grid-cols-5" :
        columnsDesktop === 3 ? "lg:grid-cols-3" :
        columnsDesktop === 2 ? "lg:grid-cols-2" : "lg:grid-cols-4";

    const tabColsClass =
        columnsTablet === 3 ? "md:grid-cols-3" :
        columnsTablet === 1 ? "md:grid-cols-1" : "md:grid-cols-2";

    const mobColsClass =
        columnsMobile === 2 ? "grid-cols-2" : "grid-cols-1";

    const bottomGridClass = `${mobColsClass} ${tabColsClass} ${deskColsClass}`;

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

            {/* Top Row (Left Dark Panel Featured Card + Right 2 Cards) */}
            {posts.length > 0 && (
                <div className="flex flex-col lg:flex-row gap-5 items-stretch border-b border-gray-200 pb-6">
                    {/* Left Split Dark Panel Featured Lead Card */}
                    {leadPost && (
                        <div className="w-full lg:w-1/2 group flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-sm border-r border-gray-200/50">
                            {/* Left Dynamic Color Panel */}
                            <div
                                className="w-full md:w-1/2 p-5 flex flex-col justify-center gap-2.5 transition-colors"
                                style={{ backgroundColor: colors.leadBg || "#000000" }}
                            >
                                <h2
                                    className="text-lg md:text-xl font-extrabold leading-snug transition-colors"
                                    style={{ color: colors.leadTitle || "#fbbf24" }}
                                >
                                    {showLink ? <a href={leadPost.postUrl || "#"}>{leadPost.title}</a> : leadPost.title}
                                </h2>
                                {leadPost.excerpt && (
                                    <p
                                        className="text-xs leading-relaxed line-clamp-3 md:line-clamp-4"
                                        style={{ color: colors.leadText || "#d1d5db" }}
                                    >
                                        {leadPost.excerpt.replace(/<[^>]*>/g, "").trim()}
                                    </p>
                                )}
                            </div>
                            {/* Right Image */}
                            {leadPost.image && (
                                <div className="w-full md:w-1/2 overflow-hidden bg-gray-900 aspect-16/10">
                                    <img
                                        src={leadPost.image}
                                        alt={leadPost.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Right 2 Top Sub-Cards */}
                    {topSubPosts.length > 0 && (
                        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {topSubPosts.map((post) => (
                                <div
                                    key={post._id}
                                    className="group flex flex-col gap-2.5 pl-0 lg:pl-3 border-r border-gray-100 last:border-none"
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
                                        className="text-xs md:text-sm font-bold text-gray-900 leading-snug line-clamp-3 group-hover:text-blue-600 transition-colors"
                                        style={{ color: colors.title || undefined }}
                                    >
                                        {showLink ? <a href={post.postUrl || "#"}>{post.title}</a> : post.title}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Bottom Row Grid */}
            {bottomPosts.length > 0 && (
                <div className={`grid ${bottomGridClass} gap-5 pt-2`}>
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

function Kalbela9CanvasPreview({ element }: { element: any }) {
    const c = { ...element.schema?.content, ...element.content };
    const s = { ...element.schema?.style, ...element.style };

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = Number(c.limit) || 7;

    const { tabs, postsByCategory, loading } = useKalbelaPosts(categoryIds, limit);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10 gap-2 text-gray-400">
                <Icon icon="svg-spinners:ring-resize" width={20} />
                <span className="text-xs">Loading Kalbela 9...</span>
            </div>
        );
    }

    return (
        <Kalbela9UI
            title={c.title ?? ""}
            tabs={tabs}
            postsByCategory={postsByCategory}
            columnsDesktop={Number(c.columnsDesktop) || 4}
            columnsTablet={Number(c.columnsTablet) || 2}
            columnsMobile={Number(c.columnsMobile) || 1}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                inactive: s.inactiveTabColor || "",
                inactiveText: s.inactiveTabTextColor || "",
                title: s.titleColor || "",
                titleHover: s.titleHoverColor || "",
                leadBg: s.leadBgColor || "#000000",
                leadTitle: s.leadTitleColor || "#fbbf24",
                leadText: s.leadTextColor || "#d1d5db",
            }}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
}

const kalbela9Element = {
    type: "kalbela-9",
    category: "kalbela",
    label: "Kalbela 9 (Dark Lead Panel + Bottom Grid)",
    icon: "solar:layout-grid-bold",

    schema: {
        content: {
            title: "",
            categoryIds: [] as string[],
            limit: 7,
            columnsDesktop: 4,
            columnsTablet: 2,
            columnsMobile: 1,
            showDate: "true",
            showLink: "true",
        },
        style: {
            titleColor: "",
            titleHoverColor: "",
            leadBgColor: "#000000",
            leadTitleColor: "#fbbf24",
            leadTextColor: "#d1d5db",
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
                            <NumberControl label="Limit" value={value ?? 7} onChange={onChange} min={3} max={30} />
                        </Section>
                    ),
                },
                {
                    name: "columnsDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Bottom Grid Columns (Desktop)">
                            <NumberControl label="Desktop Columns" value={value ?? 4} onChange={onChange} min={2} max={5} />
                        </Section>
                    ),
                },
                {
                    name: "columnsTablet",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Bottom Grid Columns (Tablet)">
                            <NumberControl label="Tablet Columns" value={value ?? 2} onChange={onChange} min={1} max={3} />
                        </Section>
                    ),
                },
                {
                    name: "columnsMobile",
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
                    name: "leadBgColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Lead Box Background Color" defaultOpen>
                            <ColorPickerPopup label="Background Color" value={value ?? "#000000"} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "leadTitleColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Lead Box Title Color">
                            <ColorPickerPopup label="Title Color" value={value ?? "#fbbf24"} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "leadTextColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Lead Box Text Color">
                            <ColorPickerPopup label="Text Color" value={value ?? "#d1d5db"} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "titleColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Cards Title Color">
                            <ColorPickerPopup label="Color" value={value ?? ""} onChange={onChange} />
                        </Section>
                    ),
                },
            ],
        },
    ],

    render: (element: any) => <Kalbela9CanvasPreview element={element} />,
};

export default kalbela9Element;
