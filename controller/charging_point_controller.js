import ChargingPoint from "../models/charging_point_model.js";

export const getChargingPoints = async (req, res) => {
    try {
        const chargingPoints = await ChargingPoint.find();
        res.status(200).json(chargingPoints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
}

export const createChargingPoint = async (req, res) => {
    const { name, location, status } = req.body;
    const newChargingPoint = new ChargingPoint({ name, location, status });

    try {
        const savedChargingPoint = await newChargingPoint.save();
        res.status(201).json(savedChargingPoint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateChargingPoint = async (req, res) => {
    const { id } = req.params;
    const { name, location, status } = req.body;

    try {
        const updatedChargingPoint = await ChargingPoint.findByIdAndUpdate(
            id,
            { name, location, status },
            { new: true, runValidators: true }
        );

        if (!updatedChargingPoint) {
            return res.status(404).json({ message: "Charging point not found" });
        }

        res.status(200).json(updatedChargingPoint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

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
}

const ChargingPointController = {
    getChargingPoints,
    getChargingPointById,
    createChargingPoint,
    updateChargingPoint,
    deleteChargingPoint
};

export default ChargingPointController;