import { EntityRepository, getManager, Repository } from 'typeorm';

import { IUser, User } from '../../entity';
import { IUserRepository } from './userRepositoryInterface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async getUserById(id: number): Promise<IUser | undefined> {
        return getManager().getRepository(User).findOne({ id });
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User).findOne({ email });
    }

    public async updateUserById(id: number, dataToUpdate: Partial<IUser>): Promise<object> {
        return getManager().getRepository(User).update({ id }, dataToUpdate);
    }
}

export const userRepository = new UserRepository();
