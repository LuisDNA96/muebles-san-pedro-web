<template>
  <main class="home">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Diseño que se siente como hogar</p>
        <h1>Espacios con <em>alma</em>, muebles con historia.</h1>
        <p class="hero-description">
          Creamos ambientes cálidos y atemporales con piezas que combinan la belleza
          de lo artesanal con la comodidad que tu hogar merece.
        </p>

        <div class="hero-actions">
          <RouterLink to="/productos" class="primary-button">Explorar colección <span>→</span></RouterLink>
          <RouterLink to="/contacto" class="text-button">Hablemos de tu espacio</RouterLink>
        </div>

        <div class="hero-note">
          <span class="note-line"></span>
          <span>Hecho para vivirlo todos los días</span>
        </div>
      </div>

    </section>
  </main>
</template>

<style scoped>
.home {
  overflow: hidden;
  background: #f7f4ee;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 0.91fr) minmax(0, 1.09fr);
  gap: 7vw;
  align-items: center;
  max-width: 1240px;
  min-height: 590px;
  margin: auto;
  padding: 68px 6vw 92px;
}

.hero-copy {
  max-width: 530px;
}

.eyebrow {
  margin: 0 0 20px;
  color: #ba8250;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

h1,
h2 {
  font-family: Georgia, serif;
  font-weight: 400;
}

.hero h1 {
  max-width: 530px;
  margin: 0;
  color: #263d31;
  font-size: clamp(3.3rem, 5.5vw, 5.7rem);
  letter-spacing: -0.06em;
  line-height: 0.97;
}

.hero h1 em {
  color: #c38d5d;
  font-style: italic;
}

.hero-description {
  max-width: 430px;
  margin: 28px 0 32px;
  color: #6f766d;
  font-size: 1rem;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 22px;
}

.primary-button {
  padding: 16px 22px;
  border-radius: 3px;
  background: #263d31;
  color: #fffaf3;
  font-size: 0.84rem;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.primary-button:hover {
  transform: translateY(-2px);
  background: #355440;
}

.primary-button span {
  margin-left: 18px;
  font-size: 1.1rem;
}

.text-button,
.view-all {
  color: #263d31;
  font-size: 0.83rem;
  text-decoration: none;
}

.text-button {
  border-bottom: 1px solid #c7b9a8;
  padding-bottom: 4px;
}

.hero-note {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 55px;
  color: #9b9589;
  font-family: Georgia, serif;
  font-size: 0.82rem;
  font-style: italic;
}

.note-line {
  display: inline-block;
  width: 34px;
  height: 1px;
  background: #c38d5d;
}


.benefits {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 26px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 6vw 100px;
}

.benefits article {
  display: flex;
  gap: 15px;
  padding-top: 25px;
  border-top: 1px solid #d9d0c3;
}

.benefit-icon {
  color: #c38d5d;
  font-family: Georgia, serif;
  font-size: 1.7rem;
}

.benefits h2 {
  margin: 0 0 8px;
  font-size: 1.1rem;
}

.benefits p {
  margin: 0;
  color: #85877e;
  font-size: 0.79rem;
  line-height: 1.5;
}

.categories {
  padding: 78px 6vw 110px;
  background: #eee8dc;
}

.section-heading,
.category-grid {
  max-width: 1120px;
  margin: auto;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 34px;
}

.section-heading .eyebrow {
  margin-bottom: 13px;
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 2.9rem);
  letter-spacing: -0.04em;
}

.view-all {
  padding-bottom: 7px;
  border-bottom: 1px solid #c7b9a8;
  white-space: nowrap;
}

.view-all span {
  margin-left: 9px;
}

.category-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 17px;
}

.category-card {
  position: relative;
  display: block;
  height: 310px;
  overflow: hidden;
  color: #fff;
  text-decoration: none;
}

.category-card::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent 42%, rgba(20, 35, 27, 0.75));
  content: "";
}

.category-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.category-card:hover img {
  transform: scale(1.05);
}

.category-card span {
  position: absolute;
  z-index: 1;
  right: 20px;
  bottom: 18px;
  left: 20px;
  font-family: Georgia, serif;
  font-size: 1.3rem;
}

.category-card b {
  float: right;
  font-family: Arial, sans-serif;
  font-size: 1rem;
  font-weight: 400;
}

@media (max-width: 850px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 55px;
    padding-top: 55px;
  }

  .hero-copy {
    max-width: 650px;
  }

  .benefits {
    grid-template-columns: 1fr;
    max-width: 600px;
  }
}

@media (max-width: 600px) {
  .hero {
    padding: 42px 6vw 70px;
  }

  .hero h1 {
    font-size: 3.35rem;
  }

  .benefits {
    padding-bottom: 72px;
  }

  .section-heading {
    align-items: start;
    flex-direction: column;
  }

  .category-grid {
    grid-template-columns: 1fr;
  }

  .category-large {
    height: 260px;
  }
}
</style>
