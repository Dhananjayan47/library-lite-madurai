import { useEffect, useState } from "react";
import { Book_Categories } from "../constants/bookCategories";

import { Table } from "react-bootstrap";
import API from "../services/api";

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [field, setField] = useState("title");
    const [search, setSearch] = useState();
    const [category, setCategory] = useState("");


    useEffect(()=>{
        const fetchBooks = async ()=>{
            try {
                const {data} =await API.get("/api/books");
                console.log(data.books);
                setBooks(data.books);
            } catch (error) {
                console.error(error)
            }
        };
        fetchBooks();
    },[])
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
         <section className=" flex-fill w-100">
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
                            <lable className=" form-label">Search</lable>
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
                                <th>Isbn</th>
                                <th>Published_year</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody >

                            {books.length === 0?(<tr>
                                <td colSpan={5} className=" text-center">
                                    No books found
                                </td>
                            </tr>):
                            
                            (books.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.isbn}</td>
                                    <td className=" text-center">{book.published_year}</td>
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
            </section>
        </>
        
    );
};

export default BooksPage;
