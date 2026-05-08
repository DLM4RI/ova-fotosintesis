<template>
  <div class="actividad-inner">
    <div class="actividad-header">
      <button class="back-btn" @click="$emit('volver')">
        <v-icon icon="mdi-arrow-left" size="20" class="me-2" />
        Volver a Actividades
      </button>
      <div class="actividad-title-row">
        <v-icon
          icon="mdi-swap-horizontal-bold"
          color="white"
          size="32"
          class="me-3"
        />
        <div>
          <h2 class="actividad-titulo">Clasificación</h2>
          <p class="actividad-subtitulo">
            Arrastra cada elemento al contenedor correcto
          </p>
        </div>
      </div>
    </div>
    <div class="actividad-body">
      <div
        class="zone-box zone-entrada"
        @dragover.prevent
        @drop="clasificar('entrada')"
      >
        <div class="zone-label zone-label-blue">
          <v-icon size="16" class="me-1">mdi-login</v-icon> ENTRA
        </div>
        <div class="zone-chips">
          <v-chip
            v-for="item in clasificados.entradas"
            :key="item"
            color="blue"
            variant="flat"
            size="small"
            >{{ item }}</v-chip
          >
        </div>
      </div>
      <div class="items-bank">
        <p class="bank-label">Arrastra al contenedor correcto</p>
        <div class="bank-chips">
          <v-chip
            v-for="item in itemsAClasificar"
            :key="item"
            draggable="true"
            @dragstart="itemArrastrado = item"
            color="green-darken-4"
            variant="elevated"
            class="cursor-grab font-weight-bold"
            >{{ item }}</v-chip
          >
        </div>
      </div>
      <div
        class="zone-box zone-salida"
        @dragover.prevent
        @drop="clasificar('salida')"
      >
        <div class="zone-label zone-label-orange">
          <v-icon size="16" class="me-1">mdi-logout</v-icon> SALE
        </div>
        <div class="zone-chips">
          <v-chip
            v-for="item in clasificados.salidas"
            :key="item"
            color="orange"
            variant="flat"
            size="small"
            >{{ item }}</v-chip
          >
        </div>
      </div>
      <div class="actions-row mt-6">
        <v-btn
          variant="text"
          color="grey-darken-2"
          @click="reiniciar"
          class="text-none"
          ><v-icon icon="mdi-refresh" class="me-1" /> Reiniciar</v-btn
        >
        <v-spacer />
        <v-chip
          v-if="itemsAClasificar.length === 0"
          color="success"
          variant="tonal"
          class="font-weight-bold"
          >✅ ¡Todos clasificados!</v-chip
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
defineEmits(["volver"]);

const itemsAClasificar = ref([
  "Minerales",
  "Luz UV",
  "Almidón",
  "H₂O",
  "Dióxido",
]);
const clasificados = reactive({ entradas: [], salidas: [] });
const itemArrastrado = ref(null);

const clasificar = (destino) => {
  if (!itemArrastrado.value) return;
  if (destino === "entrada") clasificados.entradas.push(itemArrastrado.value);
  else clasificados.salidas.push(itemArrastrado.value);
  itemsAClasificar.value = itemsAClasificar.value.filter(
    (i) => i !== itemArrastrado.value,
  );
  itemArrastrado.value = null;
};

const reiniciar = () => {
  clasificados.entradas = [];
  clasificados.salidas = [];
  itemsAClasificar.value = ["Minerales", "Luz UV", "Almidón", "H₂O", "Dióxido"];
};
</script>

<style scoped>
.actividad-inner {
  animation: fadeInUp 0.5s ease both;
}
.actividad-header {
  background: linear-gradient(135deg, #1565c0 0%, #42a5f5 100%);
  padding: 28px 32px;
  border-radius: 24px;
  margin-bottom: 28px;
}
.back-btn {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 18px;
  border-radius: 99px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 16px;
}
.back-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-4px);
}
.actividad-title-row {
  display: flex;
  align-items: center;
}
.actividad-titulo {
  color: white;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.5px;
}
.actividad-subtitulo {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
}
.actividad-body {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 24px;
  padding: 32px;
}
.zone-box {
  border-radius: 20px;
  padding: 20px;
  min-height: 100px;
  margin-bottom: 16px;
  border: 2px dashed transparent;
  transition: all 0.3s ease;
}
.zone-box:hover {
  border-color: rgba(0, 0, 0, 0.1);
}
.zone-entrada {
  background: rgba(59, 130, 246, 0.06);
}
.zone-salida {
  background: rgba(249, 115, 22, 0.06);
}
.zone-label {
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.zone-label-blue {
  color: #1e40af;
}
.zone-label-orange {
  color: #c2410c;
}
.zone-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 36px;
}
.items-bank {
  text-align: center;
  padding: 24px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
}
.bank-label {
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 12px;
  font-weight: 600;
}
.bank-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
.cursor-grab {
  cursor: grab;
}
.actions-row {
  display: flex;
  align-items: center;
  gap: 12px;
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
