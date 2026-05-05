<template>
  <v-app class="steam-layout">
    <!-- Fondo decorativo animado detrás de todo -->
    <div class="bg-gradient-shapes"></div>

    <!-- Drawer expandible con efecto Liquid Glass -->
    <NavDrawer v-model="drawerOpen" />

    <!-- Modal de Alerta -->
    <Alerta v-model="showWelcomeModal" />

    <v-main class="main-content">
      <v-container fluid class="content-wrapper">
        <!-- Transición suave para el contenido de las páginas -->
        <transition name="page-fade" mode="out-in" appear>
          <v-sheet
            rounded="xl"
            width="100%"
            class="content-surface elevation-1"
          >
            <!-- Contenedor interno sin scroll automático -->
            <div class="scroll-container w-100">
              <nuxt-page />
            </div>
          </v-sheet>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import NavDrawer from "@/components/barranav.vue";

const showWelcomeModal = ref(false);
const drawerOpen = ref(false);

onMounted(() => {
  const shouldShowModal = sessionStorage.getItem("showMaintenance");
  if (shouldShowModal === "true") {
    // Pequeño delay para que la animación de entrada no choque con el modal
    setTimeout(() => {
      showWelcomeModal.value = true;
      sessionStorage.removeItem("showMaintenance");
    }, 500);
  }
});
</script>

<style scoped>
/* Estética General Steam (Limpio y Profundo) */
.steam-layout {
  background-color: #f0f4f8 !important;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Formas decorativas de fondo (Animación suave) */
.bg-gradient-shapes {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background: 
    radial-gradient(circle at 10% 20%, rgba(76, 175, 80, 0.05) 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(0, 106, 255, 0.05) 0%, transparent 40%);
  pointer-events: none;
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.content-wrapper {
  display: flex;
  width: 100% !important;
  height: 100% !important;
  padding: clamp(1rem, 3vw, 2rem) !important;
  max-width: 100% !important;
}

/* Superficie de contenido principal */
.content-surface {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.04) !important;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;
}

.scroll-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: clamp(1rem, 2vw, 1.5rem);
}

/* Animaciones de Transición de Página */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: all 0.6s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}



/* Scrollbar personalizado */
.scroll-container::-webkit-scrollbar {
  width: 8px;
}

.scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.08);
  border-radius: 10px;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.12);
}

@media (max-width: 600px) {
  .content-wrapper {
    padding: 0.75rem !important;
  }
}
</style>