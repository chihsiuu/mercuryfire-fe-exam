import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '../utils/api'

export interface Account {
  id: string
  name: string
  email: string
  roleLevel: string
  status: string
  createdAt: string
}

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>([])
  const loading = ref(false)
  const error = ref('')
  const searchQuery = ref('')

  const activeCount = computed(
    () => accounts.value.filter((a) => a.status === 'ON').length,
  )

  const inactiveCount = computed(
    () => accounts.value.filter((a) => a.status === 'OFF').length,
  )

  const filteredAccounts = computed(() => {
    if (!searchQuery.value) return accounts.value
    const query = searchQuery.value.toLowerCase()
    return accounts.value.filter(
      (account) =>
        account.name.toLowerCase().includes(query) ||
        account.email.toLowerCase().includes(query) ||
        account.roleLevel.toLowerCase().includes(query),
    )
  })

  const fetchAccounts = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = (await apiClient.get('/accounts')) as any
      accounts.value = response
    } catch (err: any) {
      error.value = err.response?.data?.message || '載入帳號列表失敗'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const deleteAccount = async (id: string) => {
    try {
      await apiClient.delete(`/delete-account/${id}`)
      accounts.value = accounts.value.filter((a) => a.id !== id)
    } catch (err: any) {
      error.value = err.response?.data?.message || '刪除失敗'
      throw err
    }
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const clearError = () => {
    error.value = ''
  }

  return {
    accounts,
    loading,
    error,
    searchQuery,
    activeCount,
    inactiveCount,
    filteredAccounts,
    fetchAccounts,
    deleteAccount,
    setSearchQuery,
    clearError,
  }
})
