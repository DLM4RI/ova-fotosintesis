<template>
  <!-- Contenedor Principal con fondo optimizado -->
  <v-app class="bg-slate-50">
    <v-main>
      <v-container class="ui-wrapper py-10 px-4" fluid>
        <div class="max-width-container mx-auto">
          <!-- TÍTULO DE SECCIÓN -->
          <header class="text-center mb-12 animate-in">
            <v-chip
              color="success"
              variant="tonal"
              class="mb-4 font-weight-bold"
              >Módulo 04</v-chip
            >
            <h1 class="text-h3 font-weight-black mb-2 color-green-dark">
              Fotosíntesis Dinámica
            </h1>
            <p class="text-body-1 text-secondary">
              Completa los retos para desbloquear el siguiente nivel.
            </p>
          </header>

          <v-row>
            <!-- 1. CRUCIGRAMA -->
            <v-col cols="12" class="mb-8">
              <v-card class="premium-card animate-in" elevation="0">
                <div class="card-header-gradient pa-6 d-flex align-center">
                  <v-icon
                    icon="mdi-grid-large"
                    color="white"
                    size="32"
                    class="me-4"
                  ></v-icon>
                  <div>
                    <h2 class="text-h5 font-weight-bold text-white">
                      1. Crucigrama Maestro
                    </h2>
                    <p class="text-caption text-white opacity-80">
                      Encuentra los conceptos clave
                    </p>
                  </div>
                </div>
                <v-card-text class="pa-0">
                  <div class="iframe-wrapper">
                    <iframe
                      src="https://es.educaplay.com/juego/29022626-crucigrama_de_la_fotosintesis.html"
                      class="styled-iframe"
                      allowfullscreen
                    ></iframe>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- 2. COMPLETA LA FRASE -->
            <v-col cols="12" md="7" class="mb-8">
              <v-card class="premium-card h-100 animate-in" elevation="0">
                <div
                  class="pa-6 border-bottom d-flex align-center justify-space-between"
                >
                  <h2 class="text-h5 font-weight-bold color-green-dark">
                    <v-icon
                      icon="mdi-vector-combine"
                      class="me-2"
                      color="success"
                    ></v-icon>
                    2. Flujo de Energía
                  </h2>
                </div>

                <v-card-text class="pa-6">
                  <p class="text-overline mb-4 text-grey-darken-1">
                    Palabras disponibles (Arrastra)
                  </p>
                  <div class="d-flex flex-wrap gap-3 mb-8">
                    <TransitionGroup name="list">
                      <v-btn
                        v-for="w in palabras"
                        :key="w.id"
                        :disabled="w.usada"
                        draggable="true"
                        @dragstart="arrastrando = w"
                        variant="flat"
                        color="green-lighten-5"
                        class="rounded-pill text-none font-weight-bold word-chip border"
                        elevation="1"
                      >
                        {{ w.texto }}
                      </v-btn>
                    </TransitionGroup>
                  </div>

                  <div
                    class="frase-container pa-8 rounded-xl bg-slate-50 border-dashed-green"
                  >
                    <div
                      class="d-flex flex-wrap align-center gap-x-2 gap-y-4 text-h6 font-weight-regular line-height-xl"
                    >
                      <span>Las plantas absorben la</span>
                      <div
                        v-for="(hueco, i) in huecos"
                        :key="i"
                        class="d-inline-flex align-center"
                      >
                        <div
                          class="drop-slot"
                          :class="{
                            'slot-empty': !hueco.lleno,
                            'slot-correct':
                              verificado && hueco.actual === hueco.respuesta,
                            'slot-wrong':
                              verificado &&
                              hueco.lleno &&
                              hueco.actual !== hueco.respuesta,
                          }"
                          @dragover.prevent
                          @drop="soltar(i)"
                          @click="limpiar(i)"
                        >
                          {{ hueco.actual || "..." }}
                        </div>
                        <span class="ms-2">{{ hueco.despues }}</span>
                      </div>
                    </div>
                  </div>
                </v-card-text>

                <v-card-actions class="pa-6 border-top">
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

                  <v-spacer></v-spacer>

                  <Transition name="fade">
                    <div
                      v-if="verificado"
                      :class="todoOk ? 'text-success' : 'text-error'"
                      class="d-flex align-center font-weight-bold"
                    >
                      <v-icon
                        :icon="
                          todoOk ? 'mdi-check-decagram' : 'mdi-alert-circle'
                        "
                        class="me-2"
                      ></v-icon>
                      {{
                        todoOk
                          ? frasesExito[
                              Math.floor(Math.random() * frasesExito.length)
                            ]
                          : "Revisa el orden"
                      }}
                    </div>
                  </Transition>
                </v-card-actions>
              </v-card>
            </v-col>

            <!-- 3. ENTRADAS Y SALIDAS (NUEVA ACTIVIDAD) -->
            <v-col cols="12" md="5" class="mb-8">
              <v-card class="premium-card h-100 animate-in" elevation="0">
                <div class="pa-6 border-bottom">
                  <h2 class="text-h5 font-weight-bold color-green-dark">
                    <v-icon
                      icon="mdi-swap-horizontal-bold"
                      class="me-2"
                      color="blue"
                    ></v-icon>
                    3. Clasificación
                  </h2>
                </div>
                <v-card-text class="pa-6">
                  <div
                    class="zone-box bg-blue-lighten-5 mb-6"
                    @dragover.prevent
                    @drop="clasificar('entrada')"
                  >
                    <div
                      class="text-caption font-weight-black text-blue-darken-4 mb-3 d-flex align-center"
                    >
                      <v-icon size="small" class="me-1">mdi-login</v-icon> ENTRA
                    </div>
                    <div class="d-flex flex-wrap gap-2 min-h-50">
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

                  <div
                    class="text-center py-4 bg-white rounded-lg border mb-6 shadow-sm"
                  >
                    <p class="text-caption text-grey mb-2">
                      Arrastra al contenedor correcto
                    </p>
                    <div class="d-flex flex-wrap justify-center gap-2">
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
                    class="zone-box bg-orange-lighten-5"
                    @dragover.prevent
                    @drop="clasificar('salida')"
                  >
                    <div
                      class="text-caption font-weight-black text-orange-darken-4 mb-3 d-flex align-center"
                    >
                      <v-icon size="small" class="me-1">mdi-logout</v-icon> SALE
                    </div>
                    <div class="d-flex flex-wrap gap-2 min-h-50">
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
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" class="mt-6">
              <v-card class="bento-card border-success-light" flat border>
                <div class="pa-6 border-bottom d-flex align-center">
                  <v-icon
                    icon="mdi-molecule"
                    color="success"
                    class="me-3"
                  ></v-icon>
                  <div>
                    <h2 class="text-h6 font-weight-bold">
                      5. Laboratorio de Fórmulas
                    </h2>
                    <p class="text-caption text-grey">
                      Ordena la ecuación química: Reactivos → Energía →
                      Productos
                    </p>
                  </div>
                </div>

                <v-card-text class="pa-8">
                  <div class="d-flex flex-wrap justify-center gap-3 mb-10">
                    <TransitionGroup name="pop">
                      <div
                        v-for="formula in formulasBanco"
                        :key="formula.id"
                        draggable="true"
                        @dragstart="dragFormula = formula"
                        class="formula-chip pa-4 rounded-lg cursor-grab d-flex flex-column align-center"
                      >
                        <span class="text-h5 font-weight-black">{{
                          formula.simbolo
                        }}</span>
                        <span
                          class="text-caption font-weight-bold opacity-70"
                          >{{ formula.nombre }}</span
                        >
                      </div>
                    </TransitionGroup>
                  </div>

                  <div
                    class="ecuacion-wrapper pa-6 rounded-xl bg-green-lighten-5 d-flex align-center justify-space-between flex-wrap gap-4"
                  >
                    <div class="d-flex align-center gap-2">
                      <div
                        class="formula-slot"
                        @dragover.prevent
                        @drop="dropFormula(0)"
                      >
                        {{ slotsEcuacion[0] ? slotsEcuacion[0].simbolo : "?" }}
                      </div>
                      <v-icon icon="mdi-plus" size="small"></v-icon>
                      <div
                        class="formula-slot"
                        @dragover.prevent
                        @drop="dropFormula(1)"
                      >
                        {{ slotsEcuacion[1] ? slotsEcuacion[1].simbolo : "?" }}
                      </div>
                    </div>

                    <v-icon
                      icon="mdi-arrow-right-bold"
                      color="success"
                      size="large"
                    ></v-icon>

                    <div
                      class="formula-slot energy-slot"
                      @dragover.prevent
                      @drop="dropFormula(2)"
                    >
                      <v-icon
                        v-if="!slotsEcuacion[2]"
                        icon="mdi-white-balance-sunny"
                        opacity="0.3"
                      ></v-icon>
                      <span v-else>{{ slotsEcuacion[2].simbolo }}</span>
                    </div>

                    <v-icon
                      icon="mdi-arrow-right-bold"
                      color="success"
                      size="large"
                    ></v-icon>

                    <div class="d-flex align-center gap-2">
                      <div
                        class="formula-slot"
                        @dragover.prevent
                        @drop="dropFormula(3)"
                      >
                        {{ slotsEcuacion[3] ? slotsEcuacion[3].simbolo : "?" }}
                      </div>
                      <v-icon icon="mdi-plus" size="small"></v-icon>
                      <div
                        class="formula-slot"
                        @dragover.prevent
                        @drop="dropFormula(4)"
                      >
                        {{ slotsEcuacion[4] ? slotsEcuacion[4].simbolo : "?" }}
                      </div>
                    </div>
                  </div>
                </v-card-text>

                <v-card-actions class="pa-6 border-top">
                  <v-btn
                    color="success"
                    variant="flat"
                    class="rounded-lg text-none px-6"
                    @click="validarEcuacion"
                  >
                    Comprobar Mezcla
                  </v-btn>
                  <v-btn variant="text" color="grey" @click="resetEcuacion"
                    >Limpiar Tubos</v-btn
                  >
                  <v-spacer></v-spacer>
                  <v-chip
                    v-if="ecuacionValidada"
                    :color="ecuacionCorrecta ? 'success' : 'error'"
                    variant="tonal"
                    class="font-weight-bold"
                  >
                    {{
                      ecuacionCorrecta
                        ? "🧪 ¡Fórmula Maestra! Reacción completa."
                        : "La ecuación no está balanceada."
                    }}
                  </v-chip>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, reactive } from "vue";

