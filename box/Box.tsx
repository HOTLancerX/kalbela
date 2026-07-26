'use client';

/**
 * Kalbela Blog Box — News item style.
 *
 * Horizontal layout: rounded image thumbnail on the left, bold blue title & excerpt on the right.
 * Registered as type "blog-box" in the Template manager.
 *
 * Props:
 *   data    — post + info map (same shape as the full blog page layout)
 *   postUrl — full URL to the post page (built from permalink prefix)
 */

import Link from 'next/link';
import { Icon } from '@iconify/react';

interface BlogBoxProps {
    data: {
        _id: string;
        title: string;
        slug: string;
        status: string;
        createdAt?: string;
        info: Record<string, string>;
    };
    postUrl: string;
}

export default function KalbelaBox({ data, postUrl }: BlogBoxProps) {
    const image = data.info?.images
        ? (() => {
              try {
                  const a = JSON.parse(data.info.images);
                  return Array.isArray(a) ? a[0] : '';
              } catch {
                  return '';
              }
          })()
        : '';

    const shortDesc = data.info?.description ?? '';
    const publishedAt = data.createdAt
        ? new Date(data.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
          })
        : null;

    return (
        <article className="group flex flex-col md:flex-row bg-white rounded-xl shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden">
            {/* Thumbnail */}
            <Link
                href={postUrl}
                className="shrink-0 w-full sm:w-52 md:w-64 aspect-video sm:aspect-4/3 block relative"
            >
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={image}
                        alt={data.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Icon icon="solar:document-bold" width="40" height="40" />
                    </div>
                )}
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-1 min-w-0 justify-center gap-1.5 p-2 md:p-4">
                <Link
                    href={postUrl}
                    className="text-base sm:text-lg md:text-xl font-bold text-gray-600 hover:text-main transition-colors line-clamp-2 leading-snug"
                >
                    {data.title}
                </Link>

                {shortDesc && (
                    <div
                        className="text-xs sm:text-sm text-gray-700 line-clamp-3 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: shortDesc }}
                    />
                )}

                {publishedAt && (
                    <time className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Icon icon="solar:calendar-bold" width="11" height="11" />
                        {publishedAt}
                    </time>
                )}
            </div>
        </article>
    );
}
