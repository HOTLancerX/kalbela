"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import useSettings from "@/lib/useSettings";

export interface kbFooterProps {
    settings?: Record<string, any>;
}

interface FooterItem {
    id?: string;
    icon?: string;
    name?: string;
    link?: string;
}

interface FooterSectionData {
    title: string;
    items: FooterItem[];
}

export default function kbFooter({ settings: propSettings }: kbFooterProps) {
    const { settings: hookSettings } = useSettings();
    const settings = propSettings && Object.keys(propSettings).length > 0 ? propSettings : hookSettings;

    const sections: FooterSectionData[] = [];

    for (let s = 1; s <= 5; s++) {
        const title = settings[`footer_section_${s}_title`];
        let items: FooterItem[] = [];

        if (typeof settings[`footer_section_${s}_items`] === "string") {
            try {
                const parsed = JSON.parse(settings[`footer_section_${s}_items`]);
                if (Array.isArray(parsed)) {
                    items = parsed;
                }
            } catch {}
        } else {
            const icon = settings[`footer_item_${s}_icon`];
            const name = settings[`footer_item_${s}_name`];
            const link = settings[`footer_item_${s}_link`];
            if (icon || name || link) {
                items = [{ icon, name, link }];
            }
        }

        sections.push({ title, items });
    }

    const year     = new Date().getFullYear();
    const siteName = settings.siteName;
    const logo     = settings.logo;

    const sec1 = sections[0]; // Section 1 (Contact info)
    const sec2 = sections[1]; // Section 2 (Useful Links)
    const sec3 = sections[2]; // Section 3 (Categories)
    const sec4 = sections[3]; // Section 4 (Social Media Icons Bar)

    return (
        <footer className="w-full bg-white text-gray-700 text-base border-t border-gray-200 mt-6 divide-y divide-gray-200">
            <div>
                <div className="container">
                    <div className="flex flex-col md:flex-row items-center md:justify-between py-4 gap-4">
                        <Link href="/" className="inline-block">
                            {logo ? (
                                <img src={logo} alt={siteName} className="h-10 w-auto object-contain" />
                            ) : (
                                <span className="text-2xl font-black text-white tracking-tight">{siteName}</span>
                            )}
                        </Link>
                        <div className="flex flex-wrap gap-2 divide-x justify-center md:justify-end divide-slate-200 font-bold text-sm">
                            {sec1?.items && sec1.items.length > 0 ? (
                                sec1.items.map((item, idx) => (
                                    <div key={idx}>
                                        {item.link ? (
                                            <Link href={item.link} className="hover:text-gray-900 transition flex items-center gap-1.5 pr-2">
                                                {item.icon && <Icon icon={item.icon} width={13} className="text-slate-400 shrink-0" />}
                                                <span>{item.name}</span>
                                            </Link>
                                        ) : (
                                            <p>{item.name}</p>
                                        )}
                                    </div>
                                ))
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div className="flex flex-col items-start space-y-1">
                            <h1 className="font-bold">{settings.email}</h1>
                            <p className="font-normal">{settings.address}</p>
                        </div>

                        <div className="flex flex-col items-start space-y-1">
                            {sec2?.items && sec2.items.length > 0 ? (
                                sec2.items.map((item, idx) => (
                                    <span key={idx} className="font-normal">
                                        {item.name}
                                    </span>
                                ))
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 py-4">
                        <div>
                            {sec3?.title && <h1 className="font-bold">{sec3?.title}</h1>}
                            <div className="flex items-center gap-3 flex-wrap">
                                {sec3?.items && sec3.items.length > 0 ? (
                                    sec3.items.map((item, idx) => (
                                        <a
                                            key={idx}
                                            href={item.link || "#"}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:text-[#ff4d4d] transition flex items-center justify-center p-1"
                                            title={item.name || "Social link"}
                                        >
                                            <Icon icon={item.icon || "solar:link-bold"} width={25} />
                                        </a>
                                    ))
                                ) : null}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 py-4">
                        <p>
                            Copyright © {year} {siteName}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
