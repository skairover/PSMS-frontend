import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Chart } from 'chart.js';

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function WeeklyBarChart({ items }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !items) return;

    const ctx = chartRef.current.getContext('2d');

    if (chartInstance.current) chartInstance.current.destroy();

    const labels = items.map(med => med.name);
    const quantities = items.map(med => med.quantity);

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 320);
    gradient.addColorStop(0,   'rgba(8, 131, 149, 0.85)');
    gradient.addColorStop(1,   'rgba(55, 183, 195, 0.15)');

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Quantity in stock',
            data: quantities,
            backgroundColor: gradient,
            borderColor: 'rgba(8, 131, 149, 0.9)',
            borderWidth: 0,
            borderRadius: 8,
            borderSkipped: false,
            hoverBackgroundColor: 'rgba(55, 183, 195, 0.9)',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          duration: 600,
          easing: 'easeInOutQuart',
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              color: '#071952',
              font: { size: 12, weight: '600', family: 'DM Sans, sans-serif' },
              boxWidth: 12,
              boxHeight: 12,
              borderRadius: 4,
              useBorderRadius: true,
              padding: 16,
            },
          },
          title: { display: false },
          tooltip: {
            backgroundColor: '#071952',
            titleColor: '#EBF4F6',
            bodyColor: '#37B7C3',
            borderColor: 'rgba(55,183,195,0.2)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 10,
            titleFont: { size: 12, weight: '700', family: 'DM Sans, sans-serif' },
            bodyFont:  { size: 13, weight: '600', family: 'DM Sans, sans-serif' },
            callbacks: {
              label: (ctx) => `  ${ctx.parsed.y} units`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              color: '#94a3b8',
              font: { size: 11, family: 'DM Sans, sans-serif' },
              maxRotation: 30,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(218, 238, 242, 0.6)',
              drawTicks: false,
            },
            border: { display: false, dash: [4, 4] },
            ticks: {
              color: '#94a3b8',
              font: { size: 11, family: 'DM Sans, sans-serif' },
              padding: 8,
            },
          },
        },
      }
    });

    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [items]);

  return <canvas ref={chartRef} />;
}

export default WeeklyBarChart;