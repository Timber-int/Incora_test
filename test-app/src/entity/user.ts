import { Column, Entity } from 'typeorm';

import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';

export interface IUser extends IDefaultValue {
    id: number,
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    password: string;
}

@Entity('users', { database: CONSTANTS.DATA_BASE })
export class User extends DefaultValue implements IUser {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        first_name: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        last_name: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        phone: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        email: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        password: string;
}
