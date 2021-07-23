import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import { router } from './routes';

// Connect with Database
import './database';

const app = express();
// Recognize json
app.use(express.json());
// Insert routes
app.use(router);

// Middleware to catch errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
})

// start server
app.listen(3333, () => console.log("Server is running on PORT 3333..."));