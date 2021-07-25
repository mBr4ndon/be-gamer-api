import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsService";

class ListTagsController {
    async handle(req: Request, res: Response) {
        const service = new ListTagsService();
        const tags = await service.execute();
        return res.status(200).json(tags);
    }
}

export { ListTagsController };