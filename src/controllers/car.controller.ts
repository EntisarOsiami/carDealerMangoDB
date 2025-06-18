import { Request, Response } from 'express';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';
import carCollection from '@/models/car.model';

// controller for cars {create, get all, get by id, update, delete,get by dealerId, get by carMakerId, get by dealerId and carMakerId}

// create a new car {dealerId, carMakerId, name, year, price,color, wheelsCount}
export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { dealerId, carMakerId, name, year, price, color, wheelsCount } =
      req.body;

    if (
      !dealerId ||
      !carMakerId ||
      !name ||
      !year ||
      !price ||
      !color ||
      !wheelsCount
    ) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'All fields are required',
      });
      return;
    }

    const car = {
      dealerId,
      carMakerId,
      name,
      year,
      price,
      color,
      wheelsCount,
    };
    carCollection.insertOne(car);

    res.status(CREATED).json({
      success: true,
      data: car,
    });

  } catch (error) {
    console.error('Error in createCar:', error);
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create car',
    });
  }
};


// get all cars
export const getAllCars = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
     const cars = await carCollection.find();
    res.status(OK).json({
      success: true,
      data: cars,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get all cars',
    });
  }
};

// get car by id
export const getCarById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const car = await carCollection.findById(id);

    if (!car) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car not found',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get car by id',
    });
  }
};

// update car by id
export const updateCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedCar = await carCollection.findByIdAndUpdate(id, data, { new: true });

    if (!updatedCar) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car not found',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: updatedCar,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update car',
    });
  }
};

// delete car by id
export const deleteCarById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await carCollection.findByIdAndDelete(id);

    if (!deleted) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car not found',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      message: 'Car deleted successfully',
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete car',
    });
  }
};

// get cars by dealerId
export const getCarsByDealerId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { dealerId } = req.params;
    const cars = carStore.getCarsByDealerId(dealerId);

    if (cars.length === 0) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'No cars found for this dealer',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: cars,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to get cars by dealerId',
    });
  }
};

// get cars by carMakerId
export const getCarsByCarMakerId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { carMakerId } = req.params;
    const cars = carStore.getCarsByCarMakerId(carMakerId);

    if (cars.length === 0) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'No cars found for this car maker',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: cars,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to get cars by carMakerId',
    });
  }
};

// get cars by dealerId and carMakerId
export const getCarsFiltered = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { dealerId, carMakerId } = req.params;
    const cars = carStore.getCarsFiltered(dealerId, carMakerId);

    if (cars.length === 0) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'No cars found',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: cars,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to get cars',
    });
  }
};

