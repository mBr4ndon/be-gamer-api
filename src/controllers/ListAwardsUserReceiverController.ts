import { Request, Response } from "express";
import { ListAwardsUserReceiverService } from '../services/ListAwardsUserReceiverService';

class ListAwardsUserReceiverController {
    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const service = new ListAwardsUserReceiverService();
        const awards = await service.execute(user_id);
        return res.status(200).json(awards);
    }
}

export { ListAwardsUserReceiverController };