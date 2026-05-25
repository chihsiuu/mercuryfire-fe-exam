<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <!-- Logo and Title -->
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center"
          >
            <img src="../assets/users-icon.svg" alt="users" class="w-6 h-6" style="filter: invert(1) brightness(1)">
          </div>
          <div>
            <h1 class="text-gray-900">帳號管理系統</h1>
            <p class="text-gray-600">管理您的所有帳號</p>
          </div>
        </div>

        <!-- Logout Button -->
        <button
          @click="emit('logout')"
          class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
        >
          <img src="../assets/logout-icon.svg" alt="logout" class="w-5 h-5">
          <span>登出</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
interface Emits {
  logout: []
}

const emit = defineEmits<Emits>()
</script>
