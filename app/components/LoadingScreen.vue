<template>
  <Transition name="wave-transition">
    <div v-if="active" class="loading-overlay">
      <div class="wave-container">
        <svg class="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,202.7C960,224,1056,224,1152,213.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div
        class="content-wrapper d-flex flex-column align-center justify-center text-center"
      >
        <div class="logo-pulse">
          <LeafAlt size="60" color="#80a124" />
        </div>

        <div class="loading-text">
          <span class="name-display">{{ studentName || "Preparando..." }}</span>
          <p class="status-msg">{{ statusMessage }}</p>
        </div>
      </div>

      <div class="wave-bg" />
    </div>
  </Transition>
</template>

<script setup>
import { LeafAlt } from "@boxicons/vue";

const props = defineProps({
  active: Boolean,
  studentName: String,
  statusMessage: {
    type: String,
    default: "Personalizando tu experiencia",
  },
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
}

.wave-bg {
  position: absolute;
  inset: 0;
  background: #f6f4ec;
  z-index: -1;
}

.content-wrapper {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  z-index: 2;
}

.logo-pulse {
  animation: pulse 2s infinite ease-in-out;
}

.loading-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.name-display {
  font-size: 1.8rem;
  font-weight: 800;
  color: #2a2a1e;
  letter-spacing: -0.5px;
}

.status-msg {
  font-size: 1rem;
  color: #6b6a5a;
  font-weight: 500;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

/* --- ANIMACION DE OLA (TRANSITION) --- */
.wave-transition-leave-active {
  transition: transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.wave-transition-leave-to {
  transform: translateY(100%);
}

/* Wave SVG stylings */
.wave-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  transform: translateY(100%);
  pointer-events: none;
}

.wave-svg {
  width: 100%;
  height: 100%;
}
</style>
