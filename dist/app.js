"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const helpers_1 = require("./utils/helpers");
const carDealer_routes_1 = __importDefault(require("./routes/carDealer.routes"));
const carMake_routes_1 = __importDefault(require("./routes/carMake.routes"));
const car_routes_1 = __importDefault(require("./routes/car.routes"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, database_1.databaseConnection)().catch(console.error);
app.use('/api/carDealers', carDealer_routes_1.default);
app.use('/api/carMakers', carMake_routes_1.default);
app.use('/api/cars', car_routes_1.default);
app.get('/', (req, res) => {
    res.status(200).json({ message: 'car dealer api' });
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: `Not Found - ${req.url}`
    });
});
app.listen(helpers_1.port, () => {
    console.log(` Server is running at http://localhost:${helpers_1.port}`);
});
