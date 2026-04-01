import { Bar } from "react-chartjs-2";

export const TopBooksChart = ({ data }) => {
  const safeData = data || [];

  if (!safeData.length) {
    return <p>Data not available</p>;
  }

  const chartData = {
    labels: safeData.map(d => d.title),
    datasets: [
      {
        label: "Borrows",
        data: safeData.map(d => d.borrow_count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderRadius: 6, // 🔥 modern UI
        barThickness: 30
      }
    ]
  };

  const options = {
    indexAxis: "y", // 🔥 horizontal chart (fix long titles issue)
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
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: "#fff"
        },
        grid: {
          color: "rgba(255,255,255,0.1)"
        }
      },
      y: {
        ticks: {
          color: "#fff",
          callback: function (value) {
            const label = this.getLabelForValue(value);
            return label.length > 20
              ? label.substring(0, 20) + "..."
              : label;
          }
        },
        grid: {
          display: false
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};