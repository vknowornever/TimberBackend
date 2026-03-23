import { Request, Response, NextFunction } from "express";
import JobCard from "../models/jobCard.model";

export const createJobCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
   try {
    const jobCard = await JobCard.create(req.body);

    res.status(201).json({
      success: true,
      data: jobCard
    });
  } catch (error) {
    next(error);
  }
};

export const updateJobCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await JobCard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Job card not found"
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

export const getJobCardsByProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
   try {
    const jobCards = await JobCard.find({
      project: req.params.projectId
    })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: jobCards.length,
      data: jobCards
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJobCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await JobCard.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Job card not found"
      });
    }

    res.json({
      success: true,
      message: "Job card deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const uploadJobCardFiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as Express.Multer.File[];

    const filePaths = files.map(
      (file) => `/uploads/${file.filename}`
    );

    const updated = await JobCard.findByIdAndUpdate(
      req.params.id,
      {
        $push: { referenceImages: { $each: filePaths } }
      },
      { new: true }
    );

    res.json({
      success: true,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};