import Link from "next/link";
import styles from "./TramitesPage.module.css";
import Footer from "@/components/Footer";

export default function TramitesPage() {
  return (
    <div style={{ background: "#f0ebe0" }}>
      <div className={styles.page}>
        {/* Hero */}
        <div className={styles.hero}>
          <h1>Trámites disponibles</h1>
        </div>

        {/* Disponible ahora */}
        <p className={styles.sectionTitle}>Disponible ahora</p>
        <div className={styles.grid}>
          <Link href="/chat?tema=d101" className={styles.card}>
            <span className={styles.badgeNew}>Disponible</span>
            <div className={styles.cardIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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
            </div>
            <h3>Hacienda CR</h3>
            <p>
              Tributación Digital, declaraciones, facturas y pagos del
              Ministerio de Hacienda.
            </p>
            <div className={styles.cardChips}>
              <span className={styles.chip}>D-101</span>
              <span className={styles.chip}>Tributación Digital</span>
              <span className={styles.chip}>Factura Electrónica</span>
              <span className={styles.chip}>Pagos y multas</span>
            </div>
            <div className={styles.cardArrow}>→</div>
          </Link>
        </div>

        {/* Próximamente */}
        {/*
        <p className={styles.sectionTitle}>Próximamente</p>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>CCSS</h3>
            ...
          </div>
          <div className={styles.card}>
            <h3>Registro Civil</h3>
            ...
          </div>
          <div className={styles.card}>
            <h3>MOPT</h3>
            ...
          </div>
          <div className={styles.card}>
            <h3>MEIC</h3>
            ...
          </div>
        </div>
        */}

        {/* Texto próximas opciones */}
        <div className={styles.comingSoon}>
          <p>
            🚀 <strong>¡Estamos creciendo!</strong> Pronto agregaremos más
            ministerios e instituciones: <strong>CCSS</strong>,{" "}
            <strong>Registro Civil</strong>, <strong>MOPT</strong>,{" "}
            <strong>MEIC</strong> y más. Seguinos para enterarte cuando estén
            disponibles.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
