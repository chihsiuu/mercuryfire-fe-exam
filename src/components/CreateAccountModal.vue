<template>
  <transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 class="text-lg font-bold text-gray-900">新增帳號</h2>
          <button
            @click="emit('close')"
            class="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <img src="../assets/close-icon.svg" alt="close" class="w-5 h-5" style="opacity: 0.6">
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="p-6">
          <div class="space-y-5">
            <!-- Name -->
            <div>
              <label for="name" class="block text-gray-700 font-medium mb-2">
                姓名 <span class="text-red-500">*</span>
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="請輸入姓名"
                required
                class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-gray-700 font-medium mb-2">
                電子郵件 <span class="text-red-500">*</span>
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="email@example.com"
                required
                class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            <!-- Role -->
            <div>
              <label for="roleLevel" class="block text-gray-700 font-medium mb-2">
                角色 <span class="text-red-500">*</span>
              </label>
              <select
                id="roleLevel"
                v-model="form.roleLevel"
                required
                class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              >
                <option value="">請選擇角色</option>
                <option v-for="role in roleLevels" :key="role" :value="role">
                  {{ role }}
                </option>
              </select>
            </div>

            <!-- Status -->
            <div>
              <label for="status" class="block text-gray-700 font-medium mb-2">
                狀態 <span class="text-red-500">*</span>
              </label>
              <select
                id="status"
                v-model="form.status"
                required
                class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              >
                <option value="">請選擇狀態</option>
                <option v-for="status in accountStatuses" :key="status" :value="status">
                  {{ status === AccountStatus.ON ? '啟用' : '停用' }}
                </option>
              </select>
            </div>

            <!-- Error message -->
            <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {{ error }}
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex gap-3 mt-8">
            <button
              type="button"
              @click="emit('close')"
              class="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition"
            >
              取消
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition"
            >
              {{ loading ? '新增中...' : '新增帳號' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import apiClient from '../utils/api'
import { RoleLevel, AccountStatus, AccountFormDto } from '../types'

interface Props {
  isOpen: boolean
}

interface Emits {
  close: []
  success: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const form = ref<Partial<AccountFormDto>>({
  name: '',
  email: '',
  roleLevel: '',
  status: '',
})

const roleLevels = Object.values(RoleLevel)
const accountStatuses = Object.values(AccountStatus)

const loading = ref(false)
const error = ref('')

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

const handleSubmit = async () => {
  error.value = ''

  if (!form.value.name || !form.value.email || !form.value.roleLevel || !form.value.status) {
    error.value = '請填寫所有必填欄位'
    return
  }

  loading.value = true

  try {
    await apiClient.post('/create-account', {
      name: form.value.name,
      email: form.value.email,
      roleLevel: form.value.roleLevel,
      status: form.value.status,
    })

    form.value = { name: '', email: '', roleLevel: '', status: '' }
    emit('success')
    emit('close')
  } catch (err: any) {
    error.value = err.response?.data?.message || '新增帳號失敗'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
