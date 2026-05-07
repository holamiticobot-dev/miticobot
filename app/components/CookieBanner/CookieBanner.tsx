"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./CookieBanner.module.css";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.icon}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
            fill="#F5F0E8"
            opacity="0.2"
          />
          <circle cx="9" cy="10" r="1.5" fill="#F5F0E8" />
          <circle cx="14" cy="8" r="1" fill="#F5F0E8" />
          <circle cx="15" cy="13" r="1.5" fill="#F5F0E8" />
          <circle cx="10" cy="15" r="1" fill="#F5F0E8" />
        </svg>
      </div>

      <div className={styles.content}>
        <h3>Usamos cookies 🍪</h3>
        <p>
          MiTicoBot usa cookies técnicas para funcionar correctamente — como
          recordar tu límite de consultas diarias. No usamos cookies de rastreo
          ni publicidad. <Link href="/privacidad">Saber más</Link>
        </p>
        <div className={styles.actions}>
          <button className={styles.btnAccept} onClick={handleAccept}>
            Aceptar
          </button>
          <button className={styles.btnReject} onClick={handleReject}>
            Solo necesarias
          </button>
        </div>
      </div>
    </div>
  );
}
