<template>
  <main class="contacto">
    <section class="contacto-introduccion">
      <p class="eyebrow">Estamos para ayudarte</p>
      <h1>Contacto</h1>
      <p>Cuéntanos qué necesitas y te orientaremos sobre nuestros productos.</p>
    </section>

    <section class="contacto-layout">
      <aside v-if="productoReferencia" class="producto-referencia" aria-labelledby="referencia-titulo">
        <p class="eyebrow">Producto consultado</p>
        <h2 id="referencia-titulo">{{ productoReferencia.nombre }}</h2>
        <p>{{ productoReferencia.descripcion }}</p>
        <RouterLink :to="{ name: 'producto-detalle', params: { id: productoReferencia.id } }">
          Ver detalles del producto
        </RouterLink>
      </aside>

      <form class="contacto-formulario" novalidate @submit.prevent="enviarFormulario">
        <div class="campo">
          <label for="nombre">Nombre completo <span aria-hidden="true">*</span></label>
          <input
            id="nombre"
            v-model="formulario.nombre"
            type="text"
            autocomplete="name"
            maxlength="100"
            required
            :aria-invalid="Boolean(errores.nombre)"
            :aria-describedby="errores.nombre ? 'error-nombre' : undefined"
            @blur="validarCampo('nombre')"
          />
          <p v-if="errores.nombre" id="error-nombre" class="error" role="alert">{{ errores.nombre }}</p>
        </div>

        <div class="campo">
          <label for="correo">Correo electrónico <span aria-hidden="true">*</span></label>
          <input
            id="correo"
            v-model="formulario.correo"
            type="email"
            autocomplete="email"
            maxlength="254"
            required
            :aria-invalid="Boolean(errores.correo)"
            :aria-describedby="errores.correo ? 'error-correo' : undefined"
            @blur="validarCampo('correo')"
          />
          <p v-if="errores.correo" id="error-correo" class="error" role="alert">{{ errores.correo }}</p>
        </div>

        <div class="campo">
          <label for="telefono">Teléfono <span class="opcional">(opcional)</span></label>
          <input
            id="telefono"
            v-model="formulario.telefono"
            type="tel"
            autocomplete="tel"
            inputmode="tel"
            maxlength="30"
            :aria-invalid="Boolean(errores.telefono)"
            :aria-describedby="errores.telefono ? 'error-telefono' : undefined"
            @blur="validarCampo('telefono')"
          />
          <p v-if="errores.telefono" id="error-telefono" class="error" role="alert">{{ errores.telefono }}</p>
        </div>

        <div class="campo">
          <label for="asunto">Asunto <span aria-hidden="true">*</span></label>
          <input
            id="asunto"
            v-model="formulario.asunto"
            type="text"
            maxlength="150"
            required
            :aria-invalid="Boolean(errores.asunto)"
            :aria-describedby="errores.asunto ? 'error-asunto' : undefined"
            @blur="validarCampo('asunto')"
          />
          <p v-if="errores.asunto" id="error-asunto" class="error" role="alert">{{ errores.asunto }}</p>
        </div>

        <div class="campo">
          <label for="mensaje">Mensaje <span aria-hidden="true">*</span></label>
          <textarea
            id="mensaje"
            v-model="formulario.mensaje"
            rows="6"
            minlength="20"
            maxlength="5000"
            required
            :aria-invalid="Boolean(errores.mensaje)"
            :aria-describedby="errores.mensaje ? 'error-mensaje' : 'ayuda-mensaje'"
            @blur="validarCampo('mensaje')"
          ></textarea>
          <p id="ayuda-mensaje" class="ayuda">Escribe al menos 20 caracteres.</p>
          <p v-if="errores.mensaje" id="error-mensaje" class="error" role="alert">{{ errores.mensaje }}</p>
        </div>

        <div
          v-if="estadoFormulario"
          class="estado-formulario"
          :class="`estado-${tipoEstado}`"
          role="status"
          aria-live="polite"
        >
          {{ estadoFormulario }}
        </div>

        <div class="acciones-formulario">
          <button type="submit" class="submit-button" :disabled="enviando || formularioEnviado">
            {{ enviando ? "Enviando solicitud..." : formularioEnviado ? "Solicitud enviada" : "Enviar solicitud" }}
          </button>
          <button v-if="formularioEnviado" type="button" class="reset-button" @click="editarFormulario">
            Modificar solicitud
          </button>
        </div>
        <p class="nota-envio">
          Tus datos se enviarán únicamente cuando el servicio del proyecto esté configurado en el servidor.
        </p>
      </form>
    </section>
  </main>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { obtenerProductoPorId } from "../data/products";

const route = useRoute();
const formulario = reactive({
  nombre: "",
  correo: "",
  telefono: "",
  asunto: "",
  mensaje: "",
});
const errores = reactive({});
const estadoFormulario = ref("");
const tipoEstado = ref("");
const enviando = ref(false);
const formularioEnviado = ref(false);

const productoReferencia = computed(() => obtenerProductoPorId(route.query.productId));

watch(
  productoReferencia,
  (producto) => {
    if (producto && !formulario.asunto) {
      formulario.asunto = `Información sobre ${producto.nombre}`;
    }
  },
  { immediate: true },
);

