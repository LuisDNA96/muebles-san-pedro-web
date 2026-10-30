<template>
  <main class="productos">
    <section class="encabezado">
      <h1>Catálogo de productos</h1>
      <p>Conoce algunos de los productos disponibles en Muebles San Pedro.</p>
    </section>

    <div class="catalogo-controles">
      <label class="search-label" for="product-search">Buscar productos</label>
      <div class="search-wrapper">
        <input
          id="product-search"
          v-model="busqueda"
          type="search"
          placeholder="Busca por nombre o descripción"
          autocomplete="off"
        />
        <button v-if="busqueda" type="button" class="clear-button" aria-label="Limpiar búsqueda" @click="busqueda = ''">
          Limpiar
        </button>
      </div>

      <div class="categorias" aria-label="Filtrar por categoría">
        <button
          v-for="categoria in categorias"
          :key="categoria"
          type="button"
          :class="{ activo: categoriaActiva === categoria }"
          :aria-pressed="categoriaActiva === categoria"
          @click="categoriaActiva = categoria"
        >
          {{ categoria }}
        </button>
      </div>
    </div>

    <section v-if="productosFiltrados.length" class="catalogo" aria-live="polite">
      <ProductCard v-for="product in productosFiltrados" :key="product.id" :product="product" />
    </section>
    <p v-else class="sin-resultados" role="status">No encontramos productos con esos criterios. Prueba otra búsqueda o categoría.</p>
  </main>
</template>

<script setup>
import { computed, ref } from "vue";
import ProductCard from "../components/ProductCard.vue";
import { categorias, filtrarProductos, productos } from "../data/products";

const busqueda = ref("");
const categoriaActiva = ref("Todos");

const productosFiltrados = computed(() => {
  return filtrarProductos(productos, busqueda.value, categoriaActiva.value);
});
</script>

<style scoped>
.productos {
  padding: 50px 30px;
  max-width: 1200px;
  margin: auto;
}

.encabezado {
  text-align: center;
  margin-bottom: 40px;
}

.encabezado h1 {
  margin-bottom: 10px;
}

.catalogo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.catalogo-controles {
  max-width: 800px;
  margin: 0 auto 35px;
}

.search-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

.search-wrapper {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-wrapper input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #b9b2a7;
  border-radius: 6px;
  font: inherit;
}

.clear-button {
  padding: 10px 16px;
  border: 1px solid #333;
  border-radius: 6px;
  background: white;
  color: #333;
  cursor: pointer;
}

.categorias {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 35px;
  flex-wrap: wrap;
}

.categorias button {
  padding: 10px 20px;
  border: 1px solid #333;
  border-radius: 6px;
  background: white;
  color: #333;
  cursor: pointer;
}

.categorias button:hover {
  background: #333;
  color: white;
}

.categorias button.activo {
  background: #333;
  color: white;
}

.sin-resultados {
  padding: 30px;
  text-align: center;
  color: #555;
}

@media (max-width: 768px) {
  .catalogo {
    grid-template-columns: 1fr;
  }

  .search-wrapper {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
