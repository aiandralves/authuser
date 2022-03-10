import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/authConfig';

import { AppError } from '@shared/errors/AppError';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

interface IResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

@injectable()
export class AuthUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute({ email, password }): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('E-mail ou senha incorretos!', 401);
        }

        const passwdMatch = await compare(password, user.password);

        if (!passwdMatch) {
            throw new AppError('E-mail ou senha incorretos!', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({ user }, secret, {
            subject: user.id,
            expiresIn: expiresIn,
        });

        const tokenRequest: IResponse = {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };

        return tokenRequest;
    }
}
