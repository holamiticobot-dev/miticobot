import Hero from "@/components/Hero";
import AdSlot from "@/components/AdSlot";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* Banner — solo móvil y tablet */}
      <div className={styles.bannerTop}>
        <AdSlot type="banner" />
      </div>

      {/* Layout con sidebars — desktop */}
      <div className={styles.pageLayout}>
        <AdSlot type="sidebar" />
        <Hero />
        <AdSlot type="sidebar" />
      </div>

      {/* Banner — solo móvil y tablet */}
      <div className={styles.bannerBottom}>
        <AdSlot type="banner" />
      </div>
    </>
  );
}
