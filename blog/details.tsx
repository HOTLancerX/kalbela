'use client';

/**
 * Kalbela Blog Details — Article body component.
 *
 * Renders single news post content, author user info (name & avatar image), featured image, and description.
 */

import Link from 'next/link';
import { Icon } from '@iconify/react';

interface KalbelaBlogDetailsProps {
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
    pageData?: {
        categoryAncestors?: { _id: string; title: string; slug: string }[];
        author?: { _id?: string; name?: string; image?: string; slug?: string; type?: string } | null;
    };
    permalinkMap?: Record<string, string>;
}

function buildUrl(prefix: string, slug: string): string {
    const p = prefix.trim().replace(/^\/+|\/+$/g, '');
    return p ? `/${p}/${slug}` : `/${slug}`;
}

export default function KalbelaBlogDetails({
    data,
    pageData,
    permalinkMap = {},
}: KalbelaBlogDetailsProps) {
    const publishedAt = data.createdAt
        ? new Date(data.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : null;

    const image = data.info?.images
        ? (() => {
              try {
                  const a = JSON.parse(data.info.images);
                  return Array.isArray(a) ? a[0] : '';
              } catch {
                  return data.info.images;
              }
          })()
        : '';

    const description = data.info?.description || data.info?.shortDescription || '';
    const categoryAncestors = pageData?.categoryAncestors ?? [];

    // Fallback author resolution from pageData or data.info
    const author = pageData?.author || {
        name:
            data.info?.author ||
            data.info?.userName ||
            data.info?.reporter ||
            data.info?.authorName ||
            'কালবেলা ডেস্ক',
        image: data.info?.authorImage || data.info?.userImage || '',
        type: 'reporter',
    };

    const catPrefix = (permalinkMap['blog-category'] ?? 'blog/category')
        .trim()
        .replace(/^\/+|\/+$/g, '');

    return (
        <article className="space-y-6">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                {data.title}
            </h1>

            {/* Meta info bar with Author (Name & Image) */}
            <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 pb-4 border-b border-gray-200 flex-wrap">
                {/* Posting User Author Avatar & Name */}
                <div className="flex items-center gap-2 pr-3 border-r border-gray-200">
                    {author.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={author.image}
                            alt={author.name || 'Author'}
                            className="w-7 h-7 rounded-full object-cover border border-gray-200 shadow-2xs"
                        />
                    ) : (
                        <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-200">
                            {(author.name || 'K').charAt(0).toUpperCase()}
                        </div>
                    )}
                    <span className="font-semibold text-gray-900 text-xs sm:text-sm">
                        {author.name}
                    </span>
                </div>

                {categoryAncestors.length > 0 && (
                    <span className="flex items-center gap-1.5">
                        <Icon icon="solar:folder-bold" className="text-emerald-700" width="16" height="16" />
                        <Link
                            href={buildUrl(catPrefix, categoryAncestors[categoryAncestors.length - 1].slug)}
                            className="font-semibold text-emerald-800 hover:underline"
                        >
                            {categoryAncestors[categoryAncestors.length - 1].title}
                        </Link>
                    </span>
                )}

                {publishedAt && (
                    <span className="flex items-center gap-1.5">
                        <Icon icon="solar:calendar-bold" width="15" height="15" />
                        <time>{publishedAt}</time>
                    </span>
                )}

                <span className="capitalize px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-medium text-xs border border-emerald-200">
                    {data.status}
                </span>
            </div>

            {/* Featured Image */}
            {image && (
                <div className="rounded-xl overflow-hidden aspect-video bg-gray-100 shadow-xs border border-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt={data.title} className="w-full h-full object-cover" />
                </div>
            )}

            {/* Description / Content Body */}
            {description ? (
                <div
                    className="prose prose-lg max-w-none text-gray-800 leading-relaxed description space-y-4"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            ) : (
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 text-gray-400 text-sm italic text-center">
                    পোস্টের মূল বিস্তারিত বিষয়বস্তু এখানে প্রদর্শিত হবে।
                </div>
            )}
        </article>
    );
}
