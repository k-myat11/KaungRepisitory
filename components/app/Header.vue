<template>
    <header class="bg-gray-400 text-white p-4 flex">
        <div class="w-4/5 flex flex-row items-center">
            <!-- メニューボタン -->
            <UButton :padded="false" color="gray" variant="link" icon="i-heroicons-bars-4" @click="isOpen = true"
                aria-label="Open menu" />

            <!-- アプリタイトル -->
            <h1 class="text-3xl font-bold text-white">
                　Salary Management System
            </h1>
            <div class="ml-6 text-lg font-mono">
                {{ currentTime }}
            </div>

            <!-- サイドメニュー -->
            <USlideover v-model="isOpen" side="left" class="w-60">
                <div class="bg-gray-200 h-screen">
                    <div class="flex justify-start ">
                        <h1 class="font-bold text-3xl items-center justify-center">
                            <UIcon name="i-heroicons-queue-list" class="w-6 h-6 text-primary" />
                            Menu
                        </h1>
                        <UButton color="gray" size="sm" variant="ghost" class="absolute top-5 right-5 z-10" square
                            padded @click="isOpen = false" aria-label="Close menu" />
                    </div>
                    <div class="border-b border-green-700 my-2"></div>
                    <!-- メニューリスト -->
                    <div class="mt-3 space-y-2 justify-items-start">
                        <UButton v-for="link in links" :key="link.to" :to="link.to" color="gray" variant="ghost" block
                            @click="isOpen = false" class="justify-start">
                            <UIcon v-if="link.icon" :name="link.icon" class="w-5 h-5" />
                            {{ link.label }}
                        </UButton>
                    </div>
                </div>
                <USeparator icon="i-simple-icons-nuxtdotjs" />
            </USlideover>
        </div>
        <div class="w-1/5 flex items-end justify-end">
            <UDropdown :items="items" :popper="{ placement: 'bottom-end' }"">
                <UAvatar src=" https://github.com/benjamincanac.png" size="md" alt="Avatar" />
            </UDropdown>
        </div>

        <!-- Profile Modal -->
        <UModal v-model="isProfileOpen">
            <UCard>
                <template #header>
                    <h2 class="text-lg font-bold">User Profile</h2>
                </template>
                <div class="flex flex-col items-center">
                    <UAvatar src="https://github.com/benjamincanac.png" size="lg" alt="Avatar" />
                    <p class="mt-2 text-gray-700">Kaung Su</p>
                    <p class="text-gray-500 text-sm">kaung.su@example.com</p>
                </div>
                <template #footer>
                    <UButton color="gray" block @click="isProfileOpen = false">Close</UButton>
                </template>
            </UCard>
        </UModal>
    </header>
</template>

<script setup lang="ts">
import { Icon } from '#components';
import { ref, onMounted, onUnmounted } from 'vue';

const isOpen = ref(false);
// Control profile modal visibility
const isProfileOpen = ref(false);

const links = [
    { label: 'Home', to: '/main', icon: 'i-heroicons-window' },
    { label: 'Salary Management', to: '/homePage', icon: 'i-heroicons-window' },
    { label: 'Salary Detail Input', to: '/salaryInfoManagement', icon: 'i-heroicons-window' }
];

const items = [
    [{ label: 'Profile', icon: 'i-heroicons-user', click: () => isProfileOpen.value = true }],
    [{ label: 'Logout', icon: 'i-heroicons-arrow-left-on-rectangle', to: '/login' }]
];

// 現在日時の表示と1分ごとの更新
const currentTime = ref('');
let timer: number | undefined;

function updateTime() {
    const now = new Date();
    // 例: 2025-07-02 14:05
    currentTime.value = now.toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).replace(/\//g, '-').replace(',', '');
}

onMounted(() => {
    updateTime();
    timer = window.setInterval(updateTime, 60000);
});

onUnmounted(() => {
    if (timer) clearInterval(timer);
});
</script>