<template>
  <v-main class="contenidos-main">
    <LoadingScreen
      :active="isLoading"
      :student-name="state.name"
      status-message="Cargando biblioteca de contenidos..."
    />

    <!-- DECORACIONES VIVAS (BIO-ENERGY STYLE) -->
    <div class="grain-overlay" aria-hidden="true" />
    <div class="parallax-bg">
      <!-- Orbes de Energía (Solo 1 en móvil, estático) -->
      <div class="glass-blob blob-1"></div>
      <div class="glass-blob blob-2 hide-mobile"></div>
      <div class="glass-blob blob-3 hide-mobile"></div>

      <!-- Rayos de Luz (Ocultos en móvil por rendimiento) -->
      <div class="sun-ray ray-1 hide-mobile"></div>
      <div class="sun-ray ray-2 hide-mobile"></div>

      <!-- Partículas y Burbujas (Ocultas en móvil para máxima optimización) -->
      <div v-if="!isMobile" class="particles-container">
        <div
          v-for="n in 12"
          :key="'p' + n"
          class="bio-particle"
          :style="particleStyles(n)"
        ></div>
        <div
          v-for="n in 8"
          :key="'b' + n"
          class="oxygen-bubble"
          :style="bubbleStyles(n)"
        ></div>
      </div>
    </div>

    <v-container fluid class="contenidos-container">
      <!-- HEADER PREMIUM -->
      <header class="contenidos-header">
        <div class="header-tag" style="animation-delay: 0.1s">
          Biblioteca de Conocimiento
        </div>
        <h1 class="page-title" style="animation-delay: 0.2s">
          Explora los Conceptos <span class="accent-dot">.</span>
        </h1>
        <p class="page-subtitle" style="animation-delay: 0.3s">
          Sumérgete en los elementos clave que hacen posible la vida vegetal.
        </p>
      </header>

      <v-row class="content-grid">
        <!-- CARD 1 -->
        <v-col
          cols="12"
          sm="12"
          md="6"
          lg="4"
          class="mb-6 card-col"
          style="animation-delay: 0.4s"
        >
          <ContCardcontenidos
            id="cont-1"
            titulo="¿Qué es la fotosíntesis?"
            texto="Conoce el proceso químico que alimenta al planeta."
            class="h-100"
          >
            <v-img
              :src="useAsset('fotosintesis-1.png')"
              height="250"
              cover
              class="card-img"
            />

            <template #modal>
              <div class="modal-inner-content">
                <section class="mb-8">
                  <p class="modal-body-text">
                    La <strong>Fotosíntesis</strong> es el proceso maestro
                    mediante el cual las plantas verdes, algas y algunas
                    bacterias convierten la energía electromagnética de la luz
                    solar en energía química estable.
                  </p>
                  <p class="modal-body-text">
                    Este fenómeno ocurre principalmente en los cloroplastos,
                    donde la planta absorbe Dióxido de Carbono (CO₂) y Agua
                    (H₂O) para producir Glucosa y liberar Oxígeno como
                    subproducto vital para nuestra atmósfera.
                  </p>
                </section>

                <div class="infographic-box mb-8">
                  <v-img
                    :src="useAsset('modal-1-fotosintesis.jpeg')"
                    rounded="xl"
                    elevation="2"
                    class="main-infographic"
                  />
                  <p class="infographic-caption">
                    Ecuación fundamental de la fotosíntesis
                  </p>
                </div>

                <div class="didactic-note">
                  <v-icon
                    icon="mdi-lightbulb-on-outline"
                    color="amber-darken-2"
                    class="mr-3"
                  />
                  <span
                    >¿Sabías que casi todo el oxígeno que respiramos hoy fue
                    producido por este proceso hace millones de años?</span
                  >
                </div>
              </div>
            </template>
          </ContCardcontenidos>
        </v-col>

        <!-- CARD 2 -->
        <v-col
          cols="12"
          sm="12"
          md="6"
          lg="4"
          class="mb-6 card-col"
          style="animation-delay: 0.5s"
        >
          <ContCardcontenidos
            id="cont-2"
            titulo="Los cloroplastos"
            texto="La fábrica de energía de la célula vegetal."
            class="h-100"
          >
            <v-img
              :src="useAsset('cloroplastos.jpg')"
              height="250"
              cover
              class="card-img"
            />

            <template #modal>
              <div class="modal-inner-content">
                <p class="modal-body-text">
                  El <strong>cloroplasto</strong> es un orgánulo especializado
                  de doble membrana. Su característica más distintiva es la
                  presencia de clorofila, el pigmento que le otorga el color
                  verde a las plantas y captura la luz.
                </p>

                <v-row class="mb-8">
                  <v-col cols="12" md="7">
                    <v-img :src="useAsset('cloroplastos.png')" rounded="xl" />
                  </v-col>
                  <v-col cols="12" md="5" class="d-flex align-center">
                    <ul class="feature-list">
                      <li>
                        <strong>Tilacoides:</strong> Donde ocurre la fase
                        lumínica.
                      </li>
                      <li>
                        <strong>Estroma:</strong> Espacio donde ocurre el ciclo
                        de Calvin.
                      </li>
                      <li>
                        <strong>ADN propio:</strong> Tienen su propio material
                        genético.
                      </li>
                    </ul>
                  </v-col>
                </v-row>

                <div class="video-premium-section">
                  <h3 class="video-title">Inmersión Microscópica</h3>
                  <div class="video-frame">
                    <iframe
                      width="100%"
                      height="400"
                      src="https://www.youtube.com/embed/Ql-OuxsOUuI?si=hqoQbtMXGPjTrBW4"
                      title="YouTube video player"
                      frameborder="0"
                      allow="
                        accelerometer;
                        autoplay;
                        clipboard-write;
                        encrypted-media;
                        gyroscope;
                        picture-in-picture;
                        web-share;
                      "
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </template>
          </ContCardcontenidos>
        </v-col>

        <!-- CARD 3 -->
        <v-col
          cols="12"
          sm="12"
          md="6"
          lg="4"
          class="mb-6 card-col"
          style="animation-delay: 0.6s"
        >
          <ContCardcontenidos
            id="cont-3"
            titulo="Etapas del Proceso"
            texto="Fase lumínica y Fase oscura explicadas."
            class="h-100"
          >
            <v-img
              :src="useAsset('concepto.png')"
              height="250"
              cover
              class="card-img"
            />

            <template #modal>
              <div class="modal-inner-content">
                <div class="phases-comparison mb-8">
                  <div class="phase-card light">
                    <h4>Fase Lumínica</h4>
                    <p>
                      Depende directamente de la luz solar. Ocurre en la
                      membrana del tilacoide.
                    </p>
                  </div>
                  <div class="phase-card dark">
                    <h4>Fase Oscura</h4>
                    <p>
                      Ciclo de Calvin. Ocurre en el estroma y produce glucosa.
                    </p>
                  </div>
                </div>

                <div class="infographic-box mb-8">
                  <v-img :src="useAsset('etapas-foto.png')" rounded="xl" />
                </div>

                <div class="video-premium-section">
                  <h3 class="video-title">Explicación Paso a Paso</h3>
                  <div class="video-frame">
                    <iframe
                      width="100%"
                      height="400"
                      src="https://www.youtube.com/embed/WExnW5uk0gg?si=tmUe5yC6pPdZkZvg"
                      title="YouTube video player"
                      frameborder="0"
                      allow="
                        accelerometer;
                        autoplay;
                        clipboard-write;
                        encrypted-media;
                        gyroscope;
                        picture-in-picture;
                        web-share;
                      "
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </template>
          </ContCardcontenidos>
        </v-col>
      </v-row>

      <footer class="actions-footer">
        <v-btn
          to="/dashboard"
          variant="flat"
          height="56"
          rounded="xl"
          class="btn-back-premium"
        >
          <v-icon icon="mdi-arrow-left" start />
          Volver al Dashboard
        </v-btn>
      </footer>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useStudentProfile } from "@/composables/useStudentProfile";

