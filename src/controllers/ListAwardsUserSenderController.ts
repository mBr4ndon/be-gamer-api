import { Request, Response } from "express";
import { ListAwardsUserSenderService } from '../services/ListAwardsUserSenderService';

class ListAwardsUserSenderController {
    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const service = new ListAwardsUserSenderService();
        const awards = await service.execute(user_id);
        return res.status(200).json(awards);
    }
}

export { ListAwardsUserSenderController };