<template>
  <UContainer class="flex h-full items-center justify-center bg-gray-100">
    <UCard class="w-full h-full p-0 shadow-lg">
      <template #header>
        <h1 class="text-2xl font-semibold">
          Salary Detail
        </h1>
        <!-- Date Filter -->
        <div class="flex flex-row justify-end">
          <h3 class="mt-5">Filter By Date:</h3>
          <UInput v-model="selectedDate" type="month" placeholder="Filter by date (YYYY/MM)" class="mt-4 w-52" />
        </div>
      </template>

      <!-- Table Container with Fixed Height -->
      <div class="table-container">
        <UTable :rows="filteredPaginatedRows" :columns="columns" />
      </div>

      <!-- Pagination -->
      <UPagination v-model="page" :page-count="pageCount" :total="filteredRows.length" class="mt-4" />
    </UCard>
  </UContainer>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  setup() {
    // Columns definition
    const columns = [
      { key: 'no', label: 'No' },
      { key: 'date', label: 'Date' },
      { key: 'basicSalary', label: 'Basic Salary' },
      { key: 'tax', label: 'Tax' },
      { key: 'ot', label: 'OT' },
      { key: 'allowances', label: 'Allowances' },
      { key: 'totalSalary', label: 'Total Salary' }
    ];

    // Sample data
    const rows = [
      { no: 1, date: '2025/01', basicSalary: 250000, tax: 25000, ot: 50000, allowances: 30000, totalSalary: 310000 },
      { no: 2, date: '2025/02', basicSalary: 250000, tax: 25000, ot: 50000, allowances: 30000, totalSalary: 310000 },
      { no: 3, date: '2025/03', basicSalary: 250000, tax: 25000, ot: 50000, allowances: 30000, totalSalary: 310000 },
      { no: 4, date: '2025/04', basicSalary: 250000, tax: 25000, ot: 50000, allowances: 30000, totalSalary: 310000 },
      { no: 5, date: '2025/05', basicSalary: 250000, tax: 25000, ot: 50000, allowances: 30000, totalSalary: 310000 },
      { no: 6, date: '2025/06', basicSalary: 250000, tax: 25000, ot: 50000, allowances: 30000, totalSalary: 310000 },
      { no: 7, date: '2025/07', basicSalary: 250000, tax: 25000, ot: 50000, allowances: 30000, totalSalary: 310000 },
      { no: 8, date: '2025/08', basicSalary: 250000, tax: 25000, ot: 50000, allowances: 30000, totalSalary: 310000 },
      { no: 9, date: '2025/09', basicSalary: 250000, tax: 25000, ot: 50000, allowances: 30000, totalSalary: 310000 },
      { no: 10, date: '2025/10', basicSalary: 250000, tax: 25000, ot: 50000, allowances: 30000, totalSalary: 310000 },
      { no: 11, date: '2025/11', basicSalary: 250000, tax: 25000, ot: 50000, allowances: 30000, totalSalary: 310000 },
      { no: 12, date: '2025/12', basicSalary: 250000, tax: 25000, ot: 50000, allowances: 30000, totalSalary: 310000 },
    ];

    // Pagination state
    const page = ref(1); // Current page
    const pageCount = 5; // Number of rows per page

    // Date filter state
    const selectedDate = ref('');

    // Computed property to filter rows by date
    const filteredRows = computed(() => {
      if (!selectedDate.value) return rows; // If no date is selected, return all rows
      return rows.filter(row => row.date === selectedDate.value.replace('-', '/'));
    });

    // Computed property to get paginated rows
    const filteredPaginatedRows = computed(() => {
      const start = (page.value - 1) * pageCount;
      const end = start + pageCount;
      return filteredRows.value.slice(start, end);
    });

    return {
      columns,
      rows,
      filteredPaginatedRows,
      page,
      pageCount,
      selectedDate,
      filteredRows
    };
  }
});
</script>

<style scoped>
/* Fixed height for the table container */
.table-container {
  height: 350px;
  /* Adjust this value as needed */
  overflow-y: auto;
  /* Enable vertical scrolling */
  border: 1px solid #e5e7eb;
  /* Optional: Add a border */
  border-radius: 0.375rem;
  /* Optional: Match the card's border radius */
}
</style>