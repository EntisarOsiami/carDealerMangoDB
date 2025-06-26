"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarsByCarMakerId = exports.getCarsByDealerId = exports.deleteCarById = exports.updateCar = exports.getCarById = exports.getAllCars = exports.createCar = void 0;
const http_status_1 = require("../utils/http-status");
const car_model_1 = __importDefault(require("../models/car.model"));
const carDealer_model_1 = __importDefault(require("../models/carDealer.model"));
const carMake_model_1 = __importDefault(require("../models/carMake.model"));
const createCar = async (req, res) => {
    try {
        const { dealerId, carMakerId, name, year, price, color, wheelsCount } = req.body;
        if (!dealerId ||
            !carMakerId ||
            !name ||
            !year ||
            !price ||
            !color ||
            wheelsCount === undefined) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'All fields are required',
            });
            return;
        }
        const dealerExists = await carDealer_model_1.default.findById(dealerId);
        if (!dealerExists) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'Dealer does not exist',
            });
            return;
        }
        const carMakerExists = await carMake_model_1.default.findById(carMakerId);
        if (!carMakerExists) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'Car maker does not exist',
            });
            return;
        }
        const data = {
            dealerId,
            carMakerId,
            name,
            year,
            price,
            color,
            wheelsCount,
        };
        const car = await car_model_1.default.create(data);
        res.status(http_status_1.CREATED).json({
            success: true,
            data: car,
        });
    }
    catch (error) {
        console.error('Error in createCar:', error);
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create car',
        });
    }
};
exports.createCar = createCar;
const getAllCars = async (req, res) => {
    try {
        const cars = await car_model_1.default.find();
        res.status(http_status_1.OK).json({
            success: true,
            data: cars,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get all cars',
        });
    }
};
exports.getAllCars = getAllCars;
const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await car_model_1.default.findById(id);
        if (!car) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: car,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get car by id',
        });
    }
};
exports.getCarById = getCarById;
const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedCar = await car_model_1.default.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!updatedCar) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: updatedCar,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update car',
        });
    }
};
exports.updateCar = updateCar;
const deleteCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await car_model_1.default.findByIdAndDelete(id);
        if (!deleted) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            message: 'Car deleted successfully',
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete car',
        });
    }
};
exports.deleteCarById = deleteCarById;
const getCarsByDealerId = async (req, res) => {
    try {
        const { dealerId } = req.params;
        const cars = await car_model_1.default.find({ dealerId });
        if (!cars) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'No cars found for this dealer',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: cars,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error
                ? error.message
                : 'Failed to get cars by dealerId',
        });
    }
};
exports.getCarsByDealerId = getCarsByDealerId;
const getCarsByCarMakerId = async (req, res) => {
    try {
        const { carMakerId } = req.params;
        const car = await car_model_1.default.find({ carMakerId });
        if (!car) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'No cars found for this car maker',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: car,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error
                ? error.message
                : 'Failed to get cars by dealerId',
        });
    }
};
exports.getCarsByCarMakerId = getCarsByCarMakerId;
