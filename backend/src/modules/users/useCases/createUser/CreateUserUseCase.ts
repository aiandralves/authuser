import { inject, injectable } from 'tsyringe';
import { compare, hash } from 'bcryptjs';

import { AppError } from '@shared/errors/AppError';

import { IUserDTO } from '@modules/users/dtos/IUserDTO';
import { User } from '@modules/users/typeorm/entities/User';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute({
        name,
        email,
        password,
        confirmPassword,
    }: IUserDTO): Promise<User> {
        const userExists = await this.userRepository.findByEmail(email);

        if (userExists) {
            throw new AppError('Já existe um usuário com esse e-mail!');
        }

        const passwdHash = await hash(password, 8);

        const checkPasswd = await compare(confirmPassword, passwdHash);

        if (!checkPasswd) {
            throw new AppError('Senha informada não confere!');
        }

        const user = await this.userRepository.create({
            name,
            email,
            password: passwdHash,
            confirmPassword: passwdHash,
        });

        return user;
    }
}
