import express from "express";
import agents from "./routes/AgentRoutes.js";
import hello from "./routes/HelloRoutes.js";

const router = express.Router();

router.use("/", hello);
router.use("/agents", agents);

export default router;
