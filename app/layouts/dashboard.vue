<template>
  <v-app>
    <div class="fixed-controls">
      <v-btn @click="drawerOpen = true" icon>
        <i class="bx bx-menu" />
      </v-btn>
    </div>

    <NavDrawer v-model="drawerOpen" />

    <Alerta v-model="showWelcomeModal" />

    <v-main>
      <v-container fluid class="pa-6">
        <v-sheet
          rounded="lg"
          width="100%"
          min-height="500"
          class="d-flex align-center justify-center"
        >
          <nuxt-page />
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="js" setup>
import { ref, onMounted } from "vue";

const showWelcomeModal = ref(false);
const drawerOpen = ref(false);
import NavDrawer from "@/components/barranav.vue";

onMounted(() => {
  const shouldShowModal = sessionStorage.getItem("showMaintenance");
  if (shouldShowModal === "true") {
    showWelcomeModal.value = true;
    sessionStorage.removeItem("showMaintenance");
  }
});
</script>

<style scoped>
.fixed-controls {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 12px;
}

.fixed-hamburger {
  position: relative;
  z-index: 101;
}

@keyframes pulse-icon {
  0%,
  100% {
    transform: scale(0.9);
    opacity: 1;
  }
  50% {
    transform: scale(1);
    opacity: 0.7;
  }
}

.animated-icon {
  animation: pulse-icon 2s infinite ease-in-out;
}
</style>
