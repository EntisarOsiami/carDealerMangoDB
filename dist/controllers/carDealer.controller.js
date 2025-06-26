"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDealerById = exports.updatedCarDealer = exports.getDealerById = exports.getAllCarDealers = exports.createCarDealer = void 0;
const http_status_1 = require("../utils/http-status");
const carDealer_model_1 = __importDefault(require("../models/carDealer.model"));
const createCarDealer = async (req, res) => {
    try {
        const { name, email, city } = req.body;
        if (!name || !email || !city) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'all fields are required',
            });
            return;
        }
        const data = {
            name,
            email,
            city,
        };
        const createdDealer = await carDealer_model_1.default.insertOne(data);
        res.status(http_status_1.CREATED).json({
            success: true,
            data: createdDealer,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create car dealer',
        });
    }
};
exports.createCarDealer = createCarDealer;
const getAllCarDealers = async (req, res) => {
    try {
        const dealers = await carDealer_model_1.default.find();
        if (dealers.length === 0) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'No car dealers found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: dealers,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch car dealers',
        });
    }
};
exports.getAllCarDealers = getAllCarDealers;
const getDealerById = async (req, res) => {
    try {
        const { id } = req.params;
        const dealer = await carDealer_model_1.default.findById(id);
        if (!dealer) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car dealer not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: dealer,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch car dealer',
        });
    }
};
exports.getDealerById = getDealerById;
const updatedCarDealer = async (req, res) => {
    try {
        const { name, email, city } = req.body;
        const { id } = req.params;
        const updatedData = {
            name,
            email,
            city,
        };
        const carDealer = await carDealer_model_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
        if (!carDealer) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car dealer not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: carDealer,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update item',
        });
    }
};
exports.updatedCarDealer = updatedCarDealer;
const deleteDealerById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await carDealer_model_1.default.findByIdAndDelete(id);
        if (!deleted) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Failed to delete car dealer',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            message: 'Car dealer deleted successfully',
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete car dealer',
        });
    }
};
exports.deleteDealerById = deleteDealerById;
