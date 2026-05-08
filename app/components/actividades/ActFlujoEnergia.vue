<template>
  <div class="actividad-inner">

    <div class="actividad-body">
      <!-- Palabras disponibles -->
      <p class="section-label">Palabras disponibles (Arrastra)</p>
      <div class="words-bank">
        <TransitionGroup name="list">
          <button
            v-for="w in palabras"
            :key="w.id"
            :disabled="w.usada"
            draggable="true"
            @dragstart="arrastrando = w"
            class="word-chip"
            :class="{ 'word-used': w.usada }"
          >
            {{ w.texto }}
          </button>
        </TransitionGroup>
      </div>

      <!-- Frase con huecos -->
      <div class="frase-container">
        <div class="frase-flex">
          <span>Las plantas absorben la</span>
          <template v-for="(hueco, i) in huecos" :key="i">
            <div
              class="drop-slot"
              :class="{
                'slot-empty': !hueco.lleno,
                'slot-correct': verificado && hueco.actual === hueco.respuesta,
                'slot-wrong':
                  verificado && hueco.lleno && hueco.actual !== hueco.respuesta,
              }"
              @dragover.prevent
              @drop="soltar(i)"
              @click="limpiar(i)"
            >
              {{ hueco.actual || "..." }}
            </div>
            <span class="ms-2">{{ hueco.despues }}</span>
          </template>
        </div>
      </div>

      <!-- Acciones -->
      <div class="actions-row">
        <v-btn
          :disabled="!todoLleno"
          color="success"
          size="large"
          variant="elevated"
          class="rounded-lg px-8 text-none font-weight-bold"
          @click="verificar"
          >Verificar Frase</v-btn
        >
        <v-btn
          variant="text"
          color="grey-darken-2"
          @click="reiniciar"
          class="text-none"
          >Reiniciar</v-btn
        >

        <v-spacer />

        <Transition name="fade">
          <div
            v-if="verificado"
            :class="todoOk ? 'text-success' : 'text-error'"
            class="result-badge"
          >
            <v-icon
              :icon="todoOk ? 'mdi-check-decagram' : 'mdi-alert-circle'"
              class="me-2"
            />
            {{
              todoOk
                ? frasesExito[Math.floor(Math.random() * frasesExito.length)]
                : "Revisa el orden"
            }}
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";

defineEmits(["volver"]);

const frasesExito = [
  "¡Increíble! Eres un experto en botánica. 🌱",
  "¡Fantástico! Proceso de energía completado. ✨",
  "¡Perfecto! Las plantas están felices. 🌳",
  "¡Excelente trabajo! Has dominado el ciclo. 🧪",
  "¡Fabuloso! El oxígeno fluye ahora. 💨",
];

const palabras = reactive([
  { id: 1, texto: "Luz Solar", usada: false },
  { id: 2, texto: "CO₂", usada: false },
  { id: 3, texto: "Agua", usada: false },
  { id: 4, texto: "Glucosa", usada: false },
  { id: 5, texto: "Oxígeno", usada: false },
]);

const huecos = reactive([
  {
    respuesta: "Luz Solar",
    lleno: false,
    actual: null,
    despues: " para transformar el",
  },
  { respuesta: "CO₂", lleno: false, actual: null, despues: " y el" },
  {
    respuesta: "Agua",
    lleno: false,
    actual: null,
    despues: " en energía como",
  },
  { respuesta: "Glucosa", lleno: false, actual: null, despues: " y liberar" },
  { respuesta: "Oxígeno", lleno: false, actual: null, despues: "." },
]);

const arrastrando = ref(null);
const verificado = ref(false);

const soltar = (i) => {
  if (!arrastrando.value || arrastrando.value.usada) return;
  const h = huecos[i];
  if (h.lleno) {
    const ant = palabras.find((p) => p.texto === h.actual);
    if (ant) ant.usada = false;
  }
  h.actual = arrastrando.value.texto;
  h.lleno = true;
  arrastrando.value.usada = true;
  arrastrando.value = null;
  verificado.value = false;
};

const limpiar = (i) => {
  const h = huecos[i];
  if (!h.lleno) return;
  const p = palabras.find((p) => p.texto === h.actual);
  if (p) p.usada = false;
  h.lleno = false;
  h.actual = null;
  verificado.value = false;
};

const todoLleno = computed(() => huecos.every((h) => h.lleno));
const todoOk = computed(() => huecos.every((h) => h.actual === h.respuesta));
const verificar = () => (verificado.value = true);
const reiniciar = () => {
  palabras.forEach((p) => (p.usada = false));
  huecos.forEach((h) => {
    h.lleno = false;
    h.actual = null;
  });
  verificado.value = false;
};
</script>

<style scoped>
.section-label {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #64748b;
  margin-bottom: 16px;
}

.words-bank {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
}

.word-chip {
  padding: 10px 22px;
  border-radius: 99px;
  font-weight: 800;
  font-size: 0.9rem;
  border: 2px solid rgba(128, 161, 36, 0.2);
  background: rgba(128, 161, 36, 0.08);
  color: #3f6212;
  cursor: grab;
  transition: all 0.3s ease;
}

.word-chip:hover:not(:disabled) {
  background: rgba(128, 161, 36, 0.18);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(128, 161, 36, 0.15);
}

.word-chip.word-used {
  opacity: 0.3;
  cursor: not-allowed;
  transform: scale(0.95);
}

.frase-container {
  padding: 32px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  border: 2px dashed rgba(128, 161, 36, 0.2);
  margin-bottom: 24px;
}

.frase-flex {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 8px;
  font-size: 1.1rem;
  font-weight: 500;
  color: #334155;
  line-height: 2.8;
}

.drop-slot {
  min-width: 100px;
  height: 42px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.slot-empty {
  background: rgba(241, 245, 249, 0.8);
  border: 2px dashed #cbd5e1;
  color: #94a3b8;
}

.slot-correct {
  background: #dcfd8b;
  border: 2px solid #a3cf2e;
  color: #3f6212;
  animation: pulse-glow 0.5s ease;
}

.slot-wrong {
  background: #fee2e2;
  border: 2px solid #ef4444;
  color: #991b1b;
  animation: shake 0.4s ease;
}

.actions-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.result-badge {
  display: flex;
  align-items: center;
  font-weight: 800;
}

@keyframes pulse-glow {
  0% {
    box-shadow: 0 0 0 0 rgba(163, 207, 46, 0.4);
  }
  100% {
    box-shadow: 0 0 0 12px rgba(163, 207, 46, 0);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-6px);
  }
  75% {
    transform: translateX(6px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
