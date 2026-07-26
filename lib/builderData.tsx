/**
 * plugin/kalbela/lib/builderData.tsx
 *
 * SERVER-ONLY. Registers server-side renderers for kalbela elements 1 through 14.
 */

import { registerBuilderElement } from "@/hook/builderDataHooks";
import { fetchEnrichedBuilderData } from "@/lib/builderDataEngine";
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

// Register kalbela-1
registerBuilderElement("kalbela-1", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 7;
    const { tabs, postsByCategory } = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));

    return (
        <Kalbela1UI
            title={c.title ?? ""}
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
    const { tabs, postsByCategory } = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));

    return (
        <Kalbela2UI
            title={c.title ?? ""}
            tabs={tabs}
            postsByCategory={postsByCategory}
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
    const { tabs, postsByCategory } = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));

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
    const { tabs, postsByCategory } = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));

    return (
        <Kalbela4UI
            title={c.title ?? ""}
            tabs={tabs}
            postsByCategory={postsByCategory}
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
    const { tabs, postsByCategory } = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));

    return (
        <Kalbela5UI
            title={c.title ?? ""}
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
    const { tabs, postsByCategory } = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));

    return (
        <Kalbela6UI
            title={c.title ?? ""}
            tabs={tabs}
            postsByCategory={postsByCategory}
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
    const { tabs, postsByCategory } = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));

    return (
        <Kalbela7UI
            title={c.title ?? ""}
            tabs={tabs}
            postsByCategory={postsByCategory}
            columnsDesktop={Number(c.columnsDesktop) || 3}
            columnsTablet={Number(c.columnsTablet) || 2}
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

// Register kalbela-8
registerBuilderElement("kalbela-8", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 5;
    const { tabs, postsByCategory } = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));

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
                title: s.titleColor || "",
            }}
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
    const { tabs, postsByCategory } = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));

    return (
        <Kalbela9UI
            title={c.title ?? ""}
            tabs={tabs}
            postsByCategory={postsByCategory}
            columnsDesktop={Number(c.columnsDesktop) || 4}
            columnsTablet={Number(c.columnsTablet) || 2}
            columnsMobile={Number(c.columnsMobile) || 1}
            colors={{
                active: s.activeTabColor || "#2563eb",
                activeText: s.activeTabTextColor || "#ffffff",
                title: s.titleColor || "",
                leadBg: s.leadBgColor || "#000000",
                leadTitle: s.leadTitleColor || "#fbbf24",
                leadText: s.leadTextColor || "#d1d5db",
            }}
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
    const { tabs, postsByCategory } = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));

    return (
        <Kalbela10UI
            title={c.title ?? ""}
            tabs={tabs}
            postsByCategory={postsByCategory}
            topCount={Number(c.topCount) || 3}
            topColumnsDesktop={Number(c.topColumnsDesktop) || 3}
            topColumnsTablet={Number(c.topColumnsTablet) || 2}
            topColumnsMobile={Number(c.topColumnsMobile) || 1}
            bottomColumnsDesktop={Number(c.bottomColumnsDesktop) || 4}
            bottomColumnsTablet={Number(c.bottomColumnsTablet) || 2}
            bottomColumnsMobile={Number(c.bottomColumnsMobile) || 1}
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

// Register kalbela-11
registerBuilderElement("kalbela-11", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 5;
    const { tabs, postsByCategory } = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));

    return (
        <Kalbela11UI
            title={c.title ?? ""}
            tabs={tabs}
            postsByCategory={postsByCategory}
            leftCount={Number(c.leftCount) || 2}
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

// Register kalbela-12
registerBuilderElement("kalbela-12", async (schema, data) => {
    const c = { ...schema?.schema?.content, ...schema?.content };
    const s = { ...schema?.schema?.style, ...schema?.style };
    const limit = c.limit ? Number(c.limit) : 8;
    const { tabs, postsByCategory } = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));

    return (
        <Kalbela12UI
            title={c.title ?? ""}
            tabs={tabs}
            postsByCategory={postsByCategory}
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
    const { tabs, postsByCategory } = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));

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
                title: s.titleColor || "",
                overlayTitleColor: s.overlayTitleColor || "#fbbf24",
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
    const { tabs, postsByCategory } = data?.builderContext ?? (await getEnrichedData(c.categoryIds, limit));

    return (
        <Kalbela14UI
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
                title: s.titleColor || "",
                overlayTitleColor: s.overlayTitleColor || "#fbbf24",
            }}
            showDate={c.showDate !== "false"}
            showLink={c.showLink !== "false"}
        />
    );
});
