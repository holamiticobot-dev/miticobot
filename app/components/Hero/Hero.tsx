"use client";
import AdSlot from "../AdSlot";
import { useRouter } from "next/navigation";
import styles from "./Hero.module.css";

export default function Hero() {
  const router = useRouter();
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        {/* Badge de versión */}
        <div className={styles.versionBadge}>
          <span className={styles.versionDot} />
          Versión 1.0 — Ahora disponible
        </div>

        {/* Título */}
        <h1 className={styles.title}>
          Tu asistente para <br />
          trámites de <span className={styles.titleAccent}>Hacienda CR</span>
        </h1>

        {/* Descripción */}
        <p className={styles.desc}>
          MiTicoBot te ayuda a resolver dudas sobre Tributación Digital,
          declaraciones, pagos y más trámites de Hacienda Costa Rica — rápido
        </p>

        {/* Botones */}
        <div className={styles.actions}>
          <button
            className={styles.btnPrimary}
            onClick={() => router.push("/chat")}
          >
            Hacer una consulta
          </button>
          <button className={styles.btnSecondary}>¿Cómo funciona?</button>
        </div>

        {/* Chips de temas */}
        <div className={styles.chips}>
          <div className={styles.chip}>
            <div className={styles.chipIcon}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5h6M5 2v6"
                  stroke="#2D5016"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            Declaración D-101
          </div>
          <div className={styles.chip}>
            <div className={styles.chipIcon}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5h6M5 2v6"
                  stroke="#2D5016"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            Tributación Digital
          </div>
          <div className={styles.chip}>
            <div className={styles.chipIcon}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5h6M5 2v6"
                  stroke="#2D5016"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            Factura Electrónica
          </div>
          <div className={styles.chip}>
            <div className={styles.chipIcon}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5h6M5 2v6"
                  stroke="#2D5016"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            Pagos y multas
          </div>
        </div>

        {/* Divider decorativo */}
        <div className={styles.divider} />
      </div>
    </section>
  );
}
