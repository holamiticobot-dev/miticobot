import styles from "./AdSlot.module.css";

type AdSlotType = "sidebar" | "banner" | "square";

interface AdSlotProps {
  type: AdSlotType;
}

const BotIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
      fill="#2D5016"
      opacity="0.3"
    />
    <path
      d="M8 12.5c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2.5z"
      fill="#FAFAF7"
    />
    <circle cx="10.5" cy="11" r="1" fill="#2D5016" />
    <circle cx="13.5" cy="11" r="1" fill="#2D5016" />
    <path
      d="M10 13.5h4"
      stroke="#2D5016"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

export default function AdSlot({ type }: AdSlotProps) {
  if (type === "banner") {
    return (
      <div className={styles.banner}>
        <span className={styles.adTag}>Anuncio</span>
        <div className={styles.bannerLeft}>
          <div className={`${styles.icon} ${styles.bannerIcon}`}>
            <BotIcon size={22} />
          </div>
          <div className={styles.bannerText}>
            <h3>¿Querés anunciarte aquí?</h3>
            <p>Llegá a miles de contadores y emprendedores costarricenses </p>
          </div>
        </div>
        <button className={`${styles.cta} ${styles.bannerCta}`}>
          Contáctanos
        </button>
      </div>
    );
  }

  if (type === "sidebar") {
    return (
      <div className={styles.sidebar}>
        <span className={styles.adTag}>Anuncio</span>
        <div className={`${styles.icon} ${styles.sidebarIcon}`}>
          <BotIcon size={26} />
        </div>
        <h3>¿Querés anunciarte aquí?</h3>
        <p>Llegá a contadores y emprendedores ticos pc</p>
        <button className={`${styles.cta} ${styles.sidebarCta}`}>
          Contáctanos
        </button>
      </div>
    );
  }

  return (
    <div className={styles.square}>
      <span className={styles.adTag}>Anuncio</span>
      <div className={`${styles.icon} ${styles.squareIcon}`}>
        <BotIcon size={28} />
      </div>
      <h3>¿Querés anunciarte aquí?</h3>
      <p>Llegá a miles de contadores y emprendedores costarricenses</p>
      <button className={`${styles.cta} ${styles.squareCta}`}>
        Contáctanos
      </button>
    </div>
  );
}
