<template>
  <footer class="site-footer">
    <div class="footer-content">
      <section class="footer-brand" aria-labelledby="footer-brand-title">
        <p id="footer-brand-title" class="footer-title">Muebles San Pedro</p>
        <p>Espacios con alma, muebles con historia.</p>
      </section>

      <nav class="footer-navigation" aria-label="Navegación del pie de página">
        <p class="footer-heading">Explorar</p>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/productos">Productos</RouterLink>
        <RouterLink to="/contacto">Contacto</RouterLink>
      </nav>

      <section class="footer-social" aria-labelledby="footer-social-title">
        <p id="footer-social-title" class="footer-heading">Conecta</p>
        <ul>
          <li v-for="red in redesSociales" :key="red.nombre">
            <span class="social-item" :title="`${red.nombre}: próximamente`">
              <span class="social-icon" aria-hidden="true">
                <svg v-if="red.icono === 'instagram'" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" class="social-dot" />
                </svg>
                <svg v-else-if="red.icono === 'facebook'" viewBox="0 0 24 24">
                  <path d="M14 8h3V4h-3c-3.3 0-5 1.9-5 5v3H6v4h3v4h4v-4h3.5l.5-4H13V9c0-.7.3-1 1-1Z" />
                </svg>
                <svg v-else viewBox="0 0 24 24">
                  <path d="M20.5 3.5a10 10 0 0 0-15.8 12L3.5 20.5l5.2-1.2A10 10 0 1 0 20.5 3.5Zm-8.4 16a8 8 0 0 1-4.1-1.1l-.3-.2-3.1.7.8-3-.2-.3a8 8 0 1 1 6.9 3.9Zm4.4-6c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1a6.3 6.3 0 0 1-3.1-2.7c-.2-.3.2-.3.5-1 .1-.2 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.4a8.8 8.8 0 0 0 3.4 3c1.3.5 1.3.3 1.6.3.5-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1Z" />
                </svg>
              </span>
              <span>{{ red.nombre }}</span>
              <small>Próximamente</small>
            </span>
          </li>
        </ul>
      </section>
    </div>

    <p class="footer-legal">© {{ anioActual }} Muebles San Pedro</p>
  </footer>
</template>

<script setup>
const anioActual = new Date().getFullYear();
const redesSociales = [
  { nombre: "Instagram", icono: "instagram" },
  { nombre: "Facebook", icono: "facebook" },
  { nombre: "WhatsApp", icono: "whatsapp" },
];
</script>

<style scoped>
.site-footer {
  padding: 48px 6vw 22px;
  background: #263d31;
  color: #f7f4ee;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1.2fr;
  gap: 48px;
  max-width: 1240px;
  margin: 0 auto;
}

.footer-brand p,
.footer-heading,
.footer-navigation a,
.footer-social ul,
.footer-legal {
  margin: 0;
}

.footer-title,
.footer-heading {
  color: #dba36a;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.footer-title {
  margin-bottom: 12px !important;
  font-family: Georgia, serif;
  font-size: 1.1rem;
}

.footer-brand p:last-child {
  max-width: 240px;
  color: #d9d0c3;
  line-height: 1.6;
}

.footer-heading {
  margin-bottom: 16px !important;
  font-size: 0.75rem;
}

.footer-navigation {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.footer-navigation a {
  width: fit-content;
  color: #f7f4ee;
  text-decoration: none;
}

.footer-navigation a:hover,
.footer-navigation a.router-link-active {
  color: #dba36a;
}

.footer-navigation a:focus-visible {
  outline: 3px solid #dba36a;
  outline-offset: 4px;
}

.footer-social ul {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 0;
  list-style: none;
}

.social-item {
  display: inline-flex;
  min-width: 72px;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: #d9d0c3;
  font-size: 0.78rem;
  text-align: center;
}

.social-icon {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid #809184;
  border-radius: 50%;
}

.social-icon svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
}

.social-icon svg path {
  stroke: currentColor;
}

.social-icon svg .social-dot {
  fill: currentColor;
  stroke: none;
}

.social-item small {
  color: #b9c2ba;
  font-size: 0.68rem;
}

.footer-legal {
  max-width: 1240px;
  margin: 38px auto 0;
  padding-top: 18px;
  border-top: 1px solid #53695a;
  color: #b9c2ba;
  font-size: 0.75rem;
}

@media (max-width: 700px) {
  .site-footer {
    padding: 38px 5vw 20px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-social ul {
    justify-content: flex-start;
  }
}

@media (min-width: 701px) and (max-width: 900px) {
  .footer-content {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px;
  }

  .footer-social {
    grid-column: 1 / -1;
  }
}
</style>
