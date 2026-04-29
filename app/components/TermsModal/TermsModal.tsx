"use client";

import styles from "./TermsModal.module.css";

interface TermsModalProps {
  onClose: () => void;
}

export default function TermsModal({ onClose }: TermsModalProps) {
  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div>
            <h2>Términos de Uso y Privacidad</h2>
            <p>MiTicoBot · Última actualización: abril 2026</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {/* Disclaimer */}
          <div className={styles.disclaimerBox}>
            <div className={styles.disclaimerIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  stroke="#2D5016"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p>
              <strong>Importante:</strong> MiTicoBot es un asistente
              informativo. La información proporcionada{" "}
              <strong>no constituye asesoría legal, contable ni fiscal</strong>.
              Siempre consultá con un profesional calificado y verificá en los
              sitios oficiales.
            </p>
          </div>

          {/* Sección 1 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.sectionNum}>1</span>
              Naturaleza del servicio
            </div>
            <p>
              MiTicoBot es un asistente virtual informativo para ciudadanos
              costarricenses. Actualmente cubre trámites de Hacienda CR
              (Tributación Digital, Declaración D-101, Factura Electrónica,
              Pagos y multas) y en el futuro se expandirá a otros ministerios e
              instituciones del gobierno de Costa Rica.
            </p>
          </div>

          {/* Sección 2 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.sectionNum}>2</span>
              Limitación de responsabilidad
            </div>
            <p>
              La información es de carácter orientativo únicamente. No reemplaza
              la consulta con un contador, abogado u otro profesional
              calificado. La información puede no estar actualizada — verificá
              siempre en hacienda.go.cr y los sitios oficiales correspondientes.
            </p>
          </div>

          {/* Sección 3 — Privacidad */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.sectionNum}>3</span>
              Privacidad y datos personales
            </div>
            <div className={styles.privacyCards}>
              <div className={styles.privacyCard}>
                <h4>Versión gratuita</h4>
                <p>
                  No requiere registro. Se usa una cookie anónima para el límite
                  de consultas diarias. No almacenamos datos personales
                  identificables.
                </p>
              </div>
              <div className={styles.privacyCard}>
                <h4>
                  Versión Pro{" "}
                  <span className={styles.badgeSoon}>Próximamente</span>
                </h4>
                <p>
                  Requerirá nombre y correo para gestionar la suscripción. No
                  compartimos datos con terceros. Podés solicitar la eliminación
                  de tus datos en cualquier momento.
                </p>
              </div>
            </div>
          </div>

          {/* Sección 4 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.sectionNum}>4</span>
              Uso aceptable
            </div>
            <p>
              Al usar MiTicoBot aceptás utilizarlo solo para fines informativos
              y legales. Queda prohibido el uso para actividades fraudulentas o
              ilegales bajo la legislación costarricense.
            </p>
          </div>

          {/* Sección 5 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.sectionNum}>5</span>
              Propiedad intelectual
            </div>
            <p>
              MiTicoBot y su diseño son propiedad de Rodrigo Sancho / RodriCode.
              El contenido informativo proviene de fuentes públicas oficiales
              del gobierno de Costa Rica.
            </p>
          </div>

          {/* Sección 6 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.sectionNum}>6</span>
              Contacto
            </div>
            <p>
              Para consultas o solicitudes de eliminación de datos:{" "}
              <strong>holamiticobot@gmail.com</strong>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <p>© 2026 MiTicoBot · RodriCode</p>
          <button className={styles.acceptBtn} onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
