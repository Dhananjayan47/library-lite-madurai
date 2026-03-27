import { Router } from "express";
import { getChartData, getDataForReports } from "../controllers/report.controllers.js";

const router = Router();

router
     .route('/')
     .get(getDataForReports);

router
     .route('/charts')
     .get(getChartData)


export default router;