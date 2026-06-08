"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Chat.module.css";

const LIMITE_DIARIO = 15;
const STORAGE_KEY = "miticobot_consultas";

type Message = {
  role: "bot" | "user";
  text: string;
  time: string;
};

type ConsultasData = {
  count: number;
  date: string;
};

const temas: Record<string, { label: string; intro: string }> = {
  d101: {
    label: "Declaración D-101",
    intro:
      "Hola 👋 Veo que tenés dudas sobre la Declaración D-101 (Impuesto sobre la Renta). Es la declaración anual que deben presentar personas físicas y jurídicas. El plazo vence el 15 de marzo de cada año. ¿Qué necesitás saber?",
  },
  tributacion: {
    label: "Tributación Digital",
    intro:
      "Hola 👋 Estás consultando sobre Tributación Digital, el portal oficial de Hacienda en hacienda.go.cr. Desde ahí podés presentar declaraciones, pagar impuestos y más. ¿En qué te puedo ayudar?",
  },
  factura: {
    label: "Factura Electrónica",
    intro:
      "Hola 👋 Sobre Factura Electrónica — desde el 2018 es obligatoria en Costa Rica. Necesitás un sistema autorizado por Hacienda para emitirlas. ¿Tenés alguna duda específica?",
  },
  pagos: {
    label: "Pagos y multas",
    intro:
      "Hola 👋 Consultando sobre Pagos y multas de Hacienda. Podés pagar impuestos, ver deudas pendientes o consultar multas desde Tributación Digital. ¿Qué necesitás?",
  },
  sicop: {
    label: "SICOP",
    intro:
      "Hola 👋 Estás consultando sobre SICOP, el Sistema Integrado de Compras Públicas de Costa Rica. Podés registrarte como proveedor, consultar licitaciones activas y participar en compras del Estado en sicop.go.cr. ¿En qué te puedo ayudar?",
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

const getToday = () => new Date().toISOString().split("T")[0];

const getConsultas = (): ConsultasData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { count: 0, date: getToday() };
    const data: ConsultasData = JSON.parse(raw);
    // Si es un día nuevo, reiniciar contador
    if (data.date !== getToday()) return { count: 0, date: getToday() };
    return data;
  } catch {
    return { count: 0, date: getToday() };
  }
};

const saveConsultas = (data: ConsultasData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export default function Chat() {
  const searchParams = useSearchParams();
  const tema = searchParams.get("tema") ?? "";
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeChip, setActiveChip] = useState(tema || "todos");
  const [consultasHoy, setConsultasHoy] = useState(0);
  const [limitAlcanzado, setLimitAlcanzado] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastBotMsgRef = useRef<HTMLDivElement>(null);

  // Cargar contador al iniciar
  useEffect(() => {
    const data = getConsultas();
    setConsultasHoy(data.count);
    setLimitAlcanzado(data.count >= LIMITE_DIARIO);
  }, []);

  // Mensaje inicial según tema
  useEffect(() => {
    const temaInfo = temas[tema];
    const intro = temaInfo
      ? temaInfo.intro
      : "¡Hola! Soy MiTicoBot 👋 Estoy aquí para ayudarte con tus trámites de Hacienda Costa Rica. ¿En qué puedo ayudarte hoy?";
    setMessages([{ role: "bot", text: intro, time: getTime() }]);
    setActiveChip(tema || "todos");
  }, [tema]);

  // Scroll al inicio de la última respuesta del bot
  useEffect(() => {
    if (messages.length <= 1) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role === "bot") {
      setTimeout(() => {
        lastBotMsgRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    } else {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }, [messages]);

  useEffect(() => {
    if (isTyping) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isTyping]);

  const consultasRestantes = LIMITE_DIARIO - consultasHoy;

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || limitAlcanzado) return;

    // Verificar límite antes de enviar
    const dataActual = getConsultas();
    if (dataActual.count >= LIMITE_DIARIO) {
      setLimitAlcanzado(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "🚫 Llegaste al límite de 15 consultas gratuitas por hoy. El contador se reinicia mañana automáticamente. ¡Hasta mañana! 😊",
          time: getTime(),
        },
      ]);
      return;
    }

    const userMessage: Message = { role: "user", text, time: getTime() };
    const updatedMessages: Message[] = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    // Incrementar contador
    const nuevaData = { count: dataActual.count + 1, date: getToday() };
    saveConsultas(nuevaData);
    setConsultasHoy(nuevaData.count);
    if (nuevaData.count >= LIMITE_DIARIO) setLimitAlcanzado(true);

    try {
      const openaiMessages = updatedMessages
        .filter((m) => m.role === "user" || m.role === "bot")
        .map((m) => ({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.text,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: openaiMessages }),
      });

      const data = await res.json();

      const botReply =
        data.reply ?? "No pude procesar tu consulta. Intentá de nuevo.";

      // Agregar aviso cuando quedan pocas consultas
      const restantes = LIMITE_DIARIO - nuevaData.count;
      const avisoRestantes =
        restantes === 3
          ? "\n\n⚠️ *Te quedan 3 consultas gratuitas por hoy.*"
          : restantes === 1
            ? "\n\n⚠️ *Esta es tu última consulta gratuita de hoy.*"
            : "";

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: botReply + avisoRestantes,
          time: getTime(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Hubo un error al conectar. Verificá tu conexión e intentá de nuevo.",
          time: getTime(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleChip = (chipTema: string) => {
    setActiveChip(chipTema);
    router.push(chipTema === "todos" ? "/chat" : `/chat?tema=${chipTema}`);
  };

  return (
    <div className={styles.pageWrapper} style={{ background: "#f0ebe0" }}>
      <div className={styles.chatPage}>
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
            {/* Contador de consultas */}
            {consultasHoy > 0 && (
              <div className={styles.consultasCounter}>
                <span>
                  {consultasRestantes}/{LIMITE_DIARIO}
                </span>
              </div>
            )}
          </div>

          {/* Mensajes */}
          <div className={styles.messages}>
            {messages.map((msg, i) => {
              const isLastBot = msg.role === "bot" && i === messages.length - 1;
              return msg.role === "bot" ? (
                <div
                  key={i}
                  className={styles.msgBot}
                  ref={isLastBot ? lastBotMsgRef : null}
                >
                  <div className={`${styles.msgAvatar} ${styles.msgAvatarBot}`}>
                    <BotIcon />
                  </div>
                  <div className={styles.msgBubbleWrapper}>
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
                  <div className={styles.msgBubbleWrapper}>
                    <div className={styles.msgBubbleUser}>{msg.text}</div>
                    <div className={`${styles.msgTime} ${styles.msgTimeRight}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}

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
            {limitAlcanzado ? (
              <div className={styles.limiteBloqueado}>
                <p>
                  🚫 Límite diario alcanzado. Volvé mañana para más consultas
                  gratuitas.
                </p>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>

          <div className={styles.disclaimer}>
            Servicio informativo. No reemplaza asesoría profesional contable o
            legal.
          </div>
        </div>

        {/* Sidebar */}
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
    </div>
  );
}
