<template>
  <div class="actividad-inner">
    <div class="actividad-header">
      <button class="back-btn" @click="$emit('volver')">
        <v-icon icon="mdi-arrow-left" size="20" class="me-2" />
        Volver a Actividades
      </button>
      <div class="actividad-title-row">
        <v-icon icon="mdi-molecule" color="white" size="32" class="me-3" />
        <div>
          <h2 class="actividad-titulo">Laboratorio de Fórmulas</h2>
          <p class="actividad-subtitulo">Ordena la ecuación: Reactivos → Energía → Productos</p>
        </div>
      </div>
    </div>
    <div class="actividad-body">
      <div class="formula-bank">
        <TransitionGroup name="pop">
          <div v-for="formula in formulasBanco" :key="formula.id" draggable="true" @dragstart="dragFormula = formula" class="formula-chip">
            <span class="formula-sym">{{ formula.simbolo }}</span>
            <span class="formula-name">{{ formula.nombre }}</span>
          </div>
        </TransitionGroup>
      </div>
      <div class="ecuacion-wrapper">
        <div class="eq-group">
          <div class="formula-slot" @dragover.prevent @drop="dropFormula(0)">{{ slotsEcuacion[0] ? slotsEcuacion[0].simbolo : '?' }}</div>
          <v-icon icon="mdi-plus" size="small" />
          <div class="formula-slot" @dragover.prevent @drop="dropFormula(1)">{{ slotsEcuacion[1] ? slotsEcuacion[1].simbolo : '?' }}</div>
        </div>
        <v-icon icon="mdi-arrow-right-bold" color="success" size="large" />
        <div class="formula-slot energy-slot" @dragover.prevent @drop="dropFormula(2)">
          <v-icon v-if="!slotsEcuacion[2]" icon="mdi-white-balance-sunny" opacity="0.3" />
          <span v-else>{{ slotsEcuacion[2].simbolo }}</span>
        </div>
        <v-icon icon="mdi-arrow-right-bold" color="success" size="large" />
        <div class="eq-group">
          <div class="formula-slot" @dragover.prevent @drop="dropFormula(3)">{{ slotsEcuacion[3] ? slotsEcuacion[3].simbolo : '?' }}</div>
          <v-icon icon="mdi-plus" size="small" />
          <div class="formula-slot" @dragover.prevent @drop="dropFormula(4)">{{ slotsEcuacion[4] ? slotsEcuacion[4].simbolo : '?' }}</div>
        </div>
      </div>
      <div class="actions-row">
        <v-btn color="success" variant="flat" class="rounded-lg text-none px-6" @click="validarEcuacion">Comprobar Mezcla</v-btn>
        <v-btn variant="text" color="grey" @click="resetEcuacion">Limpiar Tubos</v-btn>
        <v-spacer />
        <v-chip v-if="ecuacionValidada" :color="ecuacionCorrecta ? 'success' : 'error'" variant="tonal" class="font-weight-bold">
          {{ ecuacionCorrecta ? '🧪 ¡Fórmula Maestra! Reacción completa.' : 'La ecuación no está balanceada.' }}
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
defineEmits(['volver']);

const formulasBanco = ref([
  { id: 'f1', simbolo: '6H₂O', nombre: 'Agua', tipo: 'reactivo' },
  { id: 'f2', simbolo: '6CO₂', nombre: 'Dióxido', tipo: 'reactivo' },
  { id: 'f3', simbolo: 'Luz', nombre: 'Fotones', tipo: 'energia' },
  { id: 'f4', simbolo: 'C₆H₁₂O₆', nombre: 'Glucosa', tipo: 'producto' },
  { id: 'f5', simbolo: '6O₂', nombre: 'Oxígeno', tipo: 'producto' },
]);

const slotsEcuacion = reactive([null, null, null, null, null]);
const dragFormula = ref(null);
const ecuacionValidada = ref(false);
const ecuacionCorrecta = ref(false);

const dropFormula = (index) => {
  if (!dragFormula.value) return;
  slotsEcuacion[index] = dragFormula.value;
  dragFormula.value = null;
  ecuacionValidada.value = false;
};

const validarEcuacion = () => {
  ecuacionValidada.value = true;
  const r1 = slotsEcuacion[0]?.tipo === 'reactivo';
  const r2 = slotsEcuacion[1]?.tipo === 'reactivo';
  const en = slotsEcuacion[2]?.tipo === 'energia';
  const p1 = slotsEcuacion[3]?.tipo === 'producto';
  const p2 = slotsEcuacion[4]?.tipo === 'producto';
  ecuacionCorrecta.value = r1 && r2 && en && p1 && p2;
};

const resetEcuacion = () => {
  for (let i = 0; i < slotsEcuacion.length; i++) slotsEcuacion[i] = null;
  ecuacionValidada.value = false;
};
</script>

<style scoped>
.actividad-inner { animation: fadeInUp 0.5s ease both; }
.actividad-header { background: linear-gradient(135deg, #1b5e20 0%, #43a047 100%); padding: 28px 32px; border-radius: 24px; margin-bottom: 28px; }
.back-btn { display: inline-flex; align-items: center; background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 8px 18px; border-radius: 99px; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.3s ease; margin-bottom: 16px; }
.back-btn:hover { background: rgba(255,255,255,0.3); transform: translateX(-4px); }
.actividad-title-row { display: flex; align-items: center; }
.actividad-titulo { color: white; font-size: 1.5rem; font-weight: 900; letter-spacing: -0.5px; }
.actividad-subtitulo { color: rgba(255,255,255,0.8); font-size: 0.85rem; }
.actividad-body { background: rgba(255,255,255,0.7); backdrop-filter: blur(12px); border: 1px solid rgba(0,0,0,0.05); border-radius: 24px; padding: 32px; }
.formula-bank { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; margin-bottom: 40px; }
.formula-chip { background: white; border: 1px solid #e2e8f0; min-width: 90px; padding: 16px; border-radius: 16px; display: flex; flex-direction: column; align-items: center; cursor: grab; box-shadow: 0 4px 10px rgba(0,0,0,0.05); transition: all 0.2s ease; }
.formula-chip:hover { border-color: #43a047; transform: translateY(-4px); box-shadow: 0 10px 25px rgba(67,160,71,0.15); }
.formula-sym { font-size: 1.3rem; font-weight: 900; color: #1b5e20; }
.formula-name { font-size: 0.75rem; font-weight: 700; opacity: 0.6; margin-top: 4px; }
.ecuacion-wrapper { padding: 28px; border-radius: 24px; background: rgba(232,245,233,0.5); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; }
.eq-group { display: flex; align-items: center; gap: 8px; }
.formula-slot { width: 85px; height: 85px; border: 3px dashed #cbd5e1; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1rem; background: rgba(255,255,255,0.5); transition: all 0.3s ease; cursor: pointer; }
.formula-slot:not(:empty) { border-style: solid; border-color: #43a047; background: white; color: #1b5e20; }
.energy-slot { border-color: #fbbf24; color: #b45309; }
.actions-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>
