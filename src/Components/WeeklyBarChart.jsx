import { useEffect, useRef, useMemo } from 'react';
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
import { Chart } from 'chart.js'; // you need this to create chart instance

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function WeeklyBarChart({ items, backgroundColor }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Compute last week's date (7 days ago)
  const now = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(now.getDate() - 7);

  // Compute daily totals memoized to avoid recalculation every render
  const dailyTotals = useMemo(() => {
    const totals = Array(7).fill(0);
    items.forEach(item => {
      const date = new Date(item.createdAt);
      if (date >= lastWeek && date <= now) {
        const day = date.getDay(); // 0=Sun, 6=Sat
        totals[day] += item.amount;
      }
    });
    return totals;
  }, [items, lastWeek, now]);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext('2d');
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
          {
            data: dailyTotals,
            backgroundColor,
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Weekly Spending'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [backgroundColor, dailyTotals]);

  return <canvas ref={chartRef}></canvas>;
}

export default WeeklyBarChart;