function validarCampo(campo) {
  const valor = formulario[campo].trim();
  delete errores[campo];

  if (["nombre", "correo", "asunto", "mensaje"].includes(campo) && !valor) {
    errores[campo] = "Este campo es obligatorio.";
  } else if (campo === "correo" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
    errores.correo = "Introduce un correo electrónico válido.";
  } else if (campo === "correo" && valor.length > 254) {
    errores.correo = "El correo no puede superar los 254 caracteres.";
  } else if (campo === "telefono" && valor && !/^[\d\s()+-]{7,30}$/.test(valor)) {
    errores.telefono = "Introduce un teléfono válido.";
  } else if (campo === "telefono" && valor.length > 30) {
    errores.telefono = "El teléfono no puede superar los 30 caracteres.";
  } else if (campo === "nombre" && valor.length > 100) {
    errores.nombre = "El nombre no puede superar los 100 caracteres.";
  } else if (campo === "asunto" && valor.length > 150) {
    errores.asunto = "El asunto no puede superar los 150 caracteres.";
  } else if (campo === "mensaje" && valor.length < 20) {
    errores.mensaje = "El mensaje debe tener al menos 20 caracteres.";
  } else if (campo === "mensaje" && valor.length > 5000) {
    errores.mensaje = "El mensaje no puede superar los 5000 caracteres.";
  }

  return !errores[campo];
}

function validarFormulario() {
  const resultados = ["nombre", "correo", "telefono", "asunto", "mensaje"].map(validarCampo);
  return resultados.every(Boolean);
}

async function enviarFormulario() {
  if (enviando.value || formularioEnviado.value || !validarFormulario()) {
    estadoFormulario.value = Object.keys(errores).length
      ? "Revisa los campos marcados antes de continuar."
      : "";
    tipoEstado.value = Object.keys(errores).length ? "error" : "";
    return;
  }

  Object.keys(formulario).forEach((campo) => {
    formulario[campo] = formulario[campo].trim();
  });
  enviando.value = true;
  estadoFormulario.value = "Enviando solicitud...";
  tipoEstado.value = "enviando";

  try {
    const respuesta = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formulario,
        ...(productoReferencia.value ? { productId: productoReferencia.value.id } : {}),
      }),
    });
    const resultado = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
      throw new Error(resultado.error || "No fue posible completar el envío.");
    }

    formularioEnviado.value = true;
    estadoFormulario.value = resultado.message || "Solicitud enviada correctamente.";
    tipoEstado.value = "exito";
  } catch (error) {
    estadoFormulario.value =
      error instanceof TypeError
        ? "No fue posible conectar con el servidor. Conservamos tus datos para que puedas reintentarlo."
        : error.message;
    tipoEstado.value = "error";
  } finally {
    enviando.value = false;
  }
}

function editarFormulario() {
  formularioEnviado.value = false;
  estadoFormulario.value = "";
  tipoEstado.value = "";
}
</script>

<style scoped>
.contacto {
  max-width: 1200px;
  margin: auto;
  padding: 50px 30px 70px;
}

.contacto-introduccion {
  margin-bottom: 38px;
  text-align: center;
}

.contacto-introduccion h1 {
  margin: 8px 0;
  font-family: Georgia, serif;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
}

.eyebrow {
  margin: 0;
  color: #8c806f;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.contacto-layout {
  display: grid;
  grid-template-columns: minmax(260px, 0.7fr) minmax(0, 1.3fr);
  gap: 42px;
  align-items: start;
}

.producto-referencia,
.contacto-formulario {
  padding: 28px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
}

.producto-referencia h2 {
  margin: 12px 0;
  color: #263d31;
  font-family: Georgia, serif;
}

.producto-referencia p:not(.eyebrow) {
  color: #555;
  line-height: 1.6;
}

.producto-referencia a {
  color: #263d31;
  font-weight: 700;
}

.campo {
  margin-bottom: 20px;
}

.campo label {
  display: block;
  margin-bottom: 7px;
  color: #263d31;
  font-weight: 700;
}

.opcional {
  color: #687166;
  font-size: 0.85rem;
  font-weight: 400;
}

.campo input,
.campo textarea {
  width: 100%;
  border: 1px solid #b9b2a7;
  border-radius: 6px;
  padding: 12px 14px;
  background: #fff;
  color: #263d31;
  font: inherit;
}

.campo input:focus,
.campo textarea:focus {
  border-color: #263d31;
  outline: 3px solid rgba(219, 163, 106, 0.45);
}

.campo input[aria-invalid="true"],
.campo textarea[aria-invalid="true"] {
  border-color: #a33a3a;
}

.ayuda,
.error,
.nota-envio {
  margin: 6px 0 0;
  font-size: 0.9rem;
}

.ayuda,
.nota-envio {
  color: #687166;
}

.error {
  color: #a33a3a;
}

.estado-formulario {
  margin-bottom: 18px;
  padding: 12px;
  border-left: 4px solid #dba36a;
  background: #f7f4ee;
  color: #263d31;
}

.estado-error {
  border-left-color: #a33a3a;
  color: #a33a3a;
}

.estado-exito {
  border-left-color: #38734f;
  color: #245337;
}

.estado-enviando {
  border-left-color: #8c806f;
}

.acciones-formulario {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.submit-button,
.reset-button {
  padding: 12px 18px;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
}

.submit-button {
  background: #263d31;
  color: #fff;
}

.submit-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.reset-button {
  border: 1px solid #263d31;
  background: #fff;
  color: #263d31;
}

.submit-button:focus-visible,
.reset-button:focus-visible,
.producto-referencia a:focus-visible {
  outline: 3px solid #dba36a;
  outline-offset: 3px;
}

@media (max-width: 700px) {
  .contacto {
    padding: 35px 20px 50px;
  }

  .contacto-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .producto-referencia,
  .contacto-formulario {
    padding: 22px;
  }
}
</style>
