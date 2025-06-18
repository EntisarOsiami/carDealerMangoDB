import { Router } from "express"
import {
  createCarMaker,
  getCarMakers,
  getCarMakerByID,
  updateCarMaker,
  deleteCarMaker,
} from "../controllers/carMake.controller"

const router = Router()

router.route("/")
.get(getCarMakers)
.post(createCarMaker)
router
  .route("/:id")
  .get(getCarMakerByID)
  .put(updateCarMaker)
  .delete(deleteCarMaker)

export default router
