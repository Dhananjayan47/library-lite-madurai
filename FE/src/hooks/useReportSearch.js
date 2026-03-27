import { reportService } from "../services/reportService";
import { useState, useCallback } from "react";

export const useReportSearch = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalBorrowed: 0,
    activeBorrows: 0,
    overdueBooks: 0
  });

  const [charts, setCharts] = useState({
   
    monthlyTrend: [],
    topBooks: [],
    returnStats: { returned: 0, active: 0 },
    overdueTrend: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);

      const [statsRes, chartsRes] = await Promise.all([
        reportService.getReportsForCard(),
        reportService.getReportsForChart()
      ]);

      if (statsRes.data.success) {
        setStats(statsRes.data.data);
      }

      if (chartsRes.data.success) {
        const d = chartsRes.data.data;

        setCharts({
         
          monthlyTrend: d.monthlyTrend || [],
          topBooks: d.topBooks || [],
          returnStats: d.returnStats || { returned: 0, active: 0 },
          overdueTrend: d.overdueTrend || []
        });
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    stats,
    charts,
    loading,
    error,
    fetchReports
  };
};