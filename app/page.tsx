"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <main>
        <div className={styles.bannerTop}>
          {mounted && <AdSlot type="banner" />}
        </div>

        <div className={styles.pageLayout}>
          {mounted && <AdSlot type="sidebar" />}
          <Hero />
          {mounted && <AdSlot type="sidebar" />}
        </div>

        <div className={styles.bannerBottom}>
          {mounted && <AdSlot type="banner" />}
        </div>

        <Footer />
      </main>
    </>
  );
}
