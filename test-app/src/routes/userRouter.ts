import { NextFunction, Response, Router } from 'express';

import { userController } from '../controller';
import { IRequestExtended } from '../interface';
import { checkDataMiddleware, userMiddleware } from '../middlewares';
import { userBodyValidator, userUpdateValidator } from '../validator';

const router = Router();

router.get('/:id', userController.getUserById);
router.post(
    '/',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationData = userBodyValidator;
        next();
    },
    checkDataMiddleware.checkDataValidation,
    userMiddleware.checkIsEmailUnique,
    userController.createUser,
);

router.put(
    '/:id',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationData = userUpdateValidator;
        next();
    },
    checkDataMiddleware.checkDataValidation,
    userMiddleware.checkIsUserExistById,
    userController.updateUserById,
);

export const userRouter = router;
