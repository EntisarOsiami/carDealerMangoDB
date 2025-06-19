import { Request, Response } from 'express';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';
import carCollection from '../models/car.model';
import carDealerCollection from '../models/carDealer.model';
import carMakerCollection from '../models/carMake.model';

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
      wheelsCount === undefined
    ) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'All fields are required',
      });
      return;
    }

    const dealerExists = await carDealerCollection.findById(dealerId);
    if (!dealerExists) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'Dealer does not exist',
      });
      return;
    }
    const carMakerExists = await carMakerCollection.findById(carMakerId);

    if (!carMakerExists) {
      res.status(BAD_REQUEST).json({
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

    const car = await carCollection.create(data);
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

export const updateCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedCar = await carCollection.findByIdAndUpdate(id, data, {
      new: true,
    });

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

export const getCarsByDealerId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { dealerId } = req.params;
    const cars = await carCollection.find({ dealerId });
    if (!cars) {
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

export const getCarsByCarMakerId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { carMakerId } = req.params;
    const car = await carCollection.find({ carMakerId });
    if (!car) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'No cars found for this car maker',
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
      error:
        error instanceof Error
          ? error.message
          : 'Failed to get cars by dealerId',
    });
  }
};


