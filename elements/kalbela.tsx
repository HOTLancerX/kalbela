"use client";

/**
 * plugin/kalbela/elements/kalbela.tsx
 *
 * Kalbela Breaking News Ticker:
 * 1. Style 1: Horizontal Marquee (Smooth Continuous Scroll)
 * 2. Style 2: Vertical Slide Up (Bumper to Top Vertical Transition)
 * Features: AutoPlay, Pause-on-Hover, Prev/Next & Play/Pause Controls, Fully Custom Colors.
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
import { TabPost, NewsColors } from "../lib/types";
import { useLatestPosts } from "../hooks/useKalbelaPosts";

interface KalbelaProps {
    title?: string;
    categoryIds?: string[];
    limit?: number;
    speed?: number;
    tickerStyle?: "marquee" | "vertical";
    autoplay?: boolean;
    showControls?: boolean;
    showCategory?: boolean;
    showDate?: boolean;
    showLink?: boolean;
    posts?: TabPost[];
    colors?: NewsColors & {
        tickerBgColor?: string;
        titleBgColor?: string;
        titleTextColor?: string;
        newsTextColor?: string;
        newsHoverTextColor?: string;
        controlBgColor?: string;
        controlIconColor?: string;
        bulletColor?: string;
    };
}

export function KalbelaUI({
    title = "শিরোনাম",
    limit = 10,
    speed = 35,
    tickerStyle = "marquee",
    autoplay = true,
    showControls = true,
    showCategory = true,
    showDate = false,
    showLink = true,
    posts = [],
    colors = {},
}: KalbelaProps) {
    const displayPosts = posts.length > 0 ? posts : [
        { _id: "1", title: "বাংলাদেশ কাঁপছে একুশে বইমেলার মেগা উৎসবে", postUrl: "#", categoryTitle: "জাতীয়" },
        { _id: "2", title: "তথ্যপ্রযুক্তির প্রসারে নতুন মাইলফলক অর্জন", postUrl: "#", categoryTitle: "প্রযুক্তি" },
        { _id: "3", title: "টি-টোয়েন্টি সিরিজে দুর্দান্ত জয়ে এগিয়ে দল", postUrl: "#", categoryTitle: "খেলা" },
    ];

    const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Sync autoplay state if prop changes
    useEffect(() => {
        setIsPlaying(autoplay);
    }, [autoplay]);

    // Auto-advance tick for Vertical Slide Mode
    useEffect(() => {
        if (tickerStyle !== "vertical" || !isPlaying || isHovered || displayPosts.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % displayPosts.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [tickerStyle, isPlaying, isHovered, displayPosts.length]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + displayPosts.length) % displayPosts.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % displayPosts.length);
    };

    const togglePlay = () => {
        setIsPlaying((prev) => !prev);
    };

    const tickerBg = colors.tickerBgColor || "#f8fafc";
    const titleBg = colors.titleBgColor || "#dc2626";
    const titleText = colors.titleTextColor || "#ffffff";
    const newsText = colors.newsTextColor || "#1e293b";
    const newsHover = colors.newsHoverTextColor || "#dc2626";
    const ctrlIcon = colors.controlIconColor || "#475569";

    return (
        <div
            className="w-full flex items-center rounded-xl overflow-hidden shadow-xs border border-gray-200/80 my-2 select-none"
            style={{ backgroundColor: tickerBg }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Left Title Badge */}
            <div
                className="shrink-0 px-3.5 py-2.5 flex items-center gap-2 font-bold text-xs md:text-sm tracking-wide z-10 shadow-sm"
                style={{ backgroundColor: titleBg, color: titleText }}
            >
                <Icon icon="solar:bolt-bold" width={18} height={18} className="animate-pulse shrink-0" />
                <span>{title || "শিরোনাম"}</span>
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
            </div>

            {/* Middle Ticker Track */}
            <div className="flex-1 overflow-hidden relative py-2.5 px-3 min-w-0">
                {tickerStyle === "vertical" ? (
                    /* Style 2: Vertical Slide Up (Bumper to Top) */
                    <div className="h-6 relative overflow-hidden flex items-center min-w-0 w-full">
                        {displayPosts.map((post, idx) => (
                            <div
                                key={post._id || idx}
                                className={`absolute inset-0 flex items-center gap-2.5 transition-all duration-500 ease-in-out text-xs md:text-sm font-semibold truncate ${
                                    idx === currentIndex
                                        ? "translate-y-0 opacity-100 z-10"
                                        : idx < currentIndex
                                        ? "-translate-y-full opacity-0 z-0"
                                        : "translate-y-full opacity-0 z-0"
                                }`}
                            >
                                <span className="text-red-500 font-bold">•</span>
                                {showCategory && post.categoryTitle && (
                                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-100 shrink-0">
                                        {post.categoryTitle}
                                    </span>
                                )}
                                {showLink ? (
                                    <a
                                        href={post.postUrl || "#"}
                                        className="truncate transition-colors hover:underline"
                                        style={{ color: newsText }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = newsHover)}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = newsText)}
                                    >
                                        {post.title}
                                    </a>
                                ) : (
                                    <span className="truncate" style={{ color: newsText }}>{post.title}</span>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Style 1: Horizontal Continuous Marquee */
                    <div
                        className={`inline-flex items-center whitespace-nowrap gap-8 text-xs md:text-sm font-semibold transition-all duration-300`}
                        style={{
                            display: "inline-flex",
                            animation: `kalbela-marquee ${speed}s linear infinite`,
                            animationPlayState: !isPlaying || isHovered ? "paused" : "running",
                        }}
                    >
                        {/* Render duplicate items for smooth infinite loop */}
                        {[...displayPosts, ...displayPosts].map((post, idx) => (
                            <div key={`${post._id}-${idx}`} className="inline-flex items-center gap-3 shrink-0">
                                <span className="text-red-500 font-bold">•</span>
                                {showCategory && post.categoryTitle && (
                                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
                                        {post.categoryTitle}
                                    </span>
                                )}
                                {showLink ? (
                                    <a
                                        href={post.postUrl || "#"}
                                        className="transition-colors hover:underline"
                                        style={{ color: newsText }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = newsHover)}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = newsText)}
                                    >
                                        {post.title}
                                    </a>
                                ) : (
                                    <span style={{ color: newsText }}>{post.title}</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right Controls (Prev, Pause/Play, Next) */}
            {showControls && (
                <div className="shrink-0 flex items-center gap-1 px-2 py-1 z-10 border-l border-gray-200/60 bg-inherit">
                    <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous headline"
                        className="p-1 rounded-md transition-all hover:bg-gray-200/70 cursor-pointer text-gray-700"
                        title="পূর্ববর্তী"
                    >
                        <Icon icon="mdi:chevron-left" width={18} height={18} style={{ color: ctrlIcon }} />
                    </button>
                    <button
                        type="button"
                        onClick={togglePlay}
                        aria-label={isPlaying ? "Pause ticker" : "Play ticker"}
                        className="p-1 rounded-md transition-all hover:bg-gray-200/70 cursor-pointer text-gray-700"
                        title="চালু"
                    >
                        <Icon
                            icon={isPlaying && !isHovered ? "mdi:pause" : "mdi:play"}
                            width={16}
                            height={16}
                            style={{ color: ctrlIcon }}
                        />
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next headline"
                        className="p-1 rounded-md transition-all hover:bg-gray-200/70 cursor-pointer text-gray-700"
                        title="পরবর্তী"
                    >
                        <Icon icon="mdi:chevron-right" width={18} height={18} style={{ color: ctrlIcon }} />
                    </button>
                </div>
            )}

            {/* CSS Animation Keyframes for Marquee */}
            <style jsx global>{`
                @keyframes kalbela-marquee {
                    0% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </div>
    );
}

function KalbelaCanvasPreview({ element }: { element: any }) {
    const c = { ...element.schema?.content, ...element.content };
    const s = { ...element.schema?.style, ...element.style };

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = Number(c.limit) || 10;

    const { posts, loading } = useLatestPosts(categoryIds, limit);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-4 gap-2 text-gray-400">
                <Icon icon="svg-spinners:ring-resize" width={18} />
                <span className="text-xs">Loading Breaking News...</span>
            </div>
        );
    }

    return (
        <KalbelaUI
            title={c.title ?? "শিরোনাম"}
            posts={posts}
            limit={limit}
            speed={Number(c.speed) || 35}
            tickerStyle={c.tickerStyle || "marquee"}
            autoplay={c.autoplay !== "false"}
            showControls={c.showControls !== "false"}
            showCategory={c.showCategory !== "false"}
            showDate={c.showDate === "true"}
            showLink={c.showLink !== "false"}
            colors={{
                tickerBgColor: s.tickerBgColor || "#f8fafc",
                titleBgColor: s.titleBgColor || "#dc2626",
                titleTextColor: s.titleTextColor || "#ffffff",
                newsTextColor: s.newsTextColor || "#1e293b",
                newsHoverTextColor: s.newsHoverTextColor || "#dc2626",
                controlBgColor: s.controlBgColor || "#ffffff",
                controlIconColor: s.controlIconColor || "#475569",
            }}
        />
    );
}

const kalbelaElement = {
    type: "kalbela",
    category: "kalbela",
    label: "Kalbela (Breaking News Ticker)",
    icon: "solar:bolt-bold",

    schema: {
        content: {
            title: "শিরোনাম",
            categoryIds: [] as string[],
            limit: 10,
            speed: 35,
            tickerStyle: "marquee",
            autoplay: "true",
            showControls: "true",
            showCategory: "true",
            showDate: "false",
            showLink: "true",
        },
        style: {
            tickerBgColor: "#f8fafc",
            titleBgColor: "#dc2626",
            titleTextColor: "#ffffff",
            newsTextColor: "#1e293b",
            newsHoverTextColor: "#dc2626",
            controlBgColor: "#ffffff",
            controlIconColor: "#475569",
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
                        <Text label="Badge Title" value={value ?? "শিরোনাম"} onChange={onChange} />
                    ),
                },
                {
                    name: "tickerStyle",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg text-xs font-semibold">
                            <button
                                type="button"
                                onClick={() => onChange("marquee")}
                                className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                                    (value ?? "marquee") === "marquee" ? "bg-white shadow-xs text-blue-600 font-bold" : "text-gray-600"
                                }`}
                            >
                                Horizontal Marquee
                            </button>
                            <button
                                type="button"
                                onClick={() => onChange("vertical")}
                                className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                                    value === "vertical" ? "bg-white shadow-xs text-blue-600 font-bold" : "text-gray-600"
                                }`}
                            >
                                Vertical Slide Up
                            </button>
                        </div>
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
                        <NumberControl label="Total Limit" value={value ?? 10} onChange={onChange} min={1} max={30} />
                    ),
                },
                {
                    name: "speed",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <NumberControl label="Marquee Speed (s)" value={value ?? 35} onChange={onChange} min={10} max={100} />
                    ),
                },
                {
                    name: "autoplay",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Toggle label="Enable Autoplay" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                    ),
                },
                {
                    name: "showControls",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Toggle label="Show Controls" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                    ),
                },
                {
                    name: "showCategory",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Toggle label="Show Category" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                    ),
                },
            ],
        },
        {
            tab: "Style",
            section: "Colors",
            controls: [
                {
                    name: "titleBgColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <ColorPickerPopup label="Badge Background" value={value ?? "#dc2626"} onChange={onChange} />
                    ),
                },
                {
                    name: "titleTextColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <ColorPickerPopup label="Badge Text Color" value={value ?? "#ffffff"} onChange={onChange} />
                    ),
                },
                {
                    name: "tickerBgColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <ColorPickerPopup label="Ticker Background" value={value ?? "#f8fafc"} onChange={onChange} />
                    ),
                },
                {
                    name: "newsTextColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <ColorPickerPopup label="News Text Color" value={value ?? "#1e293b"} onChange={onChange} />
                    ),
                },
                {
                    name: "newsHoverTextColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <ColorPickerPopup label="News Hover Color" value={value ?? "#dc2626"} onChange={onChange} />
                    ),
                },
                {
                    name: "controlIconColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <ColorPickerPopup label="Control Icon Color" value={value ?? "#475569"} onChange={onChange} />
                    ),
                },
            ],
        },
    ],

    render: (element: any) => <KalbelaCanvasPreview element={element} />,
};

export default kalbelaElement;
