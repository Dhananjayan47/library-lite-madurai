import { Line } from "react-chartjs-2";

export const OverdueChart = ({ data }) => {
    const safeData = data || [];

  if (!safeData.length) {
    return <p>No overdue data available</p>;
  }

    const chartData = {
      labels: safeData.map(d => d.date),
      datasets: [
        {
          label: "Overdue",
          data: safeData.map(d => d.overdue_count)
        }
      ]
    };
  
    return <Line data={chartData} />;
  };