import { IUser } from '../entity';

class PasswordService {
    public async setUserNormalization(user: any): Promise<IUser> {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach((field: string) => {
            delete user[field];
        });

        return user;
    }
}

export const passwordService = new PasswordService();
