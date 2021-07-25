import { Request, Response } from "express";
import { CreateAwardService } from '../services/CreateAwardService';

class CreateAwardController {
    async handle(req: Request, res: Response) {
        const { tag_id, user_sender, user_receiver, message } = req.body;

        const service = new CreateAwardService();

        const award = await service.execute({
            tag_id, 
            user_sender, 
            user_receiver, 
            message
        });

        return res.status(201).json(award);
    }
}

export { CreateAwardController };