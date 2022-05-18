import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { userService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class UserMiddleware {
    public async checkIsUserExistByEmail(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const user = await userService.getUserByEmail(req.body.email);

            if (user) {
                next(new ErrorHandler(MESSAGE.USER_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsUserExistById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            if (!id) {
                next(new ErrorHandler(MESSAGE.ID_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            const userFromDB = await userService.getUserById(Number(id));

            if (!userFromDB) {
                next(new ErrorHandler(MESSAGE.NOT_USER, STATUS.CODE_404));
                return;
            }

            req.user = userFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
