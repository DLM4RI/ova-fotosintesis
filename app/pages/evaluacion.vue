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
              <p class="subtitle mb-8">Esta evaluación medirá tus conocimientos sobre la fotosíntesis con {{ totalQuestions }} preguntas. Recibirás una calificación de 0.0 a 5.0.</p>
              
              <v-row class="info-grid mb-8">
                <v-col cols="12" md="4">
                  <div class="info-item">
                    <v-icon icon="mdi-help-circle-outline" color="primary" />
                    <h4>{{ totalQuestions }} Preguntas</h4>
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
                    <h4>Escala 0.0-5.0</h4>
                    <span>Calificación profesional</span>
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
                <v-btn color="#ffc100" class="font-weight-bold" height="56" rounded="xl" width="220" @click="startQuiz">
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
              <span class="q-count">Pregunta {{ currentQuestionIndex + 1 }} de {{ totalQuestions }}</span>
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
                    'selected': selectedOption === key
                  }]"
                  @click="handleOptionClick(key)"
                >
                  <span class="opt-key">{{ key }}</span>
                  <span class="opt-text">{{ opt }}</span>
                </button>
              </div>
            </v-card-text>
            <v-divider />
            <v-card-actions class="pa-6">
              <v-spacer />
              <v-btn 
                color="primary" 
                height="54" 
                rounded="xl" 
                min-width="180" 
                :disabled="selectedOption === null"
                class="confirm-btn"
                @click="confirmResponse"
              >
                Confirmar Respuesta
                <v-icon icon="mdi-check-circle" end />
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>

        <!-- STEP 2: RESULTADOS -->
        <v-window-item :value="2">
          <v-card class="results-card glass-card text-center" rounded="xl">
            <v-card-text class="pa-12">
              <div class="result-icon-wrap mb-6">
                <v-icon 
                  :icon="finalScore >= 4 ? 'mdi-trophy-outline' : (finalScore >= 3 ? 'mdi-star' : 'mdi-target')" 
                  size="80" 
                  :color="scoreIconColor" 
                />
              </div>
              <h2 class="display-title mb-2">¡Evaluación Completada!</h2>
              <p class="subtitle mb-8">Has demostrado tu conocimiento sobre el proceso de la fotosíntesis.</p>

              <div class="stats-row mb-10">
                <div class="stat-card">
                  <span class="stat-label">Calificación</span>
                  <span class="stat-value-large">{{ finalScore.toFixed(1) }}/5.0</span>
                </div>
                <div class="stat-card">
                  <span class="stat-label">Respuestas Correctas</span>
                  <span class="stat-value">{{ score }}/{{ totalQuestions }}</span>
                </div>
                <div class="stat-card">
                  <span class="stat-label">Tiempo Total</span>
                  <span class="stat-value">{{ formattedTime }}</span>
                </div>
              </div>

              <div class="feedback-container mb-10">
                <div class="feedback-msg" :class="scoreClass">
                  {{ feedbackMessage }}
                </div>
                <p class="feedback-detail">{{ feedbackDetail }}</p>
              </div>

              <div class="score-breakdown mb-10">
                <h3 class="breakdown-title">Desglose de tu rendimiento:</h3>
                <div class="breakdown-item">
                  <span>Porcentaje de aciertos</span>
                  <div class="bar-container">
                    <div class="bar" :style="{ width: correctPercentage + '%', backgroundColor: getColorForScore(correctPercentage) }"></div>
                  </div>
                  <span class="percentage">{{ correctPercentage }}%</span>
                </div>
              </div>

              <div class="d-flex justify-center gap-4">
                <v-btn to="/dashboard" variant="tonal" height="56" rounded="xl">Volver al Dashboard</v-btn>
                <v-btn color="#ffc100" class="font-weight-bold" height="56" rounded="xl" @click="resetQuiz">Intentar de nuevo</v-btn>
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
import { evaluationQuestions, getQuestionCount } from '@/composables/useEvaluationQuestions';
import { useProgress } from '@/composables/useProgress';

const { state, loadProfile } = useStudentProfile();
const { isComplete } = useProgress();

const isLoading = ref(true);
const currentStep = ref(0);
const currentQuestionIndex = ref(0);
const selectedOption = ref(null);
const score = ref(0);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

// Timer
const timer = ref(0);
let timerInterval = null;

const totalQuestions = computed(() => getQuestionCount());
const questions = evaluationQuestions;

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
  'Fases Lumínica y Oscura',
  'Ciclo de Calvin',
  'Ecuación Fundamental',
  'Pigmentos y Luz',
  'Adaptaciones Vegetales',
  'Plantas C3, C4 y CAM'
];

const currentQuestion = computed(() => questions[currentQuestionIndex.value]);
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.length - 1);

const handleOptionClick = (key) => {
  selectedOption.value = key;
};

const confirmResponse = () => {
  if (selectedOption.value === null) return;

  // Registrar si fue correcta
  if (selectedOption.value === currentQuestion.value.correct) {
    score.value++;
  }

  // Pasar a la siguiente o finalizar
  if (isLastQuestion.value) {
    finishQuiz();
  } else {
    currentQuestionIndex.value++;
    selectedOption.value = null;
  }
};

