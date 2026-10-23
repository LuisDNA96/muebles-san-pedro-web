<template>
  <main class="detalle">
    <RouterLink to="/productos" class="back-link">← Volver al catálogo</RouterLink>

    <section v-if="producto" class="detalle-contenido">
      <img :src="producto.imagen" :alt="`Imagen de ${producto.nombre}`" class="detalle-imagen" />
      <div class="detalle-info">
        <span class="detalle-categoria">{{ producto.categoria }}</span>
        <h1>{{ producto.nombre }}</h1>
        <p class="detalle-descripcion">{{ producto.descripcion }}</p>
        <p class="detalle-precio">${{ producto.precio.toLocaleString("es-MX") }} MXN</p>
        <RouterLink
          :to="{ name: 'contacto', query: { productId: producto.id } }"
          class="request-button"
        >
          Solicitar información
        </RouterLink>
      </div>
    </section>

    <section v-else class="producto-no-encontrado">
      <h1>Producto no encontrado</h1>
      <p>El producto que buscas no existe o ya no está disponible.</p>
      <RouterLink to="/productos" class="back-button">Regresar al catálogo</RouterLink>
    </section>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { obtenerProductoPorId } from "../data/products";

const route = useRoute();
const producto = computed(() => obtenerProductoPorId(route.params.id));
</script>

<style scoped>
.detalle {
  max-width: 1100px;
  margin: auto;
  padding: 50px 30px;
}

.back-link {
  display: inline-block;
  margin-bottom: 30px;
  color: #263d31;
  font-weight: 600;
  text-decoration: none;
}

.detalle-contenido {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 50px;
  align-items: center;
}

.detalle-imagen {
  width: 100%;
  max-height: 500px;
  border-radius: 10px;
  object-fit: cover;
}

.detalle-categoria {
  color: #8c806f;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
}

.detalle-info h1 {
  margin: 12px 0 20px;
  font-family: Georgia, serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
}

.detalle-descripcion {
  color: #555;
  font-size: 1.1rem;
  line-height: 1.7;
}

.detalle-precio {
  color: #263d31;
  font-size: 1.5rem;
  font-weight: 700;
}

.request-button {
  display: inline-block;
  margin-top: 12px;
  padding: 12px 18px;
  border-radius: 6px;
  background: #263d31;
  color: white;
  text-decoration: none;
}

.request-button:hover,
.request-button:focus-visible {
  background: #1b2c23;
}

.request-button:focus-visible,
.back-link:focus-visible,
.back-button:focus-visible {
  outline: 3px solid #dba36a;
  outline-offset: 3px;
}

.producto-no-encontrado {
  max-width: 650px;
  margin: 60px auto;
  padding: 40px 30px;
  text-align: center;
}

.back-button {
  display: inline-block;
  margin-top: 18px;
  padding: 10px 16px;
  border-radius: 6px;
  background: #333;
  color: white;
  text-decoration: none;
}

@media (max-width: 768px) {
  .detalle-contenido {
    grid-template-columns: 1fr;
    gap: 25px;
  }
}
</style>
