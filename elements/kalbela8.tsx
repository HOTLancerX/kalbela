"use client";

/**
 * plugin/kalbela/elements/kalbela8.tsx
 *
 * Kalbela Element 8: Split Section with Configurable Lead Count & Image Positions
 * - Left: Primary Large Lead Cards (Image Left/Right toggleable)
 * - Right: Secondary List Items (Image Left/Right toggleable)
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

interface Kalbela8Props {
    title?: string;
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
    leadCount?: number;
    leftImagePosition?: "left" | "right";
    rightImagePosition?: "left" | "right";
    colors?: NewsColors;
    showDate?: boolean;
    showLink?: boolean;
}

export function Kalbela8UI({
    title = "",
    tabs = [],
    postsByCategory = {},
    leadCount = 2,
    leftImagePosition = "left",
    rightImagePosition = "right",
    colors = {},
    showDate = true,
    showLink = true,
}: Kalbela8Props) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?._id ?? "");

    useEffect(() => {
        if (tabs.length > 0 && !tabs.some((t) => t._id === activeTab)) {
            setActiveTab(tabs[0]._id);
        }
    }, [tabs, activeTab]);

    const posts = postsByCategory[activeTab] ?? [];

    const leadCountNum = Math.min(Number(leadCount) || 2, posts.length);
    const leadPosts = posts.slice(0, leadCountNum);
    const rightPosts = posts.slice(leadCountNum);

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

            {/* Split Content Section */}
            {posts.length > 0 && (
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Left Column (Primary Lead Cards) */}
                    {leadPosts.length > 0 && (
                        <div className="w-full lg:w-[60%] flex flex-col gap-6 lg:border-r lg:border-gray-200 lg:pr-6">
                            {leadPosts.map((post) => (
                                <div
                                    key={post._id}
                                    className={`group flex flex-col md:flex-row gap-4 items-stretch border-b border-gray-100 pb-5 last:border-none last:pb-0 ${
                                        leftImagePosition === "right" ? "md:flex-row-reverse" : ""
                                    }`}
                                >
                                    {post.image && (
                                        <div className="w-full md:w-[48%] overflow-hidden rounded-xl bg-gray-100 aspect-16/10 shrink-0">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="w-full md:w-[52%] flex flex-col gap-2 justify-start py-0.5">
                                        <h3 className="text-base md:text-lg font-extrabold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
                                            {showLink ? <a href={post.postUrl || "#"}>{post.title}</a> : post.title}
                                        </h3>
                                        {post.excerpt && (
                                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3">
                                                {post.excerpt.replace(/<[^>]*>/g, "").trim()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Right Column (Secondary Thumbnail Cards) */}
                    {rightPosts.length > 0 && (
                        <div className="w-full lg:w-[40%] flex flex-col gap-5">
                            {rightPosts.map((post) => (
                                <div
                                    key={post._id}
                                    className={`group flex items-center gap-3 border-b border-gray-100 pb-4 last:border-none last:pb-0 ${
                                        rightImagePosition === "left" ? "flex-row" : "flex-row-reverse"
                                    }`}
                                >
                                    {post.image && (
                                        <div className="h-16 w-24 md:h-18 md:w-28 shrink-0 overflow-hidden rounded-lg bg-gray-100 aspect-16/10">
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
                                        {post.excerpt && (
                                            <p className="text-[11px] text-gray-500 leading-normal line-clamp-2">
                                                {post.excerpt.replace(/<[^>]*>/g, "").trim()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function Kalbela8CanvasPreview({ element }: { element: any }) {
    const c = element.schema?.content ?? {};
    const s = element.schema?.style ?? {};

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = c.limit ?? 5;

    const { tabs, postsByCategory, loading } = useKalbelaPosts(categoryIds, limit);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10 gap-2 text-gray-400">
                <Icon icon="svg-spinners:ring-resize" width={20} />
                <span className="text-xs">Loading Kalbela 8...</span>
            </div>
        );
    }

    return (
        <Kalbela8UI
            title={c.title ?? ""}
            tabs={tabs}
            postsByCategory={postsByCategory}
            leadCount={Number(c.leadCount) || 2}
            leftImagePosition={c.leftImagePosition || "left"}
            rightImagePosition={c.rightImagePosition || "right"}
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

const kalbela8Element = {
    type: "kalbela-8",
    category: "kalbela",
    label: "Kalbela 8 (Split Lead & List Section)",
    icon: "solar:layout-right-bold",

    schema: {
        content: {
            title: "",
            categoryIds: [] as string[],
            limit: 5,
            leadCount: 2,
            leftImagePosition: "left",
            rightImagePosition: "right",
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
                            <NumberControl label="Limit" value={value ?? 5} onChange={onChange} min={2} max={20} />
                        </Section>
                    ),
                },
                {
                    name: "leadCount",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Left Section Lead Count">
                            <NumberControl label="Lead Count" value={value ?? 2} onChange={onChange} min={1} max={5} />
                        </Section>
                    ),
                },
                {
                    name: "leftImagePosition",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Left Section Image Position">
                            <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg text-xs font-semibold">
                                <button
                                    type="button"
                                    onClick={() => onChange("left")}
                                    className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                                        (value ?? "left") === "left" ? "bg-white shadow-xs text-blue-600 font-bold" : "text-gray-600"
                                    }`}
                                >
                                    Left
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onChange("right")}
                                    className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                                        value === "right" ? "bg-white shadow-xs text-blue-600 font-bold" : "text-gray-600"
                                    }`}
                                >
                                    Right
                                </button>
                            </div>
                        </Section>
                    ),
                },
                {
                    name: "rightImagePosition",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Right Section Image Position">
                            <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg text-xs font-semibold">
                                <button
                                    type="button"
                                    onClick={() => onChange("left")}
                                    className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                                        value === "left" ? "bg-white shadow-xs text-blue-600 font-bold" : "text-gray-600"
                                    }`}
                                >
                                    Left
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onChange("right")}
                                    className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                                        (value ?? "right") === "right" ? "bg-white shadow-xs text-blue-600 font-bold" : "text-gray-600"
                                    }`}
                                >
                                    Right
                                </button>
                            </div>
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

    render: (element: any) => <Kalbela8CanvasPreview element={element} />,
};

export default kalbela8Element;
