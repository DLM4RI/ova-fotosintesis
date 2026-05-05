<template>
  <v-main class="d-flex align-center justify-center">
    <v-container>
      <v-card
        elevation="0"
        class="mx-auto pa-6 text-center bg-transparent"
        max-width="800"
      >
        <v-img
          :src="useAsset('logo.png')"
          width="280"
          height="280"
          class="mx-auto mb-6"
        />

        <v-card-text class="px-md-12">
          <h2 class="text-h4 font-weight-bold mb-4" style="color: #2e7d32">
            Explorando la Energía de la Vida
          </h2>
          <p class="text-body-1 grey--text text--darken-3 mb-6">
            Este objeto virtual de aprendizaje tiene como
            <b>propósito</b> desglosar los mecanismos fundamentales de la
            fotosíntesis, permitiendo al estudiante comprender cómo las plantas
            transforman la luz solar en energía química. Con un
            <b>enfoque</b> interactivo y visual, exploraremos desde la
            estructura especializada de los cloroplastos hasta las reacciones
            químicas esenciales que sustentan la biosfera terrestre.
          </p>
        </v-card-text>

        <v-btn
          to="/contenidos"
          color="success"
          size="x-large"
          rounded="pill"
          class="px-10 elevation-2 font-weight-bold"
          append-icon="mdi-rocket-launch"
        >
          Empezar
        </v-btn>

        <v-divider class="my-8"></v-divider>
        <h3 class="text-subtitle-2 font-weight-black grey--text text--darken-1">
          © 2026 DLM4RI Technology
        </h3>
      </v-card>
    </v-container>
  </v-main>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped>
/* Un pequeño efecto de entrada para que se vea más profesional */
.v-card {
  animation: fadeInUp 0.8s ease-out;
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
</style>
