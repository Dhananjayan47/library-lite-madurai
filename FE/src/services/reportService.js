import API from "./api";

export const reportService={
    getReportsForCard:async() => {
        return API.get('/api/reports');
    },
    getReportsForChart:async () => {
        return API.get('/api/reports/charts');
    }
    
}