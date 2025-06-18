import { Request, Response } from "express"
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from "../utils/http-status"

// controllers for managing car makers {create, get all, get by id, update, delete}

// controller for creating a new car maker{country, brand}
export const createCarMaker = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { country, brand , name} = req.body

    if (!country || !brand) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: "all fields are required",
      })
      return
    }

    const carMaker = carMakerStore.createCarMaker({ country, brand ,name})
    res.status(CREATED).json({
      success: true,
      data: carMaker,
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create car maker",
    })
  }
}

// controller for getting all car makers
export const getCarMakers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const carMakers = carMakerStore.getAllCarMakers()
    res.status(OK).json({
      success: true,
      data: carMakers,
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch car makers",
    })
  }
}
  
// controller for getting a car maker by id from carMakerStore
export const getCarMakerByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
   const {id} = req.params
    const carMaker = carMakerStore.getCarMakerByID(id)
    if (!carMaker) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "car Maker not found",
      })
      return
    }
    res.status(OK).json({
      success: true,
      data: carMaker,
    })
    return
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch carMaker",
    })
  }
}

// controller for updating a car maker by id from carMakerStore
export const updateCarMaker = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const carMaker = carMakerStore.updateCarMaker(req.params.id, req.body)
    if (!carMaker) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "car maker not found",
      })
      return
    }
    res.status(OK).json({
      success: true,
      data: carMaker,
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to update list",
    })
  }
}
// controller for deleting a car maker by id from carMakerStore
export const deleteCarMaker = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleted = carMakerStore.deleteCarMaker(req.params.id)
    if (!deleted) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "car maker not found",
      })
      return
    }
    res.status(OK).json({
      success: true,
      message: "Car maker deleted successfully",
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete the car maker",
    })
  }
}

