'use client';

/**
 * Kalbela Blog Details — Article body component.
 *
 * Renders single news post main content (title, images, description).
 */

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

    return (
        <article className="space-y-6">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                {data.title}
            </h1>

            {/* Images */}
            {image && (
                <div className="rounded-xl overflow-hidden aspect-video bg-gray-100 shadow-xs border border-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt={data.title} className="w-full h-full object-cover" />
                </div>
            )}

            {/* Description */}
            {description ? (
                <div
                    className="prose prose-lg max-w-none text-gray-800 leading-relaxed description space-y-4"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            ) : null}
        </article>
    );
}
