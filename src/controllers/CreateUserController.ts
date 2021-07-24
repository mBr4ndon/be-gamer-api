import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {

    async handle(req: Request, res: Response) {
        const { name, email, password, admin } = req.body;
        const service = new CreateUserService();
        const user = await service.execute({ name, email, password, admin });

        return res.status(201).json(user);
    }

}

export { CreateUserController };