const finishQuiz = () => {
  clearInterval(timerInterval);
  currentStep.value = 2;
};

const resetQuiz = () => {
  currentQuestionIndex.value = 0;
  selectedOption.value = null;
  score.value = 0;
  timer.value = 0;
  currentStep.value = 0;
};

// CÁLCULO DE CALIFICACIÓN (0.0 - 5.0)
const finalScore = computed(() => {
  const percentage = (score.value / totalQuestions.value) * 100;
  // Escala lineal: 0-100% → 0.0-5.0
  return (percentage / 100) * 5;
});

const correctPercentage = computed(() => {
  return Math.round((score.value / totalQuestions.value) * 100);
});

const getColorForScore = (percentage) => {
  if (percentage >= 80) return '#80a124';
  if (percentage >= 60) return '#ffa500';
  if (percentage >= 40) return '#ff7043';
  return '#e74c3c';
};

const scoreClass = computed(() => {
  if (finalScore.value >= 4.5) return 'score-excellent';
  if (finalScore.value >= 3.5) return 'score-good';
  if (finalScore.value >= 2.5) return 'score-regular';
  return 'score-low';
});

const scoreIconColor = computed(() => {
  if (finalScore.value >= 4.5) return '#80a124';
  if (finalScore.value >= 3.5) return '#ffa500';
  if (finalScore.value >= 2.5) return '#ff7043';
  return '#e74c3c';
});

const feedbackMessage = computed(() => {
  if (finalScore.value >= 4.5) 
    return '¡Excelente! Demuestras dominio excepcional sobre la fotosíntesis.';
  if (finalScore.value >= 3.5) 
    return '¡Muy bien! Tienes bases sólidas y buen entendimiento del tema.';
  if (finalScore.value >= 2.5) 
    return 'Buen esfuerzo. Te recomendamos repasar algunos conceptos.';
  return 'Sigue practicando, la botánica tiene mucho que enseñarte.';
});

const feedbackDetail = computed(() => {
  if (finalScore.value >= 4.5) 
    return `Obtuviste ${score.value} respuestas correctas de ${totalQuestions.value}. ¡Eres un experto en fotosíntesis celular!`;
  if (finalScore.value >= 3.5) 
    return `Obtuviste ${score.value} respuestas correctas. Considera profundizar en los procesos químicos.`;
  if (finalScore.value >= 2.5) 
    return `Obtuviste ${score.value} respuestas correctas. Revisa los conceptos clave y vuelve a intentar.`;
  return `Obtuviste ${score.value} respuestas correctas. Accede a los contenidos educativos para mejorar.`;
});

onMounted(() => {
  loadProfile();
  
  // Guard de progreso (Si no ha completado el 100%, redirigir al dashboard)
  if (!isComplete.value) {
    navigateTo('/dashboard');
    return;
  }

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

.confirm-btn {
  font-weight: 900 !important;
  text-transform: none !important;
  letter-spacing: 0.5px !important;
  box-shadow: 0 10px 25px rgba(128, 161, 36, 0.2) !important;
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
.stat-value-large { font-size: 2.5rem; font-weight: 950; color: #80a124; }

.feedback-container {
  background: rgba(128, 161, 36, 0.08);
  padding: 2rem;
  border-radius: 24px;
  border: 1px solid rgba(128, 161, 36, 0.15);
}

.feedback-msg {
  font-size: 1.1rem;
  font-weight: 850;
  margin-bottom: 0.75rem;
  padding: 1rem;
  border-radius: 16px;
}

.feedback-msg.score-excellent {
  background: rgba(128, 161, 36, 0.15);
  color: #2d6a4f;
}

.feedback-msg.score-good {
  background: rgba(255, 165, 0, 0.15);
  color: #b8860b;
}

.feedback-msg.score-regular {
  background: rgba(255, 112, 67, 0.15);
  color: #d84315;
}

.feedback-msg.score-low {
  background: rgba(231, 76, 60, 0.15);
  color: #c0392b;
}

.feedback-detail {
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.score-breakdown {
  background: rgba(45, 106, 79, 0.05);
  padding: 1.5rem;
  border-radius: 24px;
  border: 1px solid rgba(45, 106, 79, 0.1);
}

.breakdown-title {
  font-weight: 850;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.breakdown-item {
  display: grid;
  grid-template-columns: 1fr 1.5fr 0.5fr;
  gap: 1rem;
  align-items: center;
}

.breakdown-item > span:first-child {
  font-weight: 700;
  color: #475569;
  text-align: left;
}

.bar-container {
  height: 20px;
  background: rgba(0,0,0,0.08);
  border-radius: 10px;
  overflow: hidden;
}

.bar {
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.percentage {
  font-weight: 850;
  color: #1a1a1a;
  text-align: right;
  font-size: 1.1rem;
}

.gap-4 { gap: 1rem; }
</style>
