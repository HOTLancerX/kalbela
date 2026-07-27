/**
 * Kalbela Blog Layout — Single blog post layout.
 *
 * Receives `data`, `settings`, `permalinkMap`, and `pageData` from slug page.
 * Implements Desktop 3-Column Layout:
 * - Left 25% (lg:col-span-3): user, category, date, related
 * - Center 50% (lg:col-span-6): title, images, description
 * - Right 25% (lg:col-span-3): empty column container
 */

import Link from 'next/link';
import { Icon } from '@iconify/react';
import KalbelaBlogDetails from './details';
import KalbelaRelated from './Related';
import Latest from './Latest';
import Ads from '@/components/Ads';

interface BlogPostProps {
    data: {
        _id: string;
        title: string;
        slug: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        userId?: string;
        info: Record<string, string>;
    };
    settings?: Record<string, any>;
    permalinkMap?: Record<string, string>;
    pageData?: {
        categoryAncestors?: { _id: string; title: string; slug: string }[];
        relatedPosts?: any[];
        author?: { _id?: string; name?: string; image?: string; slug?: string; type?: string } | null;
        activeBox?: any;
    };
}

function buildUrl(prefix: string, slug: string): string {
    const p = prefix.trim().replace(/^\/+|\/+$/g, '');
    return p ? `/${p}/${slug}` : `/${slug}`;
}

export default function KalbelaBlogLayout({
    data,
    settings = {},
    permalinkMap = {},
    pageData,
}: BlogPostProps) {
    const categoryAncestors = pageData?.categoryAncestors ?? [];
    const relatedPosts = pageData?.relatedPosts ?? [];

    const postPrefix = (permalinkMap['blog'] ?? 'blog').trim().replace(/^\/+|\/+$/g, '') || 'blog';
    const catPrefix = (permalinkMap['blog-category'] ?? 'blog/category')
        .trim()
        .replace(/^\/+|\/+$/g, '');

    const publishedAt = data.createdAt
        ? new Date(data.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : null;

    const author = pageData?.author || {
        name:
            data.info?.author ||
            data.info?.userName ||
            data.info?.reporter ||
            data.info?.authorName ||
            '',
        image: data.info?.authorImage || data.info?.userImage || '',
        type: data.info?.authorType || 'reporter',
    };

    return (
        <main className="min-h-screen py-8 space-y-6">
            {/* Single Page Top Ads */}
            <Ads type="single" slot="top" settings={settings} />

            <div className="container space-y-6">
                {/* Breadcrumb Navigation */}
                <nav
                    className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 bg-white p-3.5 rounded-lg border border-gray-100 shadow-2xs flex-wrap"
                    aria-label="breadcrumb"
                >
                    <Link href="/" className="hover:text-emerald-700 transition-colors flex items-center gap-1">
                        <Icon icon="solar:home-2-bold" width="14" height="14" />
                        Home
                    </Link>
                    {categoryAncestors.map((ancestor) => (
                        <span key={ancestor._id} className="flex items-center gap-1.5">
                            <span className="text-gray-300">›</span>
                            <Link
                                href={buildUrl(catPrefix, ancestor.slug)}
                                className="hover:text-emerald-700 transition-colors"
                            >
                                {ancestor.title}
                            </Link>
                        </span>
                    ))}
                    <span className="text-gray-300">›</span>
                    <span className="text-gray-900 font-semibold truncate max-w-50 sm:max-w-xs">
                        {data.title}
                    </span>
                </nav>

                {/* Main 3-Column Desktop Grid Layout (25% | 50% | 25%) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 md:gap-4 items-start">
                    {/* 25% Column: user, category, date, related */}
                    <div className="order-2 lg:order-1 lg:col-span-3 space-y-6">
                        {/* Single Page Left Top Ads */}
                        <Ads type="single" slot="leftTop" settings={settings} />

                        {/* User / Author Info */}
                        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-xs space-y-3">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Author
                            </h3>
                            <div className="flex items-center gap-3">
                                {author.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={author.image}
                                        alt={author.name || 'Author'}
                                        className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-2xs"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm border border-emerald-200">
                                        {(author.name || 'K').charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="overflow-hidden">
                                    <div className="font-bold text-gray-900 text-sm truncate">
                                        {author.name}
                                    </div>
                                    {author.type && (
                                        <div className="text-xs text-gray-500 capitalize">
                                            {author.type}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Category Info */}
                        {categoryAncestors.length > 0 && (
                            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-xs space-y-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <Icon icon="solar:folder-bold" className="text-emerald-700" width="14" height="14" />
                                    Category
                                </h3>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {categoryAncestors.map((cat) => (
                                        <Link
                                            key={cat._id}
                                            href={buildUrl(catPrefix, cat.slug)}
                                            className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-semibold text-xs transition-colors border border-emerald-100"
                                        >
                                            {cat.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Date Info */}
                        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-xs space-y-2">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                <Icon icon="solar:calendar-bold" className="text-emerald-700" width="14" height="14" />
                                Date
                            </h3>
                            <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                                {publishedAt && (
                                    <time className="font-medium text-gray-700">{publishedAt}</time>
                                )}
                                {data.status && (
                                    <span className="capitalize px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-[10px] border border-emerald-200">
                                        {data.status}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Related Posts */}
                        <KalbelaRelated
                            posts={relatedPosts}
                            postPrefix={postPrefix}
                            activeBox={(pageData as any)?.activeBox}
                        />

                        {/* Single Page Left Bottom Ads */}
                        <Ads type="single" slot="leftBottom" settings={settings} />
                    </div>

                    {/* 50% Column: title, images, description */}
                    <div className="order-1 lg:order-2 lg:col-span-6 space-y-6">
                        <div className="bg-white rounded-xl border border-gray-100 p-2 md:p-4 shadow-xs">
                            <KalbelaBlogDetails
                                data={data}
                                pageData={pageData}
                                permalinkMap={permalinkMap}
                            />
                        </div>
                    </div>

                    {/* 25% Column: Latest & Popular posts widget */}
                    <div className="order-3 lg:order-3 lg:col-span-3 self-stretch hidden md:block">
                        <div className="sticky top-10 space-y-6">
                            {/* Single Page Right Top Ads */}
                            <Ads type="single" slot="rightTop" settings={settings} />

                            <Latest latest="latest" popular="popular" total={15} postPrefix={postPrefix} />

                            {/* Single Page Right Bottom Ads */}
                            <Ads type="single" slot="rightBottom" settings={settings} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Single Page Bottom Ads */}
            <Ads type="single" slot="bottom" settings={settings} />
        </main>
    );
}
