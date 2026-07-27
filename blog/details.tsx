'use client';

/**
 * Kalbela Blog Details — Article body component.
 *
 * Dedicated Single Page Ad Slots:
 * - belowTitle: Ad slot directly below the main title headline
 * - imageOverlay: Ad overlay rendered dynamically inside featured image by AdsRenderer
 * - aboveDescription: Ad slot directly above the article description
 * - middle: Ad slot inserted inside article paragraphs
 * - belowDescription: Ad slot directly below article description
 */

import Ads from '@/components/Ads';

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

export default function KalbelaBlogDetails({
    data,
}: KalbelaBlogDetailsProps) {
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

    // Render description content with an ad inserted right in the middle
    const renderDescriptionContent = () => {
        if (!description) return null;

        const paragraphs = description.split(/(<\/p>)/i).filter(Boolean);
        const pList: string[] = [];
        for (let i = 0; i < paragraphs.length; i += 2) {
            pList.push(paragraphs[i] + (paragraphs[i + 1] || ''));
        }

        if (pList.length <= 1) {
            return (
                <div
                    className="prose prose-lg max-w-none text-gray-800 leading-relaxed description space-y-4"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            );
        }

        const midIndex = Math.floor(pList.length / 2);
        const firstHalf = pList.slice(0, midIndex).join('');
        const secondHalf = pList.slice(midIndex).join('');

        return (
            <div className="space-y-4">
                <div
                    className="prose prose-lg max-w-none text-gray-800 leading-relaxed description space-y-4"
                    dangerouslySetInnerHTML={{ __html: firstHalf }}
                />

                {/* Middle Description Ad */}
                <div className="my-4">
                    <Ads type="single" slot="middle" />
                </div>

                <div
                    className="prose prose-lg max-w-none text-gray-800 leading-relaxed description space-y-4"
                    dangerouslySetInnerHTML={{ __html: secondHalf }}
                />
            </div>
        );
    };

    return (
        <article className="space-y-6">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                {data.title}
            </h1>

            {/* Below Title Ad */}
            <div className="py-1">
                <Ads type="single" slot="belowTitle" />
            </div>

            {/* Featured Image with Dynamic Overlay Ad */}
            {image && (
                <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100 shadow-xs border border-gray-100 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt={data.title} className="w-full h-full object-cover" />

                    {/* Dynamic Image Overlay Ad (Renders ONLY when an ad exists) */}
                    <Ads type="single" slot="imageOverlay" />
                </div>
            )}

            {/* Description Section with 3 Ads (Above, Middle, Below) */}
            {description && (
                <div className="space-y-6 pt-2">
                    {/* 1. Above Description Ad */}
                    <div className="py-1">
                        <Ads type="single" slot="aboveDescription" />
                    </div>

                    {/* 2. Description Body + Middle Ad */}
                    {renderDescriptionContent()}

                    {/* 3. Below Description Ad */}
                    <div className="py-1">
                        <Ads type="single" slot="belowDescription" />
                    </div>
                </div>
            )}
        </article>
    );
}
