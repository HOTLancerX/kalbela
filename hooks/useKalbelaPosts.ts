"use client";

import { useState, useEffect } from "react";
import { xFetch } from "@/lib/express";
import { Tab, TabPost } from "../lib/types";

export function useKalbelaPosts(categoryIds: string[] = [], limit: number = 7) {
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [postsByCategory, setPostsByCategory] = useState<Record<string, TabPost[]>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        xFetch("/builder-post/cats?type=blog-category")
            .then((r) => r.json())
            .then(async (data) => {
                const allCats: { _id: string; title: string; slug: string }[] = data.cats ?? [];
                const orderedTabs: Tab[] = categoryIds.length
                    ? categoryIds.map((id) => allCats.find((cat) => cat._id === id)).filter(Boolean).map((cat) => ({ _id: cat!._id, title: cat!.title, url: `/${cat!.slug}` }))
                    : allCats.map((cat) => ({ _id: cat._id, title: cat.title, url: `/${cat.slug}` }));

                setTabs(orderedTabs);
                const safeLimit = Math.min(Math.max(1, Number(limit) || 6), 50);
                const results = await Promise.all(
                    orderedTabs.map((tab) => {
                        const params = new URLSearchParams({ type: "blog", limit: String(safeLimit), cats: tab._id });
                        return xFetch(`/builder-post?${params}`)
                            .then((r) => r.json())
                            .then((d) => ({
                                id: tab._id,
                                posts: ((d.posts ?? []) as any[]).slice(0, safeLimit).map((p): TabPost => ({
                                    _id: p._id,
                                    title: p.title,
                                    slug: p.slug,
                                    postUrl: p.postUrl,
                                    categoryTitle: p.categoryTitle,
                                    categoryUrl: p.categoryUrl,
                                    createdAt: p.createdAt,
                                    image: p.info?.image ?? "",
                                    excerpt: p.info?.excerpt ?? "",
                                })),
                            }))
                            .catch(() => ({ id: tab._id, posts: [] as TabPost[] }));
                    })
                );

                const map: Record<string, TabPost[]> = {};
                for (const { id, posts } of results) map[id] = posts;
                setPostsByCategory(map);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [JSON.stringify(categoryIds), limit]);

    return { tabs, postsByCategory, loading };
}
