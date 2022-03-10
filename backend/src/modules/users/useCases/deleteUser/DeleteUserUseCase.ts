import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IUserRepository } from '@modules/users/repositories/IUserRepository';

@injectable()
export class DeleteUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute(id: string): Promise<void> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new AppError('Usuário não existe!');
        }

        await this.userRepository.delete(id);
    }
}
