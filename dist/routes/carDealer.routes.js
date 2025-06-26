"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carDealer_controller_1 = require("../controllers/carDealer.controller");
const router = (0, express_1.Router)({ mergeParams: true });
router.route('/')
    .get(carDealer_controller_1.getAllCarDealers)
    .post(carDealer_controller_1.createCarDealer);
router.route('/:id')
    .get(carDealer_controller_1.getDealerById)
    .put(carDealer_controller_1.updatedCarDealer)
    .delete(carDealer_controller_1.deleteDealerById);
exports.default = router;
