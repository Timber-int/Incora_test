import { IToken } from '../../entity';
import { ITokenDataToSave } from '../../interface/tokenInterfaces';

export interface ITokenRepository {
    getTokenByUserId(userId: number): Promise<IToken | undefined>
    saveTokenToDB(token: ITokenDataToSave): Promise<IToken>
}
