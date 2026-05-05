<template>
  <!-- Panel expandible con efecto Liquid Glass -->
  <div :class="['nav-expand-panel', { 'nav-open': drawerOpen }]">
    <!-- Botón hamburguesa dentro del panel -->
    <button
      class="nav-toggle-btn"
      @click="drawerOpen = !drawerOpen"
      aria-label="Toggle navigation"
    >
      <i :class="drawerOpen ? 'bx bx-x' : 'bx bx-menu-alt-left'"></i>
    </button>

    <!-- Logo y encabezado -->
    <div class="nav-header">
      <div class="logo-section">
        <p class="logo-title">FOTOSÍNTESIS</p>
        <p class="logo-version">v0.1.5 PreAlpha</p>
      </div>
    </div>

    <div class="nav-divider"></div>

    <!-- Lista de navegación -->
    <nav class="nav-list">
      <nuxt-link
        to="/dashboard"
        class="nav-link"
        @click="drawerOpen = false"
      >
        <i class="bx bxs-home-alt-2"></i>
        <span>Inicio</span>
      </nuxt-link>

      <nuxt-link
        to="/contenidos"
        class="nav-link"
        @click="drawerOpen = false"
      >
        <i class="bx bx-search-alt-2"></i>
        <span>Contenidos</span>
      </nuxt-link>

      <nuxt-link
        to="/404"
        class="nav-link"
        @click="drawerOpen = false"
      >
        <i class="bx bxs-book-open"></i>
        <span>Actividades</span>
      </nuxt-link>

      <nuxt-link
        to="/404"
        class="nav-link"
        @click="drawerOpen = false"
      >
        <i class="bx bxs-bar-chart-alt-2"></i>
        <span>Mi progreso</span>
      </nuxt-link>
    </nav>
  </div>

  <!-- Overlay para cerrar el panel -->
  <transition name="overlay-fade">
    <div
      v-if="drawerOpen"
      class="nav-overlay"
      @click="drawerOpen = false"
    ></div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const drawerOpen = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})
</script>

<style scoped>
@import url("https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css");

/* Panel expandible principal */
.nav-expand-panel {
  position: fixed;
  top: 24px;
  left: 24px;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  z-index: 999;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* Estado abierto */
.nav-expand-panel.nav-open {
  width: 280px;
  height: auto;
  max-height: 80vh;
  border-radius: 28px;
  padding: 1.5rem 0;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  overflow: visible;
}

/* Botón hamburguesa */
.nav-toggle-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  color: #2d6a4f;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  padding: 0;
  z-index: 10;
}

.nav-toggle-btn:hover {
  transform: translate(-50%, -50%) scale(1.1);
  color: #1b5e20;
}

.nav-expand-panel.nav-open .nav-toggle-btn {
  position: static;
  width: auto;
  height: auto;
  transform: none;
  top: auto;
  left: auto;
  font-size: 18px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  color: #374151;
  display: flex;
  justify-content: flex-end;
  border-radius: 8px;
}

.nav-expand-panel.nav-open .nav-toggle-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #1b5e20;
  transform: none;
}

.nav-header {
  padding: 0 1.5rem;
  margin-bottom: 1rem;
  opacity: 0;
  transition: opacity 0.6s ease 0.2s;
  pointer-events: none;
}

.nav-expand-panel.nav-open .nav-header {
  opacity: 1;
  pointer-events: auto;
}

.logo-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.logo-title {
  font-size: 14px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.3px;
  margin: 0;
}

.logo-version {
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
}

/* Divisor */
.nav-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin: 0 1.5rem 1rem;
  opacity: 0;
  transition: opacity 0.6s ease 0.2s;
}

.nav-expand-panel.nav-open .nav-divider {
  opacity: 1;
}

/* Lista de navegación */
.nav-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 0.75rem;
  list-style: none;
  opacity: 0;
  transition: opacity 0.6s ease 0.3s;
}

.nav-expand-panel.nav-open .nav-list {
  opacity: 1;
}

/* Enlaces de navegación */
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  text-decoration: none;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.nav-link:hover {
  background: rgba(59, 130, 246, 0.08);
  color: #3b82f6;
  transform: translateX(4px);
}

.nav-link:active {
  background: rgba(59, 130, 246, 0.12);
}

.nav-link i {
  font-size: 18px;
  min-width: 18px;
  transition: color 0.3s ease;
}

.nav-link:hover i {
  color: #3b82f6;
}

/* Overlay oscuro */
.nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  z-index: 998;
}

/* Animaciones del overlay */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: all 0.4s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

/* Responsive para móviles */
@media (max-width: 600px) {
  .nav-expand-panel {
    top: 12px;
    left: 12px;
  }

  .nav-expand-panel.nav-open {
    width: 240px;
    max-height: 70vh;
  }

  .nav-header {
    padding: 0 1rem;
  }

  .nav-divider {
    margin: 0 1rem 1rem;
  }

  .nav-list {
    padding: 0 0.5rem;
  }

  .nav-link {
    padding: 0.65rem 0.75rem;
    font-size: 13px;
  }

  .nav-link i {
    font-size: 16px;
  }
}

/* Efecto 'liquid' extra suave */
.nav-expand-panel.nav-open {
  animation: liquidFlow 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes liquidFlow {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}
</style>

