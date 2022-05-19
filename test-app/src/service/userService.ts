import bcrypt from 'bcrypt';

import { IUser } from '../entity';
import { CONSTANTS } from '../constants';
import { userRepository } from '../repository';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class UserService {
    public async createUser(data: IUser): Promise<IUser> {
        const { password } = data;

        const hashPassword = await this._hashPassword(password);

        const userWithHashPassword = { ...data, password: hashPassword };

        return userRepository.createUser(userWithHashPassword);
    }

    public async getUserById(id: number): Promise<IUser | undefined> {
        const user = await userRepository.getUserById(id);

        return user;
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        const user = await userRepository.getUserByEmail(email);

        return user;
    }

    public async comparePassword(password: string, hashPassword: string): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hashPassword);

        if (!isPasswordUnique) {
            throw new ErrorHandler(MESSAGE.WRONG_EMAIL_OR_PASSWORD, STATUS.CODE_404);
        }
    }

    public async updateUserById(id: number, dataToUpdate: Partial<IUser>): Promise<object> {
        const { password } = dataToUpdate;

        if (password) {
            dataToUpdate.password = await this._hashPassword(password);
        }

        const user = await userRepository.updateUserById(id, dataToUpdate);

        return user;
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, CONSTANTS.HASH_SALT);
    }
}

export const userService = new UserService();
