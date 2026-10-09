<template>
  <main class="not-found">
    <h1>Página no encontrada</h1>
    <p>La dirección que visitas no existe.</p>
    <RouterLink to="/">Volver al inicio</RouterLink>
  </main>
</template>

<style scoped>
.not-found {
  padding: 80px 30px;
  text-align: center;
}

.not-found a {
  color: #263d31;
  font-weight: 600;
}
</style>
