"use client";

/**
 * plugin/kalbela/elements/kalbela1.tsx
 *
 * Kalbela Element 1: Main Lead News Block (Top Lead Card + Dynamic Grid for remaining cards)
 */

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import {
    Text,
    NumberControl,
    ColorPickerPopup,
    Toggle,
} from "@/components/builder/controls";
import { CategorySorter } from "../lib/CategorySorter";
import { Tab, TabPost, NewsColors } from "../lib/types";
import { useKalbelaPosts, getDisplayPosts } from "../hooks/useKalbelaPosts";
import { KalbelaHeader } from "../lib/KalbelaHeader";
import k1Icon from "../icon/k1.png";

interface Kalbela1Props {
    title?: string;
    categoryIds?: string[];
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
    limit?: number;
    columnsDesktop?: number;
    columnsTablet?: number;
    columnsMobile?: number;
    colors?: NewsColors;
    showCategory?: boolean;
    showDate?: boolean;
    showLink?: boolean;
}

export function Kalbela1UI({
    title = "",
    categoryIds = [],
    tabs = [],
    postsByCategory = {},
    limit,
    columnsDesktop = 3,
    columnsTablet = 3,
    columnsMobile = 1,
    colors = {},
    showCategory = true,
    showDate = true,
    showLink = true,
}: Kalbela1Props) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?._id ?? "");

    useEffect(() => {
        if (tabs.length > 0 && !tabs.some((t) => t._id === activeTab)) {
            setActiveTab(tabs[0]._id);
        }
    }, [tabs, activeTab]);

    const allPosts = getDisplayPosts(postsByCategory, activeTab, categoryIds, tabs[0]?._id);
    const posts = limit ? allPosts.slice(0, Number(limit)) : allPosts;

    const leadPost = posts[0];
    const subPosts = posts.slice(1);

    const deskColsClass =
        columnsDesktop === 6 ? "lg:grid-cols-6" :
        columnsDesktop === 5 ? "lg:grid-cols-5" :
        columnsDesktop === 4 ? "lg:grid-cols-4" :
        columnsDesktop === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

    const tabColsClass =
        columnsTablet === 4 ? "md:grid-cols-4" :
        columnsTablet === 2 ? "md:grid-cols-2" :
        columnsTablet === 1 ? "md:grid-cols-1" : "md:grid-cols-3";

    const mobColsClass =
        columnsMobile === 2 ? "grid-cols-2" : "grid-cols-1";

    const gridClass = `${mobColsClass} ${tabColsClass} ${deskColsClass}`;

    return (
        <div className="w-full flex flex-col gap-2">
            {/* Header with Title and Tab Logic */}
            <KalbelaHeader
                title={title}
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                colors={colors}
            />

            {/* 1. Main Top Featured Card (Horizontal Image Left + Blue Headline Right) */}
            {leadPost && (
                <a href={leadPost.postUrl || "#"} className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all mb-4">
                    <div className="flex flex-col md:flex-row items-stretch">
                        <div className="w-full md:w-1/2 aspect-16/10 shrink-0">
                            <img
                                src={leadPost.image}
                                alt={leadPost.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-101"
                            />
                        </div>
                        <div className="w-full md:w-1/2 p-5 flex flex-col justify-center">
                            {showCategory && leadPost.categoryTitle && (
                                <span className="text-xs font-bold text-red-600 mb-2">
                                    {leadPost.categoryTitle}
                                </span>
                            )}
                            <h2 className="text-xl md:text-2xl font-bold text-blue-600 group-hover:text-blue-700 leading-snug transition-colors line-clamp-3">
                                {leadPost.title}
                            </h2>
                            {leadPost.excerpt && (
                                <p className="text-gray-600 text-sm mt-3 line-clamp-3 leading-relaxed">
                                    {leadPost.excerpt}
                                </p>
                            )}
                        </div>
                    </div>
                </a>
            )}

            {/* 2. Remaining Posts Dynamic Grid */}
            {subPosts.length > 0 && (
                <div className={`grid gap-4 ${gridClass}`}>
                    {subPosts.map((post) => (
                        <a key={post._id} href={post.postUrl || "#"} className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all">
                            <div className="w-full aspect-16/10 overflow-hidden shrink-0">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-101"
                                />
                            </div>
                            <div className="p-3.5 flex flex-col flex-1">
                                {showCategory && post.categoryTitle && (
                                    <span className="text-xs font-bold text-red-600 mb-1.5">
                                        {post.categoryTitle}
                                    </span>
                                )}
                                <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 line-clamp-2 leading-snug transition-colors">
                                    {post.title}
                                </h3>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

function Kalbela1CanvasPreview({ element }: { element: any }) {
    const c = { ...element.schema?.content, ...element.content };
    const s = { ...element.schema?.style, ...element.style };

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = Number(c.limit) || 7;

    const { tabs, postsByCategory, loading } = useKalbelaPosts(categoryIds, limit);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10 gap-2 text-gray-400">
                <Icon icon="svg-spinners:ring-resize" width={20} />
                <span className="text-xs">Loading Kalbela 1...</span>
            </div>
        );
    }

    return (
        <Kalbela1UI
            title={c.title ?? ""}
            categoryIds={categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            columnsDesktop={Number(c.columnsDesktop) || 3}
            columnsTablet={Number(c.columnsTablet) || 3}
            columnsMobile={Number(c.columnsMobile) || 1}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                inactive: s.inactiveTabColor || "",
                inactiveText: s.inactiveTabTextColor || "",
                title: s.titleColor || "",
                titleHover: s.titleHoverColor || "",
            }}
            showCategory={c.showCategory !== "false"}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
}

const kalbela1Element = {
    type: "kalbela-1",
    category: "kalbela",
    label: "Hero",
    icon: typeof k1Icon === "string" ? k1Icon : (k1Icon as any)?.src || "solar:widget-bold",

    schema: {
        content: {
            title: "",
            categoryIds: [] as string[],
            limit: 7,
            columnsDesktop: 3,
            columnsTablet: 3,
            columnsMobile: 1,
            showCategory: "true",
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
                        <Text label="Title" value={value ?? ""} onChange={onChange} />
                    ),
                },
                {
                    name: "categoryIds",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <CategorySorter value={value ?? []} onChange={onChange} />
                    ),
                },
                {
                    name: "limit",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <NumberControl label="Total Limit" value={value ?? 7} onChange={onChange} min={2} max={30} />
                    ),
                },
                {
                    name: "columnsDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <NumberControl label="Desktop Columns" value={value ?? 3} onChange={onChange} min={2} max={6} />
                    ),
                },
                {
                    name: "columnsTablet",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <NumberControl label="Tablet Columns" value={value ?? 3} onChange={onChange} min={1} max={4} />
                    ),
                },
                {
                    name: "columnsMobile",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <NumberControl label="Mobile Columns" value={value ?? 1} onChange={onChange} min={1} max={2} />
                    ),
                },
                {
                    name: "showCategory",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Toggle label="Show Category" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                    ),
                },
                {
                    name: "showDate",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Toggle label="Show Date" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
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
                        <ColorPickerPopup label="Title Color" value={value ?? ""} onChange={onChange} />
                    ),
                },
            ],
        },
    ],

    render: (element: any) => <Kalbela1CanvasPreview element={element} />,
};

export default kalbela1Element;
