"use client";

import { useEffect } from "react";

type AdSlotType = "sidebar" | "banner" | "square";

interface AdSlotProps {
  type: AdSlotType;
}

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT!;

const ADSENSE_SLOTS: Record<AdSlotType, string> = {
  banner: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER!,
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR!,
  square: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SQUARE!,
};

export default function AdSlot({ type }: AdSlotProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {},
      );
    } catch (e) {
      console.warn("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={ADSENSE_SLOTS[type]}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
