'use client';

/**
 * Kalbela Blog Latest — Tabbed Latest & Popular news posts widget.
 *
 * Fetches posts directly from database via `/api/blog/latest-popular`.
 * Displays item index numbers, tabbed navigation, and bottom "সর্বশেষ সব খবর" button.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PostItem {
    _id: string;
    title: string;
    slug: string;
    postUrl: string;
    createdAt?: string;
}

interface LatestProps {
    latest?: string;
    popular?: string;
    total?: number;
    postPrefix?: string;
}

export default function Latest({
    latest = 'সর্বশেষ',
    popular = 'জনপ্রিয়',
    total = 15,
}: LatestProps) {
    const [activeTab, setActiveTab] = useState<'latest' | 'popular'>('latest');
    const [latestPosts, setLatestPosts] = useState<PostItem[]>([]);
    const [popularPosts, setPopularPosts] = useState<PostItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        fetch(`/api/blog/latest-popular?total=${total}`)
            .then((res) => res.json())
            .then((data) => {
                if (isMounted && data.success) {
                    setLatestPosts(data.latest || []);
                    setPopularPosts(data.popular || []);
                }
            })
            .catch((err) => {
                console.error('Error fetching latest/popular posts:', err);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [total]);

    const activeList = activeTab === 'latest' ? latestPosts : popularPosts;

    return (
        <div>
            {/* Tabs Header */}
            <div className="grid grid-cols-2 text-center">
                <button
                    type="button"
                    onClick={() => setActiveTab('latest')}
                    className={`relative p-2 font-medium text-base cursor-pointer transition-colors ${
                        activeTab === 'latest'
                            ? 'text-white bg-main'
                            : 'bg-white text-main'
                    }`}
                >
                    {latest}
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab('popular')}
                    className={`relative p-2 font-medium text-base cursor-pointer transition-colors ${
                        activeTab === 'popular'
                            ? 'text-white bg-main'
                            : 'bg-white text-main'
                    }`}
                >
                    {popular}
                </button>
            </div>

            {/* List Container */}
            <div className="bg-white p-2 space-y-0 divide-y divide-gray-100 max-h-145 overflow-y-auto pr-1">
                {loading ? (
                    // Skeleton Loaders
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 py-3 animate-pulse">
                            <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded-md w-full" />
                                <div className="h-4 bg-gray-200 rounded-md w-2/3" />
                            </div>
                        </div>
                    ))
                ) : activeList.length > 0 ? (
                    activeList.map((post, idx) => (
                        <div key={post._id || idx} className="flex items-center gap-3 py-3 group">
                            {/* Numeral Circle */}
                            <span className="w-9 h-9 rounded-full bg-gray-100 group-hover:bg-main group-hover:text-white text-gray-500 font-extrabold text-base flex items-center justify-center shrink-0 border border-gray-100">
                                {idx + 1}
                            </span>

                            {/* Title Link */}
                            <Link
                                href={post.postUrl || '#'}
                                className="font-bold text-gray-900 group-hover:text-main text-sm leading-snug line-clamp-2 transition-colors flex-1"
                            >
                                {post.title}
                            </Link>
                        </div>
                    ))
                ) : null}
            </div>
        </div>
    );
}
