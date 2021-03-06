import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

import { AppError } from '@shared/errors/AppError';
import { routes } from '@shared/routes/users.routes';
import '@shared/typeorm';
import '@shared/container';

export const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    return res.status(500).json({
        status: 'error',
        message: `Internal server error | ${err.message}`,
    });
});
