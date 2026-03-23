import { Request, Response, NextFunction } from "express";
import Estimation from "../models/estimation.model";


export const createEstimation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const estimation = await Estimation.create(req.body);

    res.status(201).json({
      success: true,
      data: estimation
    });
  } catch (error) {
    next(error);
  }
};

export const updateEstimation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await Estimation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Estimation not found"
      });
    }

    res.json({
      success: true,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEstimation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await Estimation.findByIdAndDelete(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Not found"
      });
    }

    res.json({
      success: true,
      message: "Deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const uploadFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as Express.Multer.File[];

    const filePaths = files.map(
      (file) => `/uploads/${file.filename}`
    );

    const estimation = await Estimation.findByIdAndUpdate(
      req.params.id,
      {
        $push: { attachments: { $each: filePaths } }
      },
      { new: true }
    );

    res.json({
      success: true,
      data: estimation
    });
  } catch (error) {
    next(error);
  }
};