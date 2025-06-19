import { Request, Response } from 'express';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';
import carDealerCollection from '../models/carDealer.model';

export const createCarDealer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, city } = req.body;

    if (!name || !email || !city) {
      res.status(BAD_REQUEST).json({
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
    const createdDealer = await carDealerCollection.insertOne(data);
    res.status(CREATED).json({
      success: true,
      data: createdDealer,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to create car dealer',
    });
  }
};

export const getAllCarDealers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dealers = await carDealerCollection.find();
    if (dealers.length === 0) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'No car dealers found',
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: dealers,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch car dealers',
    });
  }
};
export const getDealerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const dealer = await carDealerCollection.findById(id);
    if (!dealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car dealer not found',
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: dealer,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch car dealer',
    });
  }
};

export const updatedCarDealer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, city } = req.body;
    const { id } = req.params;
    const updatedData = {
      name,
      email,
      city,
    };
    const carDealer = await carDealerCollection.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
      }
    );
    if (!carDealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car dealer not found',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: carDealer,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update item',
    });
  }
};
export const deleteDealerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await carDealerCollection.findByIdAndDelete(id);
    if (!deleted) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Failed to delete car dealer',
      });
      return;
    }
    res.status(OK).json({
      success: true,
      message: 'Car dealer deleted successfully',
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to delete car dealer',
    });
  }
};
