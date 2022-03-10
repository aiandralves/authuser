import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { User } from '@modules/users/typeorm/entities/User';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

@injectable()
export class GetUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new AppError('Usuário não existe!');
        }

        return user;
    }
}
