"use client";

/**
 * plugin/kalbela/elements/kalbela3.tsx
 *
 * Kalbela Element 3: Video News Embla Carousel / Slider
 */

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
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

interface Kalbela3Props {
    title?: string;
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
    limit?: number;
    columnsDesktop?: number;
    columnsTablet?: number;
    columnsMobile?: number;
    colors?: NewsColors;
    showPlayButton?: boolean;
    showDate?: boolean;
    showLink?: boolean;
}

function getEmblaSlideFlexClass(desktop: number = 4, tablet: number = 3, mobile: number = 1) {
    const mobClass = Number(mobile) === 2 ? "flex-[0_0_50%]" : "flex-[0_0_100%]";

    const tabClass =
        Number(tablet) === 4 ? "md:flex-[0_0_25%]" :
        Number(tablet) === 2 ? "md:flex-[0_0_50%]" :
        Number(tablet) === 1 ? "md:flex-[0_0_100%]" : "md:flex-[0_0_33.3333%]";

    const deskClass =
        Number(desktop) === 6 ? "lg:flex-[0_0_16.6667%]" :
        Number(desktop) === 5 ? "lg:flex-[0_0_20%]" :
        Number(desktop) === 3 ? "lg:flex-[0_0_33.3333%]" :
        Number(desktop) === 2 ? "lg:flex-[0_0_50%]" : "lg:flex-[0_0_25%]";

    return `${mobClass} ${tabClass} ${deskClass}`;
}

export function Kalbela3UI({
    title = "",
    tabs = [],
    postsByCategory = {},
    limit,
    columnsDesktop = 4,
    columnsTablet = 3,
    columnsMobile = 1,
    colors = {},
    showPlayButton = true,
    showDate = true,
    showLink = true,
}: Kalbela3Props) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?._id ?? "");

    useEffect(() => {
        if (tabs.length > 0 && !tabs.some((t) => t._id === activeTab)) {
            setActiveTab(tabs[0]._id);
        }
    }, [tabs, activeTab]);

    const posts = postsByCategory[activeTab] ?? [];

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: false,
        dragFree: true,
        containScroll: "trimSnaps",
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const slideFlexClass = getEmblaSlideFlexClass(columnsDesktop, columnsTablet, columnsMobile);

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

            {/* Embla Carousel Container */}
            {posts.length > 0 && (
                <div className="relative group/carousel">
                    {/* Navigation Buttons */}
                    <button
                        type="button"
                        onClick={scrollPrev}
                        aria-label="Previous slide"
                        className="absolute left-1 top-[35%] -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-lg hover:bg-red-600 hover:text-white transition-all cursor-pointer border border-gray-200"
                    >
                        <Icon icon="mdi:chevron-left" width={22} />
                    </button>
                    <button
                        type="button"
                        onClick={scrollNext}
                        aria-label="Next slide"
                        className="absolute right-1 top-[35%] -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-lg hover:bg-red-600 hover:text-white transition-all cursor-pointer border border-gray-200"
                    >
                        <Icon icon="mdi:chevron-right" width={22} />
                    </button>

                    {/* Viewport */}
                    <div className="overflow-hidden rounded-xl" ref={emblaRef}>
                        <div className="flex -mr-4">
                            {posts.map((post) => (
                                <a
                                    href={post.postUrl || "#"}
                                    key={post._id}
                                    className={`min-w-0 pr-4 shrink-0 ${slideFlexClass}`}
                                >
                                    <div className="group/item flex flex-col gap-2">
                                        {/* Video Thumbnail Box */}
                                        <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-black">
                                            {post.image && (
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="h-full w-full object-cover opacity-90 group-hover/item:scale-105 transition-all duration-500"
                                                />
                                            )}

                                            {/* Center Circular Play Button */}
                                            {showPlayButton && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-600 shadow-md group-hover/item:scale-110 transition-transform">
                                                        <Icon icon="mdi:play" width={22} className="ml-0.5" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Main Headline Title & Date below Image */}
                                        <div className="flex flex-col gap-1 px-0.5">
                                            <h3 className="text-xs md:text-sm font-bold text-gray-700 hover:text-main leading-snug line-clamp-2 transition-colors">
                                                {post.title}
                                            </h3>
                                            {showDate && (
                                                <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5">
                                                    <Icon icon="mdi:clock-outline" width={14} className="text-gray-400" />
                                                    <span>
                                                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString("bn-BD") : "৯ ঘণ্টা আগে"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Kalbela3CanvasPreview({ element }: { element: any }) {
    const c = { ...element.schema?.content, ...element.content };
    const s = { ...element.schema?.style, ...element.style };

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = Number(c.limit) || 8;

    const { tabs, postsByCategory, loading } = useKalbelaPosts(categoryIds, limit);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10 gap-2 text-gray-400">
                <Icon icon="svg-spinners:ring-resize" width={20} />
                <span className="text-xs">Loading Kalbela 3...</span>
            </div>
        );
    }

    return (
        <Kalbela3UI
            title={c.title ?? ""}
            tabs={tabs}
            postsByCategory={postsByCategory}
            columnsDesktop={Number(c.columnsDesktop) || 4}
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
            showPlayButton={c.showPlayButton !== "false"}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
}

const kalbela3Element = {
    type: "kalbela-3",
    category: "kalbela",
    label: "Kalbela 3 (Video Carousel)",
    icon: "solar:videocamera-record-bold",

    schema: {
        content: {
            title: "",
            categoryIds: [] as string[],
            limit: 8,
            columnsDesktop: 4,
            columnsTablet: 3,
            columnsMobile: 1,
            showPlayButton: "true",
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
                            <NumberControl label="Limit" value={value ?? 8} onChange={onChange} min={3} max={30} />
                        </Section>
                    ),
                },
                {
                    name: "columnsDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Columns (Desktop)">
                            <NumberControl label="Desktop Columns" value={value ?? 4} onChange={onChange} min={2} max={6} />
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
                    name: "showPlayButton",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Display">
                            <Toggle label="Show Play Button" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
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

    render: (element: any) => <Kalbela3CanvasPreview element={element} />,
};

export default kalbela3Element;
