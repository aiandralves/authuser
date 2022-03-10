import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthUserUseCase } from './AuthUserUseCase';

export class AuthUserController {
    async handler(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const authUser = container.resolve(AuthUserUseCase);

        const token = await authUser.execute({
            email,
            password,
        });

        return res.status(201).json(token);
    }
}