const { state, loadProfile } = useStudentProfile();
const isLoading = ref(true);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const particleStyles = (n) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  width: `${5 + Math.random() * 10}px`,
  height: `${5 + Math.random() * 10}px`,
  animationDuration: `${8 + Math.random() * 12}s`,
  animationDelay: `${Math.random() * 5}s`,
  opacity: 0.05 + Math.random() * 0.15,
});

const bubbleStyles = (n) => ({
  left: `${Math.random() * 100}%`,
  bottom: `-50px`,
  width: `${10 + Math.random() * 20}px`,
  height: `${10 + Math.random() * 20}px`,
  animationDuration: `${12 + Math.random() * 15}s`,
  animationDelay: `${Math.random() * 10}s`,
  opacity: 0.05 + Math.random() * 0.2,
});

onMounted(() => {
  loadProfile();
  checkMobile();
  window.addEventListener("resize", checkMobile);
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped>
.contenidos-main {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  background: linear-gradient(135deg, #f9f8f3 0%, #f1f3e8 100%);
}

.contenidos-container {
  padding: clamp(2rem, 5vw, 5rem) !important;
  max-width: 1600px !important;
  position: relative;
  z-index: 20; /* Superior al fondo */
}

/* --- DECORACIONES VIVAS (BIO-ENERGY) --- */
.grain-overlay {
  position: fixed;
  inset: 0;
  background-image: url("https://grainy-gradients.vercel.app/noise.svg");
  opacity: 0.12;
  pointer-events: none;
  z-index: 10;
}

.parallax-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: #fbfcf8;
  overflow: hidden;
}

.parallax-bg::before {
  background: linear-gradient(
    135deg,
    rgba(128, 161, 36, 0.882) 0%,
    rgb(221, 174, 56) 50%,
    rgb(45, 106, 79) 100%
  );
  background-size: 400% 400%;
  animation: mesh-flow 18s ease infinite;
}

@keyframes mesh-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Rayos de Sol */
.sun-ray {
  position: absolute;
  top: -20%;
  left: 20%;
  width: 30vw;
  height: 150vh;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.732),
    transparent
  );
  filter: blur(28px);
  transform: rotate(-25deg);
  animation: ray-move 10s infinite alternate ease-in-out;
}
.ray-2 {
  left: 60%;
  animation-delay: -5s;
}

