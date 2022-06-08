import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { CONSTANTS, TokenType } from '../constants';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';
import { ErrorHandler } from '../errorHandler';
import { tokenService, userService } from '../service';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const accessToken = req.get(CONSTANTS.AUTHORIZATION);

            if (!accessToken) {
                next(new ErrorHandler(MESSAGE.NOT_TOKEN, STATUS.CODE_404));
                return;
            }

            const { userEmail, userId } = await tokenService.verifyToken(accessToken, TokenType.ACCESS);

            const tokenPairFromDB = await tokenService.getTokenById(userId);

            if (!tokenPairFromDB) {
                next(new ErrorHandler(MESSAGE.TOKEN_NOT_VALID, STATUS.CODE_401));
                return;
            }

            const userFromDB = await userService.getUserByEmail(userEmail);

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

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const refreshToken = req.get(CONSTANTS.AUTHORIZATION);

            if (!refreshToken) {
                next(new ErrorHandler(MESSAGE.NOT_TOKEN, STATUS.CODE_404));
                return;
            }

            const { userEmail, userId } = await tokenService.verifyToken(refreshToken, TokenType.REFRESH);

            const tokenPairFromDB = await tokenService.getTokenById(userId);

            if (!tokenPairFromDB) {
                next(new ErrorHandler(MESSAGE.TOKEN_NOT_VALID, STATUS.CODE_401));
                return;
            }

            await tokenService.deleteToken(userId);

            const userFromDB = await userService.getUserByEmail(userEmail);

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

    public async checkActionToken(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const actionToken = req.get(CONSTANTS.AUTHORIZATION);

            if (!actionToken) {
                next(new ErrorHandler(MESSAGE.NOT_TOKEN, STATUS.CODE_404));
                return;
            }

            const { userEmail, userId } = await tokenService.verifyToken(actionToken, TokenType.ACTION);

            const actionTokenFromDB = await tokenService.getActionTokenById(userId);

            if (!actionTokenFromDB) {
                next(new ErrorHandler(MESSAGE.TOKEN_NOT_VALID, STATUS.CODE_401));
                return;
            }

            const userFromDB = await userService.getUserByEmail(userEmail);

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

export const authMiddleware = new AuthMiddleware();
