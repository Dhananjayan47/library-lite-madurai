import { Table } from "react-bootstrap";
import { useBorrowSearch } from "../hooks/useBorrowSearch";
import { useEffect } from "react";
import {Spinner, Pagination ,Button} from "react-bootstrap"

// import { borrowService } from "../services/borrowService";
const NotifyBorrowers = () => {
    const {
        
        getRecordsForNotify,
        loading,
        
        page,
        setPage,
        totalPages,
        records,
    } = useBorrowSearch();

    const getPages = () => {
        const start = Math.max(1, page - 2);
        const end = Math.min(totalPages, page + 2);
        let pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    useEffect(()=>{
        const fetchRecords = async () => {
            getRecordsForNotify();
        }
        fetchRecords();
    },[page])

    const getColor =(days)=>{
        if (days <= 0) return "bg-danger text-white"
        if (days === 1) return "bg-danger text-white"
        if (days === 2) return "bg-warning"
        if (days === 3) return "bg-success text-white"
       return "";
    }
    return (
        <section className=" flex-fill w-100 text-light">
            <section>
                <div>
                    <h3>Notify Borrowers :</h3>
                </div>
            </section>
            <section className=" my-3 p-2 border rounded overflow-x-scroll pt-3">
                <Table striped bordered hover responsive size="sm" >
                    <thead className=" table-dark">
                        <tr>
                            <th>Title</th>
                            <th>Isbn</th>
                            <th>Borrower Name</th>
                            <th>Borrower No</th>
                            <th>Borrowed at</th>
                            <th>Due Date</th>
                            <th>Days Left</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={9} className="text-center">
                                    <Spinner size="sm" />
                                </td>
                            </tr>
                        )}
                        {!loading && records.length === 0  && (
                            <tr>
                                <td colSpan={9} className=" text-center">
                                    No Records found
                                </td>
                            </tr>
                        )}
                        {!loading &&
                            records.length > 0 &&
                            records.map((r) => (
                                <tr key={r.book_id}>
                                    <td>{r.title}</td>
                                    <td>{r.isbn}</td>
                                    <td>{r.borrower_name}</td>
                                    <td>{r.borrower_phone}</td>
                                    <td>{new Date(r.borrowed_at).toLocaleDateString()}</td>
                           <td>{new Date(r.due_date).toLocaleDateString()}</td>
                           <td ><span className={` badge ${getColor(r.days_left)}`}>{r.days_left}</span></td>
                          
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </section>
            <section className=" flex-center">
                    <Pagination>
                        <Pagination.First
                            disabled={page === 1}
                            onClick={() => setPage(1)}
                        />
                        <Pagination.Prev
                            disabled={page === 1}
                            onClick={() => setPage((prev) => prev - 1)}
                        />
                        {getPages().map((p) => (
                            <Pagination.Item
                                key={p}
                                active={page === p}
                                onClick={() => setPage(p)}
                            >
                                {p}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            disabled={page === totalPages}
                            onClick={() => setPage((prev) => prev + 1)}
                        />
                        <Pagination.Last
                            disabled={page === totalPages}
                            onClick={() => setPage(totalPages)}
                        />
                    </Pagination>
                </section>
        </section>
    );
};

export default NotifyBorrowers;
