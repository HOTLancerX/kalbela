"use client";

/**
 * plugin/kalbela/elements/kalbela11.tsx
 *
 * Kalbela Element 11: Center Featured Lead Card + Left Stack + Right Stack
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
    colors?: NewsColors;
    showDate?: boolean;
    showLink?: boolean;
}

export function Kalbela11UI({
    title = "",
    tabs = [],
    postsByCategory = {},
    limit,
    leftCount = 2,
    colors = {},
    showDate = true,
    showLink = true,
}: Kalbela11Props) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?._id ?? "");

    useEffect(() => {
        if (tabs.length > 0 && !tabs.some((t) => t._id === activeTab)) {
            setActiveTab(tabs[0]._id);
        }
    }, [tabs, activeTab]);

    const posts = postsByCategory[activeTab] ?? [];

    const centerLeadPost = posts[0];
    const leftCountNum = Math.min(Number(leftCount) || 2, Math.max(0, posts.length - 1));

    const leftPosts = posts.slice(1, 1 + leftCountNum);
    const rightPosts = posts.slice(1 + leftCountNum);

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

            {/* 3-Column Layout (Left Stack + Center Big Lead + Right Stack) */}
            {posts.length > 0 && (
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Left Column Stack */}
                    {leftPosts.length > 0 && (
                        <div className="w-full lg:w-[26%] flex flex-col gap-5 lg:border-r lg:border-gray-200 lg:pr-5 order-2 lg:order-1">
                            {leftPosts.map((post) => (
                                <div key={post._id} className="group flex flex-col gap-2.5">
                                    {post.image && (
                                        <div className="aspect-16/10 w-full overflow-hidden rounded-xl bg-gray-100">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <h4 className="text-xs md:text-sm font-bold text-gray-900 leading-snug line-clamp-3 group-hover:text-blue-600 transition-colors">
                                        {showLink ? <a href={post.postUrl || "#"}>{post.title}</a> : post.title}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Center Featured Big Lead Card */}
                    {centerLeadPost && (
                        <div className="w-full lg:w-[48%] group flex flex-col gap-3 order-1 lg:order-2">
                            {centerLeadPost.image && (
                                <div className="aspect-16/10 w-full overflow-hidden rounded-xl bg-gray-100">
                                    <img
                                        src={centerLeadPost.image}
                                        alt={centerLeadPost.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <h2 className="text-lg md:text-xl font-extrabold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
                                {showLink ? <a href={centerLeadPost.postUrl || "#"}>{centerLeadPost.title}</a> : centerLeadPost.title}
                            </h2>
                            {centerLeadPost.excerpt && (
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-4">
                                    {centerLeadPost.excerpt.replace(/<[^>]*>/g, "").trim()}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Right Column Stack */}
                    {rightPosts.length > 0 && (
                        <div className="w-full lg:w-[26%] flex flex-col gap-5 lg:border-l lg:border-gray-200 lg:pl-5 order-3 lg:order-3">
                            {rightPosts.map((post) => (
                                <div key={post._id} className="group flex flex-col gap-2.5">
                                    {post.image && (
                                        <div className="aspect-16/10 w-full overflow-hidden rounded-xl bg-gray-100">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <h4 className="text-xs md:text-sm font-bold text-gray-900 leading-snug line-clamp-3 group-hover:text-blue-600 transition-colors">
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
            leftCount={Number(c.leftCount) || 2}
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
                            <NumberControl label="Limit" value={value ?? 5} onChange={onChange} min={3} max={20} />
                        </Section>
                    ),
                },
                {
                    name: "leftCount",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Left Section Post Count">
                            <NumberControl label="Left Count" value={value ?? 2} onChange={onChange} min={1} max={5} />
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
