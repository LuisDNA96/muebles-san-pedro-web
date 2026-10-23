<template>
  <header class="site-header">
    <nav class="navigation">
      <RouterLink to="/" class="brand">
        <span class="brand-mark">M</span>
        <span>
          <strong>Muebles</strong>
          <small>San Pedro</small>
        </span>
      </RouterLink>

      <div class="menu">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/productos">Productos</RouterLink>
        <RouterLink to="/contacto">Contacto</RouterLink>
      </div>

    </nav>
  </header>

  <RouterView />
  <AppFooter />
</template>

<script setup>
import AppFooter from "./components/AppFooter.vue";
</script>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(body) {
  margin: 0;
  background: #f7f4ee;
  color: #263d31;
  font-family: Arial, sans-serif;
}

.site-header {
  position: relative;
  z-index: 2;
  padding: 22px 6vw;
  background: #f7f4ee;
}

.navigation {
  max-width: 1240px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 28px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #263d31;
  text-decoration: none;
  line-height: 1;
}

.brand-mark {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 50%;
  background: #dba36a;
  color: #fffaf3;
  font-family: Georgia, serif;
  font-size: 1.5rem;
  font-style: italic;
}

.brand strong,
.brand small {
  display: block;
}

.brand strong {
  font-family: Georgia, serif;
  font-size: 1.05rem;
  letter-spacing: 0.02em;
}

.brand small {
  margin-top: 4px;
  color: #8c806f;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.menu {
  display: flex;
  gap: 32px;
  margin-left: auto;
}

.menu a {
  text-decoration: none;
  color: #687166;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.menu a:hover,
.menu a.router-link-active {
  color: #263d31;
}

.brand:focus-visible,
.menu a:focus-visible {
  outline: 3px solid #dba36a;
  outline-offset: 4px;
}

@media (max-width: 700px) {
  .site-header {
    padding: 18px 5vw;
  }

  .navigation {
    flex-wrap: wrap;
  }

  .menu {
    order: 3;
    width: 100%;
    justify-content: space-between;
    gap: 12px;
    margin: 0;
  }

}
</style>
