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
    Section,
    ColorPickerPopup,
    Toggle,
} from "@/components/builder/controls";
import { CategorySorter } from "../lib/CategorySorter";
import { Tab, TabPost, NewsColors } from "../lib/types";
import { useKalbelaPosts } from "../hooks/useKalbelaPosts";
import { KalbelaHeader } from "../lib/KalbelaHeader";

interface Kalbela11Props {
    title?: string;
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
    limit?: number;
    leftCount?: number;
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
    tabs = [],
    postsByCategory = {},
    limit,
    leftCount = 2,
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

    const rawPosts = postsByCategory[activeTab] ?? [];
    const posts = limit ? rawPosts.slice(0, Number(limit)) : rawPosts;

    const centerLeadPost = posts[0];
    const leftCountNum = Math.min(Number(leftCount) || 2, Math.max(0, posts.length - 1));

    const leftPosts = posts.slice(1, 1 + leftCountNum);
    const rightPosts = posts.slice(1 + leftCountNum);

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
                        <div className="w-full lg:w-[26%] flex flex-col gap-4 lg:border-r lg:border-gray-200 lg:pr-5 order-2 lg:order-1">
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
                        <div className="w-full lg:w-[26%] flex flex-col gap-4 lg:border-l lg:border-gray-200 lg:pl-5 order-3 lg:order-3">
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
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            leftCount={Number(c.leftCount) || 2}
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
    label: "Kalbela 11 (Center Big Lead + Left/Right Stacks)",
    icon: "solar:layout-center-bold",

    schema: {
        content: {
            title: "",
            categoryIds: [] as string[],
            limit: 5,
            leftCount: 2,
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
                        <Section label="Title" defaultOpen>
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
                        <Section label="Limit">
                            <NumberControl label="Total Limit" value={value ?? 5} onChange={onChange} min={3} max={20} />
                        </Section>
                    ),
                },
                {
                    name: "leftCount",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Left Count">
                            <NumberControl label="Left Count" value={value ?? 2} onChange={onChange} min={1} max={5} />
                        </Section>
                    ),
                },
                {
                    name: "centerImageHeightDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Center Img Ht (Dex)">
                            <NumberControl label="Ht (px)" value={value ?? 320} onChange={onChange} min={100} max={700} />
                        </Section>
                    ),
                },
                {
                    name: "centerImageHeightMobile",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Center Img Ht (Mob)">
                            <NumberControl label="Ht (px)" value={value ?? 220} onChange={onChange} min={80} max={500} />
                        </Section>
                    ),
                },
                {
                    name: "leftImageHeightDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Left Img Ht (Dex)">
                            <NumberControl label="Ht (px)" value={value ?? 180} onChange={onChange} min={80} max={500} />
                        </Section>
                    ),
                },
                {
                    name: "leftImageHeightMobile",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Left Img Ht (Mob)">
                            <NumberControl label="Ht (px)" value={value ?? 140} onChange={onChange} min={60} max={400} />
                        </Section>
                    ),
                },
                {
                    name: "rightImageHeightDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Right Img Ht (Dex)">
                            <NumberControl label="Ht (px)" value={value ?? 180} onChange={onChange} min={80} max={500} />
                        </Section>
                    ),
                },
                {
                    name: "rightImageHeightMobile",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Right Img Ht (Mob)">
                            <NumberControl label="Ht (px)" value={value ?? 140} onChange={onChange} min={60} max={400} />
                        </Section>
                    ),
                },
                {
                    name: "showCenterExcerpt",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Center Display">
                            <Toggle label="Show Excerpt" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                        </Section>
                    ),
                },
                {
                    name: "showLeftExcerpt",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Left Display">
                            <Toggle label="Show Excerpt" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                        </Section>
                    ),
                },
                {
                    name: "showRightExcerpt",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Right Display">
                            <Toggle label="Show Excerpt" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                        </Section>
                    ),
                },
                {
                    name: "showCenterCategory",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Center Display">
                            <Toggle label="Show Category" value={value === "true"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                        </Section>
                    ),
                },
                {
                    name: "showLeftCategory",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Left Display">
                            <Toggle label="Show Category" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                        </Section>
                    ),
                },
                {
                    name: "showRightCategory",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Right Display">
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

    render: (element: any) => <Kalbela11CanvasPreview element={element} />,
};

export default kalbela11Element;
