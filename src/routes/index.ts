import { Router } from "express";
import accounts from "./accounts";
import roles from "./roles";

const router = Router();

router.use("/accounts", accounts);

export default router;
