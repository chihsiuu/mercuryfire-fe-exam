import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const email = ref(localStorage.getItem('email') || '')

  const isAuthenticated = computed(() => !!token.value)

  const setAuth = (newToken: string, newEmail: string) => {
    token.value = newToken
    email.value = newEmail
    localStorage.setItem('token', newToken)
    localStorage.setItem('email', newEmail)
  }

  const logout = () => {
    token.value = ''
    email.value = ''
    localStorage.removeItem('token')
    localStorage.removeItem('email')
  }

  return {
    token,
    email,
    isAuthenticated,
    setAuth,
    logout,
  }
})
