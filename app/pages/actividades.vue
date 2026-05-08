<template>
  <v-main class="activities-shell">
    <!-- DECORACIONES CINÉTICAS (BIO-DYNAMICS) -->
    <div class="grain-overlay" aria-hidden="true" />
    <div class="floating-elements" aria-hidden="true">
      <!-- Rayos de Luz Sutiles -->
      <div class="sun-ray r-1"></div>
      <div class="sun-ray r-2"></div>

      <!-- Hojas y Partículas -->
      <LeafAlt v-for="i in 8" :key="i" class="bg-leaf" :style="leafStyles(i)" />
      <div
        v-for="n in 6"
        :key="'p' + n"
        class="bio-dot"
        :style="dotStyles(n)"
      ></div>
      <div
        v-for="n in 4"
        :key="'b' + n"
        class="oxygen-bubble"
        :style="bubbleStyles(n)"
      ></div>

      <!-- Orbes de Energía -->
      <div class="nature-orb n-1"></div>
      <div class="nature-orb n-2"></div>
      <div class="nature-orb n-3"></div>
    </div>

    <v-container class="activities-container">
      <div class="max-width-container mx-auto">
        <!-- MOSTRAR ACTIVIDAD INDIVIDUAL -->
        <div v-if="selectedActivity" class="activity-view animate-in">
          <div class="activity-header d-flex flex-column align-start mb-10">
            <!-- Botón con margen negativo para alineación perfecta -->
            <v-btn
              @click="selectedActivity = null"
              icon="mdi-arrow-left"
              variant="text"
              color="success"
              class="ml-n4 mb-4"
            ></v-btn>

            <!-- Contenedor de texto para asegurar alineación izquierda pura -->
            <div class="text-left">
              <h1 class="display-title mb-2">
                {{ selectedActivity.title }}
              </h1>

              <p class="subtitle-text">
                {{ selectedActivity.description }}
              </p>
            </div>
          </div>

          <!-- Card con el componente de la actividad -->
          <v-card class="glass-card-full pa-8 elevation-0">
            <component :is="selectedActivity.component" />
          </v-card>
        </div>

        <!-- MOSTRAR GRID DE ACTIVIDADES -->
        <div v-else>
          <!-- HEADER -->
          <header class="text-center mb-16 animate-in">
            <div class="header-badge-custom mb-4">ACTIVIDADES INTERACTIVAS</div>
            <h1 class="display-title mb-2">Fotosíntesis Dinámica</h1>
            <p class="subtitle-header mx-auto">
              Supera estos retos para demostrar tu dominio sobre el ciclo de la vida vegetal.
            </p>
          </header>

          <!-- CARDS DE ACTIVIDADES -->
          <v-row class="justify-center mb-12">
            <v-col
              v-for="activity in activities"
              :key="activity.id"
              cols="12"
              sm="6"
              md="6"
              lg="5"
              class="mb-8"
            >
              <v-card
                class="activity-card animate-in"
                elevation="0"
                @click="selectActivity(activity)"
              >
                <div class="card-header-premium pa-8">
                  <!-- Contenedor del Icono con efecto de profundidad -->
                  <div class="icon-wrapper me-6">
                    <v-icon
                      :icon="activity.icon"
                      color="#80a124"
                      size="32"
                    ></v-icon>
                  </div>

                  <div class="header-content">
                    <h2 class="title-text">{{ activity.title }}</h2>
                    <p class="description-text1">{{ activity.description }}</p>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <!-- BOTÓN VOLVER -->
          <div class="text-center mt-8">
            <v-btn
              to="/dashboard"
              prepend-icon="mdi-arrow-left"
              variant="flat"
              class="rounded-pill px-10 text-none font-weight-bold back-btn"
              size="large"
            >
              Volver al Dashboard
            </v-btn>
          </div>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from "vue";
import { LeafAlt } from "@boxicons/vue";
import { useProgress } from "@/composables/useProgress";
import ActClasificacion from "@/components/actividades/ActClasificacion.vue";
import ActCrucigrama from "@/components/actividades/ActCrucigrama.vue";
import ActFlujoEnergia from "@/components/actividades/ActFlujoEnergia.vue";
import ActLaboratorio from "@/components/actividades/ActLaboratorio.vue";

definePageMeta({ layout: "dashboard" });

const selectedActivity = ref(null);

const activities = [
  {
    id: 1,
    title: "Crucigrama Maestro",
    description: "Encuentra los conceptos clave de la fotosíntesis",
    icon: "mdi-grid-large",
    component: ActCrucigrama,
  },
  {
    id: 2,
    title: "Flujo de Energía",
    description: "Comprende el flujo de energía en el ecosistema",
    icon: "mdi-vector-combine",
    component: ActFlujoEnergia,
  },
  {
    id: 3,
    title: "Clasificación",
    description: "Clasifica organismos según su rol en el ecosistema",
    icon: "mdi-swap-horizontal-bold",
    component: ActClasificacion,
  },
  {
    id: 4,
    title: "Laboratorio de Fórmulas",
    description: "Experimenta con las ecuaciones de la fotosíntesis",
    icon: "mdi-molecule",
    component: ActLaboratorio,
  },
];

const { markAsCompleted } = useProgress();

const selectActivity = (activity) => {
  selectedActivity.value = activity;
  markAsCompleted('act-' + activity.id);
};

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
</script>

