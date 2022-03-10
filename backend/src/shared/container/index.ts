import { container } from 'tsyringe';

import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { UserRepository } from '@modules/users/typeorm/repositories/UserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
