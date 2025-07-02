<template>
  <UContainer class="flex h-full items-center justify-center bg-gray-100">
    <UCard class="w-full h-full p-6 shadow-lg">
      <template #header>
        <h1 class="text-2xl font-semibold">Salary Detail</h1>
        <Placeholder class="h-8" />
      </template>
      <UForm :state="formState" @reset="handleClear">
        <div class="w-full flex space-x-4">
          <div class="w-1/2 flex flex-col items-center space-y-4">
            <div class="w-full grid grid-cols-1 gap-4">
              <div class="flex items-center space-x-2 w-full">
                <label class="w-32 text-left text-gray-700">Month</label>
                <UInput v-model="formState.month" type="text" icon="i-heroicons-calendar-days" placeholder="Month"
                  class="flex-1" />
              </div>
              <div class="flex items-center space-x-2 w-full">
                <label class="w-32 text-left text-gray-700">Name</label>
                <UInput v-model="formState.name" type="text" icon="i-heroicons-user-circle" placeholder="Name"
                  class="flex-1" />
              </div>
              <div class="flex items-center space-x-2 w-full">
                <label class="w-32 text-left text-gray-700">Basic Salary</label>
                <UInput v-model="formState.basicSalary" type="number" icon="i-heroicons-currency-yen"
                  placeholder="Basic Salary" class="flex-1" />
              </div>
              <div class="flex items-center space-x-2 w-full">
                <label class="w-32 text-left text-gray-700">Tax</label>
                <UInput v-model="formState.tax" type="number" icon="i-heroicons-currency-yen" placeholder="Tax"
                  class="flex-1" />
              </div>
              <div class="flex items-center space-x-2 w-full">
                <label class="w-32 text-left text-gray-700">Allowances</label>
                <UInput v-model="formState.allowances" type="text" icon="i-heroicons-currency-yen"
                  placeholder="Allowances" class="flex-1" />
              </div>
              <div class="flex items-center space-x-2 w-full">
                <label class="w-32 text-left text-gray-700">OT</label>
                <UInput v-model="formState.ot" type="number" icon="i-heroicons-currency-yen" placeholder="OT"
                  class="flex-1" />
              </div>
              <div class="flex items-center space-x-2 w-full">
                <label class="w-32 text-left text-gray-700">Net Salary</label>
                <UInput v-model="formState.netSalary" disabled placeholder="Net Salary" color="gray"
                  icon="i-heroicons-currency-yen" class="flex-1" />
              </div>
            </div>
          </div>

          <!-- Vertical Line -->
          <div class="w-px bg-gray-300"></div>

          <!-- Right Column -->
          <div class="w-1/2 flex flex-col items-center space-y-4">
            <div class="flex flex-col items-center space-y-4 mt-2 w-full max-w-2xl">
              <input id="file-upload" type="file" @change="handleFileUpload"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>
            <div>
              <p class="text-left text-gray-700" style="color: #374151;">
                🗂️When file is uploaded,read file and fill the input fields automatically.
              </p>
            </div>
            <UTextarea v-model="formState.textarea" placeholder="Type something..." :rows="10"
              class="mt-2 w-full max-w-2xl" />
          </div>
        </div>
        <div class="flex items-center justify-center mt-5 space-x-4">
          <UButton icon="i-heroicons-check-circle" size="sm" color="primary" variant="solid" label="Input"
            :trailing="false" type="submit" />
          <UButton icon="i-heroicons-x-circle" size="sm" color="red" variant="solid" label="Clear" :trailing="false"
            type="reset" />
        </div>
      </UForm>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { ref, reactive, shallowRef } from 'vue'
import { CalendarDate } from '@internationalized/date'
import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const selectedFile = ref<File | null>(null)

const formState = reactive({
  targetYear: '',
  targetMonth: '',
  month: '',
  name: '',
  basicSalary: '',
  tax: '',
  allowances: '',
  ot: '',
  transportationFee: '',
  netSalary: '',
  textarea: '',
})

const initialFormState = {
  targetYear: '',
  targetMonth: '',
  month: '',
  name: '',
  basicSalary: '',
  tax: '',
  allowances: '',
  ot: '',
  transportationFee: '',
  netSalary: '',
  textarea: '',
}

function handleClear() {
  Object.assign(formState, initialFormState)
  selectedFile.value = null
}

