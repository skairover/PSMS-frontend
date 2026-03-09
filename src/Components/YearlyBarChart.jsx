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

// Register Chart.js components
ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function BarChart({ items, backgroundColor }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const now = new Date();
  const lastYear = new Date();
  lastYear.setFullYear(now.getFullYear() - 1);

  const monthlyTotals = Array(12).fill(0);

  items
    .filter(item => {
      const date = new Date(item.createdAt); // or item.date
      return date >= lastYear && date <= now;
    })
    .forEach(item => {
      const month = new Date(item.createdAt).getMonth();
      monthlyTotals[month] += item.amount;
    });

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          data: monthlyTotals,
          backgroundColor,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }, [backgroundColor, items, monthlyTotals]);

  return <canvas ref={chartRef}></canvas>;
}

export default BarChart;
