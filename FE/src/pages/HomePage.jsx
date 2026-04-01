
const HomePage = () => {
    return (
        <>
            <section >
                <section>
                    <h1 className=" text-center  text-light">Madurai District Library</h1>
                </section>
                <section className=" border border-2 rounded shadow p-2" >
                    <div className=" img-con">
                        <div className=" img-wrapper">
                            <img src="/logos/FP.jpg"/>
                        </div>
                    </div>
                </section>
                <section className=" my-3">
                    <div className=" text-center text-light">
                        <h5>Key Facilities</h5>
                    </div>
                    <div className=" d-flex flex-wrap row-gap-2 flex-lg-nowrap column-gap-lg-2">
                        <div className=" p-3 bg-dark text-light rounded">
                            <div>
                                <h5>Reading Space</h5>
                            </div>
                            <div>
                                <p>
                                Spacious, peaceful seating for 50 people to read library books or personal books comfortably in a quiet environment.
                                </p>
                            </div>
                        </div>
                        <div className=" p-3 bg-dark text-light rounded">
                            <div>
                                <h5>Book Collection</h5>
                            </div>
                            <div>
                                <p>
                                Extensive district-level collection including school textbooks, reference books, general reading, and competitive exam preparation materials.
                                </p>
                            </div>
                        </div>
                        <div className=" p-3 bg-dark text-light rounded">
                            <div>
                                <h5>Student Section</h5>
                            </div>
                            <div>
                                <p>
                                Separate, well-organized section dedicated to school students with curriculum-based books and helpful learning resources.
                                </p>
                            </div>
                        </div>
                        <div className=" p-3 bg-dark text-light rounded">
                            <div>
                                <h5>Basic Amenities</h5>
                            </div>
                            <div>
                                <p>
                                Well-ventilated reading hall with fans, clean toilet facilities, and a calm, neatly maintained atmosphere for long study hours.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
};

export default HomePage;
