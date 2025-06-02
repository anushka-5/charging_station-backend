import mongoose, { connect } from "mongoose";

const chargingPointSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'occupied', 'out_of_service'],
        default: 'available',
    },
    powerOutput: {
        type: Number,
        required: true, 
    },
    connectorType: {
        type: String,
     
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ChargingPoint = mongoose.model("ChargingPoint", chargingPointSchema);
export default ChargingPoint;