"use client";

import { useState, useEffect } from "react";

import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

import Hero from "./components/Hero";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const hasAds = false; // por ahora no hay anuncios

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main>
      {/* Banner superior solo si hay anuncios */}
      {mounted && hasAds && (
        <div className={styles.bannerTop}>
          <AdSlot type="banner" />
        </div>
      )}

      <div className={styles.pageLayout}>
        {/* Sidebar izquierdo solo si hay anuncios */}
        {mounted && hasAds && <AdSlot type="sidebar" />}

        {/* Hero SIEMPRE visible */}
        <Hero></Hero>

        {/* Sidebar derecho solo si hay anuncios */}
        {mounted && hasAds && <AdSlot type="sidebar" />}
      </div>

      {/* Banner inferior solo si hay anuncios */}
      {mounted && hasAds && (
        <div className={styles.bannerBottom}>
          <AdSlot type="banner" />
        </div>
      )}

      <Footer />
    </main>
  );
}
