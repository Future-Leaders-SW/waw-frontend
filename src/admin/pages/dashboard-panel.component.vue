<script setup>
import { onMounted, reactive, ref } from 'vue';
import { Chart } from 'chart.js';

let chartRef = ref(null);
let chart = null;

onMounted(() => {
    let ctx = chartRef.value.getContext('2d');
    chart = new Chart(ctx, {
        type: 'pie', // or 'doughnut'
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
        }
    });
});
</script>

<template>
    <div class="cards-space">
        <div class="card">
            <div class="card-header">
                <h2>Anuncios publicados</h2>
            </div>
            <div class="card-body">
                <p>20</p>
            </div>
            <div class="card-footer">

            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <h2>Empresas</h2>
            </div>
            <div class="card-body">
                <p>11</p>
            </div>
            <div class="card-footer">

            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <h2>Suscripciones activas</h2>
            </div>
            <div class="card-body">
                <p>130</p>
            </div>
            <div class="card-footer">

            </div>
        </div>
    </div>
    <div class="canvas">
        <canvas ref="chartRef"></canvas>
    </div>
</template>

<style>
.cards-space {
    display: flex;
    margin: 2rem 0;
}

.card {
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    margin: 0 1rem;
}

.card-header,
.card-footer {
    padding: 10px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ccc;
}

.card-body {
    padding: 10px;
}

.card-body p {
    font-weight: 600;
    font-size: x-large;
}

.canvas {
    height: 10rem;
    width: 10rem;
}
</style>
