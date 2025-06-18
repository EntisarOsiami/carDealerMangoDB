import { Request, Response } from "express"
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from "../utils/http-status"

// controller for managing car dealers {create, get all, get by id, update, delete}

// create  a new car dealer {name , email, city}
export const createCarDealer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, city } = req.body

    if (!name || !email || !city) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: "all fields are required",
      })
      return
    }

    const carDealer = carDealerStore.createDealer({ name, email, city })
    res.status(CREATED).json({
      success: true,
      data: carDealer,
    })
    
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create car dealer",
    })
  }
}
// get all car dealers
export const getAllCarDealers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dealers = carDealerStore.getAllDealers()
    res.status(OK).json({
      success: true,
      data: dealers,
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch car dealers",
    })
  }
}
// get a car dealer by id passed from the request params
export const getDealerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dealer = carDealerStore.getDealerById(req.params.id)
    if (!dealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "Car dealer not found",
      })
      return
    }
    res.status(OK).json({
      success: true,
      data: dealer,
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch car dealer",
    })
  }
}

// update a car dealer by id passed from the request params

export const updatedCarDealer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, city } = req.body
    const { id } = req.params
    const findCarDealer = carDealerStore.getDealerById(id)
    if (!findCarDealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "Car dealer not found",
      })
      return
    }

    const updatedData: Partial<Omit<typeof findCarDealer, "id" | "createdAt">> =
      {
        name,
        email,
        city,
      }

    const carDealer = carDealerStore.updateDealerById(id, updatedData)
    if (!carDealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "Failed to update car dealer",
      })
      return
    }

    res.status(OK).json({
      success: true,
      data: carDealer,
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to update item",
    })
  }
}
// delete a car dealer by id passed from the request params
export const deleteDealerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const deleted = carDealerStore.deleteDealerById(id)
    if (!deleted) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "Failed to delete car dealer",
      })
      return
    }
    res.status(OK).json({
      success: true,
      message: "Car dealer deleted successfully",
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete car dealer",
    })
  }
}
