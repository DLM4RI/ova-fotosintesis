<template>
  <v-main class="credits-shell">
    <LoadingScreen
      :active="isLoading"
      :student-name="state.name"
      status-message="Cargando equipo de desarrollo..."
    />

    <!-- DECORACIONES CINÉTICAS (BIO-DYNAMICS) -->
    <div class="grain-overlay" aria-hidden="true" />
    <div class="floating-elements" aria-hidden="true">
      <!-- Rayos de Luz Sutiles (Ocultos en móvil) -->
      <div class="sun-ray r-1 hide-mobile"></div>
      <div class="sun-ray r-2 hide-mobile"></div>

      <!-- Hojas y Partículas (Reducidas en móvil) -->
      <LeafAlt
        v-for="i in (isMobile ? 4 : 12)"
        :key="i"
        class="bg-leaf"
        :style="leafStyles(i)"
      />
      <div
        v-for="n in (isMobile ? 4 : 10)"
        :key="'p' + n"
        class="bio-dot"
        :style="dotStyles(n)"
      ></div>
      <div
        v-for="n in (isMobile ? 2 : 6)"
        :key="'b' + n"
        class="oxygen-bubble"
        :style="bubbleStyles(n)"
      ></div>

      <!-- Orbes de Energía (Solo 1 en móvil) -->
      <div class="nature-orb n-1"></div>
      <div class="nature-orb n-2 hide-mobile"></div>
      <div class="nature-orb n-3 hide-mobile"></div>
    </div>

    <v-container class="credits-container">
      <!-- CABECERA PREMIUM -->
      <header class="credits-header">
        <div class="header-badge">Proyecto OVA 2026</div>
        <h1 class="credits-title">
          Mentes detrás del <span class="green-gradient">Proyecto</span>
        </h1>
        <p class="credits-subtitle">
          Un equipo multidisciplinario dedicado a transformar la educación
          biológica.
        </p>

        <div class="header-divider">
          <div class="d-line"></div>
          <div class="d-icon"><LeafAlt size="28" /></div>
          <div class="d-line"></div>
        </div>
      </header>

      <!-- GRILLA DE INTEGRANTES -->
      <v-row class="team-grid" justify="center">
        <v-col
          v-for="member in team"
          :key="member.name"
          cols="12"
          sm="6"
          lg="3"
        >
          <v-card class="member-card" rounded="xl" elevation="0">
            <div class="member-image-container">
              <v-img
                :src="useAsset(member.photo)"
                cover
                class="member-img"
                height="340"
              />
              <div class="member-img-overlay"></div>
              <div class="social-box">
                <v-btn
                  icon
                  size="small"
                  color="white"
                  variant="flat"
                  :href="member.ig"
                  target="_blank"
                  class="ma-2"
                >
                  <v-icon icon="mdi-instagram" size="18" color="#e4405f" />
                </v-btn>
                <v-btn
                  icon
                  size="small"
                  color="white"
                  variant="flat"
                  :href="member.gh"
                  target="_blank"
                >
                  <v-icon icon="mdi-github" size="18" color="#e4405f" />
                </v-btn>
              </div>
              <div class="role-tag">{{ member.role }}</div>
            </div>

            <div class="member-content">
              <h3 class="member-name">{{ member.name }}</h3>
              <div class="member-quote-box">
                <v-icon
                  icon="mdi-format-quote-open"
                  size="20"
                  class="mb-2"
                  color="#80a124"
                />
                <p class="member-quote">{{ member.quote }}</p>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <section class="institutional-section">
        <v-card class="uni-card" rounded="24" elevation="0">
          <div class="uni-content-centered">
            <!-- Imagotipo Centrado -->
            <div class="uni-logo-wrap mb-6">
              <v-img
                :src="useAsset('Imagotipo-universidad.png')"
                width="280"
                class="mx-auto"
                alt="Imagotipo Universidad de Córdoba"
              />
            </div>

            <div class="uni-text-content text-center">
              <p class="uni-location">
                <v-icon icon="mdi-map-marker" size="16" /> Montería, Córdoba -
                Colombia
              </p>
              <div class="uni-divider mx-auto"></div>
              <p class="uni-description mx-auto">
                Este Objeto Virtual de Aprendizaje (OVA) es el resultado de un
                proceso de investigación y desarrollo tecnológico, diseñado para
                fortalecer las competencias científicas en estudiantes de
                educación básica. Agradecemos a la Facultad de Educación por el
                apoyo en este proyecto de innovación pedagógica.
              </p>
            </div>
          </div>
        </v-card>
      </section>

      <!-- BOTÓN DE RETORNO -->
      <div class="action-footer text-center mt-12">
        <v-btn
          to="/dashboard"
          variant="flat"
          color="white"
          rounded="xl"
          height="60"
          class="px-10 return-btn"
          elevation="8"
        >
          <v-icon start icon="mdi-arrow-left" />
          Volver al Dashboard
        </v-btn>
      </div>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { LeafAlt } from "@boxicons/vue";
import { useStudentProfile } from "@/composables/useStudentProfile";

