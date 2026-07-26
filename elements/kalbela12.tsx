"use client";

/**
 * plugin/kalbela/elements/kalbela12.tsx
 *
 * Kalbela Element 12: Embla Photo Gallery Showcase (Cinema Stage + Synced Thumbnail Carousel)
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

interface Kalbela12Props {
    title?: string;
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
    limit?: number;
    colors?: NewsColors;
    showDate?: boolean;
    showLink?: boolean;
}

export function Kalbela12UI({
    title = "",
    tabs = [],
    postsByCategory = {},
    limit,
    colors = {},
    showDate = true,
    showLink = true,
}: Kalbela12Props) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?._id ?? "");
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    useEffect(() => {
        if (tabs.length > 0 && !tabs.some((t) => t._id === activeTab)) {
            setActiveTab(tabs[0]._id);
        }
    }, [tabs, activeTab]);

    const rawPosts = postsByCategory[activeTab] ?? [];
    const posts = limit ? rawPosts.slice(0, Number(limit)) : rawPosts;

    // Main Stage Embla Carousel
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
        align: "start",
        loop: true,
    });

    // Thumbnails Strip Embla Carousel
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
    });

    const onSelect = useCallback(() => {
        if (!emblaMainApi) return;
        const index = emblaMainApi.selectedScrollSnap();
        setSelectedIndex(index);
        if (emblaThumbsApi) emblaThumbsApi.scrollTo(index);
    }, [emblaMainApi, emblaThumbsApi]);

    useEffect(() => {
        if (!emblaMainApi) return;
        onSelect();
        emblaMainApi.on("select", onSelect);
        emblaMainApi.on("reInit", onSelect);
    }, [emblaMainApi, onSelect]);

    const scrollPrev = useCallback(() => {
        if (emblaMainApi) emblaMainApi.scrollPrev();
    }, [emblaMainApi]);

    const scrollNext = useCallback(() => {
        if (emblaMainApi) emblaMainApi.scrollNext();
    }, [emblaMainApi]);

    const onThumbClick = useCallback((index: number) => {
        if (!emblaMainApi) return;
        emblaMainApi.scrollTo(index);
    }, [emblaMainApi]);

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

            {/* Gallery Section */}
            {posts.length > 0 && (
                <div className="flex flex-col gap-3">
                    {/* Main Cinema Viewport Stage */}
                    <div className="relative group">
                        {/* Navigation Arrows */}
                        <button
                            type="button"
                            onClick={scrollPrev}
                            aria-label="Previous Photo"
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-red-600 hover:scale-105 transition-all cursor-pointer border border-white/20 shadow-lg"
                        >
                            <Icon icon="mdi:chevron-left" width={28} />
                        </button>
                        <button
                            type="button"
                            onClick={scrollNext}
                            aria-label="Next Photo"
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-red-600 hover:scale-105 transition-all cursor-pointer border border-white/20 shadow-lg"
                        >
                            <Icon icon="mdi:chevron-right" width={28} />
                        </button>

                        {/* Main Stage Viewport */}
                        <div className="overflow-hidden rounded-2xl bg-black shadow-xl aspect-video" ref={emblaMainRef}>
                            <div className="flex h-full">
                                {posts.map((post, idx) => (
                                    <div
                                        key={post._id}
                                        className="relative flex-[0_0_100%] min-w-0 h-full shrink-0"
                                    >
                                        {post.image && (
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="h-full w-full object-cover"
                                            />
                                        )}

                                        {/* Bottom Dark Gradient Caption Bar */}
                                        <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black via-black/85 to-transparent p-4 md:p-6 flex items-end justify-between gap-4">
                                            <div className="flex flex-col gap-1 max-w-3xl">
                                                <h2 className="text-base md:text-xl font-extrabold text-white leading-snug drop-shadow-md">
                                                    {showLink ? (
                                                        <a href={post.postUrl || "#"} className="hover:text-amber-400 transition-colors">
                                                            {post.title}
                                                        </a>
                                                    ) : (
                                                        post.title
                                                    )}
                                                </h2>
                                                {post.excerpt && (
                                                    <p className="text-xs md:text-sm text-gray-300 line-clamp-2 leading-relaxed">
                                                        {post.excerpt.replace(/<[^>]*>/g, "").trim()}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Photo Count Badge */}
                                            <div className="flex items-center gap-1.5 shrink-0 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-bold shadow-sm border border-white/10">
                                                <Icon icon="solar:gallery-wide-bold" width={16} />
                                                <span>{idx + 1} / {posts.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Synced Thumbnail Embla Strip */}
                    <div className="overflow-hidden py-2" ref={emblaThumbsRef}>
                        <div className="flex gap-3 -mr-3">
                            {posts.map((post, idx) => {
                                const isActive = idx === selectedIndex;
                                return (
                                    <div
                                        key={post._id}
                                        className="flex-[0_0_auto] min-w-0 pr-3 shrink-0"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => onThumbClick(idx)}
                                            className={`relative h-16 w-24 md:h-20 md:w-32 shrink-0 overflow-hidden rounded-xl bg-gray-900 transition-all cursor-pointer ${
                                                isActive
                                                    ? "border-2 border-red-600 shadow-lg scale-105 opacity-100 ring-2 ring-red-600/30"
                                                    : "opacity-60 hover:opacity-100 hover:scale-102"
                                            }`}
                                        >
                                            {post.image && (
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            )}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Kalbela12CanvasPreview({ element }: { element: any }) {
    const c = { ...element.schema?.content, ...element.content };
    const s = { ...element.schema?.style, ...element.style };

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = Number(c.limit) || 8;

    const { tabs, postsByCategory, loading } = useKalbelaPosts(categoryIds, limit);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10 gap-2 text-gray-400">
                <Icon icon="svg-spinners:ring-resize" width={20} />
                <span className="text-xs">Loading Kalbela 12...</span>
            </div>
        );
    }

    return (
        <Kalbela12UI
            title={c.title ?? ""}
            tabs={tabs}
            postsByCategory={postsByCategory}
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

const kalbela12Element = {
    type: "kalbela-12",
    category: "kalbela",
    label: "Kalbela 12 (Photo Gallery Showcase)",
    icon: "solar:gallery-wide-bold",

    schema: {
        content: {
            title: "",
            categoryIds: [] as string[],
            limit: 8,
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
                            <NumberControl label="Limit" value={value ?? 8} onChange={onChange} min={3} max={25} />
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

    render: (element: any) => <Kalbela12CanvasPreview element={element} />,
};

export default kalbela12Element;
