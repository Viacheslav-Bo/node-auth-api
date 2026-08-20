import type { Request, Response } from "express";
import * as dashboardService from "../services/dashboardService.js";

export const getDashboardData = async (_req: Request, res: Response) => {
  try {
    const data = await dashboardService.getDashboardData();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
