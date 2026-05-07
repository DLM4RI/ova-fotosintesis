<template>
  <v-main class="eval-shell">
    <LoadingScreen :active="isLoading" :student-name="state.name" status-message="Preparando tu evaluación..." />

    <!-- FONDO DECORATIVO SUTIL -->
    <div class="grain-overlay" aria-hidden="true" />
    <div class="parallax-bg">
      <div class="glass-blob b-1"></div>
      <div class="glass-blob b-2 hide-mobile"></div>
    </div>

    <v-container class="eval-container">
      <v-window v-model="currentStep">
        
        <!-- STEP 0: INTRODUCCIÓN -->
        <v-window-item :value="0">
          <v-card class="intro-card glass-card" rounded="xl">
            <v-card-text class="pa-10 text-center">
              <div class="badge mb-4">Módulo de Evaluación</div>
              <h1 class="display-title mb-4">¿Estás listo para el reto?</h1>
              <p class="subtitle mb-8">Esta evaluación medirá tus conocimientos sobre el proceso de la fotosíntesis con el estilo de las pruebas Saber Pro.</p>
              
              <v-row class="info-grid mb-8">
                <v-col cols="12" md="4">
                  <div class="info-item">
                    <v-icon icon="mdi-help-circle-outline" color="primary" />
                    <h4>10 Preguntas</h4>
                    <span>Selección múltiple</span>
                  </div>
                </v-col>
                <v-col cols="12" md="4">
                  <div class="info-item">
                    <v-icon icon="mdi-clock-outline" color="primary" />
                    <h4>Cronómetro</h4>
                    <span>Tiempo registrado</span>
                  </div>
                </v-col>
                <v-col cols="12" md="4">
                  <div class="info-item">
                    <v-icon icon="mdi-lightbulb-on-outline" color="primary" />
                    <h4>Pistas</h4>
                    <span>Ayuda si fallas</span>
                  </div>
                </v-col>
              </v-row>

              <div class="topics-box mb-10">
                <h3>Conceptos a Evaluar:</h3>
                <div class="topic-tags">
                  <span v-for="t in topics" :key="t">{{ t }}</span>
                </div>
              </div>

              <div class="d-flex justify-center gap-4">
                <v-btn to="/dashboard" variant="text" color="grey-darken-1" height="56" rounded="xl">Ahora no</v-btn>
                <v-btn color="primary" height="56" rounded="xl" width="220" @click="startQuiz">
                  ¡Empezar Evaluación!
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-window-item>

        <!-- STEP 1: QUIZ -->
        <v-window-item :value="1">
          <div class="quiz-header d-flex align-center justify-space-between mb-6">
            <div class="quiz-progress">
              <span class="q-count">Pregunta {{ currentQuestionIndex + 1 }} de {{ questions.length }}</span>
              <div class="progress-track">
                <div class="progress-fill" :style="{ width: ((currentQuestionIndex + 1) / questions.length) * 100 + '%' }"></div>
              </div>
            </div>
            <div class="timer-box">
              <v-icon icon="mdi-timer-outline" start size="20" />
              <span>{{ formattedTime }}</span>
            </div>
          </div>

          <v-card class="question-card glass-card" rounded="xl">
            <v-card-text class="pa-8">
              <h2 class="question-text mb-8">{{ currentQuestion.text }}</h2>

              <div class="options-list">
                <button 
                  v-for="(opt, key) in currentQuestion.options" 
                  :key="key"
                  :class="['option-btn', { 
                    'selected': selectedOption === key,
                    'wrong-shake': wrongAttempt === key 
                  }]"
                  @click="handleOptionClick(key)"
                >
                  <span class="opt-key">{{ key }}</span>
                  <span class="opt-text">{{ opt }}</span>
                </button>
              </div>

              <transition name="fade">
                <div v-if="hintMessage" class="hint-box mt-6">
                  <v-icon icon="mdi-lightbulb-on" color="amber-darken-2" start />
                  <span><strong>Pista:</strong> {{ hintMessage }}</span>
                </div>
              </transition>
            </v-card-text>
            <v-divider />
            <v-card-actions class="pa-6">
              <v-spacer />
              <v-btn 
                color="primary" 
                height="50" 
                rounded="lg" 
                min-width="150" 
                :disabled="!isCorrect"
                @click="nextQuestion"
              >
                {{ isLastQuestion ? 'Finalizar' : 'Siguiente' }}
                <v-icon icon="mdi-chevron-right" end />
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>

        <!-- STEP 2: RESULTADOS -->
        <v-window-item :value="2">
          <v-card class="results-card glass-card text-center" rounded="xl">
            <v-card-text class="pa-12">
              <div class="result-icon-wrap mb-6">
                <v-icon :icon="score >= 7 ? 'mdi-trophy-outline' : 'mdi-star-face'" size="80" color="primary" />
              </div>
              <h2 class="display-title mb-2">¡Evaluación Completada!</h2>
              <p class="subtitle mb-8">Has demostrado tu conocimiento sobre la energía de la vida.</p>

              <div class="stats-row mb-10">
                <div class="stat-card">
                  <span class="stat-label">Puntaje</span>
                  <span class="stat-value">{{ score }}/10</span>
                </div>
                <div class="stat-card">
                  <span class="stat-label">Tiempo</span>
                  <span class="stat-value">{{ formattedTime }}</span>
                </div>
                <div class="stat-card">
                  <span class="stat-label">Intentos extra</span>
                  <span class="stat-value">{{ totalMistakes }}</span>
                </div>
              </div>

              <div class="feedback-msg mb-10" :class="scoreClass">
                {{ feedbackMessage }}
              </div>

              <div class="d-flex justify-center gap-4">
                <v-btn to="/dashboard" variant="tonal" height="56" rounded="xl">Volver al Dashboard</v-btn>
                <v-btn color="primary" height="56" rounded="xl" @click="resetQuiz">Intentar de nuevo</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-window-item>

      </v-window>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStudentProfile } from '@/composables/useStudentProfile';