<style scoped>
/* FONDO BASE */
.activities-shell {
  min-height: 100vh;
  background: #fbfbfd;
  position: relative;
  overflow-x: hidden;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    sans-serif;
}

.activities-container {
  padding: clamp(2rem, 5vw, 6rem) !important;
  max-width: 1440px !important;
  position: relative;
  z-index: 25;
}

/* DECORACIONES VIVAS (BIO-DYNAMICS) */
.grain-overlay {
  position: fixed;
  inset: 0;
  background-image: url("https://grainy-gradients.vercel.app/noise.svg");
  opacity: 0.12;
  pointer-events: none;
  z-index: 10;
}

.activities-shell::before {
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

/* Orbes de Energía */
.nature-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  opacity: 0.25;
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

/* CONTENEDOR MÁXIMO */
.max-width-container {
  max-width: 1100px;
  position: relative;
  z-index: 2;
}

/* HEADER */
header {
  text-align: center;
  margin-bottom: 4rem;
}

.display-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 950;
  color: #1a1a1a;
  letter-spacing: -3px;
  line-height: 1;
  margin-bottom: 1.5rem;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif;
}

.green-gradient {
  background: linear-gradient(135deg, #80a124, #2d6a4f);
}

.subtitle-text {
  font-size: 1.15rem;
  color: #475569;
  font-weight: 500;
  line-height: 1.6;
  text-align: left;
  letter-spacing: 0.3px;
}

.subtitle-header {
  font-size: 1.15rem;
  color: #475569;
  max-width: 700px;
  margin: 0 auto;
  font-weight: 500;
  line-height: 1.8;
  text-align: center;
  letter-spacing: 0.3px;
}

/* HEADER BADGE CUSTOM */
.header-badge-custom {
  display: inline-block;
  padding: 10px 24px;
  background: linear-gradient(135deg, rgba(128, 161, 36, 0.2) 0%, rgba(45, 106, 79, 0.15) 100%);
  color: #80a124;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-size: 0.7rem;
  border-radius: 99px;
  border: 1.5px solid rgba(128, 161, 36, 0.4);
  margin-bottom: 24px;
  animation: fadeInUp 0.8s ease both;
  box-shadow: 0 8px 20px rgba(128, 161, 36, 0.1);
  backdrop-filter: blur(8px);
}

/* ACTIVITY CARDS */
.activity-card {
  background: transparent !important;
  border: 1px solid rgba(0, 0, 0, 0.04) !important;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: visible;
  height: 100%;
  cursor: pointer;
  border-radius: 24px 24px 0 0 !important;
  position: relative;
}

.activity-card::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    #ddae38 0%,
    #80a124 25%,
    #2d6a4f 50%,
    #80a124 75%,
    #ddae38 100%
  );
  background-size: 200% 100%;
  border-radius: 0 0 24px 24px;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 0;
  }
  50% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0% 0;
  }
}

.activity-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 40px 80px rgba(128, 161, 36, 0.12) !important;
}

.card-header-premium {
  background: rgba(255, 255, 255, 0.7); /* Efecto cristalino */
  backdrop-filter: blur(10px);
  border-radius: 24px 24px 0 0 !important;
  display: flex;
  align-items: center;
  padding: 2.5rem !important; /* Más aire para un look premium */
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

/* Contenedor del icono estilo moneda/botón */
.icon-wrapper {
  background: #f1f8e9; /* Verde muy sutil de fondo */
  padding: 12px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
  flex-shrink: 0;
}

.title-text {
  color: #1a1a1a !important;
  font-weight: 700 !important;
  font-size: 1.35rem !important;
  margin: 0 !important;
  letter-spacing: -0.3px;
  line-height: 1.25;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif !important;
}

.description-text {
  color: #64748b !important;
  font-size: 0.9rem !important;
  margin-top: 6px !important;
  margin-bottom: 0 !important;
  font-weight: 400;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif !important;
}





/* VISTA DE ACTIVIDAD INDIVIDUAL */
.activity-header {
  animation: slideDown 0.5s ease;
  margin-bottom: 2rem;
  text-align: left;
}

.activity-header .v-btn {
  margin-bottom: 1rem !important;
  color: #80a124 !important;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.glass-card-full {
  background: white !important;
  border: 1px solid rgba(0, 0, 0, 0.04) !important;
  border-radius: 24px !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08) !important;
  padding: 3rem !important;
  min-height: 600px;
}

/* ANIMACIONES */
.animate-in {
  animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* BOTÓN VOLVER */
.back-btn {
  font-weight: 900 !important;
  text-transform: none !important;
  letter-spacing: 0.5px !important;
  background: linear-gradient(135deg, #80a124 0%, #2d6a4f 100%) !important;
  color: white !important;
  box-shadow: 0 10px 30px rgba(128, 161, 36, 0.2) !important;
  transition: all 0.3s ease !important;
  height: 60px !important;
  border-radius: 24px !important;
}

.back-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 15px 40px rgba(128, 161, 36, 0.3) !important;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .activities-container {
    padding: clamp(1rem, 4vw, 2rem) !important;
  }

  .display-title {
    font-size: clamp(1.8rem, 5vw, 2.8rem);
  }

  /* RESPONSIVE OPTIMIZADO */
  .card-header-premium {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1.5rem !important;
  }

  .icon-wrapper {
    margin-right: 0 !important;
    margin-bottom: 1rem;
  }
  
  .title-text {
    font-size: 1.3rem !important;
  }

  .glass-card-full {
    padding: 1.5rem !important;
  }
}
</style>
