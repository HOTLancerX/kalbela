"use client";

/**
 * plugin/kalbela/elements/kalbela4.tsx
 *
 * Kalbela Element 4: Opinion Columnist Vertical Slider (3 Stacked Cream Cards per Slide + Dots Pagination)
 */

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
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

interface Kalbela4Colors extends NewsColors {
    cardBg?: string;
    borderColor?: string;
}

interface Kalbela4Props {
    title?: string;
    categoryIds?: string[];
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
    limit?: number;
    itemsPerSlide?: number;
    excerptLimit?: number;
    colors?: Kalbela4Colors;
    showDate?: boolean;
    showLink?: boolean;
}

function truncateHtmlText(html: string, maxLen: number = 120) {
    const text = html.replace(/<[^>]*>/g, "").trim();
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen) + "...";
}

export function Kalbela4UI({
    title = "",
    categoryIds = [],
    tabs = [],
    postsByCategory = {},
    limit,
    itemsPerSlide = 3,
    excerptLimit = 120,
    colors = {},
    showDate = true,
    showLink = true,
}: Kalbela4Props) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?._id ?? "");

    useEffect(() => {
        if (tabs.length > 0 && !tabs.some((t) => t._id === activeTab)) {
            setActiveTab(tabs[0]._id);
        }
    }, [tabs, activeTab]);

    const allPosts = getDisplayPosts(postsByCategory, activeTab, categoryIds, tabs[0]?._id);
    const posts = limit ? allPosts.slice(0, Number(limit)) : allPosts;

    // Group posts into slides (default 3 cards stacked vertically per slide)
    const chunkSize = Math.max(1, itemsPerSlide);
    const slides: TabPost[][] = [];
    for (let i = 0; i < posts.length; i += chunkSize) {
        slides.push(posts.slice(i, i + chunkSize));
    }

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: false,
        dragFree: false,
        containScroll: "trimSnaps",
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

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

            {/* Slider Container */}
            {slides.length > 0 && (
                <div className="relative">
                    {/* Viewport */}
                    <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                        <div className="flex -mr-4">
                            {slides.map((slideGroup, sIdx) => (
                                <div
                                    key={sIdx}
                                    className="flex-[0_0_100%] min-w-0 pr-4 shrink-0 flex flex-col gap-3.5"
                                >
                                    {slideGroup.map((post) => (
                                        <div
                                            key={post._id}
                                            className="group flex items-start gap-4 p-4 md:p-5 rounded-2xl shadow-xs hover:shadow-md transition-all border-b-4"
                                            style={{
                                                backgroundColor: colors.cardBg || "#fefce8",
                                                borderColor: colors.borderColor || "#dc2626",
                                            }}
                                        >
                                            {/* Left Columnist Profile Avatar */}
                                            <div className="flex flex-col items-center shrink-0 w-24 sm:w-28 text-center">
                                                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden border-2 border-red-600 p-0.5 bg-white shadow-xs">
                                                    <img
                                                        src={post.image}
                                                        alt={post.title}
                                                        className="h-full w-full object-cover rounded-full"
                                                    />
                                                </div>
                                                {post.categoryTitle && (
                                                    <span className="mt-2 text-xs md:text-sm font-extrabold text-gray-900 leading-tight line-clamp-1">
                                                        {post.categoryTitle}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Right Opinion Article Content */}
                                            <div className="flex flex-col gap-1.5 flex-1 pt-1">
                                                <h3 className="text-base md:text-lg font-extrabold text-gray-900 leading-snug group-hover:text-red-700 transition-colors">
                                                    {showLink ? <a href={post.postUrl || "#"}>{post.title}</a> : post.title}
                                                </h3>
                                                {post.excerpt && (
                                                    <div
                                                        className="text-xs md:text-sm text-gray-700 leading-relaxed line-clamp-3 md:line-clamp-4"
                                                        dangerouslySetInnerHTML={{
                                                            __html: truncateHtmlText(post.excerpt, excerptLimit),
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination Dots */}
                    {scrollSnaps.length > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-4">
                            {scrollSnaps.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => emblaApi?.scrollTo(idx)}
                                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                                        idx === selectedIndex ? "w-6 bg-gray-900" : "w-2.5 bg-gray-400 hover:bg-gray-600"
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function Kalbela4CanvasPreview({ element }: { element: any }) {
    const c = { ...element.schema?.content, ...element.content };
    const s = { ...element.schema?.style, ...element.style };

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = Number(c.limit) || 9;

    const { tabs, postsByCategory, loading } = useKalbelaPosts(categoryIds, limit);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10 gap-2 text-gray-400">
                <Icon icon="svg-spinners:ring-resize" width={20} />
                <span className="text-xs">Loading Kalbela 4...</span>
            </div>
        );
    }

    return (
        <Kalbela4UI
            title={c.title ?? ""}
            categoryIds={categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            itemsPerSlide={Number(c.itemsPerSlide) || 3}
            excerptLimit={Number(c.excerptLimit) || 120}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                inactive: s.inactiveTabColor || "",
                inactiveText: s.inactiveTabTextColor || "",
                title: s.titleColor || "",
                titleHover: s.titleHoverColor || "",
                cardBg: s.cardBgColor || "#fefce8",
                borderColor: s.borderColor || "#dc2626",
            }}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
}

const kalbela4Element = {
    type: "kalbela-4",
    category: "kalbela",
    label: "Kalbela 4 (Opinion Columnist Slider)",
    icon: "solar:card-2-bold",

    schema: {
        content: {
            title: "",
            categoryIds: [] as string[],
            limit: 9,
            itemsPerSlide: 3,
            excerptLimit: 120,
            showDate: "true",
            showLink: "true",
        },
        style: {
            titleColor: "",
            titleHoverColor: "",
            cardBgColor: "#fefce8",
            borderColor: "#dc2626",
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
                        <NumberControl label="Total Limit" value={value ?? 9} onChange={onChange} min={3} max={30} />
                    ),
                },
                {
                    name: "itemsPerSlide",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <NumberControl label="Items per Slide" value={value ?? 3} onChange={onChange} min={1} max={5} />
                    ),
                },
                {
                    name: "excerptLimit",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <NumberControl label="Excerpt Limit" value={value ?? 120} onChange={onChange} min={30} max={300} />
                    ),
                },
                {
                    name: "showDate",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Toggle label="Show Date" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
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
                {
                    name: "cardBgColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <ColorPickerPopup label="Card Bg Color" value={value ?? "#fefce8"} onChange={onChange} />
                    ),
                },
                {
                    name: "borderColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <ColorPickerPopup label="Bottom Border Color" value={value ?? "#dc2626"} onChange={onChange} />
                    ),
                },
            ],
        },
    ],

    render: (element: any) => <Kalbela4CanvasPreview element={element} />,
};

export default kalbela4Element;
