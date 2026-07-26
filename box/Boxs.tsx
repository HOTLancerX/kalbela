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
import Image from 'next/image';

interface BlogBoxsProps {
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

export default function KalbelaBoxs({ data, postUrl }: BlogBoxsProps) {
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

    return (
        <article className="group flex flex-row items-center bg-white rounded-xl shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden">
            {/* Thumbnail */}
            <Link
                href={postUrl}
                className="shrink-0 w-20 h-16 aspect-video sm:aspect-4/3 block relative"
            >
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <Image
                        src={image}
                        alt={data.title}
                        width={180}
                        height={80}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Icon icon="solar:document-bold" width="40" height="40" />
                    </div>
                )}
            </Link>

            {/* Content */}
            <Link
                href={postUrl}
                className="p-2 text-base font-medium text-gray-700 hover:text-main transition-colors line-clamp-2"
            >
                {data.title}
            </Link>
        </article>
    );
}