const { state, loadProfile } = useStudentProfile();
const isLoading = ref(true);
const currentStep = ref(0);
const currentQuestionIndex = ref(0);
const selectedOption = ref(null);
const hintMessage = ref(null);
const wrongAttempt = ref(null);
const isCorrect = ref(false);
const score = ref(0);
const totalMistakes = ref(0);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

// Timer
const timer = ref(0);
let timerInterval = null;

const startQuiz = () => {
  currentStep.value = 1;
  timer.value = 0;
  timerInterval = setInterval(() => {
    timer.value++;
  }, 1000);
};

const formattedTime = computed(() => {
  const mins = Math.floor(timer.value / 60);
  const secs = timer.value % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
});

const topics = [
  'Estructura de Cloroplastos',
  'Fase Lumínica (Tilacoides)',
  'Ciclo de Calvin (Fase Oscura)',
  'Ecuación Química Fundamental',
  'Rol del CO2 y el Oxígeno',
  'Transformación de Energía'
];

const questions = [
  {
    text: '¿En qué orgánulo celular de las plantas ocurre principalmente la fotosíntesis?',
    options: {
      A: 'Mitocondria',
      B: 'Cloroplasto',
      C: 'Aparato de Golgi',
      D: 'Ribosoma'
    },
    correct: 'B',
    hint: 'Busca el orgánulo que contiene clorofila y le da el color verde a las plantas.'
  },
  {
    text: 'Durante la fase lumínica, ¿cuál es la fuente de energía que activa el proceso?',
    options: {
      A: 'Calor del suelo',
      B: 'Energía de la glucosa',
      C: 'Luz solar',
      D: 'Energía del agua'
    },
    correct: 'C',
    hint: 'Sin la radiación electromagnética del astro rey, esta fase no podría comenzar.'
  },
  {
    text: '¿Qué gas absorben las plantas de la atmósfera para realizar la fotosíntesis?',
    options: {
      A: 'Oxígeno (O2)',
      B: 'Nitrógeno (N2)',
      C: 'Dióxido de Carbono (CO2)',
      D: 'Hidrógeno (H2)'
    },
    correct: 'C',
    hint: 'Es el gas que los seres humanos exhalamos y que las plantas usan como fuente de carbono.'
  },
  {
    text: '¿Cuál es el subproducto vital que las plantas liberan a la atmósfera?',
    options: {
      A: 'Dióxido de Carbono',
      B: 'Oxígeno',
      C: 'Vapor de agua únicamente',
      D: 'Metano'
    },
    correct: 'B',
    hint: 'Es el gas esencial que necesitamos los animales para respirar.'
  },
  {
    text: '¿En qué parte específica del cloroplasto ocurre el Ciclo de Calvin?',
    options: {
      A: 'Membrana externa',
      B: 'Tilacoides',
      C: 'Estroma',
      D: 'Citosol'
    },
    correct: 'C',
    hint: 'No es en los sacos aplanados (tilacoides), sino en el espacio fluido que los rodea.'
  },
  {
    text: '¿Cuál es la función principal de la clorofila?',
    options: {
      A: 'Almacenar agua',
      B: 'Capturar la energía lumínica',
      C: 'Producir CO2',
      D: 'Dividir el núcleo celular'
    },
    correct: 'B',
    hint: 'Actúa como una antena receptora de fotones de luz.'
  },
  {
    text: 'En la ecuación química de la fotosíntesis, además de luz, ¿cuáles son los reactivos?',
    options: {
      A: 'Glucosa y Oxígeno',
      B: 'Agua y Dióxido de Carbono',
      C: 'Almidón y Agua',
      D: 'Oxígeno y Nitrógeno'
    },
    correct: 'B',
    hint: 'Piensa en lo que una planta necesita "beber" y "respirar" para crecer.'
  },
  {
    text: '¿Qué molécula de azúcar es el producto principal de la fotosíntesis?',
    options: {
      A: 'Fructosa',
      B: 'Lactosa',
      C: 'Glucosa',
      D: 'Sacarosa'
    },
    correct: 'C',
    hint: 'Es un monosacárido de 6 carbonos que sirve como fuente de energía química.'
  },
  {
    text: '¿Cómo se llaman las estructuras que parecen pilas de monedas dentro del cloroplasto?',
    options: {
      A: 'Granas',
      B: 'Estomas',
      C: 'Mitocondrias',
      D: 'Vacuolas'
    },
    correct: 'A',
    hint: 'Están formadas por conjuntos de tilacoides apilados.'
  },
  {
    text: '¿Por qué la fotosíntesis es fundamental para la vida en la Tierra?',
    options: {
      A: 'Porque calienta la atmósfera',
      B: 'Porque produce el agua del planeta',
      C: 'Porque transforma energía inorgánica en orgánica y libera oxígeno',
      D: 'Porque evita la lluvia'
    },
    correct: 'C',
    hint: 'Considera el flujo de energía y la composición del aire que respiramos.'
  }
];

