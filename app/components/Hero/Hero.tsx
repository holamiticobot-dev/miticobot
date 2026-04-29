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
          declaraciones, pagos y más trámites de Hacienda Costa Rica. Servicio
          informativo. No reemplaza asesoría profesional contable o legal.
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

        {/* Divider decorativo */}
        <div className={styles.divider} />
      </div>
    </section>
  );
}
