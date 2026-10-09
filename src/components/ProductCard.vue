<template>
  <RouterLink :to="{ name: 'producto-detalle', params: { id: product.id } }" class="product-link">
    <article class="product-card">
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
    </article>
  </RouterLink>
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
</style>
