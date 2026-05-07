<template>
  <div class="setup-container">
    <LoadingScreen 
      :active="isTransitioning" 
      :student-name="form.name" 
      status-message="Adaptando contenidos a tu nivel..."
    />

    <v-container fluid class="fill-height d-flex align-center justify-center pa-6">
      <v-card class="setup-card" elevation="0">
        <header class="text-center mb-10">
          <div class="icon-wrap mb-4">
            <LeafAlt size="48" color="#80a124" />
          </div>
          <h1 class="title">Personaliza tu experiencia</h1>
          <p class="subtitle">Queremos que tu aprendizaje sea único</p>
        </header>

        <v-form @submit.prevent="handleSubmit" class="setup-form">
          <div class="input-group mb-8">
            <label class="input-label">¿Cómo te llamas?</label>
            <input 
              v-model="form.name"
              type="text" 
              placeholder="Escribe tu nombre aquí"
              class="ios-input"
              required
            />
          </div>

          <div class="input-group mb-12">
            <label class="input-label">¿En qué grado estás?</label>
            <div class="grade-selector">
              <button 
                v-for="grade in [6, 7, 8]" 
                :key="grade"
                type="button"
                class="grade-btn"
                :class="{ active: form.grade === grade }"
                @click="form.grade = grade"
              >
                {{ grade }}°
                <span class="grade-label">Grado</span>
              </button>
            </div>
          </div>

          <v-btn
            block
            height="64"
            rounded="xl"
            class="submit-btn"
            :disabled="!isFormValid"
            @click="handleSubmit"
          >
            Continuar al Dashboard
            <v-icon end icon="mdi-arrow-right" />
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { LeafAlt } from "@boxicons/vue";
import { useStudentProfile } from '@/composables/useStudentProfile';

const { setProfile } = useStudentProfile();
const isTransitioning = ref(false);

const form = reactive({
  name: '',
  grade: null
});

const isFormValid = computed(() => {
  return form.name.trim().length > 2 && form.grade !== null;
});

const handleSubmit = async () => {
  if (!isFormValid.value) return;
  
  isTransitioning.value = true;
  
  // Guardar perfil
  setProfile(form.name, form.grade);
  
  // Simular carga para mostrar la animación de la ola
  setTimeout(() => {
    navigateTo('/dashboard');
  }, 2000);
};


</script>

<style scoped>
.setup-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f4ec 0%, #ffffff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.setup-card {
  width: 100%;
  max-width: 480px;
  background: transparent !important;
}

.title {
  font-size: 2.2rem;
  font-weight: 900;
  color: #2a2a1e;
  letter-spacing: -1px;
  line-height: 1.1;
}

.subtitle {
  font-size: 1.1rem;
  color: #6b6a5a;
  margin-top: 8px;
}

.icon-wrap {
  display: inline-flex;
  padding: 16px;
  background: rgba(128, 161, 36, 0.1);
  border-radius: 24px;
}

.input-label {
  display: block;
  font-weight: 800;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #80a124;
  margin-bottom: 12px;
}

.ios-input {
  width: 100%;
  height: 64px;
  background: white;
  border: 2px solid rgba(128, 161, 36, 0.15);
  border-radius: 20px;
  padding: 0 24px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.02);
}

.ios-input:focus {
  outline: none;
  border-color: #80a124;
  box-shadow: 0 12px 32px rgba(128, 161, 36, 0.12);
  transform: translateY(-2px);
}

.grade-selector {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.grade-btn {
  background: white;
  border: 2px solid rgba(128, 161, 36, 0.15);
  border-radius: 24px;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 900;
  color: #2a2a1e;
}

.grade-btn.active {
  background: #80a124;
  border-color: #80a124;
  color: white;
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(128, 161, 36, 0.25);
}

.grade-btn.active .grade-label {
  color: rgba(255, 255, 255, 0.8);
}

.grade-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #6b6a5a;
}

.submit-btn {
  background: linear-gradient(135deg, #ddae38 0%, #80a124 100%) !important;
  color: white !important;
  font-weight: 800;
  font-size: 1.05rem;
  text-transform: none;
  letter-spacing: 0.5px;
  box-shadow: 0 20px 40px rgba(128, 161, 36, 0.2) !important;
  transition: all 0.4s ease !important;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 24px 48px rgba(128, 161, 36, 0.3) !important;
}

.submit-btn:disabled {
  opacity: 0.5;
  background: #ccc !important;
  box-shadow: none !important;
}
</style>
