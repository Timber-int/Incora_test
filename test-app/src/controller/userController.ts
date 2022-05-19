import { NextFunction, Request, Response } from 'express';

import { passwordService, userService } from '../service';
import { MESSAGE } from '../message';
import { IRequestExtended } from '../interface';
import { IUser } from '../entity';
import { io } from '../app';

class UserController {
    public async createUser(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const user = await userService.createUser(req.body);

            const userWithNormalizeBody = await passwordService.setUserNormalization(user);

            res.json(userWithNormalizeBody);
        } catch (e) {
            next(e);
        }
    }

    public async getUserById(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(Number(id));

            if (user === undefined) {
                res.json(MESSAGE.NOT_USER);
                return;
            }

            const userWithNormalizeBody = await passwordService.setUserNormalization(user);

            res.json(userWithNormalizeBody);
        } catch (e) {
            next(e);
        }
    }

    public async updateUserById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id, first_name: firstName, last_name: lastName } = req.user as IUser;

            await userService.updateUserById(Number(id), req.body);

            await io.on('connection', (socket: any) => {
                socket.broadcast.emit('message:user_update', { message: `Dear user ${firstName} ${lastName} your body has successfully updated` });
            });

            res.json(MESSAGE.USER_UPDATED);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
