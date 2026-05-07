<template>
  <div class="pagina">
    <div class="contenedor">

      <!-- Sopa de letras -->
      <div class="tarjeta">
        <div class="encabezado">
          <div>
            <h2>Sopa de Letras</h2>
            <p>Encuentra palabras clave de la fotosíntesis</p>
          </div>
          <span class="etiqueta">Vocabulario</span>
        </div>
        <iframe
          allow="fullscreen; autoplay"
          allowfullscreen
          frameborder="0"
          src="https://es.educaplay.com/juego/28964525-fotosintesis_basica.html"
          class="juego"
        />
      </div>

      <!-- Completa la frase -->
      <div class="tarjeta">
        <div class="encabezado">
          <div>
            <h2>Completa la Frase</h2>
            <p>Arrastra las palabras al lugar correcto</p>
          </div>
          <span class="etiqueta">Comprensión</span>
        </div>

        <p class="subtitulo">Palabras disponibles:</p>
        <div class="palabras">
          <span
            v-for="w in palabras" :key="w.id"
            class="palabra" :class="{ usada: w.usada }"
            draggable="true"
            @dragstart="arrastrando = w"
          >{{ w.texto }}</span>
        </div>

        <div class="frase">
          <span>Las plantas usan la</span>
          <template v-for="(hueco, i) in huecos" :key="i">
            <div
              class="hueco"
              :class="{ lleno: hueco.lleno, correcto: verificado && hueco.actual === hueco.respuesta, incorrecto: verificado && hueco.lleno && hueco.actual !== hueco.respuesta }"
              @dragover.prevent
              @drop="soltar(i)"
              @click="limpiar(i)"
            >
              <span v-if="hueco.lleno">{{ hueco.actual }}</span>
              <span v-else class="vacio">___</span>
            </div>
            <span v-if="hueco.despues">{{ hueco.despues }}</span>
          </template>
        </div>

        <div class="botones">
          <button class="boton-principal" :disabled="!todoLleno" @click="verificar">Verificar</button>
          <button class="boton-secundario" @click="reiniciar">Reiniciar</button>
        </div>

        <p v-if="verificado" class="resultado" :class="todoOk ? 'bien' : 'mal'">
          {{ todoOk ? '🎉 ¡Muy bien! La frase está correcta.' : '🔎 Hay errores. Revísala e inténtalo de nuevo.' }}
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

definePageMeta({ layout: 'dashboard' })

const palabras = reactive([
  { id: 1, texto: 'luz solar',  usada: false },
  { id: 2, texto: 'CO₂',       usada: false },
  { id: 3, texto: 'agua',      usada: false },
  { id: 4, texto: 'glucosa',   usada: false },
  { id: 5, texto: 'oxígeno',   usada: false },
  { id: 6, texto: 'nitrógeno', usada: false },
  { id: 7, texto: 'calor',     usada: false },
])

const huecos = reactive([
  { respuesta: 'luz solar', lleno: false, actual: null, despues: ' para transformar el' },
  { respuesta: 'CO₂',       lleno: false, actual: null, despues: ' y el' },
  { respuesta: 'agua',      lleno: false, actual: null, despues: ' en' },
  { respuesta: 'glucosa',   lleno: false, actual: null, despues: ' y' },
  { respuesta: 'oxígeno',   lleno: false, actual: null, despues: '.' },
])

const arrastrando = ref(null)
const verificado = ref(false)

function soltar(i) {
  if (!arrastrando.value || arrastrando.value.usada) return
  const hueco = huecos[i]
  if (hueco.lleno) {
    const anterior = palabras.find(w => w.texto === hueco.actual)
    if (anterior) anterior.usada = false
  }
  hueco.actual = arrastrando.value.texto
  hueco.lleno = true
  arrastrando.value.usada = true
  arrastrando.value = null
  verificado.value = false
}

function limpiar(i) {
  const hueco = huecos[i]
  if (!hueco.lleno) return
  const w = palabras.find(w => w.texto === hueco.actual)
  if (w) w.usada = false
  hueco.lleno = false
  hueco.actual = null
  verificado.value = false
}

const todoLleno = computed(() => huecos.every(h => h.lleno))
const todoOk = computed(() => huecos.every(h => h.actual === h.respuesta))

function verificar() { verificado.value = true }

function reiniciar() {
  palabras.forEach(w => w.usada = false)
  huecos.forEach(h => { h.lleno = false; h.actual = null })
  verificado.value = false
}
</script>

<style scoped>
.pagina {
  min-height: 100vh;
  background: #f8f8f8;
  font-family: sans-serif;
  color: #222;
}

.contenedor {
  max-width: 820px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.tarjeta {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 14px;
  padding: 1.5rem;
}

.encabezado {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  font-size: 1.3rem;
}

.encabezado h2 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.encabezado p {
  font-size: 0.8rem;
  color: #888;
  margin: 0;
}

.etiqueta {
  margin-left: auto;
  font-size: 0.72rem;
  font-weight: 600;
  color: #666;
  background: #f3f3f3;
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
}

.juego {
  display: block;
  width: 100%;
  height: 460px;
  border: none;
  border-radius: 10px;
}

.subtitulo {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.6rem;
}

.palabras {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.palabra {
  padding: 0.35rem 0.8rem;
  background: #f3f3f3;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: grab;
  user-select: none;
}

.palabra.usada {
  opacity: 0.3;
  cursor: not-allowed;
}

.frase {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  font-size: 0.95rem;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  margin-bottom: 1.25rem;
  line-height: 2.4;
}

.hueco {
  min-width: 90px;
  height: 36px;
  border: 2px dashed #ccc;
  border-radius: 7px;
  background: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0 0.5rem;
}

.hueco.lleno     { border-style: solid; border-color: #ccc; }
.hueco.correcto  { border-color: #4caf50; background: #f1f8f1; color: #2e7d32; }
.hueco.incorrecto{ border-color: #e57373; background: #fff5f5; color: #c62828; }

.vacio { color: #ccc; letter-spacing: 2px; }

.botones {
  display: flex;
  gap: 0.6rem;
}

.boton-principal {
  background: #222;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.55rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.boton-principal:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.boton-secundario {
  background: #fff;
  color: #444;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.55rem 1.1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.resultado {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: 8px;
}

.resultado.bien { background: #f1f8f1; color: #2e7d32; }
.resultado.mal  { background: #fff5f5; color: #c62828; }

@media (max-width: 600px) {
  .juego { height: 340px; }
  .frase { font-size: 0.88rem; }
}
</style>