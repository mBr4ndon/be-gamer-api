import { Request, Response } from 'express';
import { CreateTagService } from '../services/CreateTagService';

class CreateTagController {

    async handle(req: Request, res: Response) {
        const { name } = req.body;
        const service = new CreateTagService();
        const tag = await service.execute(name);

        return res.status(201).json(tag);
    }

}

export { CreateTagController };