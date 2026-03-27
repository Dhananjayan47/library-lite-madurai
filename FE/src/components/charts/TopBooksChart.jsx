import { Bar } from "react-chartjs-2";

export const TopBooksChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.title),
    datasets: [
      {
        label: "Borrows",
        data: data.map(d => d.borrow_count),
        borderWidth: 1
      }
    ]
  };

  return <Bar data={chartData} />;
};