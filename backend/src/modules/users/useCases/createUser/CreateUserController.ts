import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
    async handler(req: Request, res: Response): Promise<Response> {
        const { name, email, password, confirmPassword } = req.body;

        const createUser = container.resolve(CreateUserUseCase);

        await createUser.execute({
            name,
            email,
            password,
            confirmPassword,
        });

        return res.status(201).send();
    }
}
