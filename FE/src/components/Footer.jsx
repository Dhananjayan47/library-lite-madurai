import { Accordion,Button } from "react-bootstrap";
// import { useState } from "react";
const Footer = () => {
    
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
                   
                </section>
            </section>
        </section>
    );
};

export default Footer;
