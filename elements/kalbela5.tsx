"use client";

/**
 * plugin/kalbela/elements/kalbela5.tsx
 *
 * Kalbela Element 5: Standard Grid News Cards with Category Highlight Prefix
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

interface Kalbela5Props {
    title?: string;
    categoryIds?: string[];
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
    limit?: number;
    columnsDesktop?: number;
    columnsTablet?: number;
    columnsMobile?: number;
    imageHeightDesktop?: number;
    imageHeightMobile?: number;
    colors?: NewsColors;
    showCategory?: boolean;
    showExcerpt?: boolean;
    showDate?: boolean;
    showLink?: boolean;
}

export function Kalbela5UI({
    title = "",
    categoryIds = [],
    tabs = [],
    postsByCategory = {},
    limit,
    columnsDesktop = 3,
    columnsTablet = 2,
    columnsMobile = 1,
    imageHeightDesktop = 200,
    imageHeightMobile = 160,
    colors = {},
    showCategory = true,
    showExcerpt = true,
    showDate = true,
    showLink = true,
}: Kalbela5Props) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?._id ?? "");

    useEffect(() => {
        if (tabs.length > 0 && !tabs.some((t) => t._id === activeTab)) {
            setActiveTab(tabs[0]._id);
        }
    }, [tabs, activeTab]);

    const allPosts = getDisplayPosts(postsByCategory, activeTab, categoryIds, tabs[0]?._id);
    const posts = limit ? allPosts.slice(0, Number(limit)) : allPosts;

    const deskColsClass =
        columnsDesktop === 6 ? "lg:grid-cols-6" :
        columnsDesktop === 5 ? "lg:grid-cols-5" :
        columnsDesktop === 4 ? "lg:grid-cols-4" :
        columnsDesktop === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

    const tabColsClass =
        columnsTablet === 4 ? "md:grid-cols-4" :
        columnsTablet === 3 ? "md:grid-cols-3" :
        columnsTablet === 1 ? "md:grid-cols-1" : "md:grid-cols-2";

    const mobColsClass =
        columnsMobile === 2 ? "grid-cols-2" : "grid-cols-1";

    const gridClass = `${mobColsClass} ${tabColsClass} ${deskColsClass}`;

    return (
        <div className="w-full flex flex-col gap-2">
            {/* Header */}
            <KalbelaHeader
                title={title}
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                colors={colors}
            />

            {/* Grid Container */}
            {posts.length > 0 && (
                <div className={`grid ${gridClass} gap-2 md:gap-4`}>
                    {posts.map((post) => (
                        <a
                            href={post.postUrl || "#"}
                            key={post._id}
                            className="group/item flex flex-col rounded-xl overflow-hidden bg-white shadow-sm group-hover/item:hover:shadow-md transition-all"
                        >
                            {/* Card Image */}
                            {post.image && (
                                <div
                                    className="w-full overflow-hidden shrink-0 h-(--h-mob) md:h-(--h-desk)"
                                    style={{
                                        "--h-mob": `${imageHeightMobile}px`,
                                        "--h-desk": `${imageHeightDesktop}px`,
                                    } as React.CSSProperties}
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover/item:scale-105"
                                    />
                                </div>
                            )}
                            <div className="p-2">
                                {/* Headline Title with Category Prefix */}
                                <h3 className="text-base line-clamp-2 font-medium text-gray-900 leading-snug group-hover/item:text-main transition-colors">
                                    {showCategory && post.categoryTitle && (
                                        <span className="text-red-600 mr-1.5">{post.categoryTitle} /</span>
                                    )}
                                    {post.title}
                                </h3>

                                {/* Excerpt Text */}
                                {showExcerpt && post.excerpt && (
                                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-2 mt-2">
                                        {post.excerpt.replace(/<[^>]*>/g, "").trim()}
                                    </p>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

function Kalbela5CanvasPreview({ element }: { element: any }) {
    const c = { ...element.schema?.content, ...element.content };
    const s = { ...element.schema?.style, ...element.style };

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = Number(c.limit) || 6;

    const { tabs, postsByCategory, loading } = useKalbelaPosts(categoryIds, limit);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10 gap-2 text-gray-400">
                <Icon icon="svg-spinners:ring-resize" width={20} />
                <span className="text-xs">Loading Kalbela 5...</span>
            </div>
        );
    }

    return (
        <Kalbela5UI
            title={c.title ?? ""}
            categoryIds={categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            columnsDesktop={Number(c.columnsDesktop) || 3}
            columnsTablet={Number(c.columnsTablet) || 2}
            columnsMobile={Number(c.columnsMobile) || 1}
            imageHeightDesktop={Number(c.imageHeightDesktop) || 200}
            imageHeightMobile={Number(c.imageHeightMobile) || 160}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                inactive: s.inactiveTabColor || "",
                inactiveText: s.inactiveTabTextColor || "",
                title: s.titleColor || "",
                titleHover: s.titleHoverColor || "",
            }}
            showCategory={c.showCategory !== "false"}
            showExcerpt={c.showExcerpt !== "false"}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
}

const kalbela5Element = {
    type: "kalbela-5",
    category: "kalbela",
    label: "Kalbela 5 (Standard Grid Cards)",
    icon: "solar:grid-bold",

    schema: {
        content: {
            title: "",
            categoryIds: [] as string[],
            limit: 6,
            columnsDesktop: 3,
            columnsTablet: 2,
            columnsMobile: 1,
            imageHeightDesktop: 200,
            imageHeightMobile: 160,
            showCategory: "true",
            showExcerpt: "true",
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
                        <NumberControl label="Total Limit" value={value ?? 6} onChange={onChange} min={2} max={30} />
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
                        <NumberControl label="Tablet Columns" value={value ?? 2} onChange={onChange} min={1} max={4} />
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
                    name: "imageHeightDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <NumberControl label="Image Height Desktop (px)" value={value ?? 200} onChange={onChange} min={100} max={400} />
                    ),
                },
                {
                    name: "imageHeightMobile",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <NumberControl label="Image Height Mobile (px)" value={value ?? 160} onChange={onChange} min={80} max={300} />
                    ),
                },
                {
                    name: "showCategory",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Toggle label="Show Category Prefix" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                    ),
                },
                {
                    name: "showExcerpt",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Toggle label="Show Excerpt" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
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

    render: (element: any) => <Kalbela5CanvasPreview element={element} />,
};

export default kalbela5Element;
