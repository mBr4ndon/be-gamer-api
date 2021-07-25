import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

function ensureAuth(req: Request, res: Response, next: NextFunction) {

    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }
    const token = authToken.split(" ")[1];

    try {
        const { sub } = verify(token, process.env.TOKEN_KEY) as IPayload;

        req.user_id = sub;
        
        return next();
    } catch (err) {
        return res.status(401).end();
    }

}

export { ensureAuth };