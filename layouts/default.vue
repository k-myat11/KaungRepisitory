// filepath: /workspaces/KaungRepisitory/nuxt-proj/la youts/default.vue
<template>
  <div class="flex flex-col items-stretch min-w-screen min-h-screen">
    <AppHeader></AppHeader>
    <main class="app-content p-10 bg-gray-100 grow">
      <UContainer>
        <slot />
      </UContainer>
    </main>
    <AppFooter></AppFooter>
  </div>
</template>