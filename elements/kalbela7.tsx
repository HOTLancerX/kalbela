"use client";

/**
 * plugin/kalbela/elements/kalbela7.tsx
 *
 * Kalbela Element 7: Big Featured Lead Card (Left) + Dynamic Sub-Posts Grid (Right)
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

interface Kalbela7Props {
    title?: string;
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
    limit?: number;
    columnsDesktop?: number;
    columnsTablet?: number;
    columnsMobile?: number;
    leadImageHeightDesktop?: number;
    leadImageHeightMobile?: number;
    subImageHeightDesktop?: number;
    subImageHeightMobile?: number;
    colors?: NewsColors;
    showCategory?: boolean;
    showExcerpt?: boolean;
    showDate?: boolean;
    showLink?: boolean;
}

export function Kalbela7UI({
    title = "",
    tabs = [],
    postsByCategory = {},
    limit,
    columnsDesktop = 3,
    columnsTablet = 2,
    columnsMobile = 1,
    leadImageHeightDesktop = 320,
    leadImageHeightMobile = 220,
    subImageHeightDesktop = 180,
    subImageHeightMobile = 140,
    colors = {},
    showCategory = true,
    showExcerpt = true,
    showDate = true,
    showLink = true,
}: Kalbela7Props) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?._id ?? "");

    useEffect(() => {
        if (tabs.length > 0 && !tabs.some((t) => t._id === activeTab)) {
            setActiveTab(tabs[0]._id);
        }
    }, [tabs, activeTab]);

    const rawPosts = postsByCategory[activeTab] ?? [];
    const posts = limit ? rawPosts.slice(0, Number(limit)) : rawPosts;

    const leadPost = posts[0];
    const subPosts = posts.slice(1);

    const deskColsClass =
        columnsDesktop === 4 ? "lg:grid-cols-4" :
            columnsDesktop === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

    const tabColsClass =
        columnsTablet === 3 ? "md:grid-cols-3" :
            columnsTablet === 1 ? "md:grid-cols-1" : "md:grid-cols-2";

    const mobColsClass =
        columnsMobile === 2 ? "grid-cols-2" : "grid-cols-1";

    const subGridClass = `${mobColsClass} ${tabColsClass} ${deskColsClass}`;

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

            {/* Content Container (Left Big Lead + Right Sub-grid) */}
            {posts.length > 0 && (
                <div className="flex flex-col lg:flex-row gap-2 items-start">
                    {/* Left Fixed Big Featured Lead Card */}
                    {leadPost && (
                        <a href={leadPost.postUrl || "#"} className="w-full lg:w-[36%] shrink-0 group flex flex-col gap-3 lg:border-r lg:border-gray-200 lg:pr-5">
                            {leadPost.image && (
                                <div
                                    className="w-full overflow-hidden rounded-xl bg-gray-100 shrink-0 h-(--h-mob) md:h-(--h-desk)"
                                    style={{
                                        "--h-mob": `${leadImageHeightMobile}px`,
                                        "--h-desk": `${leadImageHeightDesktop}px`,
                                    } as React.CSSProperties}
                                >
                                    <img
                                        src={leadPost.image}
                                        alt={leadPost.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <h2 className="text-base font-medium text-gray-900 line-clamp-2 group-hover:text-main transition-colors">
                                {leadPost.title}
                            </h2>
                            {showExcerpt && leadPost.excerpt && (
                                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                    {leadPost.excerpt.replace(/<[^>]*>/g, "").trim()}
                                </p>
                            )}
                            {showDate && (
                                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                                    <Icon icon="mdi:clock-outline" width={14} className="text-gray-400" />
                                    <span>
                                        {leadPost.createdAt ? new Date(leadPost.createdAt).toLocaleDateString("bn-BD") : "৬ মিনিট আগে"}
                                    </span>
                                </div>
                            )}
                        </a>
                    )}

                    {/* Right Sub-Posts Grid */}
                    {subPosts.length > 0 && (
                        <div className={`w-full lg:w-[64%] grid ${subGridClass} gap-5`}>
                            {subPosts.map((post) => (
                                <div
                                    key={post._id}
                                    className="group flex flex-col gap-2.5"
                                >
                                    {post.image && (
                                        <div
                                            className="w-full overflow-hidden rounded-xl bg-gray-100 shrink-0 h-(--h-mob) md:h-(--h-desk)"
                                            style={{
                                                "--h-mob": `${subImageHeightMobile}px`,
                                                "--h-desk": `${subImageHeightDesktop}px`,
                                            } as React.CSSProperties}
                                        >
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <h4 className="text-xs md:text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {showCategory && post.categoryTitle && (
                                            <span className="text-red-600 mr-1">{post.categoryTitle} /</span>
                                        )}
                                        {showLink ? <a href={post.postUrl || "#"}>{post.title}</a> : post.title}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function Kalbela7CanvasPreview({ element }: { element: any }) {
    const c = { ...element.schema?.content, ...element.content };
    const s = { ...element.schema?.style, ...element.style };

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = Number(c.limit) || 7;

    const { tabs, postsByCategory, loading } = useKalbelaPosts(categoryIds, limit);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10 gap-2 text-gray-400">
                <Icon icon="svg-spinners:ring-resize" width={20} />
                <span className="text-xs">Loading Kalbela 7...</span>
            </div>
        );
    }

    return (
        <Kalbela7UI
            title={c.title ?? ""}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            columnsDesktop={Number(c.columnsDesktop) || 3}
            columnsTablet={Number(c.columnsTablet) || 2}
            columnsMobile={Number(c.columnsMobile) || 1}
            leadImageHeightDesktop={Number(c.leadImageHeightDesktop) || 320}
            leadImageHeightMobile={Number(c.leadImageHeightMobile) || 220}
            subImageHeightDesktop={Number(c.subImageHeightDesktop) || 180}
            subImageHeightMobile={Number(c.subImageHeightMobile) || 140}
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

const kalbela7Element = {
    type: "kalbela-7",
    category: "kalbela",
    label: "Kalbela 7 (Left Lead + Right Sub Grid)",
    icon: "solar:layout-left-bold",

    schema: {
        content: {
            title: "",
            categoryIds: [] as string[],
            limit: 7,
            columnsDesktop: 3,
            columnsTablet: 2,
            columnsMobile: 1,
            leadImageHeightDesktop: 320,
            leadImageHeightMobile: 220,
            subImageHeightDesktop: 180,
            subImageHeightMobile: 140,
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
                            <NumberControl label="Limit" value={value ?? 7} onChange={onChange} min={2} max={30} />
                        </Section>
                    ),
                },
                {
                    name: "columnsDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sub Cols (Dex)">
                            <NumberControl label="Cols (Dex)" value={value ?? 3} onChange={onChange} min={2} max={4} />
                        </Section>
                    ),
                },
                {
                    name: "columnsTablet",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sub Cols (Tab)">
                            <NumberControl label="Cols (Tab)" value={value ?? 2} onChange={onChange} min={1} max={3} />
                        </Section>
                    ),
                },
                {
                    name: "columnsMobile",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sub Cols (Mob)">
                            <NumberControl label="Cols (Mob)" value={value ?? 1} onChange={onChange} min={1} max={2} />
                        </Section>
                    ),
                },
                {
                    name: "leadImageHeightDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Lead Img Ht (Dex)">
                            <NumberControl label="Ht (px)" value={value ?? 320} onChange={onChange} min={100} max={700} />
                        </Section>
                    ),
                },
                {
                    name: "leadImageHeightMobile",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Lead Img Ht (Mob)">
                            <NumberControl label="Ht (px)" value={value ?? 220} onChange={onChange} min={80} max={500} />
                        </Section>
                    ),
                },
                {
                    name: "subImageHeightDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sub Img Ht (Dex)">
                            <NumberControl label="Ht (px)" value={value ?? 180} onChange={onChange} min={80} max={500} />
                        </Section>
                    ),
                },
                {
                    name: "subImageHeightMobile",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sub Img Ht (Mob)">
                            <NumberControl label="Ht (px)" value={value ?? 140} onChange={onChange} min={60} max={400} />
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

    render: (element: any) => <Kalbela7CanvasPreview element={element} />,
};

export default kalbela7Element;
