import styles from "./AdSlot.module.css";

type AdSlotType = "sidebar" | "banner" | "square";

interface AdSlotProps {
  type: AdSlotType;
}

const adConfig = {
  sidebar: { label: "160 × 300", name: "Sidebar" },
  banner: { label: "728 × 90 — Leaderboard", name: "Banner" },
  square: { label: "300 × 250", name: "Square" },
};

export default function AdSlot({ type }: AdSlotProps) {
  const config = adConfig[type];

  return (
    <div className={`${styles.adSlot} ${styles[type]}`}>
      <span className={styles.adType}>{config.name}</span>
      <div className={styles.adIcon}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect
            x="1"
            y="1"
            width="12"
            height="12"
            rx="2"
            stroke="#2D5016"
            strokeWidth="1.2"
            opacity="0.4"
          />
          <rect
            x="3"
            y="3"
            width="8"
            height="3"
            rx="1"
            fill="#2D5016"
            opacity="0.2"
          />
          <rect
            x="3"
            y="8"
            width="5"
            height="1.5"
            rx="0.5"
            fill="#2D5016"
            opacity="0.15"
          />
        </svg>
      </div>
      <span>Google AdSense</span>
      <span className={styles.adLabel}>{config.label}</span>
    </div>
  );
}
