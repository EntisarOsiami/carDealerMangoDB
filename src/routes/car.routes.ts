import { Router } from 'express';
import {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCarById,
  getCarsByCarMakerId,
  getCarsByDealerId,
  getCarsFiltered,
} from '../controllers/car.controller';

const router = Router({ mergeParams: true });

router.route('/').post(createCar).get(getAllCars);

router.route('/maker/:carMakerId').get(getCarsByCarMakerId);
router.route('/dealer/:dealerId').get(getCarsByDealerId);
router.route('/dealer/:dealerId/maker/:carMakerId').get(getCarsFiltered);

router.route('/:id').get(getCarById).put(updateCar).delete(deleteCarById);

export default router;
