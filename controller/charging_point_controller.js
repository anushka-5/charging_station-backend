import ChargingPoint from "../models/charging_point_model.js";

export const getChargingPoints = async (req, res) => {
    try {
        const userId = req.user._id;
        const chargingPoints = await ChargingPoint.find({ user: userId });
        
        res.status(200).json(chargingPoints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getChargingPointById = async (req, res) => {
    const { id } = req.params;
    try {
        const chargingPoint = await ChargingPoint.findById(id);
        if (!chargingPoint) {
            return res.status(404).json({ message: "Charging point not found" });
        }
        res.status(200).json(chargingPoint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createChargingPoint = async (req, res) => {
    const { name, latitude, longitude, status, powerOutput, connectorType } = req.body;
    const userId = req.user._id;

    console.log("Received createChargingPoint request:");
    console.log("Request body:", req.body);
    console.log("User ID:", userId);

    try {
        const newChargingPoint = new ChargingPoint({
            name,
            latitude,
            longitude,
            status,
            powerOutput,
            connectorType,
            user: userId, // Associate with the user
        });

        const savedChargingPoint = await newChargingPoint.save();

        console.log("Charging point saved successfully:", savedChargingPoint);

        res.status(201).json(savedChargingPoint);
    } catch (error) {
        console.error("Error creating charging point:", error.message);
        res.status(400).json({ message: error.message });
    }
};

export const updateChargingPoint = async (req, res) => {
    const { id } = req.params;
    const { name, latitude, longitude, status, powerOutput, connectorType } = req.body;

    try {
        const updatedChargingPoint = await ChargingPoint.findByIdAndUpdate(
            id,
            { name, latitude, longitude, status, powerOutput, connectorType },
            { new: true, runValidators: true }
        );

        if (!updatedChargingPoint) {
            return res.status(404).json({ message: "Charging point not found" });
        }

        res.status(200).json(updatedChargingPoint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteChargingPoint = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedChargingPoint = await ChargingPoint.findByIdAndDelete(id);
        if (!deletedChargingPoint) {
            return res.status(404).json({ message: "Charging point not found" });
        }
        res.status(200).json({ message: "Charging point deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFilteredChargingPoints = async (req, res) => {
    try {
        const userId = req.user._id;

        const { status, powerOutput, connectorType } = req.query;

        const filter = { user: userId };

        if (status) {
            filter.status = status;
        }

        if (powerOutput) {
            // Convert to number for proper matching
            filter.powerOutput = Number(powerOutput);
        }

        if (connectorType) {
            filter.connectorType = connectorType;
        }

        const chargingPoints = await ChargingPoint.find(filter);

        res.status(200).json(chargingPoints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const ChargingPointController = {
    getChargingPoints,
    getChargingPointById,
    createChargingPoint,
    updateChargingPoint,
    deleteChargingPoint,
    getFilteredChargingPoints
};

export default ChargingPointController;
