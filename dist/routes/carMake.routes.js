"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carMake_controller_1 = require("../controllers/carMake.controller");
const router = (0, express_1.Router)();
router.route("/")
    .get(carMake_controller_1.getCarMakers)
    .post(carMake_controller_1.createCarMaker);
router
    .route("/:id")
    .get(carMake_controller_1.getCarMakerByID)
    .put(carMake_controller_1.updateCarMaker)
    .delete(carMake_controller_1.deleteCarMaker);
exports.default = router;
