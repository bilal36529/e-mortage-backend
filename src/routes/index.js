import AdminAuthRoutes from "./admin/adminAuth.js";
import express from "express";

const router = express.Router();

router.use("/admin", AdminAuthRoutes);
export default router;