import { reactive, watch } from 'vue'

const state = reactive({
  name: '',
  grade: null, // 6, 7, 8
  isSetupComplete: false
})

export const useStudentProfile = () => {
  const setProfile = (name, grade) => {
    state.name = name
    state.grade = grade
    state.isSetupComplete = true
    
    // Guardar en localStorage para persistencia básica
    if (process.client) {
      localStorage.setItem('student-profile', JSON.stringify({ name, grade }))
    }
  }

  const logout = () => {
    state.name = ''
    state.grade = null
    state.isSetupComplete = false
    
    if (process.client) {
      localStorage.removeItem('student-profile')
    }
  }

  const loadProfile = () => {

    if (process.client) {
      const saved = localStorage.getItem('student-profile')
      if (saved) {
        const { name, grade } = JSON.parse(saved)
        state.name = name
        state.grade = grade
        state.isSetupComplete = true
      }
    }
  }

  return {
    state,
    setProfile,
    loadProfile,
    logout
  }
}

