import { Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Book_Categories } from "../constants/bookCategories";
import API from "../services/api";
const AddBook = () => {
    const [formInputs, setFormInputs] = useState({
        title: "",
        author: "",
        isbn: "",
        published_year: "",
        category: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleAddSubmit =async (e) => {
        e.preventDefault();
        if(isSubmitted) return;
        console.log(formInputs);

        const {title,author,isbn,published_year,category}=formInputs;
        if(!title||!author||!isbn||!published_year||!category){
            return alert('Fill All the fields')
        }

        try {
            setIsSubmitted(true);
            const {data} =await API.post('/api/books',formInputs);
            if(data.success){
                alert(data.message);
                setFormInputs({
                    title: "",
                    author: "",
                    isbn: "",
                    published_year: "",
                    category: "",
                });
            }
            
        } catch (error) {
            console.error(error);
            
        }finally{
            setIsSubmitted(false);
        }
    };

    const handleInputs = (e) => {
        const { name, value,type } = e.target;

        setFormInputs((prev) => {
            let processedValue=value;

            if(type === 'text'){
                processedValue = String(value).toLowerCase();

            }else{
                processedValue = value
            }

            return {...prev,[name]:processedValue}
        });
    };

    return (
        <section className=" flex-center mb-4 mt-2">
            <div className="container">
                <p className="display-6 fw-medium">Enter Book Details (Add)</p>

                <form
                    className="d-flex flex-column gap-3"
                    onSubmit={handleAddSubmit}
                >
                    <div className="d-flex flex-column">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formInputs.title}
                            onChange={handleInputs}
                            className="form-control"
                            placeholder="Enter Title"
                        />
                    </div>

                    <div className="d-flex flex-column">
                        <label htmlFor="author">Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formInputs.author}
                            onChange={handleInputs}
                            className="form-control"
                            placeholder=" Enter Author"
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="isbn">ISBN</label>
                        <input
                            type="text"
                            id="isbn"
                            name="isbn"
                            value={formInputs.isbn}
                            onChange={handleInputs}
                            className="form-control"
                            placeholder="Enter ISBN"
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="published_year">Published Year</label>
                        <input
                            type="number"
                            id="published_year"
                            name="published_year"
                            value={formInputs.published_year}
                            onChange={handleInputs}
                            className="form-control"
                            placeholder="Enter Published Year"
                        />
                    </div>

                    <div className="d-flex flex-column">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formInputs.category}
                            onChange={handleInputs}
                            className="form-control"
                        >
                            <option> Select Category</option>
                            { Book_Categories.map((item) => (
                                <option key={item.id} value={item.value}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className=" d-flex justify-content-between">
                        <Button variant="warning" as={Link} to="/admin-page">
                            {" "}
                            Back
                        </Button>
                        <Button type="submit" disabled={isSubmitted}> {isSubmitted?<Spinner size="sm"/> : "Submit"}</Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

const EditBook = () => {
    const [bookIsbn, setBookIsbn] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [searchMode, setSearchMode] = useState(true);
    const [formInputs, setFormInputs] = useState({
        id: "",
        title: "",
        isbn: "",
        author: "",
        published_year:"",
        category: "",
    });
    const handleInputs = (e) => {
        const { name, value } = e.target;
        if (searchMode) {
            setBookIsbn(Number(value));
        } else {
            setFormInputs((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSearchOrUpdate = async (e) => {
        e.preventDefault();

       
        //search mode api call
        if (bookIsbn && searchMode) {
            try {
                setIsSubmitted(true);
                const {data} =await API.get(`/api/books/${bookIsbn}`);

                if(data.success){
                    setFormInputs({
                        id: data.book.id,
                        title: data.book.title,
                        isbn: data.book.isbn,
                        author: data.book.author,
                        published_year: data.book.published_year,
                        category: data.book.category
                    });
                    setSearchMode(false)
                }
            } catch (error) {
                console.log(error.message);
            }finally{
                setIsSubmitted(false)
            }
            return;
        }
        //update mode api call
        if (!searchMode) {
            try {
                console.log(formInputs);
                setIsSubmitted(true);
                const {data} =await API.put(`/api/books/${bookIsbn}`,formInputs);

                if(data.success){

                    setFormInputs({
                        id: "",
                        title: "",
                        isbn: "",
                        author: "",
                        published_year:"",
                        category: "",
                    });
                    setBookIsbn("");
                    setSearchMode(true);
                    alert(data.message);
                }
            } catch (error) {
                console.log(error);
            }finally{
                setIsSubmitted(false)
            }
        }
    };
    return (
        <section className=" flex-center mb-4 mt-2">
            <div className="container">
                <p className="display-6 fw-medium">Enter Book Details (Edit)</p>

                <form
                    className="d-flex flex-column gap-3"
                    onSubmit={handleSearchOrUpdate}
                >
                    <div className="d-flex flex-column">
                        <label htmlFor="isbn">Book ISBN</label>
                        <input
                            type="text"
                            id="isbn"
                            name="isbn"
                            value={searchMode ? bookIsbn : formInputs.isbn}
                            onChange={handleInputs}
                            className="form-control"
                            placeholder="Enter Id only Digits"
                        />
                        <div className={searchMode ? "d-none" : "d-block "}>
                            <div className="d-flex flex-column">
                                <label htmlFor="id">Book Id</label>
                                <input
                                    type="text"
                                    id="id"
                                    name="id"
                                    value={formInputs.id}
                                    className="form-control"
                                    disabled
                                />
                            </div>
                            <div className="d-flex flex-column">
                                <label htmlFor="title">Book Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formInputs.title}
                                    onChange={handleInputs}
                                    className="form-control"
                                    placeholder="Enter Title"
                                />
                            </div>

                            <div className="d-flex flex-column">
                                <label htmlFor="author">Author</label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    value={formInputs.author}
                                    onChange={handleInputs}
                                    className="form-control"
                                    placeholder=" Enter Author"
                                />
                            </div>
                            <div className="d-flex flex-column">
                        <label htmlFor="published_year">Published Year</label>
                        <input
                            type="number"
                            id="published_year"
                            name="published_year"
                            value={formInputs.published_year}
                            onChange={handleInputs}
                            className="form-control"
                            placeholder="Enter Published Year"
                        />
                    </div>

                            <div className="d-flex flex-column">
                                <label htmlFor="category">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formInputs.category}
                                    onChange={handleInputs}
                                    className="form-control"
                                    
                                >{[Book_Categories.map((item)=><option key={item.id} value={item.value}>{item.name}</option>)]}</select>
                            </div>
                        </div>
                    </div>
                    <div className=" d-flex justify-content-between">
                        <Button variant="warning" as={Link} to="/admin-page">
                            {" "}
                            Back
                        </Button>
                        <Button type="submit">
                            {" "}
                            {searchMode ? isSubmitted? <Spinner size="sm"/> : "Search" : isSubmitted? <Spinner size="sm"/> : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};
const DeleteBook = () => {
    const [bookIsbn, setBookIsbn] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [searchMode, setSearchMode] = useState(true);
    const [formInputs, setFormInputs] = useState({
        id: "",
        title: "",
        author: "",
        isbn: "",
        published_year:"",
        category: "",
    });
    const handleInputs = (e) => {
        const { name, value } = e.target;
        if (searchMode) {
            setBookIsbn(Number(value));
        } else {
            setFormInputs((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSearchOrUpdate = async(e) => {
        e.preventDefault();

        // console.log(searchMode);
        // search mode api call

        if (searchMode && bookIsbn ) {
            try {
                setIsSubmitted(true)
                const { data } = await API.get(`/api/books/${bookIsbn}`);
                
                if(data.success){
                    setFormInputs({
                        id: data.book.id,
                        title: data.book.title,
                        author: data.book.author,
                        isbn: data.book.isbn,
                        published_year: data.book.published_year,
                        category: data.book.category
                    });

                    setSearchMode(false)
                }
                
            } catch (error) {
                console.log(error.message);
            } finally{
                setIsSubmitted(false);
            }
            return;
        }

        // delete mode api call
        if (!searchMode) {
            try {
                console.log(formInputs);
                setFormInputs({
                    id: "",
                    title: "",
                    isbn: "",
                    author: "",
                    category: "",
                });
                setBookIsbn("");
                setSearchMode(true);
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <section className=" flex-center mb-4 mt-2">
            <div className="container">
                <p className="display-6 fw-medium">
                    Enter Book Details (Delete)
                </p>

                <form
                    className="d-flex flex-column gap-3"
                    onSubmit={handleSearchOrUpdate}
                >
                    <div className="d-flex flex-column">
                        <label htmlFor="id">Book ISBN</label>
                        <input
                            type="text"
                            id="isbn"
                            name="isbn"
                            value={bookIsbn}
                            onChange={handleInputs}
                            className="form-control"
                            placeholder="Enter Here"
                            disabled={!searchMode}
                        />
                        <div className={searchMode ? "d-none" : "d-block "}>
                            <div className="d-flex flex-column">
                                <label htmlFor="title">Book Id</label>
                                <input
                                    type="text"
                                    id="id"
                                    name="id"
                                    value={formInputs.id}
                                    className="form-control"
                                    disabled
                                />
                            </div>
                            <div className="d-flex flex-column">
                                <label htmlFor="title">Book Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formInputs.title}
                                    
                                    className="form-control"
                                    disabled
                                />
                            </div>

                            <div className="d-flex flex-column">
                                <label htmlFor="author">Author</label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    value={formInputs.author}
                                    
                                    className="form-control"
                                    
                                    disabled
                                />
                            </div>

                            <div className="d-flex flex-column">
                                <label htmlFor="category">Category</label>
                                <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    value={formInputs.category}
                                    
                                    className="form-control"
                                    
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" d-flex justify-content-between">
                        <Button variant="warning" as={Link} to="/admin-page">
                            {" "}
                            Back
                        </Button>
                        <Button
                            type="submit"
                            variant={searchMode ? "primary" : "danger"}
                        >
                            {" "}
                            {searchMode ? isSubmitted?< Spinner size="sm"/>:"Search" : isSubmitted? < Spinner size="sm"/> : "Delete"}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export { AddBook, EditBook, DeleteBook };
