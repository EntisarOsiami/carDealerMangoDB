"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConnection = databaseConnection;
const mongoose_1 = __importDefault(require("mongoose"));
const uri = "mongodb+srv://HiFiTest:root@cluster0.m3m5sfk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
async function databaseConnection() {
    try {
        await mongoose_1.default.connect(uri);
        if (mongoose_1.default.connection.db) {
            await mongoose_1.default.connection.db.admin().command({ ping: 1 });
        }
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (error) {
        await mongoose_1.default.disconnect();
    }
}