const extractTextFromPDF = async (file: File): Promise<string> => {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.onload = async function () {
      const typedarray = new Uint8Array(this.result as ArrayBuffer)
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise

      let fullText = ''
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        const strings = content.items.map((item: any) => item.str)
        fullText += strings.join(' ')
      }

      resolve(fullText)
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

const extractTaxSectionNumbers = (text: string): string[] => {
  // Normalize all whitespace to regular space
  const cleaned = text.replace(/[\s　]+/g, ' ').trim();

  // Extract the portion between '控除 合 計' and the next '控 除 健 康 保' (or just '控除 健康保険料')
  const match = cleaned.match(/控除\s*合\s*計(.*?)控\s*除\s*健\s*康\s*保|控除\s*合\s*計(.*?)健康保険料/);

  const section = match ? (match[1] || match[2]) : '';

  // Split by space, filter numeric-looking values
  return section
    .split(' ')
    .map(s => s.replace(/,/g, '').trim())
    .filter(s => /^\d+$/.test(s)); // keep only numeric tokens
};

function extractBetweenKeywords(text: string, start: string, end: string): string[] {
  // Normalize all whitespace (including full-width) to a single space
  const normalized = text.replace(/[\s　]+/g, ' ');

  // Build regex that allows any whitespace between each character of the keywords
  const toLoosePattern = (keyword: string) =>
    keyword.split('').map(c => (c === ' ' ? '\\s*' : `${c}(?:\\s|　)*`)).join('');

  const startPattern = toLoosePattern(start);
  const endPattern = toLoosePattern(end);

  // Use the 's' flag to match across line breaks
  const pattern = new RegExp(`${startPattern}(.*?)${endPattern}`, 's');
  const match = normalized.match(pattern);

  if (!match || !match[1]) {
    console.warn('Keywords not found or in wrong order');
    return [];
  }

  return match[1]
    .split(' ')
    .map(val => val.replace(/,/g, '').trim())
    .filter(val => /^\d+$/.test(val));
}

const extractYearMonth = (text: string): string => {
  const match = text.match(/(\d{4})年\s*(\d{1,2})月/);
  if (!match) return '';

  const year = match[1];
  const month = match[2].padStart(2, '0'); // 月を2桁にする
  return `${year}/${month}`;
};


const parseSalaryData = (text: string) => {
  const normalize = (s: string) => s.replace(/[\s　]+/g, ' ').trim();

  const extractValueAfter = (label: string) => {
    // 「基本給」などの直後にスペースが複数入る場合やカンマ区切り数字も考慮
    const regex = new RegExp(`${label}[\\s　]*([\\d,]+)`);
    const match = text.match(regex);
    return match ? match[1].replace(/,/g, '') : '';
  };

  const extractValueName = () => {
    const regex = /氏\s*名[\s　]*.*?\((?:[^\)]*)\)[\s　]*(.*?)\s+様\s+所/;
    const match = text.match(regex);
    return match ? match[1].trim() : '';
  };

  return {
    name: extractValueName(),
    department: extractValueAfter('所\\s*属'),
    incomeTax: extractValueAfter('所得税'),
    netSalary: extractValueAfter('差\\s*引\\s*支\\s*給\\s*額'),
    transferredSalary: extractValueAfter('振.*?合\\s*計'),
  };
};


const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement | null

  if (!input || !input.files || input.files.length === 0) {
    console.warn('No file selected or invalid input element')
    return
  }

  const file = input.files[0]
  selectedFile.value = file

  try {
    const pdfText = await extractTextFromPDF(file)
    const data = parseSalaryData(pdfText);

    const numbers = extractTaxSectionNumbers(pdfText);
    const basicSalary = numbers[0];
    const overtime = numbers[1];
    const allowanceItems = numbers.slice(2, numbers.length - 1).map(str => parseInt(str.replace(/,/g, ''), 10) || 0);
    const allowancesSum = allowanceItems.reduce((sum, val) => sum + val, 0);
    console.log(numbers);

    const values = extractBetweenKeywords(
      pdfText,
      '住民税 合 計',
      'その他 年末調整還付'
    );
    const tax = values[values.length - 1];
    console.log(values);

    // Populate formState with extracted values
    formState.month = extractYearMonth(pdfText);
    formState.name = data.name;
    formState.basicSalary = basicSalary;
    formState.ot = overtime;
    formState.tax = tax;
    formState.allowances = allowancesSum.toString();
    formState.netSalary = data.netSalary;
    //formState.textarea = pdfText;

    console.log('Extracted salary data:', data);
  } catch (error) {
    console.error('Failed to process PDF:', error);
  }
}
</script>
