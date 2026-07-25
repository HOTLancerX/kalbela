"use client";

/**
 * plugin/kalbela/elements/kalbela6.tsx
 *
 * Kalbela Element 6: 3-Column Composite Section
 * - Col 1: Main Lead Card (1 Post)
 * - Col 2: Thumbnail List (Half of remaining posts)
 * - Col 3: Arrow Bullet List (Other half of remaining posts)
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

interface Kalbela6Props {
    title?: string;
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
    columnsDesktop?: number;
    columnsTablet?: number;
    columnsMobile?: number;
    colors?: NewsColors;
    showDate?: boolean;
    showLink?: boolean;
}

export function Kalbela6UI({
    title = "",
    tabs = [],
    postsByCategory = {},
    columnsDesktop = 3,
    columnsTablet = 2,
    columnsMobile = 1,
    colors = {},
    showDate = true,
    showLink = true,
}: Kalbela6Props) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?._id ?? "");

    useEffect(() => {
        if (tabs.length > 0 && !tabs.some((t) => t._id === activeTab)) {
            setActiveTab(tabs[0]._id);
        }
    }, [tabs, activeTab]);

    const posts = postsByCategory[activeTab] ?? [];

    const leadPost = posts[0];
    const remainingPosts = posts.slice(1);
    const halfCount = Math.ceil(remainingPosts.length / 2);

    const middlePosts = remainingPosts.slice(0, halfCount);
    const rightPosts = remainingPosts.slice(halfCount);

    const deskColsClass =
        columnsDesktop === 4 ? "lg:grid-cols-4" :
        columnsDesktop === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

    const tabColsClass =
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

            {/* 3-Column Composite Section */}
            {posts.length > 0 && (
                <div className={`grid ${gridClass} gap-6 items-start`}>
                    {/* Col 1: Main Lead News Card */}
                    {leadPost && (
                        <div className="group flex flex-col gap-3 lg:border-r lg:border-gray-200 lg:pr-5">
                            {leadPost.image && (
                                <div className="aspect-16/10 w-full overflow-hidden rounded-xl bg-gray-100">
                                    <img
                                        src={leadPost.image}
                                        alt={leadPost.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <h2 className="text-lg md:text-xl font-extrabold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
                                {showLink ? <a href={leadPost.postUrl || "#"}>{leadPost.title}</a> : leadPost.title}
                            </h2>
                            {leadPost.excerpt && (
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-4">
                                    {leadPost.excerpt.replace(/<[^>]*>/g, "").trim()}
                                </p>
                            )}
                            {showDate && (
                                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                                    <Icon icon="mdi:clock-outline" width={14} className="text-gray-400" />
                                    <span>
                                        {leadPost.createdAt ? new Date(leadPost.createdAt).toLocaleDateString("bn-BD") : "৯ মিনিট আগে"}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Col 2: Thumbnail List */}
                    {middlePosts.length > 0 && (
                        <div className="flex flex-col gap-3 lg:border-r lg:border-gray-200 lg:pr-5">
                            {middlePosts.map((post) => (
                                <div
                                    key={post._id}
                                    className="group flex items-start gap-3 border-b border-gray-100 pb-3 last:border-none last:pb-0"
                                >
                                    {post.image && (
                                        <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 aspect-16/10">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-1 flex-1">
                                        <h4 className="text-xs md:text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {showLink ? <a href={post.postUrl || "#"}>{post.title}</a> : post.title}
                                        </h4>
                                        {showDate && (
                                            <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                                <Icon icon="mdi:clock-outline" width={12} className="text-gray-400" />
                                                <span>
                                                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString("bn-BD") : "২৮ মিনিট আগে"}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Col 3: Arrow Bullet List */}
                    {rightPosts.length > 0 && (
                        <div className="flex flex-col gap-3">
                            {rightPosts.map((post) => (
                                <div
                                    key={post._id}
                                    className="group flex flex-col gap-1 border-b border-gray-100 pb-3 last:border-none last:pb-0"
                                >
                                    <h4 className="text-xs md:text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors flex items-start gap-1.5">
                                        <Icon icon="ri:arrow-right-s-line" width={20} className="text-gray-700 font-bold shrink-0 mt-0.5" />
                                        {showLink ? <a href={post.postUrl || "#"}>{post.title}</a> : post.title}
                                    </h4>
                                    {showDate && (
                                        <div className="flex items-center gap-1 text-[10px] text-gray-500 pl-5">
                                            <Icon icon="mdi:clock-outline" width={12} className="text-gray-400" />
                                            <span>
                                                {post.createdAt ? new Date(post.createdAt).toLocaleDateString("bn-BD") : "১ ঘণ্টা আগে"}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function Kalbela6CanvasPreview({ element }: { element: any }) {
    const c = element.schema?.content ?? {};
    const s = element.schema?.style ?? {};

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = c.limit ?? 11;

    const { tabs, postsByCategory, loading } = useKalbelaPosts(categoryIds, limit);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10 gap-2 text-gray-400">
                <Icon icon="svg-spinners:ring-resize" width={20} />
                <span className="text-xs">Loading Kalbela 6...</span>
            </div>
        );
    }

    return (
        <Kalbela6UI
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
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
}

const kalbela6Element = {
    type: "kalbela-6",
    category: "kalbela",
    label: "Kalbela 6 (3-Column Composite Section)",
    icon: "solar:layout-3-bold",

    schema: {
        content: {
            title: "",
            categoryIds: [] as string[],
            limit: 11,
            columnsDesktop: 3,
            columnsTablet: 2,
            columnsMobile: 1,
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
                            <NumberControl label="Limit" value={value ?? 11} onChange={onChange} min={3} max={30} />
                        </Section>
                    ),
                },
                {
                    name: "columnsDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Columns (Desktop)">
                            <NumberControl label="Desktop Columns" value={value ?? 3} onChange={onChange} min={2} max={4} />
                        </Section>
                    ),
                },
                {
                    name: "columnsTablet",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Columns (Tablet)">
                            <NumberControl label="Tablet Columns" value={value ?? 2} onChange={onChange} min={1} max={3} />
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

    render: (element: any) => <Kalbela6CanvasPreview element={element} />,
};

export default kalbela6Element;
