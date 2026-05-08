import { ref, computed, onMounted } from 'vue';

const COMPLETED_ITEMS_KEY = 'ova-completed-items';

// Definición de todos los items que cuentan para el progreso
export const totalItems = [
  // Contenidos (3)
  'cont-1', 'cont-2', 'cont-3',
  // Recursos (8)
  'res-pdf-1', 'res-pdf-2', 'res-pdf-3',
  'res-vid-1', 'res-vid-2',
  'res-web-1', 'res-web-2', 'res-web-3',
  // Actividades (4)
  'act-1', 'act-2', 'act-3', 'act-4'
];

const completedItems = ref([]);

export const useProgress = () => {
  const loadProgress = () => {
    if (process.client) {
      const saved = localStorage.getItem(COMPLETED_ITEMS_KEY);
      if (saved) {
        try {
          completedItems.value = JSON.parse(saved);
        } catch (e) {
          completedItems.value = [];
        }
      }
    }
  };

  const saveProgress = () => {
    if (process.client) {
      localStorage.setItem(COMPLETED_ITEMS_KEY, JSON.stringify(completedItems.value));
    }
  };

  const markAsCompleted = (id) => {
    if (!completedItems.value.includes(id)) {
      completedItems.value.push(id);
      saveProgress();
    }
  };

  const progressPercentage = computed(() => {
    if (totalItems.length === 0) return 0;
    return Math.round((completedItems.value.length / totalItems.length) * 100);
  });

  const isComplete = computed(() => progressPercentage.value >= 100);

  const resetProgress = () => {
    completedItems.value = [];
    saveProgress();
  };

  // Cargar al inicializar si es posible
  if (process.client && completedItems.value.length === 0) {
    loadProgress();
  }

  return {
    completedItems,
    markAsCompleted,
    progressPercentage,
    isComplete,
    resetProgress,
    loadProgress
  };
};
