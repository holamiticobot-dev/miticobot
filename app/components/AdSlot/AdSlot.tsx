"use client";

import { useEffect, useState } from "react";
import styles from "./AdSlot.module.css";

const slotClasses: Record<AdSlotType, string> = {
  banner: styles.adSlotBanner,
  sidebar: styles.adSlotSidebar,
  square: styles.adSlotSquare,
};

type AdSlotType = "sidebar" | "banner" | "square";

interface AdSlotProps {
  type: AdSlotType;
}

const IS_DEV = process.env.NODE_ENV === "development";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT!;

const ADSENSE_SLOTS: Record<AdSlotType, string> = {
  banner: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER!,
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR!,
  square: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SQUARE!,
};

export default function AdSlot({ type }: AdSlotProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {},
        );
      } catch (e) {
        console.warn("AdSense error:", e);
      }
    }, 100); // espera 100ms para que el DOM tenga dimensiones

    return () => clearTimeout(timer);
  }, [mounted]);

  if (!mounted) {
    return (
      <div
        style={{
          display: "block",
          minWidth: type === "sidebar" ? "160px" : "100%",
          minHeight:
            type === "sidebar" ? "300px" : type === "banner" ? "90px" : "250px",
        }}
      />
    );
  }

  return (
    <ins
      className={`adsbygoogle ${slotClasses[type]}`}
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={ADSENSE_SLOTS[type]}
      data-ad-format="auto"
      data-full-width-responsive="true"
      data-adtest={IS_DEV ? "on" : "off"}
    />
  );
}
