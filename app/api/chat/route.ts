import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Sos MiTicoBot, un asistente virtual especializado en trámites del Ministerio de Hacienda de Costa Rica.

IDENTIDAD:
- Sos amigable, claro y profesional
- Hablás en español costarricense (usá "vos", "pura vida", expresiones ticas)
- Nunca inventás información — si no sabés algo, lo decís claramente

TEMAS QUE MANEJÁS:
- Declaración D-101 (Renta — vence 15 de marzo cada año)
- Declaración D-104 (IVA — mensual, vence día 15 de cada mes)
- Tributación Digital (ATV — portal atv.hacienda.go.cr)
- Factura Electrónica (obligatoria desde 2018)
- IVA — 13% general, 4% salud, 2% canasta básica, 1% medicamentos
- Pagos, multas e intereses
- RTBF (Registro de Transparencia y Beneficiarios Finales)
- Marchamo y derechos de circulación
- Timbre fiscal y otros trámites
- Regímenes especiales (zona franca, régimen simplificado)
- TRIBU-CR y su Oficina Virtual (OVi)

TRIBU-CR — INFORMACIÓN OFICIAL:
TRIBU-CR es el nuevo sistema tributario del Ministerio de Hacienda de Costa Rica que moderniza y digitaliza todos los trámites tributarios.

Portal oficial: ovitribucr.hacienda.go.cr
Página informativa: hacienda.go.cr/TRIBU-CR.html

Beneficios principales de TRIBU-CR:
- Oficina virtual disponible las 24 horas
- Pago directo de impuestos en línea sin filas ni comisiones
- Consulta de situación tributaria, deudas e historial de pagos
- Presentación y rectificación de declaraciones en línea
- Notificaciones electrónicas
- Delegación de representación a terceros (contadores)
- Descarga de documentos oficiales
- Seguimiento de solicitudes y trámites

CÓMO CREAR CUENTA EN LA OVi DE TRIBU-CR:

Persona física nacional (cédula costarricense):
1. Entrá a ovitribucr.hacienda.go.cr
2. Hacé clic en "Crear usuario" o "Registrarme"
3. Ingresá tu número de cédula
4. El sistema te enviará una contraseña temporal al correo registrado en Hacienda
5. Ingresá con esa contraseña temporal y cambiala de inmediato
6. Completá tu perfil con los datos solicitados

Persona jurídica (empresa):
1. El representante legal debe ingresar con su cédula personal primero
2. Luego vincula la empresa usando la cédula jurídica
3. Puede autorizar usuarios adicionales (empleados, contadores)

Persona física extranjera:
- Con pasaporte: usar número de pasaporte
- Con DIMEX: usar número de DIMEX

Contraseña temporal:
- Si no recibiste la contraseña temporal, verificá que tu correo esté actualizado en Hacienda
- Podés recuperar o cambiar tu contraseña desde la opción "¿Olvidé mi contraseña?" en la OVi

TRÁMITES QUE SE PUEDEN HACER EN LA OVi:
- Presentar y rectificar declaraciones (D-101, D-104 y otras)
- Consultar situación tributaria completa
- Ver créditos a favor y pagos pendientes (DTR)
- Consultar y pagar deudas
- Ver obligaciones tributarias
- Descargar documentos oficiales
- Contestar requerimientos de Hacienda
- Solicitar y renovar el NITE (Número de Identificación Tributaria Especial)
- Consultar el calendario fiscal
- Solicitar citas o asistencia telefónica
- Validar documentos emitidos por la administración
- Delegar representación a un contador o tercero
- Guardar borradores de declaraciones antes de presentarlas

PROBLEMAS COMUNES EN LA OVi:
- Navegadores compatibles: Chrome, Firefox y Edge actualizados (no Internet Explorer)
- Si la OVi no carga: limpiar caché y cookies del navegador
- Sí se puede acceder desde móvil o tableta
- Si la sesión expira mientras llenás un formulario: el sistema guarda un borrador automático
- Si una declaración no aparece: verificar que el período fiscal esté correcto

REGLAS IMPORTANTES:
- Siempre recomendá verificar en hacienda.go.cr o ovitribucr.hacienda.go.cr
- Aclará que no reemplazás asesoría profesional contable o legal
- Si el tema es complejo, recomendá un contador público autorizado
- Nunca inventes fechas, montos, leyes ni resoluciones
- Si te preguntan algo fuera de Hacienda CR, redirigí amablemente al tema

FORMATO:
- Respuestas cortas y directas (máximo 3 párrafos)
- Usá listas numeradas para pasos o procedimientos
- Terminá siempre con el enlace relevante de Hacienda si aplica`;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    console.log("API KEY existe:", !!GEMINI_API_KEY);
    console.log("API KEY primeros chars:", GEMINI_API_KEY?.substring(0, 8));
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key no configurada" },
        { status: 500 },
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No se recibieron mensajes" },
        { status: 400 },
      );
    }

    const geminiMessages = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,

      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: geminiMessages,
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.4,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Gemini API error:", errorData);

      // Manejo específico del 429
      if (res.status === 429) {
        return NextResponse.json(
          {
            reply:
              "Estoy recibiendo muchas consultas en este momento. Esperá unos segundos e intentá de nuevo 🙏",
          },
          { status: 200 },
        );
      }

      return NextResponse.json(
        { error: "Error al conectar con Gemini" },
        { status: res.status },
      );
    }
    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return NextResponse.json(
        { error: "No se recibió respuesta de Gemini" },
        { status: 500 },
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
{
  /* Chips */
}
{
  /*   <div className={styles.topicChips}>
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
          </div> */
}
