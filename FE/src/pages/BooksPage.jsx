import { useEffect, useState } from "react";
import { Book_Categories } from "../constants/bookCategories";

import { Pagination, Spinner, Table } from "react-bootstrap";
import API from "../services/api";

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);
    const [loading, setLoading] = useState(false);
    const [limit] = useState(10);
    const [field, setField] = useState("title");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const getPages=()=>{
        const start = Math.max(1,page - 2);
        const end = Math.min(totalPages,page+2);

        let pages =[];

        for(let i=start;i<=end;i++){
            pages.push(i);
        }

        return pages
    }


    useEffect(()=>{
        const fetchBooks = async ()=>{
            try {
                setLoading(true)
                const {data} =await API.get(`api/books?page=${page}&limit=${limit}`);
                console.log(data.books);
                setBooks(data.books);
                setTotalPages(data.totalPages)
            } catch (error) {
                console.error(error)
            }finally{
                setLoading(false)
            }
        };
        fetchBooks();
    },[page,limit]);


    const handleSearch = async () => {
        const params = {
            category,
            field,
            search,
        };

        const { data } = await API.get("/api/books", { params });

        setBooks(data.books);
    };

    return (
        <>
         <section className="text-light flex-fill w-100">
                <section className=" mb-3 ">
                    <h3>Book Search</h3>
                    <div className="d-flex gap-3 align-items-end flex-wrap">
                        <div>
                            <label className=" form-label">Select Category</label>
                            <select
                                className=" rounded form-select"
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                }}
                            >
                                <option value="">All Category </option>
                                {Book_Categories.map((cat) => (
                                    <option key={cat.id} value={cat.value}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div >
                            <label className=" form-label">Search By</label>

                            <select
                                className=" rounded form-select"
                                value={field}
                                onChange={(e) => setField(e.target.value)}
                            >
                                <option value="id">Id</option>
                                <option value="title">Title</option>
                                <option value="author">Author</option>
                                <option value="isbn">Isbn</option>
                            </select>
                        </div>
                        <div className=" flex-grow-1">
                            <label className=" form-label">Search</label>
                            <input
                                className="form-control rounded"
                                placeholder="Enter search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button
                            disabled={!search && !category}
                            className=" btn btn-primary align-self-end"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </section>
                <section
                    className=" my-3 p-2 border border-dark"
                   
                >
                    <Table striped bordered hover responsive size="sm" >
                        <thead className=" table-dark">
                            <tr>
                                <th>Book id</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>

                                <th>Published_year</th>
                                <th>Isbn</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody >

                            {loading? <Spinner size="sm" className=" flex-center" color=" dark"/>:books.length === 0?(<tr>
                                <td colSpan={5} className=" text-center">
                                    No books found
                                </td>
                            </tr>):
                            
                            (books.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td className=" text-center">{book.published_year}</td>
                                    <td>{book.isbn}</td>
                                    <td><span
                                        className={`badge ${
                                            book.status === "available"
                                                ? "bg-success "
                                                : "bg-danger"}`
                                        }
                                    >
                                        {book.status}</span>
                                    </td>
                                </tr>)
                            ))}
                        </tbody>
                    </Table>
                </section>
                <section className=" flex-center">
                    <Pagination>
                        <Pagination.First disabled={page===1} onClick={()=>setPage(1)}/>
                        <Pagination.Prev disabled={page===1} onClick={()=>setPage((prev)=>prev-1)}/>
                       {getPages().map((p)=>(
                        <Pagination.Item key={p} active={page === p} onClick={()=>setPage(p)}>{p}</Pagination.Item>
                       ))}
                        <Pagination.Next disabled={page===totalPages} onClick={()=>setPage((prev)=>prev+1)}/>
                        <Pagination.Last disabled={page===totalPages} onClick={()=>setPage(totalPages)}/>
                    </Pagination>
                </section>
            </section>
        </>
        
    );
};

export default BooksPage;
