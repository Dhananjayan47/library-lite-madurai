import { Outlet } from "react-router-dom";

const AdminPage = () => {
<<<<<<< HEAD
  return (
    <section className="flex-fill">
      <Outlet />
    </section>
  );
=======
    return (
        <>
            <section>
                <section className=" bg-dark p-1 text-white rounded mb-2">
                    <h3>Book Updates</h3>
                    <div className=" d-flex column-gap-1 p-1">
                        <div className=" card card-body bg-primary text-white d-flex justify-content-center align-items-center">
                            <FaPlus size={25} />
                            <p className=" pt-2"> Add book</p>
                            <Button
                                variant="dark"
                                className=" align-self-stretch"
                            >
                                Add
                            </Button>
                        </div>
                        <div className=" card card-body bg-primary text-white d-flex justify-content-center align-items-center">
                            <FaEdit size={25} />
                            <p className="pt-2"> Edit book</p>
                            <Button
                                variant="dark"
                                className=" align-self-stretch"
                            >
                                Edit
                            </Button>
                        </div>
                        <div className=" card card-body bg-primary text-white d-flex justify-content-center align-items-center">
                            <FaMinus size={25} />
                            <p className="  pt-2"> Delete book</p>
                            <Button
                                variant="dark"
                                className=" align-self-stretch"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </section>
                <section className=" bg-light text-dark mb-2">
                    <h3>Book Status Updates</h3>
                    <div >

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
                                                Enter ISBN:
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

                                        <Button variant="primary">Clear</Button>
                                        <Button variant="success" type="submit">Submit</Button>
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
                                                Enter ISBN:
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

                                        <Button variant="primary">Clear</Button>
                                        <Button variant="success" type="submit">Submit</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
>>>>>>> ca208d97dce73e66a1029c804853498745d059c0
};

export default AdminPage;
