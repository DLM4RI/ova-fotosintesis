<template>
  <v-app class="ova-app-root">
    <!-- Fondo decorativo global -->
    <div class="app-bg-gradient"></div>

    <!-- Barra de navegación (Control Center) -->
    <NavDrawer v-model="drawerOpen" @open-updates="openUpdates" />

    <!-- Modales Globales -->
    <AppUpdateModal ref="updateModal" />

    <!-- Main Content Area -->
    <v-main class="main-viewport">
      <div class="page-content-container">
        <transition name="page-fade" mode="out-in">
          <div :key="$route.fullPath">
            <slot />
          </div>
        </transition>
      </div>

      <!-- Footer Global integrado al flujo de scroll -->
      <TheFooter />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import NavDrawer from "@/components/barranav.vue";

const drawerOpen = ref(false);
const showWelcomeModal = ref(false);
const updateModal = ref(null);

const openUpdates = () => {
  if (updateModal.value) {
    updateModal.value.open();
  }
};
</script>

<style>
.ova-app-root {
  background: #f8fafc !important;
}

.app-bg-gradient {
  position: fixed;
  inset: 0;
  background: 
    radial-gradient(circle at 0% 0%, rgba(128, 161, 36, 0.05) 0%, transparent 40%),
    radial-gradient(circle at 100% 100%, rgba(221, 174, 56, 0.05) 0%, transparent 40%);
  pointer-events: none;
  z-index: 0;
}

.main-viewport {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-content-container {
  flex: 1;
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