definePageMeta({ layout: "dashboard" });

// 5 FRASES DE COMPLETADO
const frasesExito = [
  "¡Increíble! Eres un experto en botánica. 🌱",
  "¡Fantástico! Proceso de energía completado. ✨",
  "¡Perfecto! Las plantas están felices. 🌳",
  "¡Excelente trabajo! Has dominado el ciclo. 🧪",
  "¡Fabuloso! El oxígeno fluye ahora. 💨",
];

// LÓGICA DE ACTIVIDAD 2
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

// LÓGICA DE ACTIVIDAD 3
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

// CORE LOGIC
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
  clasificados.entradas = [];
  clasificados.salidas = [];
  itemsAClasificar.value = ["Minerales", "Luz UV", "Almidón", "H₂O", "Dióxido"];
};

// --- LOGICA ACTIVIDAD 5: ECUACIÓN QUÍMICA ---
const formulasBanco = ref([
  { id: "f1", simbolo: "6H₂O", nombre: "Agua", tipo: "reactivo" },
  { id: "f2", simbolo: "6CO₂", nombre: "Dióxido", tipo: "reactivo" },
  { id: "f3", simbolo: "Luz", nombre: "Fotones", tipo: "energia" },
  { id: "f4", simbolo: "C₆H₁₂O₆", nombre: "Glucosa", tipo: "producto" },
  { id: "f5", simbolo: "6O₂", nombre: "Oxígeno", tipo: "producto" },
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
  // Validación lógica (Reactivos en slots 0,1 | Energía en slot 2 | Productos en slots 3,4)
  const r1 = slotsEcuacion[0]?.tipo === "reactivo";
  const r2 = slotsEcuacion[1]?.tipo === "reactivo";
  const en = slotsEcuacion[2]?.tipo === "energia";
  const p1 = slotsEcuacion[3]?.tipo === "producto";
  const p2 = slotsEcuacion[4]?.tipo === "producto";

  ecuacionCorrecta.value = r1 && r2 && en && p1 && p2;
};

const resetEcuacion = () => {
  for (let i = 0; i < slotsEcuacion.length; i++) slotsEcuacion[i] = null;
  ecuacionValidada.value = false;
};
</script>

<style scoped>
.bg-slate-50 {
  background-color: #f8fafc;
}
.max-width-container {
  max-width: 1100px;
}

/* NAVBAR BORDER */
.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
}

