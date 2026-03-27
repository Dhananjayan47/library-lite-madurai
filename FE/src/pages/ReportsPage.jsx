import { useEffect,useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { reportService } from "../services/reportService";
import {  MonthlyBorrowChart } from "../components/charts/BorrowTrendChart";
import { TopBooksChart } from "../components/charts/TopBooksChart";
import { ReturnStatsChart } from "../components/charts/ReturnedVsActiveChart";
import { OverdueChart } from "../components/charts/OverdueChart";
import { useReportSearch } from "../hooks/useReportSearch";
import Loading from "../components/Loading";
const ReportsPage = () => {

const { stats,charts,loading,fetchReports} =useReportSearch(); 

useEffect(()=>{
    fetchReports();
    
},[]);
useEffect(()=>{
    
    console.log(stats,charts);
},[loading])

if(loading) return <Loading/>
    return ( <section className=" flex-fill w-100">
        <section className="mb-3">
            <Card>
                <Card.Header>Reports</Card.Header>
                <Card.Body>
                    <Card.Title>Books Report</Card.Title>
                    <ListGroup className=" list-group-flush">
                        <ListGroup.Item> Total Books : {stats.totalBooks}</ListGroup.Item>
                        <ListGroup.Item>Total Borrows All Time : {stats.totalBorrowed}</ListGroup.Item>
                        <ListGroup.Item>Active Borrows : {stats.activeBorrows}</ListGroup.Item>
                        <ListGroup.Item>Over Due Books : {stats.overdueBooks}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </section>
        <section className="mb-3 border border-dark rounded p-2">
            <h3>Monthly Borrow :</h3>
            <MonthlyBorrowChart data={charts.monthlyTrend}/>
        </section>
        {/* <section className="mb-3">
            <TopBooksChart data={charts.topBooks}/>
        </section> */}
        <section className="mb-3 border border-dark rounded p-2">
            <ReturnStatsChart data={charts.returnStats}/>
        </section>
        {/* <section className="mb-3">
            <OverdueChart data={charts.overdueTrend}/>
        </section> */}
    </section>  );
}
 
export default ReportsPage;