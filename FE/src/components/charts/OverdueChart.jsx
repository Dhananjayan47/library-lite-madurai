import { Line } from "react-chartjs-2";

export const OverdueChart = ({ data }) => {
  const safeData = data || [];

  if (!safeData.length) {
    return <p>No overdue data available</p>;
  }

  const chartData = {
    labels: safeData.map(d =>
      new Date(d.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short"
      })
    ),
    datasets: [
      {
        label: "Overdue",
        data: safeData.map(d => d.overdue_count),
        borderWidth: 2,
        tension: 0.4, // 🔥 smooth curve
        fill: true,   // 🔥 area chart
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointRadius: 3
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#fff" }
      },
      tooltip: {
        titleColor: "#fff",
        bodyColor: "#fff"
      }
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: "#fff"
        },
        grid: { color: "rgba(255,255,255,0.1)" }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};