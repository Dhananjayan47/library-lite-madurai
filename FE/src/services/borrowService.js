import API from "./api";

export const borrowService ={
    BorrowReceiveUpdate : async (isbn) => {
        return API.patch(`/api/borrow/${isbn}`)
    },
    NotifyTable: async(params)=>{
        return API.get('/api/borrow/alerts',{params})
    }
}