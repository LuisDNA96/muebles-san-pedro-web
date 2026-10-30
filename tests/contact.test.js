import { beforeEach, describe, expect, it, vi } from "vitest";
import process from "node:process";
import handler from "../api/contact.js";

function crearRespuesta() {
  return {
    statusCode: undefined,
    body: undefined,
    headers: {},
    setHeader(nombre, valor) {
      this.headers[nombre] = valor;
    },
    status(codigo) {
      this.statusCode = codigo;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

const solicitudValida = {
  nombre: "Prueba",
  correo: "prueba@example.com",
  telefono: "",
  asunto: "Consulta demo",
  mensaje: "Mensaje de prueba con más de veinte caracteres.",
  productId: 1,
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    delete process.env.CONTACT_WEBHOOK_URL;
    delete process.env.CONTACT_WEBHOOK_TOKEN;
    vi.restoreAllMocks();
  });

  it("rechaza métodos distintos de POST", async () => {
    const res = crearRespuesta();

    await handler({ method: "GET", headers: {} }, res);

    expect(res.statusCode).toBe(405);
    expect(res.headers.Allow).toBe("POST");
  });

  it("rechaza JSON inválido y productId inexistente", async () => {
    const jsonInvalido = crearRespuesta();
    await handler(
      { method: "POST", headers: { "content-type": "application/json" }, body: "{" },
      jsonInvalido,
    );
    expect(jsonInvalido.statusCode).toBe(400);

    const productoInvalido = crearRespuesta();
    await handler(
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: { ...solicitudValida, productId: 999 },
      },
      productoInvalido,
    );
    expect(productoInvalido.statusCode).toBe(400);
  });

  it("devuelve 503 si la solicitud es válida pero no hay receptor configurado", async () => {
    const res = crearRespuesta();

    await handler({ method: "POST", headers: {}, body: solicitudValida }, res);

    expect(res.statusCode).toBe(503);
  });

  it("reenvía una solicitud válida y devuelve 200 cuando el receptor confirma", async () => {
    process.env.CONTACT_WEBHOOK_URL = "https://receiver.example.test/contact";
    process.env.CONTACT_WEBHOOK_TOKEN = "secret-token";
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true });
    const res = crearRespuesta();

    await handler({ method: "POST", headers: {}, body: solicitudValida }, res);

    expect(res.statusCode).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith(
      process.env.CONTACT_WEBHOOK_URL,
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer secret-token",
        },
      }),
    );
  });

  it("devuelve 502 cuando el receptor falla", async () => {
    process.env.CONTACT_WEBHOOK_URL = "https://receiver.example.test/contact";
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("receiver unavailable"));
    const res = crearRespuesta();

    await handler({ method: "POST", headers: {}, body: solicitudValida }, res);

    expect(res.statusCode).toBe(502);
  });
});
