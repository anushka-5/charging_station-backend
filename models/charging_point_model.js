import mongoose from "mongoose";

const chargingPointSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'occupied', 'out_of_service'],
        default: 'available',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ChargingPoint = mongoose.model("ChargingPoint", chargingPointSchema);
export default ChargingPoint;