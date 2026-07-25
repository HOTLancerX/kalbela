export interface Tab {
    _id: string;
    title: string;
    url: string;
}

export interface TabPost {
    _id: string;
    title: string;
    slug: string;
    postUrl: string;
    categoryTitle: string | null;
    categoryUrl?: string | null;
    createdAt: string;
    image: string;
    excerpt: string;
}

export interface NewsColors {
    active?: string;
    activeText?: string;
    inactive?: string;
    inactiveText?: string;
    title?: string;
    titleHover?: string;
}
