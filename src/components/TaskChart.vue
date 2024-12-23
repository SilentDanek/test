<template>
  <div>
    <canvas ref="chartCanvas" :width="width" :height="height" style="border: 1px solid #ccc"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, defineProps } from "vue";

// Пропсы для передачи данных и размеров графика
const props = defineProps({
  data: {
    type: Array as () => [string, number][],
    required: true,
  },
  width: {
    type: Number,
    default: 600, // Ширина графика
  },
  height: {
    type: Number,
    default: 400, // Высота графика
  },
});

// Ссылка на элемент <canvas>
const chartCanvas = ref<HTMLCanvasElement | null>(null);

// Функция для рисования графика
function drawChart(ctx: CanvasRenderingContext2D, data: [string, number][], width: number, height: number) {
  // Проверка данных
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.error("Invalid data provided for chart rendering");
    return;
  }

  // Настройки графика
  const padding = 50; // Отступы
  const barWidth = (width - 2 * padding) / data.length - 10; // Ширина столбцов
  const maxValue = Math.max(...data.map((item) => item[1])); // Максимальное значение

  // Очистка холста
  ctx.clearRect(0, 0, width, height);

  // Рисуем оси
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;

  // Вертикальная ось
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.stroke();

  // Горизонтальная ось
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  // Рисуем столбцы
  data.forEach((item, index) => {
    const [label, value] = item;
    const barHeight = (value / maxValue) * (height - 2 * padding);

    // Вычисляем позиции столбцов
    const x = padding + index * (barWidth + 10);
    const y = height - padding - barHeight;

    // Рисуем столбцы
    ctx.fillStyle = ["#4caf50", "#2196f3", "#f44336"][index % 3]; // Цвета столбцов
    ctx.fillRect(x, y, barWidth, barHeight);

    // Подписи значений
    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(value.toString(), x + barWidth / 2, y - 5);

    // Подписи меток
    ctx.fillStyle = "#000";
    ctx.fillText(label, x + barWidth / 2, height - padding + 20);
  });
}

// Рисуем график при изменении данных или при монтировании
onMounted(() => {
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext("2d");
    if (ctx) {
      drawChart(ctx, props.data, props.width, props.height);
    }
  }
});

watch(
    () => props.data,
    (newData) => {
      if (chartCanvas.value) {
        const ctx = chartCanvas.value.getContext("2d");
        if (ctx) {
          drawChart(ctx, newData, props.width, props.height);
        }
      }
    },
    { immediate: true }
);
</script>

<style scoped>
canvas {
  display: block;
  margin: 20px auto;
  background-color: #fff;
}
</style>
