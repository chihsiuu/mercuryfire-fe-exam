<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
    <div
      class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
    >
      <p class="text-gray-600 mb-1">總帳號數</p>
      <p class="text-gray-900">{{ totalAccounts }}</p>
    </div>
    <div
      class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
    >
      <p class="text-gray-600 mb-1">啟用中</p>
      <p class="text-gray-900">
        {{ activeCount }}
      </p>
    </div>
    <div
      class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
    >
      <p class="text-gray-600 mb-1">已停用</p>
      <p class="text-gray-900">
        {{ inactiveCount }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalAccounts: number
  activeCount: number
  inactiveCount: number
}>()
</script>
