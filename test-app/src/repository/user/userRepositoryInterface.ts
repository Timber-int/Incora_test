import { IUser } from '../../entity';

export interface IUserRepository{
    createUser(user: IUser): Promise<IUser>
    getUserById(id: number): Promise<IUser | undefined>
    getUserByEmail(email: string): Promise<IUser | undefined>
    updateUserById(id: number, dataToUpdate: Partial<IUser>): Promise<object>
}
