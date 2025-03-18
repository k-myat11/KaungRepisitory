// pages/salaryInfoManagement.vue
<template>
    <UContainer class="flex h-full items-center justify-center bg-gray-100">
        <UCard class="w-full h-full p-6 shadow-lg">
            <template #header>
                <h1 class="text-2xl font-semibold">
                    Salary Detail
                </h1>
                <Placeholder class="h-8" />
            </template>
            <UForm :validate="check" :state="state" @submit="onLogin">
                <div class="w-full flex space-x-4">
                    <!-- Left Column -->
                    <div class="w-1/2 flex flex-col items-center space-y-4">
                        <div class="w-full flex space-x-4">
                            <div class="w-1/2 flex flex-col items-center space-y-4">
                                <UInputMenu v-model="value" :items="items1" class="mt-2 w-full max-w-2xl"
                                    placeholder="Target Year" icon="i-heroicons-calendar-days" />
                            </div>
                            <div class="w-1/2 flex flex-col items-center space-y-4">
                                <UInputMenu v-model="value" :items="items1" class="mt-2 w-full max-w-2xl"
                                    placeholder="Target Month" icon="i-heroicons-calendar-days" />
                            </div>
                        </div>
                        <UInput type="text" icon="i-heroicons-user-circle" placeholder="Name"
                            class="mt-2 w-full max-w-2xl" />
                        <UInput type="number" icon="i-heroicons-currency-yen" placeholder="Basic Salary"
                            class="mt-2 w-full max-w-2xl" />
                        <UInput type="number" icon="i-heroicons-currency-yen" placeholder="Tax"
                            class="mt-2 w-full max-w-2xl" />
                        <UInput type="text" icon="i-heroicons-currency-yen" placeholder="Allowances"
                            class="mt-2 w-full max-w-2xl" />
                        <UInput type="number" icon="i-heroicons-currency-yen" placeholder="OT"
                            class="mt-2 w-full max-w-2xl" />
                        <UInput type="number" icon="i-heroicons-currency-yen" placeholder="Transportation Fee"
                            class="mt-2 w-full max-w-2xl" />
                    </div>

                    <!-- Vertical Line -->
                    <div class="w-px bg-gray-300"></div>

                    <!-- Right Column -->
                    <div class="w-1/2 flex flex-col items-center space-y-4">
                        <UFormField label="Net Salary" name="text" class="mt-2 w-full max-w-2xl">
                            <UInput disabled placeholder="Net Salary" color="gray" icon="i-heroicons-currency-yen" />
                        </UFormField>
                        <div class="flex flex-col items-center space-y-4 mt-2 w-full max-w-2xl">
                            <UInput id="file-upload" type="file" @change="handleFileUpload"
                                icon="i-heroicons-cloud-arrow-up" color="blue" placeholder="Upload Salary File..."
                                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        </div>
                        <UTextarea placeholder="Type something..." :rows="11" class="mt-2 w-full max-w-2xl" />
                    </div>
                </div>
                <div class="flex items-center justify-center mt-5 space-x-4">
                    <UButton icon="i-heroicons-check-circle" size="sm" color="primary" variant="solid" label="Input"
                        :trailing="false" type="submit" />
                    <UButton icon="i-heroicons-x-circle" size="sm" color="red" variant="solid" label="Clear"
                        :trailing="false" type="submit" />
                </div>

            </UForm>
        </UCard>

    </UContainer>
</template>
<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

const df = new DateFormatter('en-US', {
    dateStyle: 'medium'
})

const selectedFile = ref<File | null>(null);

const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        selectedFile.value = target.files[0];
        console.log('Uploaded file:', selectedFile.value);
    }
};

const modelValue = shallowRef(new CalendarDate(2022, 1, 10))
</script>