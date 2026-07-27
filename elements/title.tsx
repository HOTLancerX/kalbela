"use client";

/**
 * plugin/kalbela/elements/title.tsx
 *
 * Kalbela Section Title / Header Element:
 * - Configurable Title text with custom typography and colors.
 * - Left Media: Support for single icon, two icons, or custom image (with show/hide toggle).
 * - Right Side: Link text and icon (with show/hide toggle).
 * - Bottom Border: Full width border line under header (with show/hide toggle).
 * - Fully dynamic with on-off toggles for every section element.
 */

import React from "react";
import { Icon } from "@iconify/react";
import {
    Text,
    NumberControl,
    Section,
    ColorPickerPopup,
    Toggle,
    Select,
    IconPicker,
} from "@/components/builder/controls";

export interface TitleProps {
    title?: string;
    showTitle?: boolean;

    // Left Media
    showLeftMedia?: boolean;
    leftMediaType?: "icon" | "two-icons" | "image" | "none";
    leftIcon1?: string;
    leftIcon2?: string;
    leftImage?: string;
    leftIcon1Color?: string;
    leftIcon1Bg?: string;
    leftIcon1Size?: number;
    leftIcon2Color?: string;
    leftIcon2Bg?: string;
    leftIcon2Size?: number;
    leftImageWidth?: number;
    leftImageHeight?: number;

    // Right Side
    showRightSide?: boolean;
    showRightText?: boolean;
    showRightIcon?: boolean;
    rightLinkText?: string;
    rightLinkUrl?: string;
    rightIcon?: string;
    rightTextColor?: string;
    rightIconColor?: string;
    rightIconSize?: number;

    // Border
    showBorder?: boolean;
    borderColor?: string;
    borderThickness?: number;
    borderStyle?: "solid" | "dashed" | "dotted" | "double";
    borderGap?: number;

    // Title Style
    titleColor?: string;
    titleFontSize?: number;
    titleFontWeight?: string;
}

