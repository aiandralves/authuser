import { getRepository, Repository } from 'typeorm';

import { IUserDTO } from '@modules/users/dtos/IUserDTO';
import { User } from '../entities/User';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

export class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.repository.findOne({ email });
    }

    async findById(id: string): Promise<User> {
        return await this.repository.findOne({ id });
    }

    async create({
        name,
        email,
        password,
        confirmPassword,
    }: IUserDTO): Promise<User> {
        const user = this.repository.create({
            name,
            email,
            password,
            confirmPassword,
        });

        return await this.repository.save(user);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
