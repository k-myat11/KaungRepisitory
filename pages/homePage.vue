// pages/homePage.vue
<template>
    <UCard>
        <UContainer class="bg-gray-100 flex h-screen items-center justify-center">
            <h1 class="text-3xl font-bold text-cyan-400 text-center">
                <UIcon name="i-heroicons-academic-cap" class="w-6 h-6 text-primary" />
                これはHome Pageです！！！！！
            </h1>
        </UContainer>
        <template #footer>
            <Placeholder class="h-8" />
            <UDivider>
                <UDivider label="kaungsu.com" size="sm" />
            </UDivider>
        </template>
    </UCard>
</template>
<script setup lang="ts">
const isOpen = ref(false)

const links = [{
    label: 'Login',
    to: '/login'
}, {
    label: 'Home',
}, {
    label: 'Next',
}]
</script>