<template>
  <v-dialog
    v-model="visible"
    max-width="550"
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card class="update-modal glass-card" rounded="xl">
      <!-- HEADER CON GRADIENTE -->
      <div class="modal-hero">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <v-icon icon="mdi-tools" size="48" color="white" class="mb-2" />
          <h2 class="hero-title">Bajo Optimización</h2>
          <span class="version-tag">Versión v1.2.0 - Beta</span>
        </div>
      </div>

      <v-card-text class="pa-8">
        <div class="maintenance-msg mb-6">
          <p>
            ¡Hola! Estamos trabajando para que el
            <strong>OVA Fotosíntesis</strong> sea perfecto. Actualmente nos
            encontramos en mantenimiento y ajustes finales, pero puedes seguir
            explorando y usando todas las funciones disponibles.
          </p>
        </div>

        <!-- NOTAS DE ACTUALIZACIÓN (TEMPLATE) -->
        <div class="changelog-section">
          <h3 class="section-title">
            <v-icon icon="mdi-history" start size="20" />
            Novedades del Sistema
          </h3>
          <div class="updates-list">
            <div v-for="(item, i) in updates" :key="i" class="update-item">
              <div class="dot" :style="{ background: item.color }"></div>
              <div class="item-text">
                <strong>{{ item.title }}:</strong> {{ item.desc }}
              </div>
            </div>
          </div>
        </div>

        <!-- PRÓXIMO LANZAMIENTO -->
        <div class="release-info mt-8">
          <v-icon icon="mdi-calendar-star" color="primary" start size="18" />
          <span
            >Lanzamiento Oficial:
            <strong>Jueves 7 de Mayo de 2026 18:30</strong></span
          >
        </div>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-6">
        <v-btn
          block
          height="56"
          rounded="xl"
          variant="flat"
          color="primary"
          class="continue-btn"
          @click="closeModal"
        >
          Entendido, continuar explorando
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";

const visible = ref(false);

// TEMPLATE DE NOTAS DE ACTUALIZACIÓN
const updates = [
  {
    title: "Recursos",
    desc: "Nueva biblioteca de documentos y videos externos.",
    color: "#80a124",
  },
  {
    title: "Evaluación",
    desc: "Módulo de evaluación estilo Saber Pro con pistas dinámicas.",
    color: "#ddae38",
  },
  {
    title: "Mobile Fix",
    desc: "Optimización de navegación y menú para dispositivos móviles.",
    color: "#3b82f6",
  },
  {
    title: "Visuales",
    desc: "Nuevos fondos bio-dinámicos con burbujas y rayos de luz.",
    color: "#10b981",
  },
];

const closeModal = () => {
  visible.value = false;
  localStorage.setItem("ova_maintenance_seen", "true");
};

onMounted(() => {
  // Solo mostrar si no se ha visto en esta sesión (o permanentemente si se prefiere)
  const seen = localStorage.getItem("ova_maintenance_seen");
  if (!seen) {
    setTimeout(() => {
      visible.value = true;
    }, 1500);
  }
});
</script>

<style scoped>
.update-modal {
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  overflow: hidden;
}

.modal-hero {
  height: 180px;
  background: url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop");
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(18, 18, 18, 0.9),
    rgba(128, 161, 36, 0.4)
  );
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  color: white;
  font-size: 2rem;
  font-weight: 950;
  letter-spacing: -1.5px;
  margin-bottom: 5px;
}

.version-tag {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 800;
  backdrop-filter: blur(5px);
}

.maintenance-msg p {
  font-size: 1.05rem;
  line-height: 1.6;
  color: #475569;
}

.section-title {
  font-size: 0.9rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #64748b;
  letter-spacing: 1px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.updates-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.update-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: #f8fafc;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.02);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.item-text {
  font-size: 0.9rem;
  color: #334155;
  line-height: 1.4;
}

.release-info {
  background: rgba(128, 161, 36, 0.05);
  padding: 12px;
  border-radius: 12px;
  font-size: 0.9rem;
  color: #80a124;
  text-align: center;
}

.continue-btn {
  font-weight: 900 !important;
  text-transform: none !important;
  letter-spacing: 0.5px !important;
}
</style>