/* CARD PREMIUM */
.premium-card {
  border-radius: 24px !important;
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05) !important;
  background: white;
}

.card-header-gradient {
  background: linear-gradient(135deg, #1b5e20 0%, #43a047 100%);
}

/* DROP SLOT STYLE */
.drop-slot {
  min-width: 100px;
  height: 40px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.slot-empty {
  background: #f1f5f9;
  border: 2px dashed #cbd5e1;
  color: #94a3b8;
}

.slot-correct {
  background: #dcfd8b;
  border: 2px solid #a3cf2e;
  color: #3f6212;
}

.slot-wrong {
  background: #fee2e2;
  border: 2px solid #ef4444;
  color: #991b1b;
}

.border-dashed-green {
  border: 2px dashed #e8f5e9;
}

.zone-box {
  border-radius: 16px;
  padding: 16px;
  min-height: 120px;
}

/* ANIMATIONS */
.animate-in {
  animation: slideUp 0.6s ease forwards;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.gap-2 {
  gap: 8px;
}
.gap-3 {
  gap: 12px;
}
.gap-4 {
  gap: 16px;
}
.cursor-grab {
  cursor: grab;
}
.line-height-xl {
  line-height: 2.8;
}

.iframe-wrapper {
  aspect-ratio: 16/9;
  width: 100%;
}
.styled-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* ESTILOS ACTIVIDAD 5 */
.formula-chip {
  background: white;
  border: 1px solid #e2e8f0;
  min-width: 90px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.formula-chip:hover {
  border-color: #43a047;
  transform: translateY(-2px);
}

.formula-slot {
  width: 90px;
  height: 90px;
  border: 3px dashed #cbd5e1;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  cursor: pointer;
}

.formula-slot:not(:empty) {
  border-style: solid;
  border-color: #43a047;
  background: white;
  color: #1b5e20;
}

.energy-slot {
  border-color: #fbbf24;
  color: #b45309;
}

.border-success-light {
  border-color: #e8f5e9 !important;
}

.gap-3 {
  gap: 12px;
}
.gap-4 {
  gap: 16px;
}
</style>
