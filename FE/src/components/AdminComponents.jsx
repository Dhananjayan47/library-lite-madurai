import { Button, Form, Spinner, Table } from "react-bootstrap";
import { useState,useEffect, useContext } from "react";
// import { Book_Categories } from "../constants/bookCategories";
import { FaEdit, FaMinus, FaPlus, FaSearch } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import API from "../services/api";
import { useBookSearch } from "../hooks/useBookSearch";
import { borrowService } from "../services/borrowService";
import AuthContext from "../context/AuthContext";
import { useToast } from "../context/ToastProvider";


const BookUpdates = () => {
    return (
        <section className="bg-dark p-3 text-white rounded mb-3">
            <h3 className="mb-3">Book Updates</h3>

            <div className="row g-3">
                <div className="col-md-4">
                    <div className="card h-100 bg-success text-white">
                        <div className="card-body d-flex flex-column">
                            <FaPlus size={25} />
                            <p className="pt-2">Add Book</p>

                            <Button
                                variant="light"
                                className="mt-auto w-100"
                                as={Link}
                                to="book-add"
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 bg-warning text-white">
                        <div className="card-body d-flex flex-column">
                            <FaEdit size={25} />
                            <p className="pt-2">Edit Book</p>

                            <Button
                                variant="light"
                                className="mt-auto w-100"
                                as={Link}
                                to="book-edit"
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 bg-danger text-white">
                        <div className="card-body d-flex flex-column">
                            <FaMinus size={25} />
                            <p className="pt-2">Delete Book</p>

                            <Button
                                variant="light"
                                className="mt-auto w-100"
                                as={Link}
                                to="book-delete"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const BookSearch = ({
    bookIsbn,
    setBookIsbn,
    handleSearchByIsbn,
    handleReceiveUpdate,
    book,
    selectedBook,
    setSelectedBook,
    searchMode,
    loading,
    record,
    activePage,
   }) => (
    <section>
        <h3>Book Search</h3>

        <form className=" mb-3" onSubmit={handleSearchByIsbn}>
            <label className="form-label">Enter Book ISBN</label>

            <div className="d-flex gap-2">
                <input
                    type="text"
                    value={bookIsbn}
                    onChange={(e) => setBookIsbn(e.target.value)}
                    className="form-control border border-dark rounded"
                />
                <Button type="submit" disabled={loading}>
                    {loading ? <Spinner size="sm"/> : <FaSearch />}
                </Button>
            </div>
        </form>

        {!searchMode &&  ( book || record ) &&(<>

            <Table className=" d-inline-block overflow-x-scroll">
                <thead className="table-dark">
                    {
                        activePage==="borrow-update"  ? <tr>
                        <td>Select</td>
                        <td>Title</td>
                        <td>Author</td>
                        <td>Category</td>
                        <td>Isbn</td>
                        <td>Published Year</td>
                    </tr>:<tr>
                        <td>Select</td>
                        <td>Borrower Name</td>
                        <td>Borrower Phone</td>
                        <td>Borrowed At</td>
                        <td>Title</td>
                        <td>Isbn</td>
                    </tr>
                    }
                   
                </thead>

                <tbody className="table-secondary">
                   { activePage=== "borrow-update" ? <tr>
                        <td>
                            <input
                                type="radio"
                                name="selectedBook"
                                onChange={() => setSelectedBook({ ...book })}
                            />
                        </td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.category}</td>
                        <td>{book.isbn}</td>
                        <td>{book.published_year}</td>
                    </tr>:<tr>
                        <td>
                            <input
                                type="radio"
                                name="selectedBook"
                                onChange={() => setSelectedBook({ ...book })}
                            />
                        </td>
                        <td>{record.borrower_name}</td>
                        <td>{record.borrower_phone}</td>
                        <td>{record.borrowed_at}</td>
                        <td>{record.title}</td>
                        <td>{record.isbn}</td>
                    </tr> } 
                </tbody>
            </Table  >

            {selectedBook && activePage === "receive-update" && (
                <div className=" d-flex justify-content-end">

                    <Button onClick={handleReceiveUpdate}> Update </Button>

                </div>
            )}
        </>
        )}
    </section>
);

const BorrowUpdates = () => {

    const {showToast} =useToast()
    const [activePage, setActivePage] = useState("borrow-update");
    const [formData, setFormData] = useState({
        borrower_name: "",
        contact: "",
        dueDate: "",
    });

    const {book,loading,reset,searchByIsbn,borrowSearchByIsbn,record}= useBookSearch();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [bookIsbn, setBookIsbn] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);
    const [searchMode, setSearchMode] = useState(true);
    const validateIsbn = () => {
        if (!bookIsbn) return "ISBN is required";
      
        if (!/^\d{10,13}$/.test(bookIsbn)) {
          return "ISBN must be 10–13 digits";
        }
      
        return null;
      };


      const validateBorrow = () => {
        if (!selectedBook) return "Select a book";
      
        if (!formData.borrower_name.trim()) {
          return "Borrower name required";
        }
      
        if (!/^\d{10}$/.test(formData.contact)) {
          return "Invalid phone number";
        }
      
        if (!formData.dueDate) return "Due date required";
      
        const todayStr = new Date().toISOString().split("T")[0];
        if (formData.dueDate < todayStr) {
          return "Due date cannot be in the past";
        }
      
        return null;
      };


    const handleBorrowerDataInput = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearchByIsbn = async (e) => {
        e.preventDefault();

        const error = validateIsbn();
  if (error) return showToast(error, "danger");


  try {
    if (activePage === "borrow-update") {
      await searchByIsbn(bookIsbn);
    } else {
      await borrowSearchByIsbn(bookIsbn);
    }

    setSearchMode(false);
  } catch  {
    showToast("Search failed", "danger");
  }
    };

    const handleBorrowInfoSubmit = async (e) => {
        e.preventDefault();


  const error = validateBorrow();
  if (error) return showToast(error, "danger");


        try {
         
            const borrow_data = {
                book_id: selectedBook.id,
                borrower_name: formData.borrower_name,
                borrower_phone: formData.contact,
                due_date: formData.dueDate,
            };
            const { data } = await API.post("/api/borrow", borrow_data);

            if (data.success) {
               showToast(data.message,"success")
                handleSetDefault();
            }
        }  catch (error) {
    showToast(error?.response?.data?.message || "Borrow failed", "danger");
  }
    };

    const handleSetDefault=()=>{
        setFormData({ borrower_name: "", contact: "", dueDate: "" });
        setBookIsbn("");
        setSelectedBook(null);
        setSearchMode(true);
        reset();
    }
    const handleReceiveUpdate= async()=>{
        const error = validateIsbn();
        if (error) return showToast(error, "danger");
      
        if (!selectedBook) return showToast("Select a record", "warning");
      
     try {
        const {data} = await borrowService.BorrowReceiveUpdate(bookIsbn);

        if(data.success){
           showToast(data.message,"success")
            handleSetDefault();
        }
     } catch (error) {
        console.log(error)
     }
    };

  

    const handleSetActivePage = (e) =>{
        console.log("hi");
        
        console.log(e.target.name);
        setActivePage(e.target.name);

       handleSetDefault();

    }

    return (
        <section className="text-light border rounded ">
            <div className=" p-2 mb-3 ">

                {/* Borrow & Receive button */}
                <div className=" d-flex justify-content-between mt-2">
                    <h3 className="">Book Status Updates</h3>
                    <div className=" w-25">
                        <Button
                        name="borrow-update"
                            variant={
                                activePage === "borrow-update"
                                    ? "outline-primary"
                                    : "primary"
                            }
                            onClick={(e) => handleSetActivePage(e)}
                        >
                            B
                        </Button>
                        <Button
                        name="receive-update"
                            variant={
                                activePage === "receive-update"
                                    ? "outline-primary"
                                    : "primary"
                            }
                            onClick={(e) =>handleSetActivePage(e)}
                        >
                            R
                        </Button>
                    </div>
                </div>
                {/* Book Search  */}
                <div>
                    <div className="container d-flex flex-column p-1">
                        <div className="row justify-content-center">
                            <p>{activePage === "borrow-update" ? "Borrow Update:":"Receive Update :"}</p>
                            <BookSearch
                                bookIsbn={bookIsbn}
                                setBookIsbn={setBookIsbn}
                                handleSearchByIsbn={handleSearchByIsbn}
                                book={book}
                                selectedBook={selectedBook}
                                setSelectedBook={setSelectedBook}
                                handleReceiveUpdate={handleReceiveUpdate}
                                searchMode={searchMode}
                                loading={loading}
                                record={record}
                                activePage={activePage}
                                
                            />
                        </div>
                    </div>
                </div>
            </div>
            {selectedBook && (activePage === "borrow-update") && (
                <>
                    <div className=" border border-dark rounded p-2 mb-5">
                        <div className="col-12 col-md-6 col-lg-4 ">
                            <form
                                className=" bg-dark text-light p-3 rounded"
                                onSubmit={handleBorrowInfoSubmit}
                            >
                                <div className=" mb-3">
                                    <label
                                        htmlFor="book-name"
                                        className=" form-label"
                                    >
                                        Selected Book
                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        value={
                                            selectedBook
                                                ? selectedBook.title
                                                : ""
                                        }
                                        disabled
                                        className=" form-control flex-grow-1 border rounded mb-2"
                                    />
                                    <label
                                        htmlFor="book-id"
                                        className=" form-label"
                                    >
                                        Enter Borrower name:
                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        name="borrower_name"
                                        value={formData.borrower_name}
                                        onChange={handleBorrowerDataInput}
                                        className=" form-control flex-grow-1 border rounded mb-2"
                                    />
                                    <label
                                        htmlFor="book-id"
                                        className=" form-label"
                                    >
                                        Enter Contact no:
                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleBorrowerDataInput}
                                        className=" form-control flex-grow-1 border rounded mb-2"
                                    />
                                    <label
                                        htmlFor="book-due"
                                        className=" form-label"
                                    >
                                        Select Due Date:
                                    </label>
                                    <br />
                                    {/* <input type="datetime" name="" id="" /> */}
                                    <input
                                        type="date"
                                        name="dueDate"
                                        className=" form-select"
                                        value={formData.dueDate}
                                        min={today.toISOString().split("T")[0]}
                                        onChange={handleBorrowerDataInput}
                                    />
                                </div>
                                <div className=" d-flex justify-content-between">
                                    <Button
                                        variant="primary"
                                        onClick={handleSetDefault}
                                    >
                                        Back
                                    </Button>
                                    <Button variant="success" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

const AddAdmins  = () => {
    const { showToast } = useToast();
    const [formInputs, setFormInputs] = useState({name:'',email:'',password:'',role:''});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const validate = () => {
        const name = formInputs.name.trim();
        const email = formInputs.email.trim();
        const password = formInputs.password;
      
        if (!name) return "Name is required";
      
        if (!/^[a-zA-Z\s]{3,50}$/.test(name)) {
          return "Name must be 3–50 characters (letters only)";
        }
      
        if (!email) return "Email is required";
      
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Invalid email format";
      
        if (!password) return "Password is required";
      
        if (password.length < 6) return "Password must be at least 6 characters";
      
        // optional stronger rule
        if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
          return "Password must include 1 uppercase & 1 number";
        }
      
        if (!formInputs.role) return "Role is required";
      
        return null;
      };
    const handleInputForm =(e)=>{
        const {name,value}= e.target;

        setFormInputs(prev=>({...prev,[name]:value }));
    }
    


    const handleFormSubmit=async (e)=>{
        e.preventDefault();

        const validationError = validate();
        if (validationError) {
          return showToast(validationError, "danger");
        }
      
        try {
            setLoading(true);
            setError("");
            console.log(formInputs);
            console.log({email: formInputs.email.toLowerCase(), 
                name: formInputs.name.toLowerCase(),})
            // return 
            const {data}=await API.post("/api/admin/register", {
                ...formInputs,
                email: formInputs.email.toLowerCase(), 
                name: formInputs.name.trim(),
              });
            
              if(data.success){
               showToast(data.message,"success")
                handleFormReset();
              }
            
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
    }


    const handleFormReset=()=>{
        setFormInputs({name:'',email:'',password:'',role:''});
    
        setError("");
    }

    useEffect(() => {
        if (error) alert(error);
      }, [error]);

    return ( <section className="text-light">
        <h3>Add Admin:</h3>
        <section className=" border rounded  p-3">
           <form className="" onSubmit={handleFormSubmit}>
            <label className=" form-label" >Enter Name :</label>
            <input  type="text" name="name" value={formInputs.name} className=" form-control" onChange={handleInputForm}/>
            <label className=" form-label" >Enter Email :</label>
            <input type="email" name="email" value={formInputs.email} className=" form-control" onChange={handleInputForm}/>
            <label className=" form-label" >Enter Password :</label>
            <input type="password" name="password" value={formInputs.password} className=" form-control"onChange={handleInputForm}/>
            <label className=" form-label"> Select Role :</label>
            <select name="role" className=" form-select" onChange={handleInputForm}>
  
            <option value="">Select Role</option>
  <option value="admin">Admin</option>
  <option value="super_admin">Super Admin</option>
</select>
           
           
            <div className=" mt-3 d-flex justify-content-between">
            <Button
              variant="warning"
              onClick={handleFormReset}
              disabled={loading}
            >
              Clear
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Submit"}
            </Button> </div>
           </form>
        </section>
    </section> );
}

const VerifyPage=()=>{
 const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setAccessToken, setUser }=useContext(AuthContext)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(otp);
    
    if (!otp.trim()) {
      return setError("OTP is required");
    }

    if (otp.length < 4) {
      return setError("Enter valid OTP");
    }
    try {
        setLoading(true);
        setError("");
  
        const email = localStorage.getItem("loginEmail");
        console.log(email);
        
        const {data} = await API.post("/api/admin/verify", {
          otp,email
        });

        if(data.success){
            setAccessToken(data.token);

                setUser(data.user);
                API.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${data.token}`;
                console.log(data.success);
                setOtp("");
                localStorage.clear();
                navigate("/admin-page");
        }
        // store token (or rely on cookie if using httpOnly)
        // localStorage.setItem("accessToken", data.token);
  
  
      } catch (err) {
        setError(err?.response?.data?.message || "OTP verification failed");
      } finally {
        setLoading(false);
      }
    };

    return (
        <section className="d-flex justify-content-center mt-5">
          <div className="p-4 border rounded bg-dark text-light text-center">
            <h4>Verify OTP</h4>
    
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="form-control text-center mb-3"
                placeholder="Enter OTP"
              />
    
              {error && <p className="text-danger">{error}</p>}
    <div className=" d-flex justify-content-between">
        <Button onClick={()=>navigate('/admin-login')}>Back</Button>
              <Button type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Verify"}
              </Button>
    </div>
            </form>
            <p className="mt-3 text-warning" style={{ fontSize: "14px" }}>
          Note: OTP is valid for a limited time. Please check your email and enter it correctly.
        </p>
      </div>
    </section>
  );
}
 



export { BookUpdates, BorrowUpdates, AddAdmins, VerifyPage };