const currentQuestion = computed(() => questions[currentQuestionIndex.value]);
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.length - 1);

const handleOptionClick = (key) => {
  if (isCorrect.value) return; // Ya acertó
  
  selectedOption.value = key;
  if (key === currentQuestion.value.correct) {
    isCorrect.value = true;
    hintMessage.value = null;
    wrongAttempt.value = null;
    if (wrongAttempt.value === null) score.value++;
  } else {
    wrongAttempt.value = key;
    hintMessage.value = currentQuestion.value.hint;
    totalMistakes.value++;
    // Efecto de sacudida
    setTimeout(() => { wrongAttempt.value = null; }, 500);
  }
};

const nextQuestion = () => {
  if (isLastQuestion.value) {
    finishQuiz();
  } else {
    currentQuestionIndex.value++;
    selectedOption.value = null;
    hintMessage.value = null;
    isCorrect.value = false;
  }
};

const finishQuiz = () => {
  clearInterval(timerInterval);
  currentStep.value = 2;
};

const resetQuiz = () => {
  currentQuestionIndex.value = 0;
  selectedOption.value = null;
  hintMessage.value = null;
  isCorrect.value = false;
  score.value = 0;
  totalMistakes.value = 0;
  currentStep.value = 0;
};

const feedbackMessage = computed(() => {
  if (score.value >= 9) return '¡Excelente! Eres un experto en botánica celular.';
  if (score.value >= 7) return '¡Muy bien! Tienes bases sólidas sobre la fotosíntesis.';
  if (score.value >= 5) return 'Buen trabajo, pero te recomendamos repasar los contenidos.';
  return 'Sigue practicando, la naturaleza tiene mucho que enseñarte.';
});

const scoreClass = computed(() => {
  if (score.value >= 7) return 'score-high';
  if (score.value >= 5) return 'score-mid';
  return 'score-low';
});

onMounted(() => {
  loadProfile();
  checkMobile();
  window.addEventListener('resize', checkMobile);
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
  clearInterval(timerInterval);
});

definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped>
.eval-shell {
  min-height: 100vh;
  background: #f8faf5;
  position: relative;
}

.eval-container {
  max-width: 1000px !important;
  padding: 4rem 1rem !important;
  position: relative;
  z-index: 20;
}

