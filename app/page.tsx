"use client";
import { useState, useEffect } from "react";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import Hero from "./components/Hero";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // false = sin anuncios (ahora)
  // true  = con anuncios (cuando AdSense apruebe)
  const hasAds = false;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className={styles.main}>
      {/* Banner arriba — SOLO MÓVIL */}
      {mounted && hasAds && (
        <div className={styles.bannerTop}>
          <AdSlot type="banner" />
        </div>
      )}

      {/* Desktop: [sidebar] [Hero] [sidebar] */}
      <div className={styles.pageLayout}>
        {mounted && hasAds && <AdSlot type="sidebar" />}
        <Hero />
        {mounted && hasAds && <AdSlot type="sidebar" />}
      </div>

      <Footer />
    </main>
  );
}
