/**
 * plugin/kalbela/lib/builderData.tsx
 *
 * SERVER-ONLY. Registers server-side renderers for kalbela elements 1 through 14.
 */

import { registerBuilderElement } from "@/hook/builderDataHooks";
import { fetchEnrichedBuilderData } from "@/lib/builderDataEngine";
import { KalbelaUI } from "../elements/kalbela";
import { Kalbela1UI } from "../elements/kalbela1";
import { Kalbela2UI } from "../elements/kalbela2";
import { Kalbela3UI } from "../elements/kalbela3";
import { Kalbela4UI } from "../elements/kalbela4";
import { Kalbela5UI } from "../elements/kalbela5";
import { Kalbela6UI } from "../elements/kalbela6";
import { Kalbela7UI } from "../elements/kalbela7";
import { Kalbela8UI } from "../elements/kalbela8";
import { Kalbela9UI } from "../elements/kalbela9";
import { Kalbela10UI } from "../elements/kalbela10";
import { Kalbela11UI } from "../elements/kalbela11";
import { Kalbela12UI } from "../elements/kalbela12";
import { Kalbela13UI } from "../elements/kalbela13";
import { Kalbela14UI } from "../elements/kalbela14";
import { TitleUI } from "../elements/title";

async function getEnrichedData(categoryIds?: string[], limit: number = 12) {
    try {
        const res = await fetchEnrichedBuilderData({
            categoryIds: categoryIds ?? [],
            limit,
        });
        return { tabs: res.tabs ?? [], postsByCategory: res.postsByCategory ?? {} };
    } catch {
        return { tabs: [], postsByCategory: {} };
    }
}

function filterPostsByLimit(postsByCategory?: Record<string, any[]>, limit?: number) {
    if (!postsByCategory || !limit) return postsByCategory ?? {};
    const result: Record<string, any[]> = {};
    for (const catId in postsByCategory) {
        result[catId] = (postsByCategory[catId] ?? []).slice(0, Number(limit));
    }
    return result;
}

function getCategoryTabs(rawDataTabs: any[], categoryIds?: string[]) {
    if (!categoryIds || !Array.isArray(categoryIds) || categoryIds.length === 0) {
        return rawDataTabs ?? [];
    }
    return categoryIds
        .map((id: string) => rawDataTabs.find((t: any) => t._id === id))
        .filter(Boolean);
}

// Register kalbela (Breaking News Ticker)
registerBuilderElement("kalbela", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 10;
    const rawData = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));
    const postsByCategory = filterPostsByLimit(rawData.postsByCategory, limit);

    const combined = Object.values(postsByCategory).flat() as any[];
    const uniqueMap = new Map<string, any>();
    combined.forEach((p) => {
        if (p?._id && !uniqueMap.has(p._id)) uniqueMap.set(p._id, p);
    });
    const posts = Array.from(uniqueMap.values()).sort((a, b) => {
        const parseDate = (v: any) => { if (!v) return 0; const t = new Date(v).getTime(); return isNaN(t) ? 0 : t; };
        return parseDate(b.createdAt) - parseDate(a.createdAt);
    }).slice(0, limit);

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
});

// Register kalbela-1
registerBuilderElement("kalbela-1", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 7;
    const rawData = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));
    const postsByCategory = filterPostsByLimit(rawData.postsByCategory, limit);
    const tabs = getCategoryTabs(rawData.tabs, c.categoryIds);

    return (
        <Kalbela1UI
            title={c.title ?? ""}
            categoryIds={c.categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            columnsDesktop={Number(c.columnsDesktop) || 3}
            columnsTablet={Number(c.columnsTablet) || 3}
            columnsMobile={Number(c.columnsMobile) || 1}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                title: s.titleColor || "",
            }}
            showCategory={c.showCategory !== "false"}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
});

// Register kalbela-2
registerBuilderElement("kalbela-2", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 6;
    const rawData = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));
    const postsByCategory = filterPostsByLimit(rawData.postsByCategory, limit);
    const tabs = getCategoryTabs(rawData.tabs, c.categoryIds);

    return (
        <Kalbela2UI
            title={c.title ?? ""}
            categoryIds={c.categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            imagePosition={c.imagePosition || "left"}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                title: s.titleColor || "",
            }}
            showCategory={c.showCategory !== "false"}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
});

