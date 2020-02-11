
import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
const errorMiddleware = (err: HttpException, _req: Request, res: Response, _next: NextFunction) => {
    let result: any = {
        success: false,
        message: err.message
    };
    if (err.errors && Object.keys(err.errors).length > 0) {
        result.errors = err.errors;
    }
    res.status(err.status || INTERNAL_SERVER_ERROR)
        .json(result);
}
export default errorMiddleware;