import Footer from "@/components/Footer";
import styles from "./PrivacidadPage.module.css";

export default function PrivacidadPage() {
  return (
    <>
      <div style={{ background: "#f0ebe0" }}>
        <div className={styles.page}>
          {/* Hero */}
          <div className={styles.hero}>
            <h1>Política de Privacidad</h1>
            <p>
              Tu privacidad es importante para nosotros. Esta política explica
              cómo tratamos tus datos.
            </p>
            <p className={styles.heroMeta}>
              Última actualización: mayo 2026 · Vigente bajo la Ley 8968 de
              Costa Rica
            </p>
          </div>

          {/* Law badge */}
          <div className={styles.lawBadgeWrap}>
            <span className={styles.lawBadge}>
              ⚖️ Cumple con la Ley 8968 — Protección de Datos Personales de
              Costa Rica
            </span>
          </div>

          {/* Sección 1 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.sectionNum}>1</span>
              Responsable del tratamiento
            </div>
            <p>
              <strong>MiTicoBot</strong> es el responsable del tratamiento de
              los datos personales recopilados a través de este servicio. Para
              cualquier consulta relacionada con privacidad podés contactarnos
              en <strong>servicio@rodricode.com</strong>.
            </p>
          </div>

          {/* Sección 2 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.sectionNum}>2</span>
              Datos que recopilamos
            </div>
            <div className={styles.twoCol}>
              <div className={styles.miniCard}>
                <h4>Versión gratuita</h4>
                <p>
                  Solo una cookie anónima con un ID único para controlar el
                  límite de consultas diarias. No recopilamos nombre, correo ni
                  datos personales.
                </p>
              </div>
              <div className={styles.miniCard}>
                <h4>
                  Versión Pro{" "}
                  <span className={styles.badgeSoon}>Próximamente</span>
                </h4>
                <p>
                  Nombre, correo electrónico y datos de facturación para
                  gestionar la suscripción. Nunca compartimos estos datos con
                  terceros.
                </p>
              </div>
            </div>
          </div>

          {/* Sección 3 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.sectionNum}>3</span>
              Finalidad del tratamiento
            </div>
            <ul>
              <li>
                Controlar el límite de consultas gratuitas por día (cookie
                anónima)
              </li>
              <li>
                Mejorar la calidad del servicio de forma agregada y anónima
              </li>
              <li>
                Gestionar suscripciones y facturación en la versión Pro
                (próximamente)
              </li>
              <li>
                Enviar comunicaciones relacionadas con el servicio, solo si lo
                autorizás
              </li>
            </ul>
          </div>

          {/* Sección 4 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.sectionNum}>4</span>
              Base legal
            </div>
            <p>
              El tratamiento de datos se realiza con base en el{" "}
              <strong>consentimiento del usuario</strong>, conforme al artículo
              5 de la Ley 8968. Al usar MiTicoBot aceptás esta política. Podés
              retirar tu consentimiento en cualquier momento escribiendo a
              holamiticobot@gmail.com.
            </p>
          </div>

          {/* Sección 5 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.sectionNum}>5</span>
              Proveedores técnicos
            </div>
            <p>
              Para operar el servicio utilizamos los siguientes proveedores,
              quienes pueden procesar datos de forma técnica:
            </p>
            <ul>
              <li>
                <strong>Anthropic</strong> — motor de inteligencia artificial
                (API de Claude)
              </li>
              <li>
                <strong>Vercel</strong> — alojamiento web
              </li>
              <li>
                <strong>Supabase</strong> — base de datos (control de uso
                anónimo)
              </li>
            </ul>
            <p>
              Estos proveedores cuentan con sus propias políticas de privacidad
              y operan bajo estándares internacionales de seguridad.
            </p>
          </div>

          {/* Sección 6 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.sectionNum}>6</span>
              Conservación de datos
            </div>
            <ul>
              <li>
                <strong>Cookies anónimas:</strong> 30 días desde la última
                visita
              </li>
              <li>
                <strong>Datos de cuenta Pro:</strong> mientras dure la
                suscripción activa, y hasta 90 días después de cancelarla
              </li>
              <li>
                <strong>Conversaciones:</strong> almacenamiento temporal para
                mejora del servicio, sin asociación a identidad personal
              </li>
            </ul>
          </div>

          {/* Sección 7 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.sectionNum}>7</span>
              Tus derechos
            </div>
            <p>
              Conforme a la Ley 8968, tenés los siguientes derechos sobre tus
              datos:
            </p>
            <div className={styles.rightsGrid}>
              <div className={styles.rightItem}>
                <strong>Acceso</strong>
                Conocer qué datos tenemos sobre vos
              </div>
              <div className={styles.rightItem}>
                <strong>Rectificación</strong>
                Corregir datos incorrectos o desactualizados
              </div>
              <div className={styles.rightItem}>
                <strong>Supresión</strong>
                Solicitar la eliminación de tus datos
              </div>
              <div className={styles.rightItem}>
                <strong>Oposición</strong>
                Oponerte al tratamiento de tus datos
              </div>
            </div>
            <p>
              Para ejercer cualquiera de estos derechos escribinos a{" "}
              <strong>servicio@rodricode.com</strong>. Responderemos en un plazo
              máximo de <strong>10 días hábiles</strong>.
            </p>
          </div>

          {/* Sección 8 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.sectionNum}>8</span>
              Cookies
            </div>
            <p>
              MiTicoBot usa únicamente cookies técnicas necesarias para el
              funcionamiento del servicio. No usamos cookies de rastreo
              publicitario ni compartimos información con redes de anuncios de
              terceros.
            </p>
          </div>

          {/* Sección 9 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.sectionNum}>9</span>
              Modificaciones
            </div>
            <p>
              Nos reservamos el derecho de actualizar esta política. Cualquier
              cambio será publicado en esta página con la fecha de
              actualización. Te recomendamos revisarla periódicamente.
            </p>
          </div>

          {/* Contacto */}
          <div className={styles.contactBox}>
            <p>¿Tenés dudas sobre tu privacidad?</p>
            <p>
              <a href="mailto:servicio@rodricode.com">servicio@rodricode.com</a>
            </p>
            <small>Respondemos en máximo 10 días hábiles</small>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