// Register kalbela-3
registerBuilderElement("kalbela-3", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 8;
    const rawData = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));
    const postsByCategory = filterPostsByLimit(rawData.postsByCategory, limit);
    const tabs = getCategoryTabs(rawData.tabs, c.categoryIds);

    return (
        <Kalbela3UI
            title={c.title ?? ""}
            categoryIds={c.categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            columnsDesktop={Number(c.columnsDesktop) || 4}
            columnsTablet={Number(c.columnsTablet) || 3}
            columnsMobile={Number(c.columnsMobile) || 1}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                title: s.titleColor || "",
            }}
            showPlayButton={c.showPlayButton !== "false"}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
});

// Register kalbela-4
registerBuilderElement("kalbela-4", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 9;
    const rawData = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));
    const postsByCategory = filterPostsByLimit(rawData.postsByCategory, limit);
    const tabs = getCategoryTabs(rawData.tabs, c.categoryIds);

    return (
        <Kalbela4UI
            title={c.title ?? ""}
            categoryIds={c.categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            itemsPerSlide={Number(c.itemsPerSlide) || 3}
            excerptLimit={Number(c.excerptLimit) || 120}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                title: s.titleColor || "",
                cardBg: s.cardBgColor || "#fefce8",
                borderColor: s.borderColor || "#dc2626",
            }}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
});

// Register kalbela-5
registerBuilderElement("kalbela-5", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 6;
    const rawData = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));
    const postsByCategory = filterPostsByLimit(rawData.postsByCategory, limit);
    const tabs = getCategoryTabs(rawData.tabs, c.categoryIds);

    return (
        <Kalbela5UI
            title={c.title ?? ""}
            categoryIds={c.categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            columnsDesktop={Number(c.columnsDesktop) || 3}
            columnsTablet={Number(c.columnsTablet) || 2}
            columnsMobile={Number(c.columnsMobile) || 1}
            imageHeightDesktop={Number(c.imageHeightDesktop) || 200}
            imageHeightMobile={Number(c.imageHeightMobile) || 160}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                title: s.titleColor || "",
            }}
            showCategory={c.showCategory !== "false"}
            showExcerpt={c.showExcerpt !== "false"}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
});

// Register kalbela-6
registerBuilderElement("kalbela-6", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 11;
    const rawData = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));
    const postsByCategory = filterPostsByLimit(rawData.postsByCategory, limit);
    const tabs = getCategoryTabs(rawData.tabs, c.categoryIds);

    return (
        <Kalbela6UI
            title={c.title ?? ""}
            categoryIds={c.categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            columnsDesktop={Number(c.columnsDesktop) || 3}
            columnsTablet={Number(c.columnsTablet) || 2}
            columnsMobile={Number(c.columnsMobile) || 1}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                title: s.titleColor || "",
            }}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
});

// Register kalbela-7
registerBuilderElement("kalbela-7", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 7;
    const rawData = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));
    const postsByCategory = filterPostsByLimit(rawData.postsByCategory, limit);
    const tabs = getCategoryTabs(rawData.tabs, c.categoryIds);

    return (
        <Kalbela7UI
            title={c.title ?? ""}
            categoryIds={c.categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            columnsDesktop={Number(c.columnsDesktop) || 3}
            columnsTablet={Number(c.columnsTablet) || 2}
            columnsMobile={Number(c.columnsMobile) || 1}
            leadImageHeightDesktop={Number(c.leadImageHeightDesktop) || 320}
            leadImageHeightMobile={Number(c.leadImageHeightMobile) || 220}
            subImageHeightDesktop={Number(c.subImageHeightDesktop) || 180}
            subImageHeightMobile={Number(c.subImageHeightMobile) || 140}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                title: s.titleColor || "",
            }}
            showCategory={c.showCategory !== "false"}
            showExcerpt={c.showExcerpt !== "false"}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
});

