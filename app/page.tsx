"use client";
import { useState, useEffect } from "react";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import Hero from "./components/Hero";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const hasAds = false; // cambiar a true cuando AdSense apruebe

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

      {/* Grid: sidebar | Hero | sidebar en desktop */}
      <div className={styles.pageLayout}>
        {mounted && hasAds && <AdSlot type="sidebar" />}
        <Hero />
        {mounted && hasAds && <AdSlot type="sidebar" />}
      </div>

      {/* Banner abajo — SOLO MÓVIL — NO hay banner debajo del footer */}
      {mounted && hasAds && (
        <div className={styles.bannerBottom}>
          <AdSlot type="banner" />
        </div>
      )}

      <Footer />
    </main>
  );
}
