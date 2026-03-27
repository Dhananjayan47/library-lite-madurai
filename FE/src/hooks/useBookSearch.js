import { useState } from "react";
import API from "../services/api";

export const useBookSearch = ()=>{
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [record, setRecord] = useState(null);

    const searchByIsbn = async (isbn) => {
        if(!isbn.trim()) return;

        setLoading(true);
        try {
            const {data} = await API.get(`/api/books/${isbn}`);
            
            if(data.success){
                setBook(data.book);
            }else{
                setError("Book not found");
            }
        } catch (err) {
            setError("server error :",err);
        } finally{
            setLoading(false)
        }
    };
    const borrowSearchByIsbn = async (isbn) => {
        if(!isbn.trim()) return;

        setLoading(true);
        try {
            const {data} = await API.get(`/api/borrow/${isbn}`);

            if(data.success){
                console.log(data.borrowRecords);
                
                setRecord(data.borrowRecords);
            }else{
                setError("Book not found");
            }
        } catch (err) {
            setError("server error :",err);
        } finally{
            setLoading(false)
        }
    };

    const reset = () => {
        setBook(null);
        setError("");
        setLoading(false);
    };
    return {
        book,loading,error,searchByIsbn,reset,borrowSearchByIsbn,record,
    };
};