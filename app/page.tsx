import Hero from "@/components/Hero";
import AdSlot from "@/components/AdSlot";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <div className={styles.bannerTop}>
          <AdSlot type="banner" />
        </div>
        <div className={styles.pageLayout}>
          <AdSlot type="sidebar" />
          <Hero />
          <AdSlot type="sidebar" />
        </div>
        <div className={styles.bannerBottom}>
          <AdSlot type="banner" />
        </div>
        <Footer />
      </main>
    </>
  );
}
