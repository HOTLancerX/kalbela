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
    Section,
    ColorPickerPopup,
    Toggle,
} from "@/components/builder/controls";
import { CategorySorter } from "../lib/CategorySorter";
import { Tab, TabPost, NewsColors } from "../lib/types";
import { useKalbelaPosts } from "../hooks/useKalbelaPosts";
import { KalbelaHeader } from "../lib/KalbelaHeader";

interface Kalbela1Props {
    title?: string;
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
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
    tabs = [],
    postsByCategory = {},
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

    const posts = postsByCategory[activeTab] ?? [];

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
        <div className="w-full flex flex-col gap-4 py-3 text-gray-900">
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
                <div className="group rounded-2xl border border-gray-200/90 bg-white p-4 md:p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row gap-5 lg:gap-7 items-stretch">
                        <div className="w-full md:w-[58%] overflow-hidden rounded-xl bg-gray-100 aspect-16/10 shrink-0">
                            <img
                                src={leadPost.image}
                                alt={leadPost.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="w-full md:w-[42%] flex flex-col justify-start gap-3 py-1">
                            <h2
                                className="text-xl md:text-2xl lg:text-2xl font-bold tracking-tight text-blue-600 hover:text-blue-700 leading-snug transition-colors"
                                style={{ color: colors.title || undefined }}
                            >
                                {showLink ? <a href={leadPost.postUrl || "#"}>{leadPost.title}</a> : leadPost.title}
                            </h2>
                            {leadPost.excerpt && (
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-4 md:line-clamp-6">
                                    {leadPost.excerpt}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* 2. Sub-Posts Grid */}
            {subPosts.length > 0 && (
                <div className={`grid ${gridClass} gap-4 md:gap-5`}>
                    {subPosts.map((post) => (
                        <div
                            key={post._id}
                            className="group flex flex-col gap-3 rounded-2xl border border-gray-200/90 bg-white p-3.5 shadow-sm hover:shadow-md transition-all"
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
                            <h4 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-blue-600 leading-snug line-clamp-2 transition-colors">
                                {showLink ? <a href={post.postUrl || "#"}>{post.title}</a> : post.title}
                            </h4>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function Kalbela1CanvasPreview({ element }: { element: any }) {
    const c = element.schema?.content ?? {};
    const s = element.schema?.style ?? {};

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = c.limit ?? 7;

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
            tabs={tabs}
            postsByCategory={postsByCategory}
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
    label: "Kalbela 1 (Top Hero Box)",
    icon: "solar:widget-4-bold",

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
                            <NumberControl label="Tablet Columns" value={value ?? 3} onChange={onChange} min={1} max={4} />
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
                            <Toggle label="Show Category" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
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

    render: (element: any) => <Kalbela1CanvasPreview element={element} />,
};

export default kalbela1Element;
