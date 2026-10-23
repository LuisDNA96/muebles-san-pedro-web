import { obtenerProductoPorId } from "../src/data/products.js";

const MAX_BODY_BYTES = 12_000;
const RECEIVER_TIMEOUT_MS = 8_000;
const MAX_LENGTHS = {
  nombre: 100,
  correo: 254,
  telefono: 30,
  asunto: 150,
  mensaje: 5_000,
};

function responder(res, status, body) {
  res.status(status).json(body);
}

function validarTexto(valor, maximo) {
  return typeof valor === "string" && valor.trim().length > 0 && valor.trim().length <= maximo;
}

function validarSolicitud(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "El cuerpo de la solicitud no es válido." };
  }

  const nombre = typeof body.nombre === "string" ? body.nombre.trim() : "";
  const correo = typeof body.correo === "string" ? body.correo.trim() : "";
  const telefono = typeof body.telefono === "string" ? body.telefono.trim() : "";
  const asunto = typeof body.asunto === "string" ? body.asunto.trim() : "";
  const mensaje = typeof body.mensaje === "string" ? body.mensaje.trim() : "";

  if (!validarTexto(nombre, MAX_LENGTHS.nombre)) {
    return { error: "El nombre es obligatorio y debe tener como máximo 100 caracteres." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || correo.length > MAX_LENGTHS.correo) {
    return { error: "El correo electrónico no es válido." };
  }
  if (telefono && (!/^[\d\s()+-]{7,30}$/.test(telefono) || telefono.length > MAX_LENGTHS.telefono)) {
    return { error: "El teléfono no es válido." };
  }
  if (!validarTexto(asunto, MAX_LENGTHS.asunto)) {
    return { error: "El asunto es obligatorio y debe tener como máximo 150 caracteres." };
  }
  if (mensaje.length < 20 || mensaje.length > MAX_LENGTHS.mensaje) {
    return { error: "El mensaje debe tener entre 20 y 5000 caracteres." };
  }

  let productId;
  if (body.productId !== undefined && body.productId !== null && body.productId !== "") {
    productId = Number(body.productId);
    if (!Number.isInteger(productId) || !obtenerProductoPorId(productId)) {
      return { error: "El producto indicado no es válido." };
    }
  }

  return {
    data: {
      nombre,
      correo,
      telefono,
      asunto,
      mensaje,
      ...(productId ? { productId } : {}),
    },
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return responder(res, 405, { error: "Método no permitido." });
  }

  const contentType = req.headers?.["content-type"] || req.headers?.["Content-Type"];
  if (contentType && !contentType.toLowerCase().startsWith("application/json")) {
    return responder(res, 415, { error: "El contenido debe enviarse como JSON." });
  }

  const rawBody = typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? "");
  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
    return responder(res, 413, { error: "La solicitud es demasiado grande." });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return responder(res, 400, { error: "El cuerpo de la solicitud debe ser JSON válido." });
  }

  const solicitud = validarSolicitud(body);
  if (solicitud.error) {
    return responder(res, 400, { error: solicitud.error });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return responder(res, 503, { error: "El servicio de contacto no está configurado." });
  }

  const headers = { "Content-Type": "application/json" };
  if (process.env.CONTACT_WEBHOOK_TOKEN) {
    headers.Authorization = `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), RECEIVER_TIMEOUT_MS);
  try {
    const respuesta = await fetch(webhookUrl, {
      method: "POST",
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        ...solicitud.data,
        producto: solicitud.data.productId ? obtenerProductoPorId(solicitud.data.productId).nombre : null,
      }),
    });
    if (!respuesta.ok) {
      return responder(res, 502, { error: "El servicio de recepción no confirmó la solicitud." });
    }
  } catch {
    return responder(res, 502, { error: "No fue posible conectar con el servicio de recepción." });
  } finally {
    clearTimeout(timeout);
  }

  return responder(res, 200, { ok: true, message: "Solicitud recibida correctamente." });
}
