"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.texture} />

      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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
              <path
                d="M12 8V6"
                stroke="#FAFAF7"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>MiTicoBot</span>
            <span className={styles.logoTagline}>Tu asistente de trámites</span>
          </div>
        </Link>

        {/* Nav desktop */}
        <nav className={styles.nav}>
          <Link href="/" className={styles.active}>
            Inicio
          </Link>
          <Link href="/tramites">Trámites</Link>

          {/* <Link href="/hacienda">Hacienda CR</Link>
          <Link href="/ayuda">Ayuda</Link> */}
        </nav>

        {/* CTA desktop */}
        {/*   <div className={styles.cta}>
          <button className={styles.btnSecondary}>Iniciar sesión</button>
          <button className={styles.btnPrimary}>Comenzar gratis</button>
        </div> */}

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className={styles.mobileMenu}>
          <Link
            href="/"
            className={styles.active}
            onClick={() => setMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link href="/tramites" onClick={() => setMenuOpen(false)}>
            Trámites <span className={styles.badge}>Nuevo</span>
          </Link>
          <Link href="/hacienda" onClick={() => setMenuOpen(false)}>
            Hacienda CR
          </Link>
          <Link href="/ayuda" onClick={() => setMenuOpen(false)}>
            Ayuda
          </Link>
          {/*   <div className={styles.mobileMenuCta}>
            <button className={styles.btnSecondary}>Iniciar sesión</button>
            <button className={styles.btnPrimary}>Comenzar gratis</button>
          </div> */}
        </nav>
      )}
    </header>
  );
}