@keyframes ray-move {
  from {
    transform: translateX(-10%) rotate(-25deg);
  }
  to {
    transform: translateX(10%) rotate(-25deg);
  }
}

/* Orbes */
.glass-blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.42;
  filter: blur(110px);
  animation: float-blob 18s infinite ease-in-out alternate;
}

.blob-1 {
  width: 900px;
  height: 900px;
  background: radial-gradient(circle, rgb(175, 231, 21), transparent 65%);
  top: -25%;
  left: -20%;
}

.blob-2 {
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgb(221, 174, 56), transparent);
  bottom: -20%;
  right: -20%;
  animation-delay: -4s;
}

.blob-3 {
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(45, 106, 79, 0.721),
    transparent 70%
  );
  top: 35%;
  right: 5%;
  animation-delay: -9s;
}

/* Partículas Bio (Clorofila) */
.bio-particle {
  position: absolute;
  background: #80a124;
  border-radius: 50%;
  filter: blur(2px);
  opacity: 0.5;
  animation: particle-wander 12s infinite ease-in-out;
}

@keyframes particle-wander {
  0% {
    transform: translate(0, 0) scale(2);
  }
  33% {
    transform: translate(100px, 150px) scale(1.5);
  }
  66% {
    transform: translate(-80px, 80px) scale(0.8);
  }
  100% {
    transform: translate(0, 0) scale(2);
  }
}

/* Burbujas (Oxígeno) */
.oxygen-bubble {
  position: absolute;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  backdrop-filter: blur(2px);
  animation: bubble-up 15s infinite linear;
}

