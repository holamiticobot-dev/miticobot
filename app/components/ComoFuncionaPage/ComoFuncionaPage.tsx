import Link from "next/link";
import Footer from "@/components/Footer";
import styles from "./ComoFuncionaPage.module.css";

const steps = [
  {
    num: "1",
    title: "Elegí el trámite que necesitás",
    desc: "Seleccioná el tema sobre el que tenés dudas — Declaración D-101, Tributación Digital, Factura Electrónica o Pagos y multas. También podés hacer una consulta general.",
  },
  {
    num: "2",
    title: "Escribí tu pregunta en el chat",
    desc: "Describí tu duda con tus propias palabras. MiTicoBot entiende lenguaje natural — no necesitás usar términos técnicos ni formatos especiales.",
  },
  {
    num: "3",
    title: "Recibí una respuesta clara y precisa",
    desc: "MiTicoBot te responde al instante con información basada en documentación oficial de Hacienda CR. Si la respuesta no es suficiente, podés seguir preguntando.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <>
      <div style={{ background: "#f0ebe0" }}>
        <div className={styles.page}>
          {/* Hero */}
          <div className={styles.hero}>
            <h1>¿Cómo funciona MiTicoBot?</h1>
            <p>
              En tres pasos simples podés resolver tus dudas sobre trámites del
              gobierno costarricense.
            </p>
          </div>

          {/* Pasos */}
          <div className={styles.steps}>
            {steps.map((step) => (
              <div key={step.num} className={styles.step}>
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepContent}>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepContent}>
                <p>
                  MiTicoBot te ofrece 15 consultas gratuitas al día. De esta
                  forma podés resolver tus dudas de manera rápida y sencilla sin
                  costo inicial.
                </p>
                <p>
                  Muy pronto lanzaremos un plan de pago ilimitado, pensado para
                  quienes necesitan hacer más consultas sin restricciones y con
                  acceso continuo a todas las funciones avanzadas de TicoBot.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className={styles.disclaimer}>
            <p>
              <strong>Recordá:</strong> MiTicoBot es un asistente informativo.
              La información que brinda no reemplaza la asesoría de un contador
              o abogado. Siempre verificá en los sitios oficiales.
            </p>
          </div>

          {/* CTA */}
          <div className={styles.cta}>
            <Link href="/chat" className={styles.ctaBtn}>
              Hacer una consulta ahora
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