// Register kalbela-8
registerBuilderElement("kalbela-8", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 5;
    const rawData = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));
    const postsByCategory = filterPostsByLimit(rawData.postsByCategory, limit);
    const tabs = getCategoryTabs(rawData.tabs, c.categoryIds);

    return (
        <Kalbela8UI
            title={c.title ?? ""}
            categoryIds={c.categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            leadCount={Number(c.leadCount) || 2}
            leftImagePosition={c.leftImagePosition || "left"}
            rightImagePosition={c.rightImagePosition || "right"}
            leadImageHeightDesktop={Number(c.leadImageHeightDesktop) || 200}
            leadImageHeightMobile={Number(c.leadImageHeightMobile) || 160}
            subImageHeightDesktop={Number(c.subImageHeightDesktop) || 80}
            subImageHeightMobile={Number(c.subImageHeightMobile) || 64}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                title: s.titleColor || "",
            }}
            showExcerpt={c.showExcerpt !== "false"}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
});

// Register kalbela-9
registerBuilderElement("kalbela-9", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 7;
    const rawData = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));
    const postsByCategory = filterPostsByLimit(rawData.postsByCategory, limit);
    const tabs = getCategoryTabs(rawData.tabs, c.categoryIds);

    return (
        <Kalbela9UI
            title={c.title ?? ""}
            categoryIds={c.categoryIds}
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
                title: s.titleColor || "",
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
});

// Register kalbela-10
registerBuilderElement("kalbela-10", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 7;
    const rawData = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));
    const postsByCategory = filterPostsByLimit(rawData.postsByCategory, limit);
    const tabs = getCategoryTabs(rawData.tabs, c.categoryIds);

    return (
        <Kalbela10UI
            title={c.title ?? ""}
            categoryIds={c.categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            topCount={Number(c.topCount) || 3}
            topColumnsDesktop={Number(c.topColumnsDesktop) || 3}
            topColumnsTablet={Number(c.topColumnsTablet) || 2}
            topColumnsMobile={Number(c.topColumnsMobile) || 1}
            bottomColumnsDesktop={Number(c.bottomColumnsDesktop) || 4}
            bottomColumnsTablet={Number(c.bottomColumnsTablet) || 2}
            bottomColumnsMobile={Number(c.bottomColumnsMobile) || 1}
            topImageHeightDesktop={Number(c.topImageHeightDesktop) || 200}
            topImageHeightMobile={Number(c.topImageHeightMobile) || 160}
            bottomImageHeightDesktop={Number(c.bottomImageHeightDesktop) || 160}
            bottomImageHeightMobile={Number(c.bottomImageHeightMobile) || 120}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                title: s.titleColor || "",
            }}
            showTopExcerpt={c.showTopExcerpt !== "false"}
            showTopCategory={c.showTopCategory !== "false"}
            showBottomExcerpt={c.showBottomExcerpt !== "false"}
            showBottomCategory={c.showBottomCategory !== "false"}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
});

// Register kalbela-11
registerBuilderElement("kalbela-11", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 5;
    const rawData = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));
    const postsByCategory = filterPostsByLimit(rawData.postsByCategory, limit);
    const tabs = getCategoryTabs(rawData.tabs, c.categoryIds);

    return (
        <Kalbela11UI
            title={c.title ?? ""}
            categoryIds={c.categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            leftCount={Number(c.leftCount) || 2}
            leftColumnsDesktop={Number(c.leftColumnsDesktop) || 1}
            leftColumnsTablet={Number(c.leftColumnsTablet) || 1}
            leftColumnsMobile={Number(c.leftColumnsMobile) || 1}
            rightColumnsDesktop={Number(c.rightColumnsDesktop) || 1}
            rightColumnsTablet={Number(c.rightColumnsTablet) || 1}
            rightColumnsMobile={Number(c.rightColumnsMobile) || 1}
            centerImageHeightDesktop={Number(c.centerImageHeightDesktop) || 320}
            centerImageHeightMobile={Number(c.centerImageHeightMobile) || 220}
            leftImageHeightDesktop={Number(c.leftImageHeightDesktop) || 180}
            leftImageHeightMobile={Number(c.leftImageHeightMobile) || 140}
            rightImageHeightDesktop={Number(c.rightImageHeightDesktop) || 180}
            rightImageHeightMobile={Number(c.rightImageHeightMobile) || 140}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                title: s.titleColor || "",
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
});

// Register kalbela-12
registerBuilderElement("kalbela-12", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 8;
    const rawData = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));
    const postsByCategory = filterPostsByLimit(rawData.postsByCategory, limit);
    const tabs = getCategoryTabs(rawData.tabs, c.categoryIds);

    return (
        <Kalbela12UI
            title={c.title ?? ""}
            categoryIds={c.categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                title: s.titleColor || "",
            }}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
});

