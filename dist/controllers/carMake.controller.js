"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarMaker = exports.updateCarMaker = exports.getCarMakerByID = exports.getCarMakers = exports.createCarMaker = void 0;
const http_status_1 = require("../utils/http-status");
const carMake_model_1 = __importDefault(require("../models/carMake.model"));
const createCarMaker = async (req, res) => {
    try {
        const { brand, name } = req.body;
        if (!name || !brand) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: "all fields are required",
            });
            return;
        }
        const data = {
            brand,
            name
        };
        const carMaker = await carMake_model_1.default.insertOne(data);
        if (!carMaker) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: "Failed to create car maker",
            });
            return;
        }
        res.status(http_status_1.CREATED).json({
            success: true,
            data: carMaker,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to create car maker",
        });
    }
};
exports.createCarMaker = createCarMaker;
const getCarMakers = async (_req, res) => {
    try {
        const carMakers = await carMake_model_1.default.find();
        if (carMakers.length === 0) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: "No car makers found",
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: carMakers,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch car makers",
        });
    }
};
exports.getCarMakers = getCarMakers;
const getCarMakerByID = async (req, res) => {
    try {
        const { id } = req.params;
        const carMaker = await carMake_model_1.default.findById(id);
        if (!carMaker) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: "car Maker not found",
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: carMaker,
        });
        return;
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch carMaker",
        });
    }
};
exports.getCarMakerByID = getCarMakerByID;
const updateCarMaker = async (req, res) => {
    try {
        const { country, brand, name } = req.body;
        const { id } = req.params;
        const data = {
            country,
            brand,
            name
        };
        const carMaker = await carMake_model_1.default.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!carMaker) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: "car maker not found",
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: carMaker,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to update list",
        });
    }
};
exports.updateCarMaker = updateCarMaker;
const deleteCarMaker = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await carMake_model_1.default.findByIdAndDelete(id);
        if (!deleted) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: "car maker not found",
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            message: "Car maker deleted successfully",
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error
                ? error.message
                : "Failed to delete the car maker",
        });
    }
};
exports.deleteCarMaker = deleteCarMaker;
