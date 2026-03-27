import { Pie } from "react-chartjs-2";

export const ReturnStatsChart = ({ data }) => {
    
    const safeData = data || [];
  
  const chartData = {
    labels: ["Returned", "Active"],
    datasets: [
      {
        data: [safeData.returned, safeData.active],
        backgroundColor: ["#4CAF50", "#FF6384"],
        borderColor: ["#388E3C", "#D32F2F"]
      }
    ]
  };

  return <Pie data={chartData} />;
};