// Register kalbela-13
registerBuilderElement("kalbela-13", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 8;
    const rawData = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));
    const postsByCategory = filterPostsByLimit(rawData.postsByCategory, limit);
    const tabs = getCategoryTabs(rawData.tabs, c.categoryIds);

    return (
        <Kalbela13UI
            title={c.title ?? ""}
            categoryIds={c.categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            columnsDesktop={Number(c.columnsDesktop) || 4}
            columnsTablet={Number(c.columnsTablet) || 2}
            columnsMobile={Number(c.columnsMobile) || 1}
            imageHeightDesktop={Number(c.imageHeightDesktop) || 240}
            imageHeightMobile={Number(c.imageHeightMobile) || 180}
            showCategory={c.showCategory !== "false"}
            showExcerpt={c.showExcerpt === "true"}
            showGalleryIcon={c.showGalleryIcon !== "false"}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                title: s.titleColor || "",
                overlayTitleColor: s.overlayTitleColor || "#ffffff",
            }}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
});

// Register kalbela-14
registerBuilderElement("kalbela-14", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 8;
    const rawData = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));
    const postsByCategory = filterPostsByLimit(rawData.postsByCategory, limit);
    const tabs = getCategoryTabs(rawData.tabs, c.categoryIds);

    return (
        <Kalbela14UI
            title={c.title ?? ""}
            categoryIds={c.categoryIds}
            tabs={tabs}
            postsByCategory={postsByCategory}
            limit={limit}
            columnsDesktop={Number(c.columnsDesktop) || 4}
            columnsTablet={Number(c.columnsTablet) || 2}
            columnsMobile={Number(c.columnsMobile) || 1}
            imageHeightDesktop={Number(c.imageHeightDesktop) || 240}
            imageHeightMobile={Number(c.imageHeightMobile) || 180}
            showCategory={c.showCategory !== "false"}
            showExcerpt={c.showExcerpt === "true"}
            showGalleryIcon={c.showGalleryIcon !== "false"}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                title: s.titleColor || "",
                overlayTitleColor: s.overlayTitleColor || "#ffffff",
            }}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
});

// Register kalbela-title
registerBuilderElement("kalbela-title", async (schema) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };

    return (
        <TitleUI
            title={c.title ?? "বাছাইকৃত"}
            showTitle={c.showTitle !== "false"}
            showLeftMedia={c.showLeftMedia !== "false"}
            leftMediaType={c.leftMediaType ?? "icon"}
            leftIcon1={c.leftIcon1 ?? "solar:document-text-bold"}
            leftIcon2={c.leftIcon2 ?? "solar:fire-bold"}
            leftImage={c.leftImage ?? ""}
            showRightSide={c.showRightSide !== "false"}
            showRightText={c.showRightText === "true"}
            showRightIcon={c.showRightIcon !== "false"}
            rightLinkText={c.rightLinkText ?? ""}
            rightLinkUrl={c.rightLinkUrl ?? "#"}
            rightIcon={c.rightIcon ?? "solar:alt-arrow-right-circle-bold"}
            showBorder={c.showBorder !== "false"}
            borderThickness={Number(s.borderThickness) || 3}
            borderStyle={s.borderStyle ?? "solid"}
            borderColor={s.borderColor || "#000000"}
            borderGap={Number(s.borderGap) || 8}
            titleColor={s.titleColor || "#000000"}
            titleFontSize={Number(s.titleFontSize) || 20}
            titleFontWeight={s.titleFontWeight || "700"}
            leftIcon1Color={s.leftIcon1Color || "#ffffff"}
            leftIcon1Bg={s.leftIcon1Bg || "#dc2626"}
            leftIcon1Size={Number(s.leftIcon1Size) || 16}
            leftIcon2Color={s.leftIcon2Color || "#dc2626"}
            leftIcon2Bg={s.leftIcon2Bg || ""}
            leftIcon2Size={Number(s.leftIcon2Size) || 18}
            leftImageWidth={Number(s.leftImageWidth) || 24}
            leftImageHeight={Number(s.leftImageHeight) || 24}
            rightTextColor={s.rightTextColor || "#111827"}
            rightIconColor={s.rightIconColor || "#000000"}
            rightIconSize={Number(s.rightIconSize) || 24}
        />
    );
});
