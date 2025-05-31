import ChargingPointController from "../controller/charging_point_controller.js";
import express from "express";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

// Define routes for charging points

router.get("/", authMiddleware, ChargingPointController.getChargingPoints);
router.get("/:id", authMiddleware, ChargingPointController.getChargingPointById);
router.post("/", authMiddleware, ChargingPointController.createChargingPoint);
router.put("/:id", authMiddleware, ChargingPointController.updateChargingPoint);
router.delete("/:id", authMiddleware, ChargingPointController.deleteChargingPoint);

export default router;