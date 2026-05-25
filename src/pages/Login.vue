<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <img src="../assets/login-icon.svg" alt="login" class="w-8 h-8" style="filter: invert(1) brightness(1)">
          </div>
          <h1 class="text-gray-900 mb-2 text-2xl font-bold">歡迎回來</h1>
          <p class="text-gray-600">請登入您的帳號以繼續</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-gray-700 mb-2">電子郵件</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src="../assets/mail-icon.svg" alt="mail" class="h-5 w-5" style="opacity: 0.6">
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-gray-700 mb-2">密碼</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src="../assets/lock-icon.svg" alt="password" class="h-5 w-5" style="opacity: 0.6">
              </div>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <!-- Remember & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input v-model="form.rememberMe" type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              <span class="ml-2 text-gray-700">記住我</span>
            </label>
            <a href="#" class="text-indigo-600 hover:text-indigo-700 text-sm">忘記密碼？</a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 font-medium"
          >
            <img src="../assets/login-icon.svg" alt="login" class="w-5 h-5" style="filter: invert(1) brightness(1)">
            {{ loading ? '登入中...' : '登入' }}
          </button>
        </form>

        <!-- Tip Box -->
        <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p class="text-blue-800 text-center text-sm">💡 提示：輸入任意電子郵件和密碼即可登入</p>
        </div>
      </div>

      <!-- Sign Up Link -->
      <p class="text-center mt-6 text-gray-600">
        還沒有帳號？ <a href="#" class="text-indigo-600 hover:text-indigo-700 font-medium">立即註冊</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const form = ref({
  email: '',
  password: '',
  rememberMe: false,
})
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''

  // 驗證輸入
  if (!form.value.email || !form.value.password) {
    error.value = '請輸入 Email 和密碼'
    return
  }

  loading.value = true

  try {
    // 簡單的登入驗證：只要有輸入就可以進入
    // 存儲簡單的 token
    const token = btoa(form.value.email)
    authStore.setAuth(token, form.value.email)

    // 跳轉到帳號列表頁面
    router.push('/accounts')
  } catch (err: any) {
    error.value = '登入失敗，請稍後重試'
  } finally {
    loading.value = false
  }
}
</script>
