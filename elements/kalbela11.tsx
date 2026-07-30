"use client";

/**
 * plugin/kalbela/elements/kalbela11.tsx
 *
 * Kalbela Element 11: Center Featured Lead Card (Sec 1) + Left Stack (Sec 2) + Right Stack (Sec 3)
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

interface Kalbela11Props {
    title?: string;
    categoryIds?: string[];
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
    limit?: number;
    leftCount?: number;
    // Column Controls per section
    leftColumnsDesktop?: number;
    leftColumnsTablet?: number;
    leftColumnsMobile?: number;
    rightColumnsDesktop?: number;
    rightColumnsTablet?: number;
    rightColumnsMobile?: number;
    // Image Height Controls per section
    centerImageHeightDesktop?: number;
    centerImageHeightMobile?: number;
    leftImageHeightDesktop?: number;
    leftImageHeightMobile?: number;
    rightImageHeightDesktop?: number;
    rightImageHeightMobile?: number;
    colors?: NewsColors;
    // Display Controls per section
    showCenterExcerpt?: boolean;
    showCenterCategory?: boolean;
    showLeftExcerpt?: boolean;
    showLeftCategory?: boolean;
    showRightExcerpt?: boolean;
    showRightCategory?: boolean;
    showDate?: boolean;
    showLink?: boolean;
}

export function Kalbela11UI({
    title = "",
    categoryIds = [],
    tabs = [],
    postsByCategory = {},
    limit,
    leftCount = 2,
    leftColumnsDesktop = 1,
    leftColumnsTablet = 1,
    leftColumnsMobile = 1,
    rightColumnsDesktop = 1,
    rightColumnsTablet = 1,
    rightColumnsMobile = 1,
    centerImageHeightDesktop = 320,
    centerImageHeightMobile = 220,
    leftImageHeightDesktop = 180,
    leftImageHeightMobile = 140,
    rightImageHeightDesktop = 180,
    rightImageHeightMobile = 140,
    colors = {},
    showCenterExcerpt = true,
    showCenterCategory = false,
    showLeftExcerpt = true,
    showLeftCategory = true,
    showRightExcerpt = true,
    showRightCategory = true,
    showDate = true,
    showLink = true,
}: Kalbela11Props) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?._id ?? "");

    useEffect(() => {
        if (tabs.length > 0 && !tabs.some((t) => t._id === activeTab)) {
            setActiveTab(tabs[0]._id);
        }
    }, [tabs, activeTab]);

    const allPosts = getDisplayPosts(postsByCategory, activeTab, categoryIds, tabs[0]?._id);
    const posts = limit ? allPosts.slice(0, Number(limit)) : allPosts;

    const centerLeadPost = posts[0];
    const leftCountNum = Math.min(Number(leftCount) || 2, Math.max(0, posts.length - 1));

    const leftPosts = posts.slice(1, 1 + leftCountNum);
    const rightPosts = posts.slice(1 + leftCountNum);

    const leftDeskColsClass =
        leftColumnsDesktop === 4 ? "lg:grid-cols-4" :
        leftColumnsDesktop === 3 ? "lg:grid-cols-3" :
        leftColumnsDesktop === 2 ? "lg:grid-cols-2" : "lg:grid-cols-1";

    const leftTabColsClass =
        leftColumnsTablet === 4 ? "md:grid-cols-4" :
        leftColumnsTablet === 3 ? "md:grid-cols-3" :
        leftColumnsTablet === 2 ? "md:grid-cols-2" : "md:grid-cols-1";

    const leftMobColsClass =
        leftColumnsMobile === 3 ? "grid-cols-3" :
        leftColumnsMobile === 2 ? "grid-cols-2" : "grid-cols-1";

    const leftGridClass = `${leftMobColsClass} ${leftTabColsClass} ${leftDeskColsClass}`;

    const rightDeskColsClass =
        rightColumnsDesktop === 4 ? "lg:grid-cols-4" :
        rightColumnsDesktop === 3 ? "lg:grid-cols-3" :
        rightColumnsDesktop === 2 ? "lg:grid-cols-2" : "lg:grid-cols-1";

    const rightTabColsClass =
        rightColumnsTablet === 4 ? "md:grid-cols-4" :
        rightColumnsTablet === 3 ? "md:grid-cols-3" :
        rightColumnsTablet === 2 ? "md:grid-cols-2" : "md:grid-cols-1";

    const rightMobColsClass =
        rightColumnsMobile === 3 ? "grid-cols-3" :
        rightColumnsMobile === 2 ? "grid-cols-2" : "grid-cols-1";

    const rightGridClass = `${rightMobColsClass} ${rightTabColsClass} ${rightDeskColsClass}`;

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

            {/* 3-Column Layout (Left Stack + Center Big Lead + Right Stack) */}
            {posts.length > 0 && (
                <div className="flex flex-col lg:flex-row gap-4 md:gap-5 items-start">
                    {/* Left Column Stack (Sec 2) */}
                    {leftPosts.length > 0 && (
                        <div className={`w-full lg:w-[26%] grid ${leftGridClass} gap-4 lg:border-r lg:border-gray-200 lg:pr-5 order-2 lg:order-1`}>
                            {leftPosts.map((post) => (
                                <a
                                    key={post._id}
                                    href={post.postUrl || "#"}
                                    className="group flex flex-col gap-2"
                                >
                                    {post.image && (
                                        <div
                                            className="w-full overflow-hidden rounded-xl bg-gray-100 shrink-0 h-(--h-mob) md:h-(--h-desk)"
                                            style={{
                                                "--h-mob": `${leftImageHeightMobile}px`,
                                                "--h-desk": `${leftImageHeightDesktop}px`,
                                            } as React.CSSProperties}
                                        >
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <h4 className="text-xs md:text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-main transition-colors">
                                        {showLeftCategory && post.categoryTitle && (
                                            <span className="text-red-600 mr-1">{post.categoryTitle} /</span>
                                        )}
                                        {post.title}
                                    </h4>
                                    {showLeftExcerpt && post.excerpt && (
                                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                                            {post.excerpt.replace(/<[^>]*>/g, "").trim()}
                                        </p>
                                    )}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Center Featured Big Lead Card (Sec 1) */}
                    {centerLeadPost && (
                        <a
                            href={centerLeadPost.postUrl || "#"}
                            className="w-full lg:w-[48%] group flex flex-col gap-3 order-1 lg:order-2"
                        >
                            {centerLeadPost.image && (
                                <div
                                    className="w-full overflow-hidden rounded-xl bg-gray-100 shrink-0 h-(--h-mob) md:h-(--h-desk)"
                                    style={{
                                        "--h-mob": `${centerImageHeightMobile}px`,
                                        "--h-desk": `${centerImageHeightDesktop}px`,
                                    } as React.CSSProperties}
                                >
                                    <img
                                        src={centerLeadPost.image}
                                        alt={centerLeadPost.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <h2 className="text-base font-medium text-gray-900 leading-snug line-clamp-2 group-hover:text-main transition-colors">
                                {showCenterCategory && centerLeadPost.categoryTitle && (
                                    <span className="text-red-600 mr-1.5">{centerLeadPost.categoryTitle} /</span>
                                )}
                                {centerLeadPost.title}
                            </h2>
                            {showCenterExcerpt && centerLeadPost.excerpt && (
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-4">
                                    {centerLeadPost.excerpt.replace(/<[^>]*>/g, "").trim()}
                                </p>
                            )}
                        </a>
                    )}

                    {/* Right Column Stack (Sec 3) */}
                    {rightPosts.length > 0 && (
                        <div className={`w-full lg:w-[26%] grid ${rightGridClass} gap-4 lg:border-l lg:border-gray-200 lg:pl-5 order-3 lg:order-3`}>
                            {rightPosts.map((post) => (
                                <a
                                    key={post._id}
                                    href={post.postUrl || "#"}
                                    className="group flex flex-col gap-2"
                                >
                                    {post.image && (
                                        <div
                                            className="w-full overflow-hidden rounded-xl bg-gray-100 shrink-0 h-(--h-mob) md:h-(--h-desk)"
                                            style={{
                                                "--h-mob": `${rightImageHeightMobile}px`,
                                                "--h-desk": `${rightImageHeightDesktop}px`,
                                            } as React.CSSProperties}
                                        >
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <h4 className="text-xs md:text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-main transition-colors">
                                        {showRightCategory && post.categoryTitle && (
                                            <span className="text-red-600 mr-1">{post.categoryTitle} /</span>
                                        )}
                                        {post.title}
                                    </h4>
                                    {showRightExcerpt && post.excerpt && (
                                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                                            {post.excerpt.replace(/<[^>]*>/g, "").trim()}
                                        </p>
                                    )}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function Kalbela11CanvasPreview({ element }: { element: any }) {
    const c = { ...element.schema?.content, ...element.content };
    const s = { ...element.schema?.style, ...element.style };

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = Number(c.limit) || 5;

    const { tabs, postsByCategory, loading } = useKalbelaPosts(categoryIds, limit);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10 gap-2 text-gray-400">
                <Icon icon="svg-spinners:ring-resize" width={20} />
                <span className="text-xs">Loading Kalbela 11...</span>
            </div>
        );
    }

    return (
        <Kalbela11UI
            title={c.title ?? ""}
            categoryIds={categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            leftCount={Number(c.leftCount) || 2}
            leftColumnsDesktop={Number(c.leftColumnsDesktop) || 1}
            leftColumnsTablet={Number(c.leftColumnsTablet) || 1}
            leftColumnsMobile={Number(c.leftColumnsMobile) || 1}
            rightColumnsDesktop={Number(c.rightColumnsDesktop) || 1}
            rightColumnsTablet={Number(c.rightColumnsTablet) || 1}
            rightColumnsMobile={Number(c.rightColumnsMobile) || 1}
            centerImageHeightDesktop={Number(c.centerImageHeightDesktop) || 320}
            centerImageHeightMobile={Number(c.centerImageHeightMobile) || 220}
            leftImageHeightDesktop={Number(c.leftImageHeightDesktop) || 180}
            leftImageHeightMobile={Number(c.leftImageHeightMobile) || 140}
            rightImageHeightDesktop={Number(c.rightImageHeightDesktop) || 180}
            rightImageHeightMobile={Number(c.rightImageHeightMobile) || 140}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                inactive: s.inactiveTabColor || "",
                inactiveText: s.inactiveTabTextColor || "",
                title: s.titleColor || "",
                titleHover: s.titleHoverColor || "",
            }}
            showCenterExcerpt={c.showCenterExcerpt !== "false"}
            showCenterCategory={c.showCenterCategory === "true"}
            showLeftExcerpt={c.showLeftExcerpt !== "false"}
            showLeftCategory={c.showLeftCategory !== "false"}
            showRightExcerpt={c.showRightExcerpt !== "false"}
            showRightCategory={c.showRightCategory !== "false"}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
}

const kalbela11Element = {
    type: "kalbela-11",
    category: "kalbela",
    label: "Kalbela 11 (Center Big Lead + Dual Side Stacks)",
    icon: "solar:layout-center-bold",

    schema: {
        content: {
            title: "",
            categoryIds: [] as string[],
            limit: 5,
            leftCount: 2,
            leftColumnsDesktop: 1,
            leftColumnsTablet: 1,
            leftColumnsMobile: 1,
            rightColumnsDesktop: 1,
            rightColumnsTablet: 1,
            rightColumnsMobile: 1,
            centerImageHeightDesktop: 320,
            centerImageHeightMobile: 220,
            leftImageHeightDesktop: 180,
            leftImageHeightMobile: 140,
            rightImageHeightDesktop: 180,
            rightImageHeightMobile: 140,
            showCenterExcerpt: "true",
            showCenterCategory: "false",
            showLeftExcerpt: "true",
            showLeftCategory: "true",
            showRightExcerpt: "true",
            showRightCategory: "true",
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
                        <NumberControl label="Total Limit" value={value ?? 5} onChange={onChange} min={3} max={30} />
                    ),
                },
                {
                    name: "leftCount",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <NumberControl label="Left Column Count" value={value ?? 2} onChange={onChange} min={1} max={6} />
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

    render: (element: any) => <Kalbela11CanvasPreview element={element} />,
};

export default kalbela11Element;
