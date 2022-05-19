import jwt from 'jsonwebtoken';

import { ITokenDataToSave, ITokenPair, IUserPayload } from '../interface/tokenInterfaces';
import { config } from '../config';
import { IToken } from '../entity';
import { tokenRepository } from '../repository';

class TokenService {
    public async getTokenPair(payload: IUserPayload): Promise<ITokenPair> {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY as string, { expiresIn: config.EXPIRES_IN_ACCESS });
        const refreshToken = jwt.sign(payload, config.SECRET_REFRESH_KEY as string, { expiresIn: config.EXPIRES_IN_REFRESH });

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveTokenToDB(token: ITokenDataToSave): Promise<IToken> {
        const { accessToken, refreshToken, userId } = token;
        const tokenFromDB = await tokenRepository.getTokenByUserId(userId);

        if (tokenFromDB) {
            tokenFromDB.accessToken = accessToken;
            tokenFromDB.refreshToken = refreshToken;
            return tokenRepository.saveTokenToDB(tokenFromDB);
        }

        return tokenRepository.saveTokenToDB(token);
    }
}

export const tokenService = new TokenService();
