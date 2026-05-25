<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <Header @logout="handleLogout" />

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Error message -->
            <div
                v-if="accountStore.error"
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            >
                {{ accountStore.error }}
            </div>

            <!-- Loading -->
            <div v-if="accountStore.loading" class="text-center py-8">
                <p class="text-gray-600 text-lg">載入帳號中...</p>
            </div>

            <!-- Content when loaded -->
            <template v-else>
                <!-- Search and Add Button -->
                <div class="mb-6 flex flex-col sm:flex-row gap-4">
                    <div class="flex-1 relative">
                        <div
                            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                        >
                            <img src="../assets/search-icon.svg" alt="search" class="h-5 w-5" style="opacity: 0.6">
                        </div>
                        <input
                            :value="accountStore.searchQuery"
                            @input="accountStore.setSearchQuery(($event.target as HTMLInputElement).value)"
                            type="text"
                            placeholder="搜尋帳號（姓名、郵件、角色）..."
                            class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                    </div>
                    <button
                        @click="isModalOpen = true"
                        class="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-200 whitespace-nowrap"
                    >
                        <img src="../assets/plus-icon.svg" alt="add" class="w-5 h-5" style="filter: invert(1) brightness(1)">
                        新增帳號
                    </button>
                </div>

                <!-- Statistics -->
                <StatisticsCard
                    :totalAccounts="accountStore.accounts.length"
                    :activeCount="accountStore.activeCount"
                    :inactiveCount="accountStore.inactiveCount"
                />

                <!-- Accounts Grid -->
                <div
                    v-if="accountStore.filteredAccounts.length > 0"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    <AccountCard
                        v-for="account in accountStore.filteredAccounts"
                        :key="account.id"
                        :account="account"
                        :is-loading="operatingAccountId === account.id"
                        @delete="deleteAccount(account.id)"
                        @edit="openEditModal(account)"
                    />
                </div>

                <!-- Empty state -->
                <div
                    v-else
                    class="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center"
                >
                    <p class="text-gray-600 text-lg">沒有找到符合的帳號</p>
                </div>
            </template>
        </main>

        <!-- Create Account Modal -->
        <CreateAccountModal
            :isOpen="isModalOpen"
            @close="isModalOpen = false"
            @success="accountStore.fetchAccounts"
        />

        <!-- Edit Account Modal -->
        <EditAccountModal
            :isOpen="isEditModalOpen"
            :account="editingAccount"
            @close="isEditModalOpen = false"
            @success="accountStore.fetchAccounts"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useAccountStore, type Account } from "../stores/account";
import CreateAccountModal from "../components/CreateAccountModal.vue";
import EditAccountModal from "../components/EditAccountModal.vue";
import StatisticsCard from "../components/StatisticsCard.vue";
import AccountCard from "../components/AccountCard.vue";
import Header from "../components/Header.vue";

const router = useRouter();
const authStore = useAuthStore();
const accountStore = useAccountStore();
const isModalOpen = ref(false);
const isEditModalOpen = ref(false);
const editingAccount = ref<Account | undefined>(undefined);
const operatingAccountId = ref<string | null>(null);

const deleteAccount = async (id: string) => {
    if (!confirm("確定要刪除此帳號嗎？")) return;

    operatingAccountId.value = id;
    try {
        await accountStore.deleteAccount(id);
    } catch (err) {
        console.error(err);
    } finally {
        operatingAccountId.value = null;
    }
};

const openEditModal = (account: Account) => {
    editingAccount.value = account;
    isEditModalOpen.value = true;
};

const handleLogout = () => {
    authStore.logout();
    router.push("/");
};

onMounted(() => {
    accountStore.fetchAccounts();
});
</script>
