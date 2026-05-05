"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Footer from "@/components/Footer";
import styles from "./ContactPage.module.css";

interface FormData {
  nombre: string;
  correo: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  correo?: string;
  mensaje?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    correo: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorDetail, setErrorDetail] = useState<string>("");
  const captchaRef = useRef<HCaptcha>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "El correo no es válido";
    }
    if (!formData.mensaje.trim())
      newErrors.mensaje = "El mensaje es obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!captchaToken) {
      alert("Por favor completá el captcha");
      return;
    }

    setStatus("loading");
    setErrorDetail("");

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.nombre,
          from_email: formData.correo,
          message: formData.mensaje,
          to_email: "servicio@rodricode.com",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      console.log("EmailJS success:", result);
      setStatus("success");
      setFormData({ nombre: "", correo: "", mensaje: "" });
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
    } catch (error: unknown) {
      const err = error as { status?: number; text?: string };
      const detail = `Status: ${err?.status} — ${err?.text}`;
      console.error("EmailJS error:", detail);
      setErrorDetail(detail);
      setStatus("error");
    }
  };

  return (
    <>
      <div style={{ background: "#f0ebe0" }}>
        <div className={styles.page}>
          <div className={styles.hero}>
            <h1>Contacto</h1>
            <p>
              ¿Tenés alguna consulta o sugerencia? Escribinos y te respondemos
              pronto.
            </p>
          </div>

          <div className={styles.formCard}>
            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={errors.nombre ? styles.error : ""}
                />
                {errors.nombre && (
                  <p className={styles.errorMsg}>{errors.nombre}</p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="correo">Correo electrónico</label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={formData.correo}
                  onChange={handleChange}
                  className={errors.correo ? styles.error : ""}
                />
                {errors.correo && (
                  <p className={styles.errorMsg}>{errors.correo}</p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  placeholder="¿En qué te podemos ayudar?"
                  value={formData.mensaje}
                  onChange={handleChange}
                  className={errors.mensaje ? styles.error : ""}
                />
                {errors.mensaje && (
                  <p className={styles.errorMsg}>{errors.mensaje}</p>
                )}
              </div>

              <div className={styles.captchaWrap}>
                <HCaptcha
                  ref={captchaRef}
                  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                  onVerify={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken(null)}
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>

            {status === "success" && (
              <div className={styles.success}>
                <p>✅ ¡Mensaje enviado! Te respondemos pronto.</p>
              </div>
            )}

            {status === "error" && (
              <div className={styles.errorGeneral}>
                <p>
                  ❌ Hubo un error al enviar. Intentá de nuevo o escribinos
                  directamente.
                </p>
                {errorDetail && (
                  <p
                    style={{
                      fontSize: "11px",
                      marginTop: "6px",
                      color: "#999",
                    }}
                  >
                    {errorDetail}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className={styles.infoBox}>
            <div className={styles.infoIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  stroke="#F5F0E8"
                  strokeWidth="1.5"
                />
                <path
                  d="M22 6l-10 7L2 6"
                  stroke="#F5F0E8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className={styles.infoText}>
              <p>
                También podés escribirnos directamente a<br />
                <a href="mailto:servicio@rodricode.com">
                  servicio@rodricode.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
