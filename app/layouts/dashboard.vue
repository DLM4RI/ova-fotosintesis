<template>
  <v-app>
    <v-btn
      icon="mdi-menu"
      class="fixed-hamburger"
      @click.stop="drawerOpen = !drawerOpen"
    ></v-btn>

    <v-navigation-drawer v-model="drawerOpen" temporary>
      <v-list nav>
        <v-list-item
          title="Home"
          prepend-icon="mdi-home"
          to="/dashboard"
          class="mb-2"
          @click="drawerOpen = false"
        />
        <v-list-item
          title="Sopa de letras"
          prepend-icon="mdi-tools"
          to="/sopadeletras"
          @click="drawerOpen = false"
        />
      </v-list>
    </v-navigation-drawer>

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
import { ref, onMounted } from 'vue'

const showWelcomeModal = ref(false)
const drawerOpen = ref(false)

onMounted(() => {
  const shouldShowModal = sessionStorage.getItem('showMaintenance')
  if (shouldShowModal === 'true') {
    showWelcomeModal.value = true
    sessionStorage.removeItem('showMaintenance')
  }
})
</script>

<style scoped>
.fixed-hamburger {
  position: fixed !important;
  top: 20px;
  left: 20px;
  z-index: 100;
}
</style>

<style>

</style>