import { Button } from "react-bootstrap";
import { useState } from "react";
import { FaEdit, FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
const BookUpdates = () => {
    return ( <section className="bg-dark p-3 text-white rounded mb-3">
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
    </section> );
}
const BorrowUpdates = () => {
    return ( <section className=" bg-light text-dark mb-3">
        <h3>Book Status Updates</h3>
        <div>
            <div className="container d-flex flex-column p-1">
                <div className="row justify-content-center">
                    <p>Borrow update:</p>
                    <div className="col-12 col-md-6 col-lg-4 ">
                        <form className=" bg-dark text-light p-3 rounded">
                            <div className=" mb-3">
                                <label
                                    htmlFor="book-id"
                                    className=" form-label"
                                >
                                    Enter id:
                                </label>
                                <br />
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    className=" form-control flex-grow-1 border rounded mb-2"
                                />
                                <label
                                    htmlFor="book-name"
                                    className=" form-label"
                                >
                                    Enter Book name
                                </label>
                                <br />
                                <input
                                    type="text"
                                    name=""
                                    id=""
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
                                    name=""
                                    id=""
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
                                    name=""
                                    id=""
                                    className=" form-control flex-grow-1 border rounded mb-2"
                                />
                            </div>
                            <div className=" d-flex justify-content-between">
                                <Button variant="primary">
                                    Clear
                                </Button>
                                <Button
                                    variant="success"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container d-flex flex-column p-1">
                <div className="row justify-content-center">
                    <p>Receive update:</p>
                    <div className="col-12 col-md-6 col-lg-4 ">
                        <form className=" bg-dark text-light p-3 rounded">
                            <div className=" mb-3">
                                <label
                                    htmlFor="book-id"
                                    className=" form-label"
                                >
                                    Enter id:
                                </label>
                                <br />
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    className=" form-control flex-grow-1 border rounded mb-2"
                                />
                            </div>
                            <div className=" d-flex justify-content-between">
                                <Button variant="primary">
                                    Clear
                                </Button>
                                <Button
                                    variant="success"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section> );

}

const Notification = () => {
    const [message, setMessage] = useState('');

    const handleMessageInput =(e)=>{
        setMessage(e.target.value);
    }
    const handleSendMessage=()=>{
        // BE for api message send
    }
    return ( <section className="bg-dark p-3 text-white rounded mb-3">
        <h3>Notification</h3>
           <div className=" card bg-dark text-light ">
               <div className="p-0 card-body d-flex flex-column">
                   <label htmlFor="text-msg" className=" form-label">Enter Message Here:</label>
                   <textarea  rows="5" value={message} onChange={handleMessageInput} className=" rounded"></textarea>
               </div>
               <div className=" d-flex justify-content-end mt-2">
                   <Button onClick={handleSendMessage}>Send</Button>
               </div>
           </div>
       </section> );
}
 
 
 

export  {BookUpdates,BorrowUpdates,Notification}