const { state, loadProfile } = useStudentProfile();
const isLoading = ref(true);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

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

const team = [
  {
    name: "Mario Castro",
    role: "Desarrollador UI",
    photo: "mario.png",
    ig: "https://www.instagram.com/m4rcstro?igsh=aHB0Z2JwdnE5YWE1",
    quote:
      "La interfaz es el puente entre la curiosidad del estudiante y el conocimiento científico.",
    gh: "https://github.com/DLM4RI",
  },
  {
    name: "Rosendo de Castro",
    role: "Desarrollador UX",
    photo: "rosendo.jpeg",
    ig: "https://www.instagram.com/rosendo_de_castro_urango?igsh=NzYxNDBjMWRhZ205",
    quote:
      "Diseñar la experiencia fue como entender la luz: debe ser invisible pero esencial.",
    gh: "https://github.com/RosendoDC0",
  },
  {
    name: "Andrea Hernandez",
    role: "Project Manager",
    photo: "andrea.png",
    ig: "https://www.instagram.com/andre_hernandezo?igsh=M2F0enNuaWo2czlr",
    quote:
      "Gestionar este proyecto fue orquestar un ecosistema donde cada idea ayudó a crecer al resto.",
    gh: "https://github.com/DLM4RI",
  },
  {
    name: "Fabio Cantero",
    role: "QA Engineer",
    photo: "fabio.png",
    ig: "https://www.instagram.com/fabio__cantero?igsh=NGJqa25icWdtM2Vj",
    quote:
      "Mi trabajo fue asegurar que cada reacción en este OVA fuera tan precisa como en la naturaleza.",
    gh: "https://github.com/RosendoDC0",
  },
];

