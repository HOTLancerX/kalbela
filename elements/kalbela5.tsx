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
    Section,
    ColorPickerPopup,
    Toggle,
} from "@/components/builder/controls";
import { CategorySorter } from "../lib/CategorySorter";
import { Tab, TabPost, NewsColors } from "../lib/types";
import { useKalbelaPosts } from "../hooks/useKalbelaPosts";
import { KalbelaHeader } from "../lib/KalbelaHeader";

interface Kalbela5Props {
    title?: string;
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
    columnsDesktop?: number;
    columnsTablet?: number;
    columnsMobile?: number;
    colors?: NewsColors;
    showCategory?: boolean;
    showExcerpt?: boolean;
    showDate?: boolean;
    showLink?: boolean;
}

export function Kalbela5UI({
    title = "",
    tabs = [],
    postsByCategory = {},
    columnsDesktop = 3,
    columnsTablet = 2,
    columnsMobile = 1,
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

    const posts = postsByCategory[activeTab] ?? [];

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
        <div className="w-full flex flex-col gap-4 py-3 text-gray-900">
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
                <div className={`grid ${gridClass} gap-4 md:gap-5`}>
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            className="group flex flex-col gap-3 rounded-2xl border border-gray-200/90 bg-white p-4 shadow-sm hover:shadow-md transition-all"
                        >
                            {/* Card Image */}
                            {post.image && (
                                <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-gray-100">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}

                            {/* Headline Title with Category Prefix */}
                            <h3 className="text-base md:text-lg font-extrabold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
                                {showCategory && post.categoryTitle && (
                                    <span className="text-red-600 mr-1.5">{post.categoryTitle} /</span>
                                )}
                                {showLink ? <a href={post.postUrl || "#"}>{post.title}</a> : post.title}
                            </h3>

                            {/* Excerpt Text */}
                            {showExcerpt && post.excerpt && (
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3">
                                    {post.excerpt.replace(/<[^>]*>/g, "").trim()}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function Kalbela5CanvasPreview({ element }: { element: any }) {
    const c = element.schema?.content ?? {};
    const s = element.schema?.style ?? {};

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = c.limit ?? 6;

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
            tabs={tabs}
            postsByCategory={postsByCategory}
            columnsDesktop={Number(c.columnsDesktop) || 3}
            columnsTablet={Number(c.columnsTablet) || 2}
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
                            <NumberControl label="Limit" value={value ?? 6} onChange={onChange} min={2} max={30} />
                        </Section>
                    ),
                },
                {
                    name: "columnsDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Columns (Desktop)">
                            <NumberControl label="Desktop Columns" value={value ?? 3} onChange={onChange} min={2} max={6} />
                        </Section>
                    ),
                },
                {
                    name: "columnsTablet",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Columns (Tablet)">
                            <NumberControl label="Tablet Columns" value={value ?? 2} onChange={onChange} min={1} max={4} />
                        </Section>
                    ),
                },
                {
                    name: "columnsMobile",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Columns (Mobile)">
                            <NumberControl label="Mobile Columns" value={value ?? 1} onChange={onChange} min={1} max={2} />
                        </Section>
                    ),
                },
                {
                    name: "showCategory",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Display">
                            <Toggle label="Show Category Prefix" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                        </Section>
                    ),
                },
                {
                    name: "showExcerpt",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Display">
                            <Toggle label="Show Excerpt Text" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
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

    render: (element: any) => <Kalbela5CanvasPreview element={element} />,
};

export default kalbela5Element;
