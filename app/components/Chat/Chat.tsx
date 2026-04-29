"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Chat.module.css";

type Message = {
  role: "bot" | "user";
  text: string;
  time: string;
};

const temas: Record<string, { label: string; intro: string }> = {
  d101: {
    label: "Declaración D-101",
    intro:
      "Hola 👋 Veo que tenés dudas sobre la **Declaración D-101** (Impuesto sobre la Renta). Es la declaración anual que deben presentar personas físicas y jurídicas. El plazo vence el **15 de marzo** de cada año. ¿Qué necesitás saber?",
  },
  tributacion: {
    label: "Tributación Digital",
    intro:
      "Hola 👋 Estás consultando sobre **Tributación Digital**, el portal oficial de Hacienda en hacienda.go.cr. Desde ahí podés presentar declaraciones, pagar impuestos y más. ¿En qué te puedo ayudar?",
  },
  factura: {
    label: "Factura Electrónica",
    intro:
      "Hola 👋 Sobre **Factura Electrónica** — desde el 2018 es obligatoria en Costa Rica. Necesitás un sistema autorizado por Hacienda para emitirlas. ¿Tenés alguna duda específica?",
  },
  pagos: {
    label: "Pagos y multas",
    intro:
      "Hola 👋 Consultando sobre **Pagos y multas** de Hacienda. Podés pagar impuestos, ver deudas pendientes o consultar multas desde Tributación Digital. ¿Qué necesitás?",
  },
};

const BotIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M8 12.5c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2.5z"
      fill="#7CB95A"
    />
    <circle cx="10.5" cy="11" r="1" fill="#2D5016" />
    <circle cx="13.5" cy="11" r="1" fill="#2D5016" />
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" fill="#2D5016" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#2D5016" strokeWidth="1.5" />
  </svg>
);

const getTime = () =>
  new Date().toLocaleTimeString("es-CR", {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function Chat() {
  const searchParams = useSearchParams();
  const tema = searchParams.get("tema") ?? "";
  const temaInfo = temas[tema] ?? null;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeChip, setActiveChip] = useState(tema || "todos");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      setMessages([
        {
          role: "bot",
          text: "¡Hola! Soy MiTicoBot 👋 Estoy aquí para ayudarte con tus trámites de Hacienda Costa Rica. ¿En qué puedo ayudarte hoy?",
          time: getTime(),
        },
      ]);
      setActiveChip("todos");
    }
  }, [tema]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: "user", text, time: getTime() }]);
    setInput("");
    setIsTyping(true);

    // Aquí va la llamada a la API de Claude — por ahora respuesta de prueba
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Gracias por tu consulta. Pronto estaré conectado con la documentación oficial de Hacienda para darte la respuesta más precisa.",
          time: getTime(),
        },
      ]);
    }, 1500);
  };

  const router = useRouter();
  const handleChip = (chipTema: string) => {
    setActiveChip(chipTema);
    if (chipTema === "todos") {
      router.push("/chat");
    } else {
      router.push(`/chat?tema=${chipTema}`);
    }
  };
  return (
    <div
      style={{
        background: "#f0ebe0",
        height: "calc(100vh - 68px)",
        overflow: "hidden",
      }}
    >
      <div className={styles.chatPage}>
        {/* Chat */}
        <div className={styles.chatContainer}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 12.5c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2.5z"
                  fill="#FAFAF7"
                />
                <circle cx="10.5" cy="11" r="1" fill="#2D5016" />
                <circle cx="13.5" cy="11" r="1" fill="#2D5016" />
                <path
                  d="M10 13.5h4"
                  stroke="#2D5016"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className={styles.chatHeaderInfo}>
              <p>Asistente de trámites</p>
            </div>
            <div className={styles.chatStatus}>
              <div className={styles.statusDot} />
              <span className={styles.statusText}>En línea</span>
            </div>
          </div>

          {/* Chips */}
          <div className={styles.topicChips}>
            {[
              { key: "todos", label: "Todos los temas" },
              { key: "d101", label: "D-101" },
              { key: "tributacion", label: "Tributación Digital" },
              { key: "factura", label: "Factura Electrónica" },
              { key: "pagos", label: "Pagos y multas" },
            ].map((chip) => (
              <button
                key={chip.key}
                onClick={() => handleChip(chip.key)}
                className={`${styles.topicChip} ${activeChip === chip.key ? styles.topicChipActive : ""}`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Mensajes */}
          <div className={styles.messages}>
            {messages.map((msg, i) =>
              msg.role === "bot" ? (
                <div key={i} className={styles.msgBot}>
                  <div className={`${styles.msgAvatar} ${styles.msgAvatarBot}`}>
                    <BotIcon />
                  </div>
                  <div>
                    <div className={styles.msgBubbleBot}>{msg.text}</div>
                    <div className={styles.msgTime}>{msg.time}</div>
                  </div>
                </div>
              ) : (
                <div key={i} className={styles.msgUser}>
                  <div
                    className={`${styles.msgAvatar} ${styles.msgAvatarUser}`}
                  >
                    <UserIcon />
                  </div>
                  <div>
                    <div className={styles.msgBubbleUser}>{msg.text}</div>
                    <div className={`${styles.msgTime} ${styles.msgTimeRight}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ),
            )}

            {isTyping && (
              <div className={styles.msgBot}>
                <div className={`${styles.msgAvatar} ${styles.msgAvatarBot}`}>
                  <BotIcon />
                </div>
                <div className={styles.typing}>
                  <div className={styles.typingDot} />
                  <div className={styles.typingDot} />
                  <div className={styles.typingDot} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={styles.chatInputArea}>
            <div className={styles.inputRow}>
              <textarea
                className={styles.chatTextarea}
                placeholder="Escribí tu consulta sobre trámites de Hacienda..."
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <button className={styles.sendBtn} onClick={sendMessage}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                    stroke="#F5F0E8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p className={styles.inputHint}>
              MiTicoBot puede cometer errores. Verificá en hacienda.go.cr
            </p>
          </div>
          <div className={styles.disclaimer}>
            Servicio informativo. No reemplaza asesoría profesional contable o
            legal.
          </div>
        </div>

        {/* Sidebar anuncio */}
        <div className={styles.adCol}>
          <div className={styles.adSidebar}>
            <span className={styles.adTag}>Anuncio</span>
            <div className={styles.adIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 12.5c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2.5z"
                  fill="#FAFAF7"
                />
                <circle cx="10.5" cy="11" r="1" fill="#2D5016" />
                <circle cx="13.5" cy="11" r="1" fill="#2D5016" />
              </svg>
            </div>
            <h4>¿Querés anunciarte aquí?</h4>
            <p>Llegá a miles de contadores y emprendedores costarricenses</p>
            <button className={styles.adBtn}>Contáctanos</button>
          </div>
        </div>
      </div>

      {/* Banner móvil */}
      <div className={styles.adBannerMobile}>
        <div className={styles.adIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M8 12.5c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2.5z"
              fill="#FAFAF7"
            />
            <circle cx="10.5" cy="11" r="1" fill="#2D5016" />
            <circle cx="13.5" cy="11" r="1" fill="#2D5016" />
          </svg>
        </div>
        <div>
          <h4>¿Querés anunciarte aquí?</h4>
          <p>Llegá a contadores y emprendedores ticos</p>
        </div>
        <button className={styles.adBannerBtn}>Contáctanos</button>
      </div>
    </div>
  );
}
