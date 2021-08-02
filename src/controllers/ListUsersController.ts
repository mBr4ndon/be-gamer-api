import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";

class ListUsersController {
    async handle(req: Request, res: Response) {
        const service = new ListUsersService();
        const users = await service.execute();
        
        return res.json(users);
    }
}

export { ListUsersController };