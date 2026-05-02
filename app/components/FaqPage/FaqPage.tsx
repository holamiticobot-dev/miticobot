import Footer from "@/components/Footer";
import styles from "./FaqPage.module.css";

const faqs = [
  {
    category: "Sobre el servicio",
    items: [
      {
        q: "¿Qué es MiTicoBot?",
        a: "MiTicoBot es un asistente virtual que te ayuda a entender y orientarte en trámites del gobierno costarricense. Actualmente cubre trámites de Hacienda CR y próximamente se expandirá a otros ministerios.",
      },
      {
        q: "¿Es completamente gratis?",
        a: "Sí, la versión actual es completamente gratuita. En el futuro habrá una versión Pro con más funciones para profesionales y empresas, pero siempre habrá una opción gratuita disponible.",
      },
      {
        q: "¿Necesito crear una cuenta?",
        a: "No. Podés usar MiTicoBot sin registrarte ni crear una cuenta. Solo entrás y empezás a consultar. En versiones futuras habrá cuentas opcionales para funciones avanzadas.",
      },
      {
        q: "¿Cuántas preguntas puedo hacer?",
        a: "En la versión gratuita podés hacer hasta 15 consultas por día. El contador se reinicia cada 24 horas automáticamente.",
      },
    ],
  },
  {
    category: "Sobre la información",
    items: [
      {
        q: "¿La información que da MiTicoBot es oficial?",
        a: "MiTicoBot se basa en documentación pública oficial del gobierno de Costa Rica. Sin embargo, siempre recomendamos verificar la información directamente en hacienda.go.cr o con un profesional calificado.",
        link: { text: "hacienda.go.cr", href: "https://hacienda.go.cr" },
      },
      {
        q: "¿MiTicoBot reemplaza a un contador o abogado?",
        a: "No. MiTicoBot es una herramienta informativa y orientativa. No reemplaza la asesoría de un contador público, abogado u otro profesional. Para decisiones importantes siempre consultá con un experto.",
      },
      {
        q: "¿Por qué solo cubre Hacienda CR por ahora?",
        a: "Empezamos con Hacienda porque es uno de los ministerios con más consultas frecuentes entre costarricenses. Estamos trabajando para agregar CCSS, Registro Civil, MOPT y más próximamente.",
      },
    ],
  },
  {
    category: "Privacidad",
    items: [
      {
        q: "¿Guardan mis conversaciones?",
        a: "Las conversaciones pueden almacenarse temporalmente para mejorar el servicio, pero no se asocian a tu identidad en la versión gratuita. No recopilamos datos personales sin tu consentimiento.",
      },
      {
        q: "¿Necesitan mis datos personales?",
        a: "No. La versión gratuita no requiere ningún dato personal. Solo se usa una cookie anónima para controlar el límite de consultas diarias.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <div style={{ background: "#f0ebe0" }}>
        <div className={styles.page}>
          {/* Hero */}
          <div className={styles.hero}>
            <h1>Preguntas frecuentes</h1>
            <p>Todo lo que necesitás saber sobre MiTicoBot antes de empezar.</p>
          </div>

          {/* FAQ sections */}
          {faqs.map((section) => (
            <div key={section.category} className={styles.section}>
              <p className={styles.sectionLabel}>{section.category}</p>
              {section.items.map((item) => (
                <div key={item.q} className={styles.faqItem}>
                  <div className={styles.faqQ}>
                    <span className={styles.faqArrow}>→</span>
                    {item.q}
                  </div>
                  <div className={styles.faqA}>
                    {item.link ? (
                      <>
                        {item.a.split(item.link.text)[0]}
                        <a
                          href={item.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.link.text}
                        </a>
                        {item.a.split(item.link.text)[1]}
                      </>
                    ) : (
                      item.a
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Contacto */}
          <div className={styles.contact}>
            <p>
              ¿Tenés alguna otra pregunta? Escribinos a{" "}
              <a href="mailto:servicio@rodricode.com">servicio@rodricode.com</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
