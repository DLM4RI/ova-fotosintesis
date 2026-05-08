<template>
  <v-card class="concepto-card" rounded="xl" elevation="0">
    <!-- las imagenes -->
    <div class="img-wrapper">
      <slot />
      <div class="img-overlay" />
      <div class="hover-info">
        <v-btn
          icon="mdi-magnify-plus-outline"
          variant="flat"
          color="white"
          class="zoom-btn"
          @click="openModal"
        ></v-btn>
      </div>
    </div>

    <!-- Contenido -->
    <div class="card-body">
      <p class="card-titulo">{{ titulo }}</p>
      <p class="card-texto">{{ texto }}</p>
    </div>

    <!-- lo q hace -->
    <div class="card-footer">
      <v-btn
        rounded="xl"
        variant="flat"
        class="ver-mas-btn"
        block
        @click="openModal"
      >
        <span>Explorar Módulo</span>
        <v-icon end icon="mdi-chevron-right" size="18" />
      </v-btn>
    </div>
  </v-card>

  <!-- MODAL REDISEÑADO - GRANDE Y ADAPTATIVO -->
  <v-dialog 
    v-model="modal" 
    max-width="1000" 
    transition="dialog-bottom-transition"
    class="premium-dialog"
  >
    <v-card rounded="xl" class="modal-card">
      <div class="modal-top-bar">
        <div class="modal-header-info">
          <LeafAlt size="24" color="#80a124" />
          <span class="modal-breadcrumb">Módulos de Aprendizaje</span>
        </div>
        <v-btn icon="mdi-close" variant="text" color="grey-darken-1" @click="modal = false"></v-btn>
      </div>

      <div class="modal-scroll-body">
        <div class="modal-hero-section">
          <p class="modal-titulo-grande">{{ titulo }}</p>
          <div class="modal-accent-line" />
        </div>

        <div class="modal-main-content">
          <slot name="modal" />
        </div>
      </div>

      <v-divider />

      <div class="modal-footer-fancy">
        <v-spacer />
        <v-btn
          rounded="xl"
          color="green-darken-2"
          variant="flat"
          height="52"
          class="px-8 entendido-btn"
          @click="modal = false"
        >
          <v-icon start icon="mdi-check-circle-outline" />
          He comprendido este módulo
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>


<script setup>
import { ref } from "vue";
import { LeafAlt } from "@boxicons/vue";
import { useProgress } from "@/composables/useProgress";

const props = defineProps({
  id: String,
  titulo: String,
  texto: String,
});

const modal = ref(false);
const { markAsCompleted } = useProgress();

const openModal = () => {
  modal.value = true;
  if (props.id) {
    markAsCompleted(props.id);
  }
};
</script>

<style scoped>
/* --- CARD STYLES --- */
.concepto-card {
  background: white !important;
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.concepto-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(128, 161, 36, 0.15) !important;
  border-color: rgba(128, 161, 36, 0.2) !important;
}

.img-wrapper {
  position: relative;
  overflow: hidden;
}

.img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.4), transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hover-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 2;
}

.concepto-card:hover .img-overlay,
.concepto-card:hover .hover-info {
  opacity: 1;
}

.concepto-card:hover .hover-info {
  transform: translate(-50%, -50%) scale(1);
}

.zoom-btn {
  box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
}

.card-body {
  padding: 24px;
  flex: 1;
}

.card-titulo {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 8px;
  line-height: 1.2;
}

.card-texto {
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.6;
}

.card-footer {
  padding: 0 24px 24px;
}

.ver-mas-btn {
  background: rgba(128, 161, 36, 0.1) !important;
  color: #80a124 !important;
  font-weight: 800 !important;
  text-transform: none !important;
  transition: all 0.3s ease !important;
}

.concepto-card:hover .ver-mas-btn {
  background: #80a124 !important;
  color: white !important;
  box-shadow: 0 10px 20px rgba(128, 161, 36, 0.2) !important;
}

/* --- MODAL STYLES --- */
.modal-card {
  background: #fbfbfd !important;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.modal-header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.modal-breadcrumb {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #80a124;
  letter-spacing: 1px;
}

.modal-scroll-body {
  overflow-y: auto;
  padding: 40px;
}

.modal-hero-section {
  margin-bottom: 40px;
}

.modal-titulo-grande {
  font-size: 2.5rem;
  font-weight: 900;
  color: #1a1a1a;
  letter-spacing: -1.5px;
  line-height: 1;
  margin-bottom: 16px;
}

.modal-accent-line {
  width: 80px;
  height: 6px;
  background: linear-gradient(90deg, #ddae38, #80a124);
  border-radius: 10px;
}

.modal-main-content {
  font-size: 1.1rem;
  color: #4b5563;
  line-height: 1.8;
}

.modal-footer-fancy {
  padding: 20px 40px;
  background: white;
  display: flex;
}

.entendido-btn {
  font-weight: 800 !important;
  text-transform: none !important;
  letter-spacing: 0.5px !important;
  box-shadow: 0 10px 25px rgba(45, 106, 79, 0.2) !important;
}

@media (max-width: 600px) {
  .modal-scroll-body {
    padding: 24px;
  }
  .modal-titulo-grande {
    font-size: 1.8rem;
  }
  .modal-footer-fancy {
    padding: 16px;
    justify-content: center;
  }
  .entendido-btn {
    width: 100%;
  }
}
</style>

