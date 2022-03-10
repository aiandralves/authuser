import { IUserDTO } from '../dtos/IUserDTO';
import { User } from '../typeorm/entities/User';

export interface IUserRepository {
    create(data: IUserDTO): Promise<User>;

    findByEmail(email: string): Promise<User>;

    findById(id: string): Promise<User>;

    delete(id: string): Promise<void>;
}
