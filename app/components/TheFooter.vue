<template>
  <footer class="main-footer">
    <div class="footer-wave" aria-hidden="true">
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120H1440V40C1440 40 1260 0 1080 0C900 0 720 40 540 40C360 40 180 0 0 0V120Z"
          fill="currentColor"
        />
      </svg>
    </div>

    <v-container class="footer-container">
      <v-row class="footer-main-row">
        <!-- COL 1: BRAND -->
        <v-col cols="12" lg="4" class="brand-col">
          <div class="footer-brand-text">
            <h3 class="f-brand-name">
              FOTOSÍNTESIS <span class="f-brand-ova">OVA</span>
            </h3>
          </div>
          <p class="f-tagline">
            Transformando el aprendizaje biológico con tecnología de vanguardia
            y diseño emocional.
          </p>

          <div class="uni-mini-card">
            <div class="uni-logo-bg">
              <v-img :src="useAsset('universidad-logo.png')" width="42" />
            </div>
            <div class="uni-info">
              <span class="u-name">Universidad de Córdoba</span>
              <span class="u-loc">Montería, Colombia</span>
            </div>
          </div>
        </v-col>

        <!-- COL 2: NAV -->
        <v-col cols="6" lg="2" class="links-col">
          <h4 class="f-title">Navegación</h4>
          <nav class="f-nav">
            <nuxt-link to="/">Inicio</nuxt-link>
            <nuxt-link to="/dashboard">Dashboard</nuxt-link>
            <nuxt-link to="/contenidos">Contenidos</nuxt-link>
            <nuxt-link to="/creditos">Créditos</nuxt-link>
          </nav>
        </v-col>

        <!-- COL 3: CONTACT -->
        <v-col cols="6" lg="3" class="contact-col">
          <div class="f-social mt-4">
            <span class="s-label">Síguenos</span>
            <div class="s-icons">
              <v-btn
                v-for="dev in developers"
                :key="dev.ig"
                icon
                size="x-small"
                variant="tonal"
                class="social-btn"
                :href="dev.ig"
                target="_blank"
              >
                <v-icon icon="mdi-instagram" size="14" />
              </v-btn>
            </div>
          </div>

          <div class="f-social mt-4">
            <span class="s-label">Síguenos</span>
            <div class="s-icons">
              <v-btn
                v-for="dev in developers"
                :key="dev.ig"
                icon
                size="x-small"
                variant="tonal"
                class="social-btn"
                :href="dev.gh"
                target="_blank"
              >
                <v-icon icon="mdi-github" size="14" />
              </v-btn>
            </div>
          </div>
        </v-col>

        <!-- COL 4: NEWSLETTER / TIP -->
        <v-col cols="12" lg="3" class="tip-col">
          <div class="f-tip-card">
            <v-icon icon="mdi-leaf" color="#80a124" class="mb-2" />
            <p>
              <strong>Dato Curioso:</strong> La fotosíntesis artificial es una
              de las mayores promesas para la energía limpia del futuro.
            </p>
          </div>
        </v-col>
      </v-row>

      <v-divider class="f-divider" />

      <div class="f-bottom">
        <span class="f-copy">© 2026 OVA Fotosíntesis · Montería, Córdoba</span>
        <span class="f-credits"
          >Powered by
          <i>DLM4RI</i>
        </span>
      </div>
    </v-container>
  </footer>
</template>

<script setup>
const developers = [
  {
    ig: "https://www.instagram.com/m4rcstro?igsh=aHB0Z2JwdnE5YWE1",
    gh: "https://github.com/DLM4RI",
  },
  {
    ig: "https://www.instagram.com/rosendo_de_castro_urango?igsh=NzYxNDBjMWRhZ205",
    gh: "https://github.com/RosendoDC0",
  },
  {
    ig: "https://www.instagram.com/andre_hernandezo?igsh=M2F0enNuaWo2czlr",
    gh: "https://github.com/DLM4RI",
  },
  {
    ig: "https://www.instagram.com/fabio__cantero?igsh=NGJqa25icWdtM2Vj",
    gh: "https://github.com/RosendoDC0",
  },
];
</script>

<style scoped>
.main-footer {
  background: #121212;
  color: #e5e7eb;
  position: relative;
  padding-top: 4rem;
  margin-top: 8rem;
  font-family: "Inter", sans-serif;
  z-index: 100; /* Asegurar que esté encima de las animaciones */
}

.footer-wave {
  position: absolute;
  top: -99px;
  left: 0;
  width: 100%;
  height: 100px;
  color: #121212;
}

.footer-container {
  max-width: 1200px !important;
  padding-bottom: 2rem !important;
}

.footer-main-row {
  margin-bottom: 3rem;
}

/* Brand */
.footer-brand-text {
  margin-bottom: 1.25rem;
}

.f-brand-name {
  font-size: 1.5rem;
  font-weight: 950;
  letter-spacing: 2px;
  color: #ffffff;
}

.f-brand-ova {
  color: #80a124;
  font-size: 0.9rem;
  background: rgba(128, 161, 36, 0.15);
  padding: 2px 8px;
  border-radius: 6px;
  vertical-align: middle;
}

.f-tagline {
  font-size: 0.9rem;
  color: #9ca3af;
  line-height: 1.6;
  max-width: 300px;
  margin-bottom: 1.5rem;
}

.uni-mini-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.03);
  padding: 8px;
  padding-right: 20px;
  border-radius: 18px;
  width: fit-content;
}

.uni-logo-bg {
  background: white;
  padding: 6px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.uni-info {
  display: flex;
  flex-direction: column;
}

.u-name {
  font-size: 0.8rem;
  font-weight: 800;
  color: #f3f4f6;
}
.u-loc {
  font-size: 0.7rem;
  color: #80a124;
  font-weight: 700;
}

/* Links & Titles */
.f-title {
  font-size: 0.85rem;
  font-weight: 850;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #80a124;
  margin-bottom: 1.5rem;
}

.f-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.f-nav a {
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.f-nav a:hover {
  color: #ffffff;
  transform: translateX(5px);
}

/* Contact */
.f-email {
  color: #ffffff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.f-social {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.s-label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #4b5563;
  text-transform: uppercase;
}

.s-icons {
  display: flex;
  gap: 8px;
}

.social-btn {
  background: rgba(128, 161, 36, 0.1) !important;
  color: #80a124 !important;
  transition: all 0.3s ease !important;
}

.social-btn:hover {
  background: #80a124 !important;
  color: white !important;
  transform: translateY(-3px);
}

/* Tip Card */
.f-tip-card {
  background: linear-gradient(
    135deg,
    rgba(128, 161, 36, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  padding: 20px;
  border-radius: 20px;
  border: 1px solid rgba(128, 161, 36, 0.1);
}

.f-tip-card p {
  font-size: 0.85rem;
  color: #d1d5db;
  line-height: 1.5;
  margin: 0;
}

/* Bottom */
.f-divider {
  border-color: rgba(255, 255, 255, 0.05) !important;
  margin-bottom: 1.5rem !important;
}

.f-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: #4b5563;
}

@media (max-width: 960px) {
  .footer-main-row {
    text-align: center;
  }
  .footer-logo-wrap,
  .uni-mini-card,
  .s-icons,
  .f-email {
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }
  .f-bottom {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  /* Ocultar la onda en móviles para evitar separaciones visuales */
  .footer-wave {
    display: none;
  }
}
</style>
