import { Router } from 'express';
import {
  createCarDealer,
  getAllCarDealers,
  getDealerById,
  updatedCarDealer,
  deleteDealerById,
} from '../controllers/carDealer.controller';

const router = Router({ mergeParams: true });



router.route('/')
  .get(getAllCarDealers)
  .post(createCarDealer);
router.route('/:id')
  .get(getDealerById)
  .put(updatedCarDealer)
  .delete(deleteDealerById);


export default router; 