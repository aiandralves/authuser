import { Router } from 'express';

import { ensureAuth } from '../middlewares/ensureAuth';

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { AuthUserController } from '@modules/users/useCases/authUser/AuthUserController';
import { DeleteUserController } from '@modules/users/useCases/deleteUser/DeleteUserController';
import { GetUserController } from '@modules/users/useCases/getUser/GetUserController';

export const routes = Router();

const createUser = new CreateUserController();
const authUser = new AuthUserController();
const deleteUser = new DeleteUserController();
const getUser = new GetUserController();

routes.post('/users', createUser.handler);

routes.post('/sessions', authUser.handler);

routes.get('/users/:id', ensureAuth, getUser.handler);

routes.delete('/users/:id', ensureAuth, deleteUser.handler);
