"use client";

/**
 * plugin/kalbela/elements/kalbela2.tsx
 *
 * Kalbela Element 2: Lead Image with Headline + Vertical Thumbnail News List
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

interface Kalbela2Props {
    title?: string;
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
    columnsDesktop?: number;
    columnsTablet?: number;
    columnsMobile?: number;
    imagePosition?: "left" | "right";
    colors?: NewsColors;
    showCategory?: boolean;
    showDate?: boolean;
    showLink?: boolean;
}

export function Kalbela2UI({
    title = "",
    tabs = [],
    postsByCategory = {},
    columnsDesktop = 1,
    columnsTablet = 1,
    columnsMobile = 1,
    imagePosition = "left",
    colors = {},
    showCategory = true,
    showDate = true,
    showLink = true,
}: Kalbela2Props) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?._id ?? "");

    useEffect(() => {
        if (tabs.length > 0 && !tabs.some((t) => t._id === activeTab)) {
            setActiveTab(tabs[0]._id);
        }
    }, [tabs, activeTab]);

    const posts = postsByCategory[activeTab] ?? [];

    const leadPost = posts[0];
    const listPosts = posts.slice(1);

    const isRight = imagePosition === "right";

    return (
        <div className="w-full flex flex-col gap-4 text-gray-900">
            {/* Header */}
            <KalbelaHeader
                title={title}
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                colors={colors}
            />

            {/* Main Single Box Container */}
            <div className="flex flex-col rounded-2xl border border-gray-200/90 bg-white p-4 shadow-sm">
                {/* Top Lead News (Image Top + Bold Title Bottom) */}
                {leadPost && (
                    <div className="group flex flex-col gap-2.5 pb-3.5 border-b border-gray-200/80">
                        {leadPost.image && (
                            <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
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
                    </div>
                )}

                {/* Vertical Thumbnail List */}
                {listPosts.length > 0 && (
                    <div className="flex flex-col">
                        {listPosts.map((post) => (
                            <div
                                key={post._id}
                                className={`group flex items-center gap-3 py-3 border-b border-gray-200/80 last:border-none transition-colors ${
                                    isRight ? "flex-row-reverse" : "flex-row"
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
                                <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-3 group-hover:text-blue-600 transition-colors flex-1">
                                    {showLink ? <a href={post.postUrl || "#"}>{post.title}</a> : post.title}
                                </h4>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function Kalbela2CanvasPreview({ element }: { element: any }) {
    const c = element.schema?.content ?? {};
    const s = element.schema?.style ?? {};

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = c.limit ?? 6;

    const { tabs, postsByCategory, loading } = useKalbelaPosts(categoryIds, limit);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10 gap-2 text-gray-400">
                <Icon icon="svg-spinners:ring-resize" width={20} />
                <span className="text-xs">Loading Kalbela 2...</span>
            </div>
        );
    }

    return (
        <Kalbela2UI
            title={c.title ?? ""}
            tabs={tabs}
            postsByCategory={postsByCategory}
            imagePosition={c.imagePosition || "left"}
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

const kalbela2Element = {
    type: "kalbela-2",
    category: "kalbela",
    label: "Kalbela 2 (Lead & Vertical List)",
    icon: "solar:widget-2-bold",

    schema: {
        content: {
            title: "",
            categoryIds: [] as string[],
            limit: 6,
            imagePosition: "left",
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
                            <NumberControl label="Limit" value={value ?? 6} onChange={onChange} min={2} max={25} />
                        </Section>
                    ),
                },
                {
                    name: "imagePosition",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="List Image Position">
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

    render: (element: any) => <Kalbela2CanvasPreview element={element} />,
};

export default kalbela2Element;
