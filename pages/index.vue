// pages/login.vue
<template>
  <div class="flex h-screen items-center justify-center bg-gray-100">
    <UCard class="w-full max-w-md p-6 shadow-lg">
      <template #header>
        <h1 class="text-3xl font-bold text-cyan-400 text-center">
          <UIcon name="i-heroicons-academic-cap" class="w-6 h-6 text-primary" />
          Salary Management System
        </h1>
      </template>

      <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>

      <UForm :validate="check" :state="state" @submit="onLogin">
        <UFormGroup label="Email" name="email" class="mb-4">
          <UInput v-model="state.email" type="email" placeholder="Enter your email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password" class="mb-4">
          <UInput v-model="state.password" type="password" placeholder="Enter your password" />
        </UFormGroup>

        <div class="flex items-center justify-center">
          <UButton icon="i-heroicons-arrow-right-circle" size="sm" color="primary" variant="solid" label="Login"
            :trailing="false" type="submit" />
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { FormError} from '#ui/types'
import { useRouter } from 'vue-router';
definePageMeta({
  layout: false // Disables the default layout
});

const props = defineProps({
    time : Number,
    status : String
});

const state = reactive({
  email: undefined,
  password: undefined
})

const check = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.password) errors.push({ path: 'password', message: 'Required' })
  return errors
}

const correctEmail = 'kaung@gmail.com';
const correctPassword = '123';
const router = useRouter();
const onLogin = () => {
  if (state.email && state.password) {
    router.push('/homePage');
  } else {
    alert('Invalid email OR password');
  }
};
</script>
