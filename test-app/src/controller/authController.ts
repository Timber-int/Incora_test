import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interface';
import { passwordService, tokenService, userService } from '../service';
import { IUser } from '../entity';

class AuthController {
    public async login(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { password } = req.body;
            const { password: hashPassword, email, id } = req.user as IUser;

            await userService.comparePassword(password, hashPassword);

            const tokenPair = await tokenService.getTokenPair({ userEmail: email, userId: id });

            const { accessToken, refreshToken } = tokenPair;

            await tokenService.saveTokenToDB({ accessToken, refreshToken, userId: id });

            const userWithNormalizeBody = await passwordService.setUserNormalization(req.user);

            res.json({
                accessToken,
                refreshToken,
                user: userWithNormalizeBody,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
