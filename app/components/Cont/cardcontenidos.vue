<template>
  <v-card class="concepto-card" rounded="xl" elevation="0">
    <!-- las imagenes -->
    <div class="img-wrapper">
      <slot />
      <div class="img-overlay" />
    </div>

    <!-- Contenido -->
    <div class="card-body">
      <p class="card-titulo">{{ titulo }}</p>
      <p class="card-texto">{{ texto }}</p>
    </div>

    <!-- lo q hace -->
    <div class="card-footer">
      <v-btn
        rounded="lg"
        variant="tonal"
        color="primary"
        size="small"
        @click="modal = true"
      >
        Ver más
        <i class="bx bx-right-arrow-alt ml-1" style="font-size: 16px" />
      </v-btn>
    </div>
  </v-card>

  <!-- ESTE ES EL CARD DEL MODAL NO SE TE OLVIDE GAY -->
  <v-dialog v-model="modal" max-width="420">
    <v-card rounded="xl" elevation="0" class="modal-card">
      <div class="modal-header">
        <p class="modal-titulo">{{ titulo }}</p>
        <v-btn icon variant="text" size="small" @click="modal = false">
          <i class="bx bx-x" style="font-size: 20px; color: #6b7280" />
        </v-btn>
      </div>

      <v-divider />

      <div class="modal-body">
        <slot name="modal">
          
        </slot>
      </div>

      <div class="modal-footer">
        <v-btn
          rounded="lg"
          color="primary"
          variant="tonal"
          size="small"
          @click="modal = false"
        >
          <i class="bx bx-check mr-1" style="font-size: 16px" />
          Entendido
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  titulo: String,
  texto: String,
});

const modal = ref(false);
</script>

<style scoped>
@import url("https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css");
/* estilo del card gay */
.concepto-card {
  background: #ffffff;
  border: 1px solid #f0f0f0;
  overflow: hidden;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  width: 100%;
}

.concepto-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.09) !important;
}

.img-wrapper {
  position: relative;
}

.img-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to top, #ffffff, transparent);
}

.card-body {
  padding: 16px 20px 8px;
}
.card-footer {
  padding: 12px 20px 18px;
}

.card-titulo {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 6px;
  letter-spacing: -0.2px;
  line-height: 1.3;
}

.card-texto {
  font-size: 13px;
  color: #000000;
  margin: 0;
  line-height: 1.6;
  overflow: hidden;
}

/* estilo del modal */
.modal-card {
  border: 1px solid #f0f0f0;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px 14px;
}

.modal-titulo {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.modal-body {
  padding: 16px 20px;
}

.modal-texto {
  font-size: 13px;
  color: #4b5563;
  line-height: 1.7;
  margin: 0;
}

.modal-footer {
  padding: 12px 20px 18px;
  display: flex;
  justify-content: flex-end;
}
</style>