/* BACKGROUND */
.grain-overlay {
  position: fixed;
  inset: 0;
  background-image: url("https://grainy-gradients.vercel.app/noise.svg");
  opacity: 0.05;
  pointer-events: none;
  z-index: 10;
}

.parallax-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.glass-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  opacity: 0.2;
  animation: float 20s infinite ease-in-out alternate;
}

.b-1 { width: 800px; height: 800px; background: #80a124; top: -10%; right: -10%; }
.b-2 { width: 600px; height: 600px; background: #ddae38; bottom: -10%; left: -10%; }

@keyframes float {
  from { transform: translate(0,0) scale(1); }
  to { transform: translate(50px, 50px) scale(1.1); }
}

/* OPTIMIZACIÓN MÓVIL */
@media (max-width: 768px) {
  .hide-mobile {
    display: none !important;
  }

  .glass-blob {
    filter: blur(80px) !important;
    animation: none !important;
    opacity: 0.15;
  }

  .b-1 {
    width: 300px;
    height: 300px;
  }

  .eval-container {
    padding: 2rem 1rem !important;
  }

  .display-title {
    font-size: 2.2rem;
  }

  .info-item {
    padding: 15px;
  }

  .question-text {
    font-size: 1.3rem;
  }

  .option-btn {
    padding: 15px;
  }
}

/* INTRO CARD */
.intro-card {
  border: 1px solid rgba(0,0,0,0.05) !important;
}

.badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(128, 161, 36, 0.1);
  color: #80a124;
  font-weight: 800;
  border-radius: 99px;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.display-title {
  font-size: 3rem;
  font-weight: 950;
  color: #1a1a1a;
  letter-spacing: -2px;
  line-height: 1;
}

.info-item {
  padding: 24px;
  background: #f8fafc;
  border-radius: 24px;
  border: 1px solid rgba(0,0,0,0.02);
}

.info-item h4 { margin-top: 10px; font-weight: 850; font-size: 1.1rem; }
.info-item span { color: #64748b; font-size: 0.9rem; }

.topics-box {
  background: white;
  padding: 30px;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
}

.topics-box h3 { font-weight: 900; font-size: 1rem; margin-bottom: 15px; color: #475569; }

.topic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.topic-tags span {
  background: #f1f5f9;
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #334155;
}

/* QUIZ HEADER */
.quiz-progress { flex-grow: 1; margin-right: 30px; }
.q-count { font-weight: 800; font-size: 0.9rem; color: #64748b; margin-bottom: 8px; display: block; }
.progress-track { height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; background: #80a124; transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }

.timer-box {
  background: white;
  padding: 10px 20px;
  border-radius: 16px;
  font-weight: 900;
  color: #1e293b;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

/* QUESTION CARD */
.question-text {
  font-size: 1.6rem;
  font-weight: 850;
  color: #1e293b;
  line-height: 1.4;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-btn {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  background: white;
  border: 2px solid #f1f5f9;
  border-radius: 20px;
  transition: all 0.2s ease;
  text-align: left;
}

.option-btn:hover { border-color: #80a124; background: #fdfcf6; }
.option-btn.selected { border-color: #80a124; background: #f7fee7; transform: translateX(10px); }

.opt-key {
  width: 32px;
  height: 32px;
  background: #f1f5f9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  margin-right: 16px;
  color: #475569;
}

.option-btn.selected .opt-key { background: #80a124; color: white; }

.opt-text { font-weight: 700; color: #1e293b; font-size: 1.05rem; }

.hint-box {
  background: #fffbeb;
  border: 1px solid #fef3c7;
  padding: 16px 20px;
  border-radius: 16px;
  color: #92400e;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* RESULTS */
.stat-card {
  flex: 1;
  padding: 20px;
  background: white;
  border-radius: 20px;
  border: 1px solid rgba(0,0,0,0.03);
}

.stat-label { display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 5px; }
.stat-value { font-size: 1.8rem; font-weight: 950; color: #1e293b; }

.feedback-msg {
  font-size: 1.25rem;
  font-weight: 850;
  padding: 24px;
  border-radius: 24px;
}

.score-high { background: #f0fdf4; color: #15803d; }
.score-mid { background: #fffbeb; color: #b45309; }
.score-low { background: #fef2f2; color: #b91c1c; }

/* ANIMATIONS */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.wrong-shake {
  animation: shake 0.4s ease;
  border-color: #ef4444 !important;
  background: #fef2f2 !important;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.gap-4 { gap: 1rem; }
</style>
