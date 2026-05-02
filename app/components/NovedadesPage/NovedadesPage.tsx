import Footer from "@/components/Footer";
import styles from "./NovedadesPage.module.css";

const novedades = [
  {
    version: "v1.0",
    date: "Mayo 2026",
    updates: [
      {
        type: "launch",
        title: "Lanzamiento de MiTicoBot",
        isNew: true,
        description:
          "Ya podés consultar trámites de Hacienda CR de forma gratuita, sin registro y desde cualquier dispositivo.",
      },
      {
        type: "feature",
        title: "Chat con temas preseleccionados",
        isNew: false,
        description:
          "Entrá directo al tema que necesitás — Declaración D-101, Tributación Digital, Factura Electrónica o Pagos y multas — y MiTicoBot arranca con contexto.",
      },
      {
        type: "mobile",
        title: "Disponible en móvil",
        isNew: false,
        description:
          "MiTicoBot funciona en cualquier dispositivo — celular, tablet o computadora — sin necesidad de instalar nada.",
      },
    ],
  },
];

const icons: Record<string, React.ReactNode> = {
  launch: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 12.5c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2.5z"
        fill="#F5F0E8"
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
  ),
  feature: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 12.5c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2.5z"
        fill="#2D5016"
        opacity="0.6"
      />
      <circle cx="10.5" cy="11" r="1" fill="#2D5016" />
      <circle cx="13.5" cy="11" r="1" fill="#2D5016" />
    </svg>
  ),
  mobile: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="7"
        y="2"
        width="10"
        height="20"
        rx="2"
        stroke="#C49A6C"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="18" r="1" fill="#C49A6C" />
    </svg>
  ),
};

export default function NovedadesPage() {
  return (
    <>
      <div style={{ background: "#f0ebe0" }}>
        <div className={styles.page}>
          {/* Hero */}
          <div className={styles.hero}>
            <h1>Novedades</h1>
            <p>Seguí de cerca lo que estamos construyendo para vos.</p>
          </div>

          {/* Versiones */}
          {novedades.map((block) => (
            <div key={block.version} className={styles.versionBlock}>
              <div className={styles.versionHeader}>
                <span className={styles.versionBadge}>{block.version}</span>
                <span className={styles.versionDate}>{block.date}</span>
                <div className={styles.versionLine} />
              </div>

              {block.updates.map((update) => (
                <div key={update.title} className={styles.updateItem}>
                  <div
                    className={`${styles.updateIcon} ${styles[update.type]}`}
                  >
                    {icons[update.type]}
                  </div>
                  <div className={styles.updateContent}>
                    <h3>
                      {update.title}
                      {update.isNew && (
                        <span className={styles.badgeNew}>Nuevo</span>
                      )}
                    </h3>
                    <p>{update.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
