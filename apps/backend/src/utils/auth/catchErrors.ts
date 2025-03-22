import express from "express";

type AsyncController = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => Promise<any>;

/**
 * Higher-order function that wraps an asynchronous controller function,
 * providing centralized error handling by passing any errors to the 
 * next middleware in the express chain.
 *
 * @param {AsyncController} controller - The asynchronous controller function to be wrapped.
 * @returns {AsyncController} - A new controller function that handles errors.
 */
const catchErrors =
  (controller: AsyncController): AsyncController =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchErrors;
