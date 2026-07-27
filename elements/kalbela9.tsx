"use client";

/**
 * plugin/kalbela/elements/kalbela9.tsx
 *
 * Kalbela Element 9: Top Dark Banner Lead (Sec 1) + Top Sub Cards Grid (Sec 2) + Dynamic Bottom Row Grid (Sec 3)
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

interface Kalbela9Colors extends NewsColors {
    leadBg?: string;
    leadTitle?: string;
    leadText?: string;
}

interface Kalbela9Props {
    title?: string;
    tabs?: Tab[];
    postsByCategory?: Record<string, TabPost[]>;
    limit?: number;
    topSubCount?: number;
    topSubColumnsDesktop?: number;
    topSubColumnsTablet?: number;
    topSubColumnsMobile?: number;
    columnsDesktop?: number;
    columnsTablet?: number;
    columnsMobile?: number;
    // Section 1 Image Heights
    leadImageHeightDesktop?: number;
    leadImageHeightMobile?: number;
    // Section 2 Image Heights
    topSubImageHeightDesktop?: number;
    topSubImageHeightMobile?: number;
    // Section 3 Image Heights
    bottomImageHeightDesktop?: number;
    bottomImageHeightMobile?: number;
    colors?: Kalbela9Colors;
    // Section 1 Display Controls
    showLeadExcerpt?: boolean;
    showLeadCategory?: boolean;
    // Section 2 Display Controls
    showTopSubExcerpt?: boolean;
    showTopSubCategory?: boolean;
    // Section 3 Display Controls
    showBottomExcerpt?: boolean;
    showBottomCategory?: boolean;
    showDate?: boolean;
    showLink?: boolean;
}

export function Kalbela9UI({
    title = "",
    tabs = [],
    postsByCategory = {},
    limit,
    topSubCount = 2,
    topSubColumnsDesktop = 2,
    topSubColumnsTablet = 2,
    topSubColumnsMobile = 1,
    columnsDesktop = 4,
    columnsTablet = 2,
    columnsMobile = 1,
    leadImageHeightDesktop = 220,
    leadImageHeightMobile = 160,
    topSubImageHeightDesktop = 180,
    topSubImageHeightMobile = 140,
    bottomImageHeightDesktop = 160,
    bottomImageHeightMobile = 120,
    colors = {},
    showLeadExcerpt = true,
    showLeadCategory = false,
    showTopSubExcerpt = true,
    showTopSubCategory = true,
    showBottomExcerpt = true,
    showBottomCategory = true,
    showDate = true,
    showLink = true,
}: Kalbela9Props) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?._id ?? "");

    useEffect(() => {
        if (tabs.length > 0 && !tabs.some((t) => t._id === activeTab)) {
            setActiveTab(tabs[0]._id);
        }
    }, [tabs, activeTab]);

    const rawPosts = postsByCategory[activeTab] ?? [];
    const posts = limit ? rawPosts.slice(0, Number(limit)) : rawPosts;

    const topSubCountNum = Math.max(1, Number(topSubCount) || 2);
    const leadPost = posts[0];
    const topSubPosts = posts.slice(1, 1 + topSubCountNum);
    const bottomPosts = posts.slice(1 + topSubCountNum);

    const topSubDeskColsClass =
        topSubColumnsDesktop === 4 ? "lg:grid-cols-4" :
        topSubColumnsDesktop === 3 ? "lg:grid-cols-3" :
        topSubColumnsDesktop === 1 ? "lg:grid-cols-1" : "lg:grid-cols-2";

    const topSubTabColsClass =
        topSubColumnsTablet === 3 ? "md:grid-cols-3" :
        topSubColumnsTablet === 1 ? "md:grid-cols-1" : "md:grid-cols-2";

    const topSubMobColsClass =
        topSubColumnsMobile === 2 ? "grid-cols-2" : "grid-cols-1";

    const topSubGridClass = `${topSubMobColsClass} ${topSubTabColsClass} ${topSubDeskColsClass}`;

    const deskColsClass =
        columnsDesktop === 5 ? "lg:grid-cols-5" :
        columnsDesktop === 3 ? "lg:grid-cols-3" :
        columnsDesktop === 2 ? "lg:grid-cols-2" : "lg:grid-cols-4";

    const tabColsClass =
        columnsTablet === 3 ? "md:grid-cols-3" :
        columnsTablet === 1 ? "md:grid-cols-1" : "md:grid-cols-2";

    const mobColsClass =
        columnsMobile === 2 ? "grid-cols-2" : "grid-cols-1";

    const bottomGridClass = `${mobColsClass} ${tabColsClass} ${deskColsClass}`;

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

            {/* Top Row (Sec 1: Left Dark Panel Featured Card + Sec 2: Right Sub Cards) */}
            {posts.length > 0 && (
                <div className="flex flex-col lg:flex-row gap-4 md:gap-5 items-stretch border-b border-gray-200 pb-5">
                    {/* Section 1: Left Split Dark Panel Featured Lead Card */}
                    {leadPost && (
                        <a
                            href={leadPost.postUrl || "#"}
                            className="w-full lg:w-1/2 group flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-xs border border-gray-100"
                        >
                            {/* Left Dynamic Color Panel */}
                            <div
                                className="w-full md:w-1/2 p-4 md:p-5 flex flex-col justify-center gap-2 transition-colors"
                                style={{ backgroundColor: colors.leadBg || "#000000" }}
                            >
                                <h2
                                    className="text-base font-medium leading-snug line-clamp-2 transition-colors"
                                    style={{ color: colors.leadTitle || "#fbbf24" }}
                                >
                                    {showLeadCategory && leadPost.categoryTitle && (
                                        <span className="text-red-400 mr-1.5">{leadPost.categoryTitle} /</span>
                                    )}
                                    {leadPost.title}
                                </h2>
                                {showLeadExcerpt && leadPost.excerpt && (
                                    <p
                                        className="text-xs leading-relaxed line-clamp-3 md:line-clamp-4"
                                        style={{ color: colors.leadText || "#d1d5db" }}
                                    >
                                        {leadPost.excerpt.replace(/<[^>]*>/g, "").trim()}
                                    </p>
                                )}
                            </div>
                            {/* Right Image (Sec 1) */}
                            {leadPost.image && (
                                <div
                                    className="w-full md:w-1/2 overflow-hidden bg-gray-900 shrink-0 h-(--h-mob) md:h-(--h-desk)"
                                    style={{
                                        "--h-mob": `${leadImageHeightMobile}px`,
                                        "--h-desk": `${leadImageHeightDesktop}px`,
                                    } as React.CSSProperties}
                                >
                                    <img
                                        src={leadPost.image}
                                        alt={leadPost.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}
                        </a>
                    )}

                    {/* Section 2: Right Top Sub-Cards */}
                    {topSubPosts.length > 0 && (
                        <div className={`w-full lg:w-1/2 grid ${topSubGridClass} gap-4`}>
                            {topSubPosts.map((post) => (
                                <a
                                    key={post._id}
                                    href={post.postUrl || "#"}
                                    className="group flex flex-col gap-2 pl-0 lg:pl-3 border-r border-gray-100 last:border-none"
                                >
                                    {post.image && (
                                        <div
                                            className="w-full overflow-hidden rounded-xl bg-gray-100 shrink-0 h-(--h-mob) md:h-(--h-desk)"
                                            style={{
                                                "--h-mob": `${topSubImageHeightMobile}px`,
                                                "--h-desk": `${topSubImageHeightDesktop}px`,
                                            } as React.CSSProperties}
                                        >
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <h4
                                        className="text-xs md:text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-main transition-colors"
                                        style={{ color: colors.title || undefined }}
                                    >
                                        {showTopSubCategory && post.categoryTitle && (
                                            <span className="text-red-600 mr-1">{post.categoryTitle} /</span>
                                        )}
                                        {post.title}
                                    </h4>
                                    {showTopSubExcerpt && post.excerpt && (
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

            {/* Section 3: Bottom Row Grid */}
            {bottomPosts.length > 0 && (
                <div className={`grid ${bottomGridClass} gap-2 md:gap-4 pt-2`}>
                    {bottomPosts.map((post) => (
                        <a
                            key={post._id}
                            href={post.postUrl || "#"}
                            className="group flex flex-col gap-2 border-r border-gray-100 pr-3 last:border-none"
                        >
                            {post.image && (
                                <div
                                    className="w-full overflow-hidden rounded-xl bg-gray-100 shrink-0 h-(--h-mob) md:h-(--h-desk)"
                                    style={{
                                        "--h-mob": `${bottomImageHeightMobile}px`,
                                        "--h-desk": `${bottomImageHeightDesktop}px`,
                                    } as React.CSSProperties}
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <h4
                                className="text-xs md:text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-main transition-colors"
                                style={{ color: colors.title || undefined }}
                            >
                                {showBottomCategory && post.categoryTitle && (
                                    <span className="text-red-600 mr-1">{post.categoryTitle} /</span>
                                )}
                                {post.title}
                            </h4>
                            {showBottomExcerpt && post.excerpt && (
                                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                                    {post.excerpt.replace(/<[^>]*>/g, "").trim()}
                                </p>
                            )}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

function Kalbela9CanvasPreview({ element }: { element: any }) {
    const c = { ...element.schema?.content, ...element.content };
    const s = { ...element.schema?.style, ...element.style };

    const categoryIds: string[] = c.categoryIds ?? [];
    const limit: number = Number(c.limit) || 7;

    const { tabs, postsByCategory, loading } = useKalbelaPosts(categoryIds, limit);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10 gap-2 text-gray-400">
                <Icon icon="svg-spinners:ring-resize" width={20} />
                <span className="text-xs">Loading Kalbela 9...</span>
            </div>
        );
    }

    return (
        <Kalbela9UI
            title={c.title ?? ""}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            topSubCount={Number(c.topSubCount) || 2}
            topSubColumnsDesktop={Number(c.topSubColumnsDesktop) || 2}
            topSubColumnsTablet={Number(c.topSubColumnsTablet) || 2}
            topSubColumnsMobile={Number(c.topSubColumnsMobile) || 1}
            columnsDesktop={Number(c.columnsDesktop) || 4}
            columnsTablet={Number(c.columnsTablet) || 2}
            columnsMobile={Number(c.columnsMobile) || 1}
            leadImageHeightDesktop={Number(c.leadImageHeightDesktop) || 220}
            leadImageHeightMobile={Number(c.leadImageHeightMobile) || 160}
            topSubImageHeightDesktop={Number(c.topSubImageHeightDesktop) || 180}
            topSubImageHeightMobile={Number(c.topSubImageHeightMobile) || 140}
            bottomImageHeightDesktop={Number(c.bottomImageHeightDesktop) || 160}
            bottomImageHeightMobile={Number(c.bottomImageHeightMobile) || 120}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                inactive: s.inactiveTabColor || "",
                inactiveText: s.inactiveTabTextColor || "",
                title: s.titleColor || "",
                titleHover: s.titleHoverColor || "",
                leadBg: s.leadBgColor || "#000000",
                leadTitle: s.leadTitleColor || "#fbbf24",
                leadText: s.leadTextColor || "#d1d5db",
            }}
            showLeadExcerpt={c.showLeadExcerpt !== "false"}
            showLeadCategory={c.showLeadCategory === "true"}
            showTopSubExcerpt={c.showTopSubExcerpt !== "false"}
            showTopSubCategory={c.showTopSubCategory !== "false"}
            showBottomExcerpt={c.showBottomExcerpt !== "false"}
            showBottomCategory={c.showBottomCategory !== "false"}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
}

const kalbela9Element = {
    type: "kalbela-9",
    category: "kalbela",
    label: "Bottom Grid",
    icon: "solar:layout-grid-bold",

    schema: {
        content: {
            title: "",
            categoryIds: [] as string[],
            limit: 7,
            topSubCount: 2,
            topSubColumnsDesktop: 2,
            topSubColumnsTablet: 2,
            topSubColumnsMobile: 1,
            columnsDesktop: 4,
            columnsTablet: 2,
            columnsMobile: 1,
            leadImageHeightDesktop: 220,
            leadImageHeightMobile: 160,
            topSubImageHeightDesktop: 180,
            topSubImageHeightMobile: 140,
            bottomImageHeightDesktop: 160,
            bottomImageHeightMobile: 120,
            showLeadExcerpt: "true",
            showLeadCategory: "false",
            showTopSubExcerpt: "true",
            showTopSubCategory: "true",
            showBottomExcerpt: "true",
            showBottomCategory: "true",
            showDate: "true",
            showLink: "true",
        },
        style: {
            titleColor: "",
            titleHoverColor: "",
            leadBgColor: "#000000",
            leadTitleColor: "#fbbf24",
            leadTextColor: "#d1d5db",
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
                            <NumberControl label="Total Limit" value={value ?? 7} onChange={onChange} min={3} max={30} />
                        </Section>
                    ),
                },
                {
                    name: "topSubCount",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 2 Count">
                            <NumberControl label="Sub Count" value={value ?? 2} onChange={onChange} min={1} max={6} />
                        </Section>
                    ),
                },
                {
                    name: "topSubColumnsDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 2 Cols (Dex)">
                            <NumberControl label="Cols (Dex)" value={value ?? 2} onChange={onChange} min={1} max={4} />
                        </Section>
                    ),
                },
                {
                    name: "topSubColumnsTablet",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 2 Cols (Tab)">
                            <NumberControl label="Cols (Tab)" value={value ?? 2} onChange={onChange} min={1} max={3} />
                        </Section>
                    ),
                },
                {
                    name: "topSubColumnsMobile",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 2 Cols (Mob)">
                            <NumberControl label="Cols (Mob)" value={value ?? 1} onChange={onChange} min={1} max={2} />
                        </Section>
                    ),
                },
                {
                    name: "columnsDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 3 Cols (Dex)">
                            <NumberControl label="Cols (Dex)" value={value ?? 4} onChange={onChange} min={2} max={5} />
                        </Section>
                    ),
                },
                {
                    name: "columnsTablet",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 3 Cols (Tab)">
                            <NumberControl label="Cols (Tab)" value={value ?? 2} onChange={onChange} min={1} max={3} />
                        </Section>
                    ),
                },
                {
                    name: "columnsMobile",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 3 Cols (Mob)">
                            <NumberControl label="Cols (Mob)" value={value ?? 1} onChange={onChange} min={1} max={2} />
                        </Section>
                    ),
                },
                {
                    name: "leadImageHeightDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 1 Img Ht (Dex)">
                            <NumberControl label="Ht (px)" value={value ?? 220} onChange={onChange} min={100} max={600} />
                        </Section>
                    ),
                },
                {
                    name: "leadImageHeightMobile",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 1 Img Ht (Mob)">
                            <NumberControl label="Ht (px)" value={value ?? 160} onChange={onChange} min={80} max={400} />
                        </Section>
                    ),
                },
                {
                    name: "topSubImageHeightDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 2 Img Ht (Dex)">
                            <NumberControl label="Ht (px)" value={value ?? 180} onChange={onChange} min={100} max={600} />
                        </Section>
                    ),
                },
                {
                    name: "topSubImageHeightMobile",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 2 Img Ht (Mob)">
                            <NumberControl label="Ht (px)" value={value ?? 140} onChange={onChange} min={80} max={400} />
                        </Section>
                    ),
                },
                {
                    name: "bottomImageHeightDesktop",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 3 Img Ht (Dex)">
                            <NumberControl label="Ht (px)" value={value ?? 160} onChange={onChange} min={80} max={500} />
                        </Section>
                    ),
                },
                {
                    name: "bottomImageHeightMobile",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 3 Img Ht (Mob)">
                            <NumberControl label="Ht (px)" value={value ?? 120} onChange={onChange} min={60} max={300} />
                        </Section>
                    ),
                },
                {
                    name: "showLeadExcerpt",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 1 Display">
                            <Toggle label="Show Excerpt" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                        </Section>
                    ),
                },
                {
                    name: "showTopSubExcerpt",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 2 Display">
                            <Toggle label="Show Excerpt" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                        </Section>
                    ),
                },
                {
                    name: "showBottomExcerpt",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 3 Display">
                            <Toggle label="Show Excerpt" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                        </Section>
                    ),
                },
                {
                    name: "showLeadCategory",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 1 Display">
                            <Toggle label="Show Category" value={value === "true"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                        </Section>
                    ),
                },
                {
                    name: "showTopSubCategory",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 2 Display">
                            <Toggle label="Show Category" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                        </Section>
                    ),
                },
                {
                    name: "showBottomCategory",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Sec 3 Display">
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
                    name: "leadBgColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Lead Box bg Color" defaultOpen>
                            <ColorPickerPopup label="Background Color" value={value ?? "#000000"} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "leadTitleColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Lead Box Title Color">
                            <ColorPickerPopup label="Title Color" value={value ?? "#fbbf24"} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "leadTextColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Lead Box Text Color">
                            <ColorPickerPopup label="Text Color" value={value ?? "#d1d5db"} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "titleColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Cards Title Color">
                            <ColorPickerPopup label="Color" value={value ?? ""} onChange={onChange} />
                        </Section>
                    ),
                },
            ],
        },
    ],

    render: (element: any) => <Kalbela9CanvasPreview element={element} />,
};

export default kalbela9Element;
