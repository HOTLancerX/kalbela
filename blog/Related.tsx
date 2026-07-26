'use client';

/**
 * Kalbela Blog Related Posts Component — Related.tsx
 *
 * Displays related category posts using whichever blog-box template remains active.
 */

import { useEffect, useState } from 'react';
import { getHooks } from '@/hook';
import { useActivePlugins } from '@/hook/useActivePlugins';
import KalbelaBoxs from '../box/Boxs';

interface Post {
    _id: string;
    title: string;
    slug: string;
    status: string;
    createdAt?: string;
    info: Record<string, string>;
}

interface KalbelaRelatedProps {
    posts: Post[];
    activeBox?: { label: string; pluginNx: string } | null;
    postPrefix: string;
}

function buildUrl(prefix: string, slug: string): string {
    const p = prefix.trim().replace(/^\/+|\/+$/g, '');
    return p ? `/${p}/${slug}` : `/${slug}`;
}

export default function KalbelaRelated({
    posts,
    activeBox,
    postPrefix,
}: KalbelaRelatedProps) {
    const activePlugins = useActivePlugins();
    const [BoxComponent, setBoxComponent] = useState<any>(null);

    useEffect(() => {
        if (activePlugins === null) return;

        const boxes = getHooks('root.pages').filter(
            (p) => p.type === 'blog-related' && p.slug === 'dynamic'
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

        setBoxComponent(() => match || KalbelaBoxs);
    }, [activePlugins, activeBox]);

    if (!posts || posts.length === 0) return null;

    const CardComponent = BoxComponent || KalbelaBoxs;

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2.5 h-5 bg-emerald-700 rounded-xs inline-block" />
                Related Posts
            </h2>

            <div className="grid grid-cols-1 gap-4">
                {posts.map((post) => (
                    <CardComponent
                        key={post._id}
                        data={post}
                        postUrl={buildUrl(postPrefix, post.slug)}
                    />
                ))}
            </div>
        </div>
    );
}
