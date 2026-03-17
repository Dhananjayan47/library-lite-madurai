import { Carousel, Image } from "react-bootstrap";

const AboutPage = () => {
    return (
        <>
            <section>
                <section>
                    <h3>About us</h3>
                    <div className=" mb-2 flex-center flex-column ">
                      <Image rounded src="\photos\IMG-20260208-WA0022.jpg"/>
                      <h6>Central Library</h6>
                    </div>
                    <div>
                        <p>
                            The <b> District Central Library</b> in Simmakkal, Madurai,
                            is a well-regarded, long-standing public institution
                            that is <b> 74 years old</b>. Located at <u> No. 33–35, Thiru Vi
                            Ka Salai, near the Simmakkal Bus Stop,
                            Madurai-625001</u>, it remains a popular and accessible
                            study spot in the heart of the city. The library
                            serves as a key resource for competitive exam
                            preparation such as <b> TANCET and MBA </b>and offers a
                            quiet atmosphere for studying. Some reports suggest
                            that it could benefit from better maintenance of its
                            space, updated book collections, older book editions
                            being a concern, and limited borrowing options.
                        </p>
                    </div>
                </section>
                <section className=" my-3">
                    <h4 className=" mb-3">Library Facilities</h4>
                    <div>
                        <p>
                            This district-level library offers a peaceful and
                            well-equipped environment for readers, students, and
                            competitive exam aspirants. It provides seating
                            capacity for up to 50 people, allowing visitors to
                            either borrow library books or bring their own books
                            for reading.
                        </p>
                        <p>
                            The library houses a{" "}
                            <b> large and diverse collection of books</b>,
                            including school textbooks, reference materials,
                            general knowledge books, and resources for
                            competitive examinations. <br /> A{" "}
                            <b>
                                separate section is dedicated to school students
                            </b>
                            , ensuring easy access to curriculum-based learning
                            materials in an organized manner.
                        </p>
                        <p>
                            The reading hall is{" "}
                            <b> well-ventilated and equipped with fans</b>,
                            creating a comfortable atmosphere for long study
                            hours. <br />
                            Clean and accessible <b>toilet facilities</b> are
                            available for visitors.
                        </p>
                        <p>
                            As a district-level library, it supports
                            <b>
                                {" "}
                                students, job seekers, and competitive exam
                                aspirants
                            </b>
                            , making it a valuable learning center for the
                            community.
                        </p>
                    </div>
                </section>
                <section>
                    <Carousel className=" hero-carousel">
                      
                      <Carousel.Item>
                        <div className=" carousel-img-wrapper">
                          <img src="\photos\IMG-20260208-WA0023.jpg" alt="" />
                        </div>
                      </Carousel.Item>
                      <Carousel.Item>
                        <div className=" carousel-img-wrapper">
                          <img src="\photos\IMG-20260208-WA0026.jpg" alt="" />
                        </div>
                      </Carousel.Item>
                      <Carousel.Item>
                        <div className=" carousel-img-wrapper">
                          <img src="\photos\IMG-20260208-WA0025.jpg" alt="" />
                        </div>
                      </Carousel.Item>
                      <Carousel.Item>
                        <div className=" carousel-img-wrapper">
                          <img src="\photos\IMG-20260208-WA0024.jpg" alt="" />
                        </div>
                      </Carousel.Item>
                    </Carousel>
                </section>
            </section>
        </>
    );
};

export default AboutPage;