const leafStyles = (i) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  opacity: 0.05 + Math.random() * 0.1,
  transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random()})`,
  animation: `float-slow ${10 + Math.random() * 20}s infinite ease-in-out alternate`,
});

const dotStyles = (n) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  width: `${6 + Math.random() * 10}px`,
  height: `${6 + Math.random() * 10}px`,
  animationDuration: `${8 + Math.random() * 12}s`,
  animationDelay: `${Math.random() * 5}s`,
  opacity: 0.05 + Math.random() * 0.1,
});

const bubbleStyles = (n) => ({
  left: `${Math.random() * 100}%`,
  bottom: `-60px`,
  width: `${10 + Math.random() * 20}px`,
  height: `${10 + Math.random() * 20}px`,
  animationDuration: `${14 + Math.random() * 15}s`,
  animationDelay: `${Math.random() * 10}s`,
  opacity: 0.05 + Math.random() * 0.15,
});

definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped>
.credits-shell {
  min-height: 100vh;
  background: #fbfbfd;
  position: relative;
  overflow-x: hidden;
}

.credits-container {
  padding: clamp(2rem, 5vw, 6rem) !important;
  max-width: 1440px !important;
  position: relative;
  z-index: 25; /* Encima de las animaciones */
}

/* HEADER */
.credits-header {
  text-align: center;
  margin-bottom: 5rem;
}

.header-badge {
  display: inline-block;
  background: rgba(128, 161, 36, 0.1);
  color: #80a124;
  padding: 8px 18px;
  border-radius: 99px;
  font-weight: 850;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
}

.credits-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 950;
  color: #1a1a1a;
  letter-spacing: -3px;
  line-height: 1;
  margin-bottom: 1.5rem;
}

.green-gradient {
  background: linear-gradient(135deg, #80a124, #2d6a4f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.credits-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  font-weight: 500;
}

.header-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.d-line {
  height: 2px;
  width: 80px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(128, 161, 36, 0.3),
    transparent
  );
}

.d-icon {
  color: #80a124;
  animation: pulse 2s infinite;
}

/* TEAM GRID */
.team-grid {
  margin-bottom: 6rem;
}

.member-card {
  background: white !important;
  border: 1px solid rgba(0, 0, 0, 0.04) !important;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
  height: 100%;
}

.member-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 40px 80px rgba(128, 161, 36, 0.12) !important;
}

.member-image-container {
  position: relative;
  overflow: hidden;
}

.member-img {
  transition: transform 0.8s ease;
}
.member-card:hover .member-img {
  transform: scale(1.08);
}

.member-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
}

.social-box {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 2;
}

.role-tag {
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: rgba(128, 161, 36, 0.9);
  backdrop-filter: blur(5px);
  color: white;
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

.member-content {
  padding: 2rem;
}
.member-name {
  font-size: 1.4rem;
  font-weight: 900;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.member-quote-box {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 20px;
  border-left: 4px solid #80a124;
}

.member-quote {
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.6;
  font-style: italic;
  font-weight: 500;
}

/* UNI SECTION */
.institutional-section {
  margin-bottom: 4rem;
}

.uni-card {
  background: white !important;
  border: 1px solid rgba(0, 0, 0, 0.04) !important;
  padding: clamp(2.5rem, 6vw, 5rem);
}

.uni-content-centered {
  max-width: 900px;
  margin: 0 auto;
}

.uni-logo-wrap {
  position: relative;
  transition: transform 0.4s ease;
}

.uni-logo-wrap:hover {
  transform: scale(1.02);
}

.uni-location {
  font-size: 1rem;
  color: #80a124;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.uni-divider {
  width: 60px;
  height: 4px;
  background: #80a124;
  border-radius: 2px;
  margin-bottom: 2rem;
}

.uni-description {
  font-size: 1.1rem;
  color: #475569;
  line-height: 1.8;
  max-width: 800px;
}

/* DECORATIONS VIVAS (BIO-DYNAMICS) */
.grain-overlay {
  position: fixed;
  inset: 0;
  background-image: url("https://grainy-gradients.vercel.app/noise.svg");
  opacity: 0.12;
  pointer-events: none;
  z-index: 10;
}

.credits-shell {
  min-height: 100vh;
  background: #fbfbfd;
  position: relative;
  overflow-x: hidden;
}

.credits-shell::before {
  content: "";
  position: fixed;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(128, 161, 36, 0.15) 0%,
    rgba(221, 174, 56, 0.15) 50%,
    rgba(45, 106, 79, 0.15) 100%
  );
  background-size: 400% 400%;
  animation: color-shift 15s ease infinite;
  z-index: 0;
}

@keyframes color-shift {
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

/* Rayos de Luz */
.sun-ray {
  position: absolute;
  top: -10%;
  width: 40vw;
  height: 120vh;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.18),
    transparent
  );
  transform: rotate(-30deg);
  filter: blur(60px);
  animation: ray-sweep 12s infinite alternate ease-in-out;
}
.r-1 {
  left: 10%;
}
.r-2 {
  left: 50%;
  animation-delay: -6s;
}

@keyframes ray-sweep {
  from {
    transform: translateX(-15%) rotate(-30deg);
  }
  to {
    transform: translateX(15%) rotate(-30deg);
  }
}

.floating-elements {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.bg-leaf {
  position: absolute;
  color: #80a124;
  pointer-events: none;
  filter: blur(1px);
}

/* Partículas Bio */
.bio-dot {
  position: absolute;
  background: #ddae38;
  border-radius: 50%;
  filter: blur(2px);
  animation: dot-float 10s infinite ease-in-out;
}

@keyframes dot-float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.2;
  }
  50% {
    transform: translate(60px, -40px) scale(1.4);
    opacity: 0.5;
  }
}

/* Burbujas */
.oxygen-bubble {
  position: absolute;
  border: 1.5px solid rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  backdrop-filter: blur(1px);
  animation: bubble-upward 18s infinite linear;
}

@keyframes bubble-upward {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  15% {
    opacity: 0.4;
  }
  85% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(-120vh) translateX(40px);
    opacity: 0;
  }
}

.nature-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  opacity: 0.25; /* Opacidad reducida */
  animation: orb-dance 20s infinite ease-in-out alternate;
}

.n-1 {
  width: 900px;
  height: 900px;
  background: #80a124;
  top: -15%;
  left: -10%;
}
.n-2 {
  width: 800px;
  height: 800px;
  background: #ddae38;
  bottom: -15%;
  right: -10%;
  animation-delay: -4s;
}
.n-3 {
  width: 600px;
  height: 600px;
  background: #2d6a4f;
  top: 30%;
  right: 5%;
  animation-delay: -8s;
}
.n-4 {
  width: 500px;
  height: 500px;
  background: #80a124;
  bottom: 10%;
  left: 0%;
  animation-delay: -12s;
}

@keyframes orb-dance {
  0% {
    transform: translate(0, 0) scale(1) rotate(0deg);
  }
  50% {
    transform: translate(100px, 80px) scale(1.15) rotate(5deg);
  }
  100% {
    transform: translate(-80px, 120px) scale(0.9) rotate(-5deg);
  }
}

.return-btn {
  font-weight: 900 !important;
  text-transform: none !important;
  letter-spacing: 0.5px !important;
  color: #1a1a1a !important;
  transition: all 0.3s ease !important;
}

.return-btn:hover {
  transform: scale(1.05);
}

@keyframes float-slow {
  from {
    transform: translate(0, 0) rotate(0deg);
  }
  to {
    transform: translate(30px, 20px) rotate(15deg);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 900px) {
  .uni-card {
    padding: 2rem 1.5rem !important;
  }
  .credits-container {
    padding: 2rem 1.25rem !important;
  }
  .credits-title {
    font-size: 2.5rem;
    letter-spacing: -1.5px;
  }
  .member-card:hover {
    transform: none !important; /* Desactivar hover pesado en touch */
  }
  
  .hide-mobile {
    display: none !important;
  }

  .credits-shell::before {
    animation-duration: 40s !important;
    opacity: 0.1;
  }

  .nature-orb {
    filter: blur(70px) !important;
    animation: none !important;
    opacity: 0.15;
  }

  .n-1 {
    width: 300px;
    height: 300px;
    top: 5%;
    left: -5%;
  }

  .bg-leaf, .bio-dot, .oxygen-bubble {
    animation-duration: 25s !important;
    filter: none !important;
  }

  .oxygen-bubble {
    backdrop-filter: none !important;
  }
}
</style>
