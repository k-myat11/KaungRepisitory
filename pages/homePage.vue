// pages/homePage.vue
<template>
    <UContainer class="bg-gray-100 flex">
        <UCard class="w-full shadow-lg p-0 m-0">
            <UTabs :items="tabs" class="w-full bg-white">
                <template #year>
                    <div class="flex flex-row mt-0 p-0">
                        <div class="basis-4/5 flex flex-row">
                            <UIcon name="i-heroicons-currency-yen" class="w-9 h-9 text-primary" />
                            <h1 class="text-3xl font-bold text-black" icon="i-heroicons-currency-yen">
                                Salay of Each Month By Year
                            </h1>
                        </div>
                        <div class="basis-1/5">
                            <UInputMenu v-model="value" :items="items1" icon="i-heroicons-calendar-days" />
                        </div>

                    </div>
                    <Placeholder class="h-8" />

                    <highchart :options="chartOptions1" class="h-full w-full" />
                </template>
                <template #tax>
                    <div>
                        <div class="flex flex-row mt-0 p-0">
                            <div class="basis-4/5 flex flex-row">
                                <UIcon name="i-heroicons-currency-yen" class="w-9 h-9 text-primary" />
                                <h1 class="text-3xl font-bold text-black" icon="i-heroicons-currency-yen">
                                    Salary & Tax
                                </h1>
                            </div>
                            <div class="basis-1/5">
                                <UInputMenu v-model="value" :items="items1" icon="i-heroicons-calendar-days" />
                            </div>
                        </div>
                        <Placeholder class="h-8" />
                    </div>
                    <highchart :options="chartOptions2" class="h-full w-full" />
                </template>
                <template #percent>
                    <div>
                        <div class="flex flex-row mt-0 p-0">
                            <div class="basis-3/5 flex flex-row">
                                <UIcon name="i-heroicons-currency-yen" class="w-9 h-9 text-primary" />
                                <h1 class="text-3xl font-bold text-black" icon="i-heroicons-currency-yen">
                                    Salary Detail By Percent(%)
                                </h1>
                            </div>
                            <div class="basis-1/5 flex items-end justify-end">
                                <UInputMenu v-model="value" :items="items1" class="w-44"
                                    icon="i-heroicons-calendar-days" />
                            </div>
                            <div class="basis-1/5 flex items-end justify-end">
                                <UInputMenu v-model="value2" :items="items2" class=" w-44"
                                    icon="i-heroicons-calendar-days" />
                            </div>
                        </div>
                        <Placeholder class="h-8" />
                    </div>
                    <highchart :options="chartOptions3" class="h-full w-full" />
                </template>
            </UTabs>
        </UCard>
    </UContainer>
</template>
<script setup lang="ts">
const items1 = ref(['2021', '2022', '2023', '2024', '2025', '2026'])
const value = ref('2025')

const items2 = ref(['January', 'February', 'March', 'April', 'May', 'June'])
const value2 = ref('February')

const tabs = [
    {
        label: 'Salay of Each Month By Year',
        icon: 'i-lucide-credit-card',
        slot: 'year'
    },
    {
        label: 'Salary & Tax',
        icon: 'i-lucide-credit-card',
        slot: 'tax'
    },
    {
        label: 'Salary Detail By Percent',
        icon: 'i-lucide-credit-card',
        slot: 'percent'
    }
]

const chartOptions1 = ref({
    chart: {
        type: 'column'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: ['JAN-01', 'FEB-02', 'MAR-03', 'APR-04', 'MAY-05', 'JUN-06', 'JUL-07', 'AUG-08', 'SEP-09', 'OCT-10', 'NOV-11', 'DEC-12'],
        crosshair: true,
        accessibility: {
            description: 'Countries'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'k = 1000 Yen'
        }
    },
    tooltip: {
        valueSuffix: ''
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
        {
            name: 'Salary | ¥',
            data: [387749, 300000, 310000, 250000, 234000, 200000, 387749, 300000, 310000, 250000, 234000, 200000]
        }
    ]
});

const chartOptions2 = ref({
    chart: {
        type: 'bar'
    },
    title: {
        text: '',
        align: 'left'
    },
    xAxis: {
        categories: ['JAN-01', 'FEB-02', 'MAR-03', 'APR-04', 'MAY-05', 'JUN-06', 'JUL-07', 'AUG-08', 'SEP-09', 'OCT-10', 'NOV-11', 'DEC-12'],
        title: {
            text: null
        },
        gridLineWidth: 1,
        lineWidth: 0
    },
    yAxis: {
        min: 0,
        title: {
            text: 'k = 1000¥',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        },
        gridLineWidth: 0
    },
    tooltip: {
        valueSuffix: ' yen'
    },
    plotOptions: {
        bar: {
            borderRadius: '50%',
            dataLabels: {
                enabled: true
            },
            groupPadding: 0.1
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Tax',
        data: [12000, 20000, 23000, 25000, 12000, 40000, 34000, 40000, 23000, 34000, 22000, 26800]
    }, {
        name: 'Salary',
        data: [387749, 300000, 310000, 250000, 234000, 200000, 387749, 300000, 310000, 250000, 234000, 200000]
    }]
});

const chartOptions3 = ref({
    chart: {
        type: 'pie'
    },
    title: {
        text: ''
    },
    tooltip: {
        valueSuffix: '%'
    },
    subtitle: {
        text: ''
    },
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,
                distance: 20
            }, {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                    fontSize: '1.2em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '>',
                    property: 'percentage',
                    value: 10
                }
            }]
        }
    },
    series: [
        {
            name: 'Percentage',
            colorByPoint: true,
            data: [
                {
                    name: 'Basic Salary',
                    y: 81
                },
                {
                    name: 'Tax',
                    sliced: true,
                    selected: true,
                    y: 10
                },
                {
                    name: 'OT',
                    y: 1
                },
                {
                    name: 'Allowances',
                    y: 8
                }
            ]
        }
    ]
});
</script>
