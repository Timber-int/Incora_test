import { Request } from 'express';

import { IUser } from '../entity';

export interface IRequestExtended extends Request {
    chosenValidationData?: any;
    user?: IUser;
}
