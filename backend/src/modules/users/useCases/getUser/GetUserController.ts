import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserUseCase } from './GetUserUseCase';

export class GetUserController {
    async handler(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const getUser = container.resolve(GetUserUseCase);

        const user = await getUser.execute(id);

        return res.status(200).json(user);
    }
}