@keyframes bubble-up {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.4;
  }
  90% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(-120vh) translateX(50px);
    opacity: 0;
  }
}

/* --- OPTIMIZACIÓN MÓVIL --- */
@media (max-width: 768px) {
  .hide-mobile {
    display: none !important;
  }

  .parallax-bg::before {
    animation-duration: 40s; /* Más lento = menos estrés GPU */
    opacity: 0.08;
  }

  .glass-blob {
    filter: blur(80px); /* Reducción drástica de blur */
    animation: none !important;
    opacity: 0.2;
  }

  .blob-1 {
    width: 300px;
    height: 300px;
    top: 10%;
    left: -10%;
  }

  .bio-particle {
    animation-duration: 20s !important;
    filter: none !important; /* Sin blur en móvil */
  }

  .oxygen-bubble {
    backdrop-filter: none !important; /* Sin backdrop-filter */
    border-width: 1px;
  }

  .contenidos-container {
    padding: 1.5rem !important;
  }

  .page-title {
    font-size: 2.2rem;
  }

  .card-col {
    animation: none !important; /* Quitar animaciones de entrada en móvil */
    opacity: 1 !important;
    transform: none !important;
  }
}

/* --- HEADER --- */
.contenidos-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto clamp(3rem, 6vh, 5rem);
}

.header-tag {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(128, 161, 36, 0.1);
  color: #80a124;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.75rem;
  border-radius: 99px;
  margin-bottom: 20px;
  animation: fadeInUp 0.8s ease both;
}

.page-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 950;
  color: #1a1a1a;
  letter-spacing: -2px;
  line-height: 1;
  margin-bottom: 24px;
  animation: fadeInUp 0.8s ease both;
}

.accent-dot {
  color: #80a124;
}

.page-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  line-height: 1.6;
  animation: fadeInUp 0.8s ease both;
}

/* --- GRID --- */
.card-col {
  animation: fadeInUp 0.8s ease both;
}

.card-img {
  border-radius: 24px 24px 0 0;
}

/* --- MODAL INNER --- */
.modal-inner-content {
  padding-top: 10px;
}

.modal-body-text {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #4b5563;
  margin-bottom: 1.5rem;
}

.infographic-box {
  background: white;
  padding: 12px;
  border-radius: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
}

.infographic-caption {
  text-align: center;
  font-size: 0.9rem;
  font-weight: 700;
  color: #9ca3af;
  margin-top: 12px;
}

.didactic-note {
  background: #fffbeb;
  border-left: 4px solid #f59e0b;
  padding: 20px 24px;
  border-radius: 0 20px 20px 0;
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #92400e;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  margin-bottom: 12px;
  position: relative;
  padding-left: 28px;
}

.feature-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #80a124;
  font-weight: 900;
}

.video-premium-section {
  margin-top: 40px;
}

.video-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.video-frame {
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  background: black;
}

.phases-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.phase-card {
  padding: 24px;
  border-radius: 24px;
}

.phase-card.light {
  background: #fffcea;
  border: 1px solid #fef3c7;
}
.phase-card.dark {
  background: #f0fdf4;
  border: 1px solid #dcfce7;
}

.phase-card h4 {
  font-weight: 900;
  margin-bottom: 8px;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.phase-card.light h4 {
  color: #b45309;
}
.phase-card.dark h4 {
  color: #15803d;
}

/* --- FOOTER --- */
.actions-footer {
  margin-top: 5rem;
  display: flex;
  justify-content: center;
}

.btn-back-premium {
  background: white !important;
  color: #1a1a1a !important;
  font-weight: 800 !important;
  padding: 0 40px !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05) !important;
  transition: all 0.3s ease !important;
}

.btn-back-premium:hover {
  transform: translateY(-5px);
  background: #1a1a1a !important;
  color: white !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 960px) {
  .phases-comparison {
    grid-template-columns: 1fr;
  }
}
</style>
