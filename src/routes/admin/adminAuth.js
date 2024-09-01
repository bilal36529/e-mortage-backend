import signIn from "../../controllers/admin/signin.js";
import signUp from "../../controllers/admin/signup.js";
import express from "express";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);

export default router;