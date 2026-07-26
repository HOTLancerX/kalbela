"use client";

/**
 * plugin/kalbela/elements/kalbela13.tsx
 *
 * Kalbela Element 13: Photo Grid Cards with Custom Desktop/Mobile Image Heights & Overlay Title
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

interface Kalbela13Props {
    title?: string;
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
    limit?: number;
    columnsDesktop?: number;
    columnsTablet?: number;
    columnsMobile?: number;
    imageHeightDesktop?: number;
    imageHeightMobile?: number;
    showGalleryIcon?: boolean;
    colors?: NewsColors & {
        overlayTitleColor?: string;
    };
    showDate?: boolean;
    showLink?: boolean;
}

export function Kalbela13UI({
    title = "",
    tabs = [],
    postsByCategory = {},
    limit,
    columnsDesktop = 4,
    columnsTablet = 2,
    columnsMobile = 1,
    imageHeightDesktop = 240,
    imageHeightMobile = 180,
    showGalleryIcon = false,
    colors = {},
    showDate = true,
    showLink = true,
}: Kalbela13Props) {
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
        columnsDesktop === 3 ? "lg:grid-cols-3" :
        columnsDesktop === 2 ? "lg:grid-cols-2" : "lg:grid-cols-4";

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

            {/* Photo Grid Showcase */}
            {posts.length > 0 && (
                <div className={`grid ${gridClass} gap-4 md:gap-5`}>
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            className="relative overflow-hidden rounded-2xl group bg-gray-900 shadow-xs hover:shadow-xl transition-all h-(--h-mob) md:h-(--h-desk)"
                            style={{
                                "--h-mob": `${imageHeightMobile}px`,
                                "--h-desk": `${imageHeightDesktop}px`,
                            } as React.CSSProperties}
                        >
                            {/* Card Image */}
                            {post.image && (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                />
                            )}

                            {/* Bottom Dark Gradient Banner Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
                                <h3
                                    className="text-base md:text-lg font-extrabold leading-snug line-clamp-2 drop-shadow-md transition-colors"
                                    style={{ color: colors.overlayTitleColor || "#fbbf24" }}
                                >
                                    {showLink ? (
                                        <a href={post.postUrl || "#"} className="hover:underline">
                                            {post.title}
                                        </a>
                                    ) : (
                                        post.title
                                    )}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function Kalbela13CanvasPreview({ element }: { element: any }) {
    const c = { ...element.schema?.content, ...element.content };
    const s = { ...element.schema?.style, ...element.style };

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = Number(c.limit) || 8;

    const { tabs, postsByCategory, loading } = useKalbelaPosts(categoryIds, limit);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10 gap-2 text-gray-400">
                <Icon icon="svg-spinners:ring-resize" width={20} />
                <span className="text-xs">Loading Kalbela 13...</span>
            </div>
        );
    }

    return (
        <Kalbela13UI
            title={c.title ?? ""}
            tabs={tabs}
            postsByCategory={postsByCategory}
            columnsDesktop={Number(c.columnsDesktop) || 4}
            columnsTablet={Number(c.columnsTablet) || 2}
            columnsMobile={Number(c.columnsMobile) || 1}
            imageHeightDesktop={Number(c.imageHeightDesktop) || 240}
            imageHeightMobile={Number(c.imageHeightMobile) || 180}
            showGalleryIcon={c.showGalleryIcon === "true"}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                inactive: s.inactiveTabColor || "",
                inactiveText: s.inactiveTabTextColor || "",
                title: s.titleColor || "",
                titleHover: s.titleHoverColor || "",
                overlayTitleColor: s.overlayTitleColor || "#fbbf24",
            }}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
}

const kalbela13Element = {
    type: "kalbela-13",
    category: "kalbela",
    label: "Kalbela 13 (Photo Grid Cards)",
    icon: "solar:gallery-bold",

    schema: {
        content: {
            title: "",
            categoryIds: [] as string[],
            limit: 8,
            columnsDesktop: 4,
            columnsTablet: 2,
            columnsMobile: 1,
            imageHeightDesktop: 240,
            imageHeightMobile: 180,
            showGalleryIcon: "false",
            showDate: "true",
            showLink: "true",
        },
        style: {
            titleColor: "",
            titleHoverColor: "",
            overlayTitleColor: "#fbbf24",
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
                            <NumberControl label="Limit" value={value ?? 8} onChange={onChange} min={1} max={30} />
                        </Section>
                    ),
                },
                {
                    name: "columnsDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Columns (Desktop)">
                            <NumberControl label="Desktop Columns" value={value ?? 4} onChange={onChange} min={1} max={6} />
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
                    name: "imageHeightDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Card Height Desktop (px)">
                            <NumberControl label="Height (px)" value={value ?? 240} onChange={onChange} min={120} max={500} />
                        </Section>
                    ),
                },
                {
                    name: "imageHeightMobile",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Card Height Mobile (px)">
                            <NumberControl label="Height (px)" value={value ?? 180} onChange={onChange} min={100} max={350} />
                        </Section>
                    ),
                },
                {
                    name: "showGalleryIcon",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Display">
                            <Toggle label="Show Gallery Icon" value={value === "true"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
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
                    name: "overlayTitleColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Overlay Title Color" defaultOpen>
                            <ColorPickerPopup label="Title Color" value={value ?? "#fbbf24"} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "titleColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Header Title Color">
                            <ColorPickerPopup label="Color" value={value ?? ""} onChange={onChange} />
                        </Section>
                    ),
                },
            ],
        },
    ],

    render: (element: any) => <Kalbela13CanvasPreview element={element} />,
};

export default kalbela13Element;
