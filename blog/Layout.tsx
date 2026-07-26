/**
 * Kalbela Blog Layout — Single blog post layout.
 *
 * Receives `data`, `settings`, `permalinkMap`, and `pageData` from slug page.
 * Renders breadcrumb navigation, KalbelaBlogDetails, related category posts, and author user details.
 */

import Link from 'next/link';
import { Icon } from '@iconify/react';
import KalbelaBlogDetails from './details';
import KalbelaRelated from './Related';

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
    const publishedAt = data.createdAt
        ? new Date(data.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : null;

    const seoTitle = data.info?.seo_meta_title || data.info?.seo_title || '';
    const seoDesc = data.info?.seo_meta_description || data.info?.seo_description || '';
    const seoKeywords = data.info?.seo_meta_keyword || '';

    const categoryAncestors = pageData?.categoryAncestors ?? [];
    const relatedPosts = pageData?.relatedPosts ?? [];

    // Fallback author resolution
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

    const postPrefix = (permalinkMap['blog'] ?? 'blog').trim().replace(/^\/+|\/+$/g, '') || 'blog';
    const catPrefix = (permalinkMap['blog-category'] ?? 'blog/category')
        .trim()
        .replace(/^\/+|\/+$/g, '');

    return (
        <main className="min-h-screen py-8">
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

                

                {/* Main Content Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Main Post Details & Related Posts */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Main Post Details Component */}
                        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs">
                            <KalbelaBlogDetails
                                data={data}
                                pageData={pageData}
                                permalinkMap={permalinkMap}
                            />
                        </div>
                        {/* Related Category Posts Section (Active blog-box) */}
                        <KalbelaRelated
                            posts={relatedPosts}
                            postPrefix={postPrefix}
                            activeBox={(pageData as any)?.activeBox}
                        />
                    </div>

                    {/* Right Column: Sidebar */}
                    <aside className="space-y-6">
                        
                    </aside>
                </div>
            </div>
        </main>
    );
}
