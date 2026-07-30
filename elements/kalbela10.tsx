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
    ColorPickerPopup,
    Toggle,
} from "@/components/builder/controls";
import { CategorySorter } from "../lib/CategorySorter";
import { Tab, TabPost, NewsColors } from "../lib/types";
import { useKalbelaPosts, getDisplayPosts } from "../hooks/useKalbelaPosts";
import { KalbelaHeader } from "../lib/KalbelaHeader";

interface Kalbela10Props {
    title?: string;
    categoryIds?: string[];
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
    limit?: number;
    topCount?: number;
    topColumnsDesktop?: number;
    topColumnsTablet?: number;
    topColumnsMobile?: number;
    bottomColumnsDesktop?: number;
    bottomColumnsTablet?: number;
    bottomColumnsMobile?: number;
    topImageHeightDesktop?: number;
    topImageHeightMobile?: number;
    bottomImageHeightDesktop?: number;
    bottomImageHeightMobile?: number;
    colors?: NewsColors;
    showTopExcerpt?: boolean;
    showTopCategory?: boolean;
    showBottomExcerpt?: boolean;
    showBottomCategory?: boolean;
    showDate?: boolean;
    showLink?: boolean;
}

export function Kalbela10UI({
    title = "",
    categoryIds = [],
    tabs = [],
    postsByCategory = {},
    limit,
    topCount = 3,
    topColumnsDesktop = 3,
    topColumnsTablet = 2,
    topColumnsMobile = 1,
    bottomColumnsDesktop = 4,
    bottomColumnsTablet = 2,
    bottomColumnsMobile = 1,
    topImageHeightDesktop = 200,
    topImageHeightMobile = 160,
    bottomImageHeightDesktop = 160,
    bottomImageHeightMobile = 120,
    colors = {},
    showTopExcerpt = true,
    showTopCategory = true,
    showBottomExcerpt = true,
    showBottomCategory = true,
    showDate = true,
    showLink = true,
}: Kalbela10Props) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?._id ?? "");

    useEffect(() => {
        if (tabs.length > 0 && !tabs.some((t) => t._id === activeTab)) {
            setActiveTab(tabs[0]._id);
        }
    }, [tabs, activeTab]);

    const allPosts = getDisplayPosts(postsByCategory, activeTab, categoryIds, tabs[0]?._id);
    const posts = limit ? allPosts.slice(0, Number(limit)) : allPosts;

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
        <div className="w-full flex flex-col gap-2">
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
                <div className={`grid ${topGridClass} gap-3 md:gap-4 border-b border-gray-200 pb-4`}>
                    {topPosts.map((post) => (
                        <a
                            key={post._id}
                            href={post.postUrl || "#"}
                            className="group flex flex-col gap-2 border-r border-gray-100 pr-3 last:border-none"
                        >
                            {post.image && (
                                <div
                                    className="w-full overflow-hidden rounded-xl bg-gray-100 shrink-0 h-(--h-mob) md:h-(--h-desk)"
                                    style={{
                                        "--h-mob": `${topImageHeightMobile}px`,
                                        "--h-desk": `${topImageHeightDesktop}px`,
                                    } as React.CSSProperties}
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <h3
                                className="text-base font-medium text-gray-900 leading-snug line-clamp-2 group-hover:text-main transition-colors"
                                style={{ color: colors.title || undefined }}
                            >
                                {showTopCategory && post.categoryTitle && (
                                    <span className="text-red-600 mr-1.5">{post.categoryTitle} /</span>
                                )}
                                {post.title}
                            </h3>
                            {showTopExcerpt && post.excerpt && (
                                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                                    {post.excerpt.replace(/<[^>]*>/g, "").trim()}
                                </p>
                            )}
                        </a>
                    ))}
                </div>
            )}

            {/* Bottom Row Secondary Grid */}
            {bottomPosts.length > 0 && (
                <div className={`grid ${bottomGridClass} gap-2 md:gap-4 pt-1`}>
                    {bottomPosts.map((post) => (
                        <a
                            key={post._id}
                            href={post.postUrl || "#"}
                            className="group flex flex-col gap-2 border-r border-gray-100 pr-3 last:border-none"
                        >
                            {post.image && (
                                <div
                                    className="w-full overflow-hidden rounded-xl bg-gray-100 shrink-0 h-(--h-mob) md:h-(--h-desk)"
                                    style={{
                                        "--h-mob": `${bottomImageHeightMobile}px`,
                                        "--h-desk": `${bottomImageHeightDesktop}px`,
                                    } as React.CSSProperties}
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <h4
                                className="text-xs md:text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-main transition-colors"
                                style={{ color: colors.title || undefined }}
                            >
                                {showBottomCategory && post.categoryTitle && (
                                    <span className="text-red-600 mr-1">{post.categoryTitle} /</span>
                                )}
                                {post.title}
                            </h4>
                            {showBottomExcerpt && post.excerpt && (
                                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                                    {post.excerpt.replace(/<[^>]*>/g, "").trim()}
                                </p>
                            )}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

function Kalbela10CanvasPreview({ element }: { element: any }) {
    const c = { ...element.schema?.content, ...element.content };
    const s = { ...element.schema?.style, ...element.style };

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = Number(c.limit) || 7;

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
            categoryIds={categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            topCount={Number(c.topCount) || 3}
            topColumnsDesktop={Number(c.topColumnsDesktop) || 3}
            topColumnsTablet={Number(c.topColumnsTablet) || 2}
            topColumnsMobile={Number(c.topColumnsMobile) || 1}
            bottomColumnsDesktop={Number(c.bottomColumnsDesktop) || 4}
            bottomColumnsTablet={Number(c.bottomColumnsTablet) || 2}
            bottomColumnsMobile={Number(c.bottomColumnsMobile) || 1}
            topImageHeightDesktop={Number(c.topImageHeightDesktop) || 200}
            topImageHeightMobile={Number(c.topImageHeightMobile) || 160}
            bottomImageHeightDesktop={Number(c.bottomImageHeightDesktop) || 160}
            bottomImageHeightMobile={Number(c.bottomImageHeightMobile) || 120}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                inactive: s.inactiveTabColor || "",
                inactiveText: s.inactiveTabTextColor || "",
                title: s.titleColor || "",
                titleHover: s.titleHoverColor || "",
            }}
            showTopExcerpt={c.showTopExcerpt !== "false"}
            showTopCategory={c.showTopCategory !== "false"}
            showBottomExcerpt={c.showBottomExcerpt !== "false"}
            showBottomCategory={c.showBottomCategory !== "false"}
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
            topImageHeightDesktop: 200,
            topImageHeightMobile: 160,
            bottomImageHeightDesktop: 160,
            bottomImageHeightMobile: 120,
            showTopExcerpt: "true",
            showTopCategory: "true",
            showBottomExcerpt: "true",
            showBottomCategory: "true",
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
                    name: "topCount",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <NumberControl label="Top Row Count" value={value ?? 3} onChange={onChange} min={1} max={6} />
                    ),
                },
                {
                    name: "topColumnsDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <NumberControl label="Top Columns (Desktop)" value={value ?? 3} onChange={onChange} min={2} max={4} />
                    ),
                },
                {
                    name: "bottomColumnsDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <NumberControl label="Bottom Columns (Desktop)" value={value ?? 4} onChange={onChange} min={2} max={5} />
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

    render: (element: any) => <Kalbela10CanvasPreview element={element} />,
};

export default kalbela10Element;
