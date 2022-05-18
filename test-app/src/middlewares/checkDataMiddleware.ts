import { NextFunction, Response } from 'express';

import { ErrorHandler } from '../errorHandler';
import { IRequestExtended } from '../interface';

class CheckDataMiddleware {
    public async checkDataValidation(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const dataValidation = req.chosenValidationData;

            const { value, error } = dataValidation.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const checkDataMiddleware = new CheckDataMiddleware();
