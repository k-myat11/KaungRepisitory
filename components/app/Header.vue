<template>
    <header class="bg-gray-400 text-white p-4 flex">
        <div class="w-5/6 flex flex-row items-center">
            <!-- メニューボタン -->
            <UButton :padded="false" color="gray" variant="link" icon="i-heroicons-bars-4" @click="isOpen = true"
                aria-label="Open menu" />

            <!-- アプリタイトル -->
            <h1 class="text-3xl font-bold text-white">
                <UIcon name="i-heroicons-academic-cap" class="w-6 h-6 text-primary" />
                KAUNG SU App
            </h1>

            <!-- サイドメニュー -->
            <USlideover v-model="isOpen" side="left" class="w-40">
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
        <div class="w-1/6 flex items-center">
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
import { ref } from 'vue';

const isOpen = ref(false);
// Control profile modal visibility
const isProfileOpen = ref(false);

const links = [
    { label: 'Login', to: '/login', icon: 'i-heroicons-window' },
    { label: 'Home', to: '/', icon: 'i-heroicons-window' },
    { label: 'Next', to: '/next', icon: 'i-heroicons-window' }
];

const items = [
  [{ label: 'Profile', icon: 'i-heroicons-user', click: () => isProfileOpen.value = true }],
  [{ label: 'Logout', icon: 'i-heroicons-arrow-left-on-rectangle', to: '/login' }]
];
</script>