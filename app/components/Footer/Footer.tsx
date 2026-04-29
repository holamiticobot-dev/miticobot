"use client";
import Link from "next/link";
import styles from "./Footer.module.css";
import { useState } from "react";
import TermsModal from "@/components/TermsModal";

export default function Footer() {
  const year = new Date().getFullYear();
  const [showTerms, setShowTerms] = useState(false);
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        {/* Brand */}
        <div className={styles.brandCol}>
          <div className={styles.brand}>
            <div className={styles.brandIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
            </div>
            <span className={styles.brandName}>MiTicoBot</span>
          </div>
          <p className={styles.brandDesc}>
            Tu asistente inteligente para trámites del gobierno costarricense.
            Rápido y siempre disponible.
          </p>
        </div>

        {/* Trámites */}
        <div>
          <p className={styles.colTitle}>Trámites</p>
          <ul className={styles.colLinks}>
            <li>
              <Link href="/hacienda">Hacienda CR</Link>
            </li>
            <li>
              <Link href="/tributacion">Tributación Digital</Link>
            </li>
            {/*   <li>
              <Link href="/ccss">CCSS</Link>
            </li>
            <li>
              <Link href="/registro-civil">Registro Civil</Link>
            </li>
            <li>
              <Link href="/mopt">MOPT</Link>
            </li> */}
          </ul>
        </div>

        {/* Recursos */}
        <div>
          <p className={styles.colTitle}>Recursos</p>
          <ul className={styles.colLinks}>
            {/*  <li>
              <Link href="/guias">Guías</Link>
            </li> */}
            <li>
              <Link href="/faq">Preguntas frecuentes</Link>
            </li>
            {/*  <li>
              <Link href="/blog">Blog</Link>
            </li> */}
            <li>
              <Link href="/novedades">Novedades</Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <p className={styles.colTitle}>Legal</p>
          <ul className={styles.colLinks}>
            <li>
              <button onClick={() => setShowTerms(true)}>
                Términos de uso
              </button>
            </li>
            <li>
              <Link href="/privacidad">Privacidad</Link>
            </li>
            <li>
              <Link href="/cookies">Cookies</Link>
            </li>
            <li>
              <Link href="/contacto">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.footerBottom}>
        <span className={styles.copyright}>
          &copy; {year} MiTicoBot. Todos los derechos reservados.
        </span>
        <span className={styles.madeBy}>
          Hecho con <span className={styles.heart}>♥</span> en Costa Rica por{" "}
          <a
            href="https://www.rodricode.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            RodriCode &mdash; Rodrigo Sancho
          </a>
        </span>
      </div>
      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
    </footer>
  );
}
