<template>
  <div class="dashboard-page">
    <LoadingScreen :active="isLoading" :student-name="state.name" />

    <v-container fluid class="pa-0">
      <v-row no-gutters class="dashboard-shell">
        <!-- PANEL IZQUIERDO (HERO) -->
        <v-col cols="12" lg="5" class="hero-panel">
          <div class="hero-sticky-content">
            <div class="floating-leaves" aria-hidden="true">
              <LeafAlt
                v-for="leaf in isMobile ? 5 : 15"
                :key="leaf.id"
                class="leaf"
                :style="{
                  left: leaf.left,
                  animationDuration: leaf.duration,
                  animationDelay: leaf.delay,
                  opacity: leaf.opacity,
                  fontSize: leaf.size,
                }"
              />
            </div>

            <div class="hero-main">
              <div class="logo-container">
                <div class="logo-orbit"></div>
                <v-img :src="logoSrc" class="hero-logo" />
              </div>

              <div class="hero-text">
                <div class="badge-mini">
                  <v-icon icon="mdi-leaf" size="14" class="mr-1" />
                  Ciencias Naturales
                </div>
                <h1 class="hero-title">
                  Fotosíntesis <span class="gold">Vegetal</span>
                </h1>
                <p class="hero-subtitle">
                  Descubre el motor energético de la vida en la Tierra.
                </p>
              </div>

              <div class="hero-stats">
                <div class="stat-item">
                  <i class="bx bx-time"></i>
                  <span>20m</span>
                </div>
                <div class="stat-item">
                  <i class="bx bx-book-open"></i>
                  <span>6 Cap</span>
                </div>
                <div class="stat-item">
                  <i class="bx bx-trophy"></i>
                  <span>Nivel {{ state.grade }}°</span>
                </div>
              </div>
            </div>
          </div>
        </v-col>

        <!-- PANEL DERECHO (CONTENIDO) -->
        <v-col cols="12" lg="7" class="content-panel">
          <div class="content-scroll-area">
            <header class="user-welcome">
              <v-row align="center">
                <v-col cols="12" md="8">
                  <span class="welcome-tag">Hola de nuevo</span>
                  <h2 class="welcome-name">{{ state.name || "Estudiante" }}</h2>
                  <p class="welcome-desc">{{ welcomeMessage }}</p>
                </v-col>
                <v-col cols="12" md="4" class="text-right">
                  <!-- BOTÓN DE NOTIFICACIONES REEMPLAZADO -->
                  <button
                    class="notif-pill-btn"
                    @click="showUpdateModal = true"
                  >
                    <v-icon
                      icon="mdi-bell-ring-outline"
                      size="20"
                      class="mr-2"
                    />
                    <span>Novedades</span>
                    <span class="pill-dot"></span>
                  </button>
                </v-col>
              </v-row>
            </header>

            <!-- MODAL DE ACTUALIZACIONES INTEGRADO CON ANIMACIÓN SMOOTH -->
            <transition name="modal-pop">
              <div
                v-if="showUpdateModal"
                class="custom-modal-overlay"
                @click.self="showUpdateModal = false"
              >
                <div class="custom-modal-content">
                  <div class="modal-header">
                    <h3>Actualizaciones Recientes</h3>
                    <v-btn
                      icon="mdi-close"
                      variant="text"
                      size="small"
                      @click="showUpdateModal = false"
                    />
                  </div>
                  <div class="modal-body">
                    <div
                      v-for="(update, i) in updates"
                      :key="i"
                      class="update-card-mini"
                    >
                      <div
                        class="update-icon"
                        :style="{ background: update.color }"
                      >
                        <v-icon :icon="update.icon" size="16" color="white" />
                      </div>
                      <div class="update-info">
                        <strong>{{ update.title }}</strong>
                        <p>{{ update.desc }}</p>
                      </div>
                    </div>
                  </div>
                  <v-btn
                    block
                    color="primary"
                    class="mt-4"
                    rounded="lg"
                    @click="showUpdateModal = false"
                    >Cerrar</v-btn
                  >
                </div>
              </div>
            </transition>

            <!-- SECCIÓN: OBJETIVOS -->
            <section class="dashboard-section">
              <div class="section-header">
                <div class="header-icon"><i class="bx bx-target-lock"></i></div>
                <h3>Objetivos de aprendizaje</h3>
              </div>
              <div class="goals-grid">
                <div
                  v-for="(goal, i) in competencies"
                  :key="i"
                  class="goal-card"
                >
                  <p class="goal-desc">{{ goal.descripcion }}</p>
                  <div class="goal-tags">
                    <span v-for="tag in goal.tags" :key="tag" class="tag">{{
                      tag
                    }}</span>
                  </div>
                </div>
              </div>
            </section>

            <!-- SECCIÓN: RUTA -->
            <section class="dashboard-section">
              <div class="section-header">
                <div class="header-icon"><i class="bx bx-map-alt"></i></div>
                <h3>Tu ruta de aprendizaje</h3>
              </div>
              <div class="track-list">
                <div
                  v-for="(track, idx) in tracklist"
                  :key="idx"
                  class="track-card"
                  :class="track.class"
                >
                  <div class="track-num">{{ track.num }}</div>
                  <div class="track-body">
                    <h4>{{ track.title }}</h4>
                    <span>{{ track.sub }}</span>
                  </div>
                  <div class="track-status">{{ track.tagText }}</div>
                </div>
              </div>
            </section>

            <!-- SECCIÓN: VIDEO -->
            <section class="dashboard-section">
              <div class="section-header">
                <div class="header-icon"><i class="bx bx-play-circle"></i></div>
                <h3>Tutorial de navegación</h3>
              </div>
              <div class="video-container">
                <iframe
                  src="https://www.youtube.com/embed/KNb2j_9gHy8"
                  frameborder="0"
                  allowfullscreen
                />
              </div>
            </section>

            <!-- CTA FINAL -->
            <div class="cta-container">
              <v-btn
                to="/contenidos"
                height="64"
                rounded="xl"
                class="cta-primary-btn px-10"
              >
                Iniciar Exploración
                <v-icon end icon="mdi-arrow-right" />
              </v-btn>
              <div class="cta-info">
                <v-icon icon="mdi-information-outline" size="14" class="mr-1" />
                Presiona para comenzar los contenidos
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { LeafAlt } from "@boxicons/vue";
import { useStudentProfile } from "@/composables/useStudentProfile";

