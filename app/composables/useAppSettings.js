import { reactive, watch } from 'vue'

const state = reactive({
  fontSize: 100, // 100%
  themeColor: '#80a124', // Default green
  themeName: 'nature' // nature, dark, gold
})

export const useAppSettings = () => {
  const setFontSize = (size) => {
    state.fontSize = size
  }

  const setTheme = (name) => {
    state.themeName = name
    if (name === 'nature') state.themeColor = '#80a124'
    if (name === 'dark') state.themeColor = '#1f2937'
    if (name === 'gold') state.themeColor = '#ddae38'
  }

  return {
    state,
    setFontSize,
    setTheme
  }
}
