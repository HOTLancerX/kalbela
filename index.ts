/**
 * plugin/kalbela/index.ts — Kalbela News plugin (Single-File Element Architecture).
 */

import { addBuilderElement, addHook, type PluginMeta } from "@/hook";
import kalbelaElement from "@/plugin/kalbela/elements/kalbela";
import kalbela1Element from "@/plugin/kalbela/elements/kalbela1";
import kalbela2Element from "@/plugin/kalbela/elements/kalbela2";
import kalbela3Element from "@/plugin/kalbela/elements/kalbela3";
import kalbela4Element from "@/plugin/kalbela/elements/kalbela4";
import kalbela5Element from "@/plugin/kalbela/elements/kalbela5";
import kalbela6Element from "@/plugin/kalbela/elements/kalbela6";
import kalbela7Element from "@/plugin/kalbela/elements/kalbela7";
import kalbela8Element from "@/plugin/kalbela/elements/kalbela8";
import kalbela9Element from "@/plugin/kalbela/elements/kalbela9";
import kalbela10Element from "@/plugin/kalbela/elements/kalbela10";
import kalbela11Element from "@/plugin/kalbela/elements/kalbela11";
import kalbela12Element from "@/plugin/kalbela/elements/kalbela12";
import kalbela13Element from "@/plugin/kalbela/elements/kalbela13";
import kalbela14Element from "@/plugin/kalbela/elements/kalbela14";
import titleElement from "@/plugin/kalbela/elements/title";
import Headerkb from "./header/Header";
import Footerkb from "./footer/Footer";
import KalbelaBox from "./box/Box";
import KalbelaBoxs from "./box/Boxs";
import KalbelaCategoryLayout from "./category/Layout";
import KalbelaBlogLayout from "./blog/Layout";
import kalbelaDataDump from "./data/file.json";


export const PLUGINS: PluginMeta = {
    nx: "com.system.kalbela",
    name: "kalbela",
    version: "1.0.0",
    description: "Single-file Kalbela news elements with dynamic server SSR & canvas preview.",
    author: "System",
    path: "https://github.com/HOTLancerX/kalbela.git",
    icon: "solar:sun-bold",
    color: "from-emerald-600 to-teal-700",
};

export function register() {
    addHook("root.pages", [
        {
            key: "headerkb",
            label: "Header",
            type: "header",
            slug: "layout",
            style: "left",
            position: 10,
            active: true,           // first-boot default
            component: Headerkb,
        },
        {
            key: "footerkb",
            label: "Footer",
            type: "footer",
            slug: "layout",
            style: "left",
            position: 10,
            active: true,
            component: Footerkb,
        },
        {
            key: "blog-box",
            label: "Kalbela Box",
            type: "blog-box",
            slug: "dynamic",
            style: "left",
            position: 40,
            active: true,
            component: KalbelaBox,
        },
        {
            key: "blog-related",
            label: "Kalbela Related",
            type: "blog-related",
            slug: "dynamic",
            style: "left",
            position: 40,
            active: true,
            component: KalbelaBoxs,
        },
        {
            key: "blog-category",
            label: "Kalbela Category",
            type: "blog-category",
            slug: "dynamic",
            style: "left",
            position: 40,
            active: true,
            component: KalbelaCategoryLayout,
        },
        {
            key: "blog",
            label: "Kalbela Blog",
            type: "blog",
            slug: "dynamic",
            style: "left",
            position: 40,
            active: true,
            component: KalbelaBlogLayout,
        },
    ], PLUGINS.nx);

    addBuilderElement(kalbelaElement, PLUGINS.nx);
    addBuilderElement(kalbela1Element, PLUGINS.nx);
    addBuilderElement(kalbela2Element, PLUGINS.nx);
    addBuilderElement(kalbela3Element, PLUGINS.nx);
    addBuilderElement(kalbela4Element, PLUGINS.nx);
    addBuilderElement(kalbela5Element, PLUGINS.nx);
    addBuilderElement(kalbela6Element, PLUGINS.nx);
    addBuilderElement(kalbela7Element, PLUGINS.nx);
    addBuilderElement(kalbela8Element, PLUGINS.nx);
    addBuilderElement(kalbela9Element, PLUGINS.nx);
    addBuilderElement(kalbela10Element, PLUGINS.nx);
    addBuilderElement(kalbela11Element, PLUGINS.nx);
    addBuilderElement(kalbela12Element, PLUGINS.nx);
    addBuilderElement(kalbela13Element, PLUGINS.nx);
    addBuilderElement(kalbela14Element, PLUGINS.nx);
    addBuilderElement(titleElement, PLUGINS.nx);

    // ─── Data Input Hook ──────────────────────────────────────────────────────
    addHook("data.input", [
        {
            key: "kalbela-data-dump",
            name: "Kalbela News Dataset",
            filePath: "../plugin/kalbela/data/file.json",
            icon: "solar:document-text-bold",
            locationIcon: "solar:folder-path-bold-duotone",
            description: "Default categories, news posts, post_info and layout settings dataset for Kalbela plugin.",
            data: kalbelaDataDump,
        },
    ], PLUGINS.nx);
}