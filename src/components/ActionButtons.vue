<template>
  <div class="flex gap-2 pt-4 border-t border-gray-200">
    <button
      @click="emit('edit')"
      :disabled="isLoading"
      class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <img src="../assets/edit-icon.svg" alt="edit" class="w-4 h-4" style="filter: invert(27%) sepia(79%) saturate(3066%) hue-rotate(224deg)">
      {{ isLoading ? '處理中...' : '編輯' }}
    </button>
    <button
      @click="emit('delete')"
      :disabled="isLoading"
      class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <img src="../assets/delete-icon.svg" alt="delete" class="w-4 h-4" style="filter: invert(28%) sepia(100%) saturate(1685%) hue-rotate(347deg)">
      {{ isLoading ? '刪除中...' : '刪除' }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  edit: []
  delete: []
}

defineProps<{
  isLoading?: boolean
}>()

const emit = defineEmits<Emits>()
</script>
