import { Request, Response } from "express"
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from "../utils/http-status"
import carMakerCollection from "../models/carMake.model"


export const createCarMaker = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {  brand , name} = req.body

    if (!name || !brand) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: "all fields are required",
      })
      return
    }
    const data ={
      
      brand,
      name
    }

    const carMaker = await carMakerCollection.insertOne(data)
    if (!carMaker) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: "Failed to create car maker",
      })
      return
    }
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

export const getCarMakers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const carMakers = await carMakerCollection.find()
    if (carMakers.length === 0) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "No car makers found",
      })
      return
    }
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
  
export const getCarMakerByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
   const {id} = req.params
    const carMaker = await carMakerCollection.findById(id)
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

export const updateCarMaker = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { country, brand, name } = req.body  
    const { id } = req.params
    const data = {
      country,
      brand,
      name
    }
    const carMaker =  await carMakerCollection.findByIdAndUpdate(id, data, {
      new: true,})
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
export const deleteCarMaker = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const deleted =  await carMakerCollection.findByIdAndDelete(id)
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