const { state, loadProfile } = useStudentProfile();
const isLoading = ref(true);
const showUpdateModal = ref(false);
const isMobile = ref(false);

const updates = [
  {
    title: "Nuevas Actividades",
    desc: "Se agregaron 3 nuevas actividades y se actualizaron las existentes.",
    icon: "mdi-book-plus",
    color: "#10b981",
  },
  {
    title: "Optimización",
    desc: "Mejoras de rendimiento en contenidos, recursos y experiencia general.",
    icon: "mdi-lightning-bolt",
    color: "#3b82f6",
  },
  {
    title: "Próximamente",
    desc: "El contenido se adaptará automáticamente según el grado del estudiante.",
    icon: "mdi-school",
    color: "#f59e0b",
  },
];

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 1024;
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

const logoSrc = useAsset("logo.png");

const leafData = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${5 + ((i * 7) % 90)}%`,
  duration: `${10 + ((i * 2) % 15)}s`,
  delay: `${i * 0.5}s`,
  opacity: 0.1 + (i % 3) * 0.1,
  size: `${20 + (i % 5) * 5}px`,
}));

const welcomeMessage = computed(() => {
  if (state.grade === 6)
    return "Comenzaremos con los conceptos fundamentales de cómo las plantas crean su propio alimento.";
  if (state.grade === 7)
    return "Profundizaremos en los orgánulos celulares y las reacciones químicas básicas del proceso.";
  if (state.grade === 8)
    return "Analizaremos detalladamente el Ciclo de Calvin y el impacto en los ecosistemas globales.";
  return "Explora el proceso que sostiene la vida en la Tierra.";
});

const competencies = computed(() => {
  const base = [
    {
      descripcion: "Identificar los componentes esenciales",
      tags: ["Luz", "CO₂", "Agua"],
    },
  ];
  if (state.grade === 6)
    return [
      ...base,
      {
        descripcion: "Importancia del oxígeno para nosotros",
        tags: ["Oxígeno", "Vida"],
      },
    ];
  if (state.grade === 7)
    return [
      ...base,
      {
        descripcion: "Estructura del cloroplasto y tilacoides",
        tags: ["Cloroplasto"],
      },
    ];
  return [
    ...base,
    { descripcion: "Mecanismo del Ciclo de Calvin", tags: ["Bioquímica"] },
  ];
});

const tracklist = computed(() => [
  {
    num: "01",
    title: "¿Qué es la fotosíntesis?",
    sub: "Conceptos base",
    class: "active",
    tagText: "Disponible",
  },
  {
    num: "02",
    title: "La energía solar",
    sub: "Pigmentos y luz",
    class: "active",
    tagText: "Disponible",
  },
  {
    num: "03",
    title: "Fase Luminosa",
    sub: "Captura de energía",
    class: "locked",
    tagText: "Próximo",
  },
]);

definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped>
/* Transición para Notas */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.dashboard-page {
  padding: 0;
  overflow: hidden;
}

.dashboard-shell {
  height: 100vh;
  overflow: hidden;
}

/* PANEL IZQUIERDO */
.hero-panel {
  background: #ffffff;
  position: relative;
  border-right: 1px solid rgba(0, 0, 0, 0.03);
  z-index: 2;
}

.hero-sticky-content {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  overflow: hidden;
}

@media (max-width: 1264px) {
  .hero-sticky-content {
    position: sticky;
    top: 0;
    z-index: 10;
    height: auto;
    padding: 40px 24px;
    background: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
}

.hero-main {
  text-align: center;
  position: relative;
  z-index: 2;
}

.logo-container {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto 40px;
}

.logo-orbit {
  position: absolute;
  inset: -15px;
  border: 1px solid rgba(128, 161, 36, 0.2);
  border-radius: 50%;
  animation: rotate 20s linear infinite;
}

.logo-orbit::after {
  content: "";
  position: absolute;
  top: 20px;
  left: 20px;
  width: 10px;
  height: 10px;
  background: #ddae38;
  border-radius: 50%;
}

.hero-logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: white;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
}

.badge-mini {
  display: inline-flex;
  align-items: center;
  background: #f0fdf4;
  color: #80a124;
  padding: 6px 14px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 950;
  color: #1a1a1a;
  letter-spacing: -2px;
  line-height: 1;
  margin-bottom: 15px;
}

.gold {
  color: #ddae38;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  max-width: 320px;
  margin: 0 auto 40px;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.stat-item {
  background: #f8fafc;
  padding: 12px 20px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-item i {
  font-size: 20px;
  color: #80a124;
}
.stat-item span {
  font-size: 0.8rem;
  font-weight: 800;
  color: #1e293b;
}

/* PANEL DERECHO */
.content-panel {
  background: transparent;
  padding: clamp(30px, 6vw, 80px);
  height: 100vh;
  overflow-y: auto;
}

.user-welcome {
  margin-bottom: 60px;
}

.welcome-tag {
  font-size: 0.8rem;
  font-weight: 800;
  color: #80a124;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.welcome-name {
  font-size: 2.5rem;
  font-weight: 950;
  color: #1a1a1a;
  letter-spacing: -1.5px;
  margin-bottom: 10px;
}

.welcome-desc {
  font-size: 1.15rem;
  color: #475569;
  line-height: 1.6;
  max-width: 550px;
}

.dashboard-section {
  margin-bottom: 50px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 25px;
}

.header-icon {
  width: 42px;
  height: 42px;
  background: white;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #80a124;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.section-header h3 {
  font-size: 1.25rem;
  font-weight: 900;
  color: #1e293b;
  letter-spacing: -0.5px;
}

.goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.goal-card {
  background: white;
  padding: 24px;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
}

.goal-desc {
  font-size: 0.95rem;
  font-weight: 700;
  color: #334155;
  margin-bottom: 15px;
}

.goal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag {
  background: #f1f5f9;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 800;
  color: #64748b;
}

.track-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.track-card {
  background: white;
  padding: 20px 24px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.track-card.active {
  border-color: rgba(128, 161, 36, 0.2);
}
.track-card.locked {
  opacity: 0.6;
  background: #f8fafc;
}

.track-num {
  width: 44px;
  height: 44px;
  background: #f1f5f9;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  color: #1e293b;
}

.track-card.active .track-num {
  background: #80a124;
  color: white;
}

.track-body {
  flex: 1;
}
.track-body h4 {
  font-size: 1rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 2px;
}
.track-body span {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 600;
}

.track-status {
  font-size: 0.75rem;
  font-weight: 900;
  color: #80a124;
}

.video-container {
  aspect-ratio: 16/9;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
}

.video-container iframe {
  width: 100%;
  height: 100%;
}

.cta-container {
  margin-top: 60px;
  text-align: center;
}

.cta-primary-btn {
  background: linear-gradient(135deg, #ddae38 0%, #80a124 100%) !important;
  color: white !important;
  font-weight: 900 !important;
  letter-spacing: 0.5px !important;
  text-transform: none !important;
  font-size: 1.1rem !important;
  box-shadow: 0 20px 40px rgba(128, 161, 36, 0.3) !important;
  transition: all 0.3s ease !important;
}

.cta-primary-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(128, 161, 36, 0.4) !important;
}

.cta-info {
  margin-top: 15px;
  font-size: 0.8rem;
  color: #94a3b8;
  font-weight: 600;
}

/* HOJAS */
.floating-leaves {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.leaf {
  position: absolute;
  top: -50px;
  animation: fall linear infinite;
  color: #80a124;
}

@keyframes fall {
  from {
    transform: translateY(-50px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  to {
    transform: translateY(110vh) rotate(360deg);
    opacity: 0;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ANIMACIÓN MODAL SMOOTH */
.modal-pop-enter-active,
.modal-pop-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-pop-enter-from,
.modal-pop-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.custom-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-modal-content {
  background: white;
  width: 90%;
  max-width: 400px;
  padding: 30px;
  border-radius: 32px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.notif-pill-btn {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 8px 20px;
  border-radius: 99px;
  display: inline-flex;
  align-items: center;
  font-weight: 800;
  color: #1e293b;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.notif-pill-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.pill-dot {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  border: 2px solid white;
}

.update-card-mini {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 16px;
}

.update-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.update-info strong {
  display: block;
  font-size: 0.95rem;
  color: #1e293b;
}
.update-info p {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
}

@media (max-width: 1264px) {
  .dashboard-shell {
    height: auto;
    overflow: visible;
  }
  .content-panel {
    height: auto;
    overflow: visible;
    padding: 40px 20px;
  }
  .hero-panel {
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  }
  .hero-title {
    font-size: 2.5rem;
  }

  /* OPTIMIZACIÓN MÓVIL */
  .logo-orbit {
    animation: none !important;
  }
  .leaf {
    animation-duration: 25s !important;
  }
  .welcome-name {
    font-size: 2rem;
  }
}
</style>
