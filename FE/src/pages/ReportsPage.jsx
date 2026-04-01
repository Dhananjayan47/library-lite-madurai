import { useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
// import { reportService } from "../services/reportService";
import { MonthlyBorrowChart } from "../components/charts/BorrowTrendChart";
import { TopBooksChart } from "../components/charts/TopBooksChart";
import { ReturnStatsChart } from "../components/charts/ReturnedVsActiveChart";
import { OverdueChart } from "../components/charts/OverdueChart";
import { useReportSearch } from "../hooks/useReportSearch";
import Loading from "../components/Loading";
const ReportsPage = () => {
    const { stats, charts, loading, fetchReports } = useReportSearch();

    useEffect(() => {
        fetchReports();
    }, []);

    if (loading) return <Loading />;
    return (
        <section className=" flex-fill w-100 text-light ">
            <section className=" pb-4">
                <h3>Data Reports:</h3>
                <section className="mb-3">
  <div className="report-card">
    <h3 className="report-title">Reports</h3>

    <div className="report-item">
      <p>Total Books</p>
      <span>{stats.totalBooks}</span>
    </div>

    <div className="report-item">
      <p>Total Borrows All Time</p>
      <span>{stats.totalBorrowed}</span>
    </div>

    <div className="report-item">
      <p>Active Borrows</p>
      <span>{stats.activeBorrows}</span>
    </div>

    <div className="report-item">
      <p>Overdue Books</p>
      <span>{stats.overdueBooks}</span>
    </div>
  </div>
</section>
                <section className="mb-3 border text-light rounded p-2">
                    <h3>Monthly Borrow :</h3>
                    <MonthlyBorrowChart data={charts.monthlyTrend} />
                </section>
                <section className="mb-3">
                    <h3>Top Borrowed Books :</h3>
                    <TopBooksChart data={charts.topBooks} />
                </section>
                <section className="mb-3 border text-light rounded p-2">
                    <h3>Borrowed & Returns :</h3>
                    <ReturnStatsChart data={charts.returnStats} />
                </section>
                <section className="mb-5">
                    <OverdueChart data={charts.overdueTrend} />
                </section>
            </section>
        </section>
    );
};

export default ReportsPage;
