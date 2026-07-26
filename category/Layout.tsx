/**
 * Kalbela Category Layout — Editorial news category style.
 *
 * Receives `data`, `settings`, `permalinkMap`, and `pageData` from slug page.
 * Post grid rendered via BlogGridClient (client component).
 */

import Link from 'next/link';
import KalbelaGrid from './Grid';

interface BlogCatProps {
    data: {
        _id: string;
        title: string;
        slug: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        info: Record<string, string>;
    };
    settings?: Record<string, any>;
    permalinkMap?: Record<string, string>;
    pageData?: {
        posts: any[];
        subCats: { _id: string; title: string; slug: string }[];
        ancestors: { _id: string; title: string; slug: string }[];
        activeBox: { label: string; pluginNx: string } | null;
    };
}

function buildUrl(prefix: string, slug: string): string {
    const p = prefix.trim().replace(/^\/+|\/+$/g, '');
    return p ? `/${p}/${slug}` : `/${slug}`;
}

export default function KalbelaCategoryLayout({
    data,
    settings = {},
    permalinkMap = {},
    pageData,
}: BlogCatProps) {
    const postPrefix =
        (permalinkMap['blog'] ?? 'blog').trim().replace(/^\/+|\/+$/g, '') || 'blog';
    const catPrefix = (permalinkMap['blog-category'] ?? 'blog/category')
        .trim()
        .replace(/^\/+|\/+$/g, '');

    const posts = pageData?.posts ?? [];
    const subCats = pageData?.subCats ?? [];
    const ancestors = pageData?.ancestors ?? [];
    const activeBox = pageData?.activeBox ?? null;

    // Breadcrumb: all ancestors except the last (which is current category)
    const breadcrumbLinks = ancestors.slice(0, -1);

    return (
        <main className="bg-gray-50/50 min-h-screen">
            {/* Header Banner */}
            <header className="bg-linear-to-r from-emerald-800 via-teal-800 to-emerald-900 py-10 px-6 text-white shadow-sm">
                <div className="container max-w-6xl mx-auto">
                    {/* Breadcrumb */}
                    <nav
                        className="flex items-center gap-1.5 text-xs sm:text-sm text-white/80 mb-3 flex-wrap"
                        aria-label="breadcrumb"
                    >
                        <Link href="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        {breadcrumbLinks.map((ancestor) => (
                            <span key={ancestor._id} className="flex items-center gap-1.5">
                                <span className="text-white/40">›</span>
                                <Link
                                    href={buildUrl(catPrefix, ancestor.slug)}
                                    className="hover:text-white transition-colors"
                                >
                                    {ancestor.title}
                                </Link>
                            </span>
                        ))}
                        <span className="text-white/40">›</span>
                        <span className="text-white font-semibold">{data.title}</span>
                    </nav>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                            {data.title}
                        </h1>
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 w-fit shrink-0">
                            {posts.length} post{posts.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
            </header>

            <div className="container py-8 space-y-6">
                {/* Sub-category chips */}
                {subCats.length > 0 && (
                    <nav className="flex flex-wrap gap-2 pb-2 border-b border-gray-200" aria-label="Sub-categories">
                        {subCats.map((sub) => (
                            <Link
                                key={sub._id}
                                href={buildUrl(catPrefix, sub.slug)}
                                className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-2xs"
                            >
                                {sub.title}
                            </Link>
                        ))}
                    </nav>
                )}

                {/* Post Grid - Grid 1 (Single column list) */}
                <KalbelaGrid
                    posts={posts}
                    activeBox={activeBox}
                    postPrefix={postPrefix}
                />
            </div>
        </main>
    );
}
