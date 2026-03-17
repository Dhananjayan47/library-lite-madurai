import { Accordion,Button } from "react-bootstrap";
import { useState } from "react";
const Footer = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputs=(e)=>{
        setInputValue(e.target.value)
    }
    return (
        <section className=" bg-dark d-flex flex-column row-gap-2">
            <section className=" pt-2">
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Timing info</Accordion.Header>
                        <Accordion.Body>
                           Timing <br />
                           Morning 8AM to Night 8PM

                           * Holiday for All Fridays & Government Holiday 
                        </Accordion.Body>
                    </Accordion.Item>
                   
                </Accordion>
            </section>
            <section className=" p-3 rounded ">
                <section className=" d-flex flex-column  flex-md-row column-gap-3">
                    <div className="text-light p-2 ">
                        <h4>Address</h4>
                        <p>
                            {" "}
                            No. 33–35, Thiru Vi Ka Salai, near the Simmakkal Bus
                            Stop,
                            <br /> Madurai-625001
                        </p>
                    </div>
                    <div className="container">
                            <div className="row ">
                                <div className="col-12 col-md-6 col-lg-4 ">
                                    <form className=" bg-dark text-light rounded">
                                        <div className=" mb-3">
                                            <label
                                                htmlFor="feedback-area"
                                                className=" form-label"
                                            >
                                                <h4>Feedback</h4>
                                            </label>
                                            <br />
                                            <textarea
                                                rows='5'
                                                value={inputValue}
                                                name="feedback"
                                                onChange={handleInputs}
                                                id="feedback-area"
                                                className=" form-control flex-grow-1 border rounded mb-2"
                                            />
                                            <p>Character count: {inputValue.length === 0 ? 'Type feedback': inputValue.length} </p>
                                          
                                        
                                        </div>
                                        <div className=" d-flex justify-content-between">

                                        
                                        <Button variant="success" type="submit">Submit</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                </section>
            </section>
        </section>
    );
};

export default Footer;
