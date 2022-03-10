import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteUserUseCase } from './DeleteUserUseCase';

export class DeleteUserController {
    async handler(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteUser = container.resolve(DeleteUserUseCase);

        await deleteUser.execute(id);

        return res
            .status(200)
            .json({ message: 'Usuário deletado com sucesso!' });
    }
}
