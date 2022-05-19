import { EntityRepository, getManager, Repository } from 'typeorm';
import { IToken, Token } from '../../entity';
import { ITokenRepository } from './tokenRepositoryInterface';
import { ITokenDataToSave } from '../../interface/tokenInterfaces';

EntityRepository(Token);
class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async getTokenByUserId(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }

    public async saveTokenToDB(token: ITokenDataToSave): Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }
}

export const tokenRepository = new TokenRepository();
