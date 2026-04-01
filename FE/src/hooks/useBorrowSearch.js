import { useState } from "react";
import API from "../services/api";
import { borrowService } from "../services/borrowService";


export const useBorrowSearch =()=>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);

    const getRecordsForNotify = async ()=>{
        try {
            setLoading(true);
           
            
            const params = {
                page: 1,
                limit,
                
            };
            const {data}=await borrowService.NotifyTable(params);
            if(data.success){
               
                setTotalPages(data.pagination.totalPages);
                setLimit(data.pagination.limit)
                setRecords(data.borrowRecords)
                console.log(data.borrowRecords);
                
            }
        } catch (error) {
           
            setError("Error When Try to get Alert Records",error)
        } finally{
            
            setLoading(false)
        }
      
    }
    const reset=()=>{
        setLoading(false)
        setError("");
        setRecords(null);
        setPage(1);
        setTotalPages(1);
        setLimit(10);
    }
    return {
        reset,getRecordsForNotify,loading,error,records,page,setPage,totalPages
    }
}