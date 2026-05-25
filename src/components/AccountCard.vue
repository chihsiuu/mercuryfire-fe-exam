<template>
    <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        :class="{ 'opacity-50': isLoading }"
    >
        <!-- Header -->
        <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
                <!-- Avatar -->
                <div
                    class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold"
                >
                    {{ account.name.charAt(0) }}
                </div>
                <div>
                    <h3 class="text-gray-900 font-bold">
                        {{ account.name }}
                    </h3>
                    <span
                        :class="[
                            'inline-block px-2 py-1 rounded-full text-white text-sm mt-1 font-medium',
                            account.status === 'ON'
                                ? 'bg-green-500'
                                : 'bg-gray-400',
                        ]"
                    >
                        {{ account.status === "ON" ? "啟用" : "停用" }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Info -->
        <div class="space-y-3 mb-4">
            <div class="flex items-center gap-2 text-gray-600">
                <img src="../assets/mail-icon.svg" alt="email" class="w-4 h-4" style="opacity: 0.7">
                <span class="break-all text-sm">{{ account.email }}</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600">
                <img src="../assets/user-icon.svg" alt="role" class="w-4 h-4" style="opacity: 0.7">
                <span class="text-sm">{{
                    account.roleLevel === "ADMIN" ? "管理員" : "用戶"
                }}</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600">
                <img src="../assets/calendar-icon.svg" alt="date" class="w-4 h-4" style="opacity: 0.7">
                <span class="text-sm">{{ formatDate(account.createdAt) }}</span>
            </div>
        </div>

        <!-- Actions -->
        <ActionButtons
            :is-loading="isLoading"
            @edit="emit('edit')"
            @delete="emit('delete')"
        />
    </div>
</template>

<script setup lang="ts">
import ActionButtons from './ActionButtons.vue'

interface Account {
    id: string;
    name: string;
    email: string;
    roleLevel: string;
    status: string;
    createdAt: string;
}

interface Props {
    account: Account
    isLoading?: boolean
}

interface Emits {
    delete: []
    edit: []
}

defineProps<Props>()

const emit = defineEmits<Emits>()

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
};
</script>