export function TitleUI({
    title = "বাছাইকৃত",
    showTitle = true,
    showLeftMedia = true,
    leftMediaType = "icon",
    leftIcon1 = "solar:document-text-bold",
    leftIcon2 = "solar:fire-bold",
    leftImage = "",
    leftIcon1Color = "#ffffff",
    leftIcon1Bg = "#dc2626",
    leftIcon1Size = 16,
    leftIcon2Color = "#dc2626",
    leftIcon2Bg = "transparent",
    leftIcon2Size = 18,
    leftImageWidth = 24,
    leftImageHeight = 24,
    showRightSide = true,
    showRightText = false,
    showRightIcon = true,
    rightLinkText = "",
    rightLinkUrl = "#",
    rightIcon = "solar:alt-arrow-right-circle-bold",
    rightTextColor = "#111827",
    rightIconColor = "#000000",
    rightIconSize = 24,
    showBorder = true,
    borderColor = "#000000",
    borderThickness = 3,
    borderStyle = "solid",
    borderGap = 8,
    titleColor = "#000000",
    titleFontSize = 20,
    titleFontWeight = "700",
}: TitleProps) {
    return (
        <div className="w-full flex flex-col" style={{ gap: `${borderGap}px` }}>
            <div className="w-full flex items-center justify-between gap-3">
                {/* Left Side: Media + Title */}
                <div className="flex items-center gap-2.5">
                    {/* Left Media (Icon / Two Icons / Image) */}
                    {showLeftMedia && leftMediaType !== "none" && (
                        <div className="flex items-center gap-1.5 shrink-0">
                            {leftMediaType === "image" && leftImage ? (
                                <img
                                    src={leftImage}
                                    alt="Title Icon"
                                    className="object-contain"
                                    style={{
                                        width: `${leftImageWidth}px`,
                                        height: `${leftImageHeight}px`,
                                    }}
                                />
                            ) : leftMediaType === "two-icons" ? (
                                <>
                                    {leftIcon1 && (
                                        <div
                                            className="flex items-center justify-center p-1 rounded-md shrink-0"
                                            style={{ backgroundColor: leftIcon1Bg || "transparent" }}
                                        >
                                            <Icon
                                                icon={leftIcon1}
                                                style={{ color: leftIcon1Color, fontSize: `${leftIcon1Size}px` }}
                                            />
                                        </div>
                                    )}
                                    {leftIcon2 && (
                                        <div
                                            className="flex items-center justify-center p-1 rounded-md shrink-0"
                                            style={{ backgroundColor: leftIcon2Bg || "transparent" }}
                                        >
                                            <Icon
                                                icon={leftIcon2}
                                                style={{ color: leftIcon2Color, fontSize: `${leftIcon2Size}px` }}
                                            />
                                        </div>
                                    )}
                                </>
                            ) : (
                                leftIcon1 && (
                                    <div
                                        className="flex items-center justify-center p-1 rounded-md shrink-0"
                                        style={{ backgroundColor: leftIcon1Bg || "#dc2626" }}
                                    >
                                        <Icon
                                            icon={leftIcon1}
                                            style={{ color: leftIcon1Color, fontSize: `${leftIcon1Size}px` }}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    )}

                    {/* Title Text */}
                    {showTitle && title && (
                        <h3
                            className="tracking-tight leading-none"
                            style={{
                                color: titleColor,
                                fontSize: `${titleFontSize}px`,
                                fontWeight: titleFontWeight,
                            }}
                        >
                            {title}
                        </h3>
                    )}
                </div>

                {/* Right Side: Link Text + Icon */}
                {showRightSide && (
                    <a
                        href={rightLinkUrl || "#"}
                        className="flex items-center gap-1.5 group shrink-0 transition-opacity hover:opacity-80"
                    >
                        {showRightText && rightLinkText && (
                            <span
                                className="text-xs font-semibold"
                                style={{ color: rightTextColor }}
                            >
                                {rightLinkText}
                            </span>
                        )}
                        {showRightIcon && rightIcon && (
                            <Icon
                                icon={rightIcon}
                                style={{ color: rightIconColor, fontSize: `${rightIconSize}px` }}
                                className="transition-transform group-hover:translate-x-0.5"
                            />
                        )}
                    </a>
                )}
            </div>

            {/* Bottom Border Line */}
            {showBorder && (
                <div
                    className="w-full"
                    style={{
                        borderBottomWidth: `${borderThickness}px`,
                        borderBottomColor: borderColor,
                        borderBottomStyle: borderStyle,
                    }}
                />
            )}
        </div>
    );
}

function KalbelaTitleCanvasPreview({ element }: { element: any }) {
    const c = { ...element.schema?.content, ...element.content };
    const s = { ...element.schema?.style, ...element.style };

    return (
        <TitleUI
            title={c.title ?? "বাছাইকৃত"}
            showTitle={c.showTitle !== "false"}
            showLeftMedia={c.showLeftMedia !== "false"}
            leftMediaType={c.leftMediaType ?? "icon"}
            leftIcon1={c.leftIcon1 ?? "solar:document-text-bold"}
            leftIcon2={c.leftIcon2 ?? "solar:fire-bold"}
            leftImage={c.leftImage ?? ""}
            showRightSide={c.showRightSide !== "false"}
            showRightText={c.showRightText === "true"}
            showRightIcon={c.showRightIcon !== "false"}
            rightLinkText={c.rightLinkText ?? ""}
            rightLinkUrl={c.rightLinkUrl ?? "#"}
            rightIcon={c.rightIcon ?? "solar:alt-arrow-right-circle-bold"}
            showBorder={c.showBorder !== "false"}
            borderThickness={Number(s.borderThickness) || 3}
            borderStyle={s.borderStyle ?? "solid"}
            borderColor={s.borderColor || "#000000"}
            borderGap={Number(s.borderGap) || 8}
            titleColor={s.titleColor || "#000000"}
            titleFontSize={Number(s.titleFontSize) || 20}
            titleFontWeight={s.titleFontWeight || "700"}
            leftIcon1Color={s.leftIcon1Color || "#ffffff"}
            leftIcon1Bg={s.leftIcon1Bg || "#dc2626"}
            leftIcon1Size={Number(s.leftIcon1Size) || 16}
            leftIcon2Color={s.leftIcon2Color || "#dc2626"}
            leftIcon2Bg={s.leftIcon2Bg || ""}
            leftIcon2Size={Number(s.leftIcon2Size) || 18}
            leftImageWidth={Number(s.leftImageWidth) || 24}
            leftImageHeight={Number(s.leftImageHeight) || 24}
            rightTextColor={s.rightTextColor || "#111827"}
            rightIconColor={s.rightIconColor || "#000000"}
            rightIconSize={Number(s.rightIconSize) || 24}
        />
    );
}

const titleElement = {
    type: "kalbela-title",
    category: "kalbela",
    label: "Title Header",
    icon: "solar:text-bold",

    schema: {
        content: {
            title: "বাছাইকৃত",
            showTitle: "true",
            showLeftMedia: "true",
            leftMediaType: "icon",
            leftIcon1: "solar:document-text-bold",
            leftIcon2: "solar:fire-bold",
            leftImage: "",
            showRightSide: "true",
            showRightText: "false",
            showRightIcon: "true",
            rightLinkText: "",
            rightLinkUrl: "#",
            rightIcon: "solar:alt-arrow-right-circle-bold",
            showBorder: "true",
        },
        style: {
            titleColor: "#000000",
            titleFontSize: 20,
            titleFontWeight: "700",
            leftIcon1Color: "#ffffff",
            leftIcon1Bg: "#dc2626",
            leftIcon1Size: 16,
            leftIcon2Color: "#dc2626",
            leftIcon2Bg: "",
            leftIcon2Size: 18,
            leftImageWidth: 24,
            leftImageHeight: 24,
            rightTextColor: "#111827",
            rightIconColor: "#000000",
            rightIconSize: 24,
            borderColor: "#000000",
            borderThickness: 3,
            borderStyle: "solid",
            borderGap: 8,
        },
    },

    controls: [
        {
            tab: "Layout",
            section: "Content",
            controls: [
                {
                    name: "title",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Text label="Title" value={value ?? "বাছাইকৃত"} onChange={onChange} />
                    ),
                },
                {
                    name: "showTitle",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Toggle label="Show Title" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                    ),
                },
                {
                    name: "showLeftMedia",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Toggle label="Show Left Media" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                    ),
                },
                {
                    name: "leftMediaType",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Media Type">
                            <Select
                                label="Left Type"
                                value={value ?? "icon"}
                                onChange={onChange}
                                options={[
                                    { value: "icon", label: "Single Icon" },
                                    { value: "two-icons", label: "Two Icons" },
                                    { value: "image", label: "Image URL" },
                                    { value: "none", label: "None" },
                                ]}
                            />
                        </Section>
                    ),
                },
                {
                    name: "leftIcon1",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Primary Left Icon">
                            <IconPicker label="Icon 1" value={value ?? "solar:document-text-bold"} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "leftIcon2",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Secondary Left Icon">
                            <IconPicker label="Icon 2" value={value ?? "solar:fire-bold"} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "leftImage",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Left Image URL">
                            <Text label="Image URL" value={value ?? ""} onChange={onChange} placeholder="https://..." />
                        </Section>
                    ),
                },
                {
                    name: "showRightSide",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Right Side Settings" defaultOpen>
                            <Toggle label="Show Right Side" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                        </Section>
                    ),
                },
                {
                    name: "showRightText",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Right Text Toggle">
                            <Toggle label="Show Text Label" value={value === "true"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                        </Section>
                    ),
                },
                {
                    name: "rightLinkText",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Right Link Text">
                            <Text label="Label Text" value={value ?? ""} onChange={onChange} placeholder="সব দেখুন" />
                        </Section>
                    ),
                },
                {
                    name: "rightLinkUrl",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Right Link URL">
                            <Text label="URL" value={value ?? "#"} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "showRightIcon",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Right Icon Toggle">
                            <Toggle label="Show Right Icon" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                        </Section>
                    ),
                },
                {
                    name: "rightIcon",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Right Icon">
                            <IconPicker label="Right Icon" value={value ?? "solar:alt-arrow-right-circle-bold"} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "showBorder",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Bottom Border Settings" defaultOpen>
                            <Toggle label="Show Bottom Border" value={value !== "false"} onChange={(v: boolean) => onChange(v ? "true" : "false")} />
                        </Section>
                    ),
                },
            ],
        },
        {
            tab: "Style",
            section: "Styling",
            controls: [
                {
                    name: "titleColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Title Styling" defaultOpen>
                            <ColorPickerPopup label="Title Color" value={value ?? "#000000"} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "titleFontSize",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Title Size">
                            <NumberControl label="Font Size (px)" value={value ?? 20} onChange={onChange} min={12} max={48} />
                        </Section>
                    ),
                },
                {
                    name: "leftIcon1Bg",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Left Icon 1 Styling" defaultOpen>
                            <ColorPickerPopup label="Background Color" value={value ?? "#dc2626"} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "leftIcon1Color",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Left Icon 1 Color">
                            <ColorPickerPopup label="Icon Color" value={value ?? "#ffffff"} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "leftIcon1Size",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Left Icon 1 Size">
                            <NumberControl label="Icon Size (px)" value={value ?? 16} onChange={onChange} min={10} max={48} />
                        </Section>
                    ),
                },
                {
                    name: "leftIcon2Bg",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Left Icon 2 Styling">
                            <ColorPickerPopup label="Background Color" value={value ?? ""} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "leftIcon2Color",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Left Icon 2 Color">
                            <ColorPickerPopup label="Icon Color" value={value ?? "#dc2626"} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "leftIcon2Size",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Left Icon 2 Size">
                            <NumberControl label="Icon Size (px)" value={value ?? 18} onChange={onChange} min={10} max={48} />
                        </Section>
                    ),
                },
                {
                    name: "rightIconColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Right Side Styling" defaultOpen>
                            <ColorPickerPopup label="Right Icon Color" value={value ?? "#000000"} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "rightIconSize",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Right Icon Size">
                            <NumberControl label="Size (px)" value={value ?? 24} onChange={onChange} min={12} max={48} />
                        </Section>
                    ),
                },
                {
                    name: "borderColor",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Border Styling" defaultOpen>
                            <ColorPickerPopup label="Border Color" value={value ?? "#000000"} onChange={onChange} />
                        </Section>
                    ),
                },
                {
                    name: "borderThickness",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Border Thickness">
                            <NumberControl label="Thickness (px)" value={value ?? 3} onChange={onChange} min={1} max={10} />
                        </Section>
                    ),
                },
                {
                    name: "borderGap",
                    responsive: false,
                    render: (value: any, onChange: any) => (
                        <Section label="Border Gap">
                            <NumberControl label="Gap (px)" value={value ?? 8} onChange={onChange} min={0} max={30} />
                        </Section>
                    ),
                },
            ],
        },
    ],

    render: (element: any) => <KalbelaTitleCanvasPreview element={element} />,
};

export default titleElement;
