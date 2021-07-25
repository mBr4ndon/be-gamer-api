import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

async function ensureAdmin(req: Request, res: Response, next: NextFunction) {

    const { user_id } = req;
    const usersRepository = getCustomRepository(UsersRepository);

    const { admin } = await usersRepository.findOne({ id: user_id });

    if (admin) {
        return next();
    }

    return res.status(401).json({ error: 'User not allowed to do this operation' });
}

export { ensureAdmin };