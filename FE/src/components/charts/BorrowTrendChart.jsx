import { Bar } from "react-chartjs-2";

export const MonthlyBorrowChart = ({ data }) => {
  const safeData = data || [];

  if (!safeData.length) {
    return <p>No monthly data available</p>;
  }

  const chartData = {
    labels: safeData.map(d =>
      new Date(d.month).toLocaleString("default", {
        month: "short",
        year: "numeric"
      })
    ),
    datasets: [
      {
        label: "Monthly Borrows",
        data: safeData.map(d => d.count),
        backgroundColor: "rgba(54, 162, 235, 0.5)", // fill color
        borderColor: "rgba(54, 162, 235, 1)",    
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month"
        }
      },
      y: {
        beginAtZero: true,
        ticks:{
            stepSize:1
        },
        title: {
          display: true,
          text: "Borrows"
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};