import bcrypt from 'bcrypt';
import { IUser } from '../entity';
import { CONSTANTS } from '../constants';
import { userRepository } from '../repository';

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
