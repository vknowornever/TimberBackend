import { NextFunction, Request, Response } from "express";
import Customer from "../models/customer.model";
export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error: any) {
      if (error?.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Customer with this email already exists"
      });
    }

    next(error);
  }
};

export const getAllCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search as string;

    const query: any = {};

    // 🔍 Search by name/email/phone
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ];
    }

    const [customers, total] = await Promise.all([
      Customer.find(query)
        .sort({ createdDate: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Customer.countDocuments(query)
    ]);

    res.json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: customers
    });
  } catch (error) {
    next(error);
  }
};