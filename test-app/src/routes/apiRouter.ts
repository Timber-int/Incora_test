import { NextFunction, Response, Router } from 'express';

import { STATUS } from '../errorCode';
import { userRouter } from './userRouter';
import { IRequestExtended } from '../interface';
import { loginDataValidator } from '../validator';
import { checkDataMiddleware, userMiddleware } from '../middlewares';
import { authController } from '../controller';

const router = Router();

router.use('/users', userRouter);

router.post('/login', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationData = loginDataValidator;
    next();
}, checkDataMiddleware.checkDataValidation, userMiddleware.checkIsUserExist, authController.login);

// @ts-ignore
router.use('*', (err, req, res, next) => {
    res
        .status(err.status || STATUS.CODE_500)
        .json({
            message: err.message,
            data: err.data,
        });
});

export const apiRouter = router;
