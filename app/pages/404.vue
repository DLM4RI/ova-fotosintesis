<template>
  <v-main class="error-page d-flex align-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4" class="text-center">
          
          <!-- Título Simple -->
          <h1 class="text-h1 font-weight-black accent-text mb-2">503</h1>
          <h2 class="text-h4 font-weight-bold white--text mb-4">Página no encontrada</h2>
          
          <p class="text-body-1 grey--text text--lighten-1 mb-8">
            Lo sentimos, el recurso que buscas no está disponible o se encuentra en 
            <span class="accent-text font-weight-bold">mantenimiento</span>.
          </p>

          <!-- Botones -->
          <div class="d-flex flex-column flex-sm-row justify-center gap-4">
            <v-btn
              color="#00c8ff"
              size="x-large"
              rounded="lg"
              class="white--text elevation-4"
              prepend-icon="mdi-home"
              @click="goHome"
            >
              Inicio
            </v-btn>
            

          </div>

          
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goHome = () => router.push('/dashboard')

definePageMeta({
  layout: "dashboard",
});

</script>

<style scoped>
.error-page {
  min-height: 100vh;
  color: rgb(0, 0, 0);
}

.accent-text {
  color: #000000;
}

.accent-link {
  color: #00c8ff;
  text-decoration: none;
}

.accent-link:hover {
  text-decoration: underline;
}

.gap-4 {
  gap: 16px;
}

/* Animación de entrada suave */
.v-container {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Estilo para el 404 grande */
.text-h1 {
  font-size: 8rem !important;
  letter-spacing: -2px !important;
  opacity: 0.9;
}
</style>