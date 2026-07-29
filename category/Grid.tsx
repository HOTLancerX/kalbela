'use client';

/**
 * Kalbela Category Grid 1 — Single column news post feed.
 *
 * Standalone grid component for Kalbela category layout.
 * Dynamic box resolution with KalbelaBox default fallback.
 * Inserts middle ad banners after every 3 consecutive posts.
 */

import { useEffect, useState } from 'react';
import { getHooks } from '@/hook';
import { useActivePlugins } from '@/hook/useActivePlugins';
import KalbelaBox from '../box/Box';
import Ads from '@/components/Ads';

interface Post {
    _id: string;
    title: string;
    slug: string;
    createdAt?: string;
    info: Record<string, string>;
}

interface KalbelaGridProps {
    posts: Post[];
    activeBox: { label: string; pluginNx: string } | null;
    postPrefix: string;
    gridClassName?: string;
    columnsDesktop?: number;
    columnsTablet?: number;
    columnsMobile?: number;
    gapDesktop?: number;
    gapTablet?: number;
    gapMobile?: number;
}

function buildUrl(prefix: string, slug: string): string {
    const p = prefix.trim().replace(/^\/+|\/+$/g, '');
    return p ? `/${p}/${slug}` : `/${slug}`;
}

export default function KalbelaGrid({
    posts,
    activeBox,
    postPrefix,
    gridClassName,
    columnsDesktop = 1,
    columnsTablet = 1,
    columnsMobile = 1,
    gapDesktop = 4,
    gapTablet = 3,
    gapMobile = 2,
}: KalbelaGridProps) {
    const activePlugins = useActivePlugins();
    const [BoxComponent, setBoxComponent] = useState<any>(null);

    const mobColsClass = Number(columnsMobile) || 1;
    const tabColsClass = Number(columnsTablet) || 1;
    const deskColsClass = Number(columnsDesktop) || 1;

    const mobGapClass = `gap-${gapMobile != null ? Number(gapMobile) : 2}`;
    const tabGapClass = `md:gap-${gapTablet != null ? Number(gapTablet) : 3}`;
    const deskGapClass = `lg:gap-${gapDesktop != null ? Number(gapDesktop) : 4}`;

    const computedGridClass =
        gridClassName ||
        `grid grid-cols-${mobColsClass} md:grid-cols-${tabColsClass} lg:grid-cols-${deskColsClass} ${mobGapClass} ${tabGapClass} ${deskGapClass} w-full`;

    useEffect(() => {
        if (activePlugins === null) return;

        const boxes = getHooks('root.pages').filter(
            (p) => p.type === 'blog-box' && p.slug === 'dynamic'
        );

        let match = null;
        if (activeBox) {
            match =
                boxes.find(
                    (b) => b.label === activeBox.label && b.pluginNx === activeBox.pluginNx
                )?.component ?? null;
        }
        if (!match) {
            match = (boxes.find((b) => b.active === true) ?? boxes[0])?.component ?? null;
        }

        setBoxComponent(() => match || KalbelaBox);
    }, [activePlugins, activeBox]);

    // Loading skeleton
    if (activePlugins === null) {
        return (
            <div className={computedGridClass}>
                {Array.from({ length: Math.min(posts.length || 5, 5) }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-lg border border-gray-100 p-3 flex flex-col sm:flex-row gap-4 animate-pulse"
                    >
                        <div className="w-full sm:w-52 md:w-64 aspect-video sm:aspect-4/3 bg-gray-100 rounded-lg shrink-0" />
                        <div className="flex-1 space-y-3 py-2">
                            <div className="h-5 bg-gray-100 rounded w-4/5" />
                            <div className="h-4 bg-gray-100 rounded w-full" />
                            <div className="h-4 bg-gray-100 rounded w-2/3" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="text-center py-16 text-gray-400 bg-white rounded-lg border border-gray-100">
                <p className="text-4xl mb-3">📝</p>
                <p className="text-base font-medium text-gray-600">No posts in this category yet.</p>
            </div>
        );
    }

    const CardComponent = BoxComponent || KalbelaBox;

    return (
        <div className={computedGridClass}>
            {posts.map((post, idx) => (
                <div key={post._id || idx} className="space-y-4">
                    <CardComponent
                        data={post}
                        postUrl={buildUrl(postPrefix, post.slug)}
                    />
                    {/* Insert Middle Ad banner after every 3 consecutive posts */}
                    {(idx + 1) % 3 === 0 && (
                        <div className="py-2">
                            <Ads type="category" slot="middle" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
