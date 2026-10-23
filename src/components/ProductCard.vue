<template>
  <article class="product-card">
    <RouterLink :to="{ name: 'producto-detalle', params: { id: product.id } }" class="product-link">
      <img :src="product.imagen" :alt="`Imagen de ${product.nombre}`" class="product-image" />

      <div class="product-info">
        <span class="product-category">
          {{ product.categoria }}
        </span>

        <h2>{{ product.nombre }}</h2>

        <p>{{ product.descripcion }}</p>

        <p class="product-price">${{ product.precio.toLocaleString("es-MX") }} MXN</p>

        <span class="details-button">Ver detalles</span>
      </div>
    </RouterLink>
    <RouterLink
      :to="{ name: 'contacto', query: { productId: product.id } }"
      class="request-button"
    >
      Solicitar información
    </RouterLink>
  </article>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s;
}

.product-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.product-info {
  padding: 20px;
}

.product-category {
  font-size: 0.85rem;
  color: #666;
}

.product-info h2 {
  margin: 8px 0;
}

.product-info p {
  color: #555;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #222 !important;
}

.details-button {
  display: inline-block;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  background: #333;
  color: white;
}

.product-link:hover .details-button {
  opacity: 0.85;
}

.request-button {
  display: block;
  margin: 0 20px 20px;
  padding: 10px 16px;
  border: 1px solid #263d31;
  border-radius: 6px;
  color: #263d31;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.request-button:hover,
.request-button:focus-visible {
  background: #263d31;
  color: white;
}

.product-link:focus-visible,
.request-button:focus-visible {
  outline: 3px solid #dba36a;
  outline-offset: 3px;
}
</style>
