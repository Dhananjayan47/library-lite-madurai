import { Spinner } from "react-bootstrap";

const Loading = () => {
    return ( <>
    <section className=" flex-center">

    <div className="flex-center">
        <Spinner/>
    </div>
    </section>
    </> );
}
 
export default Loading;