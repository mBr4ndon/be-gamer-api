import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';

const router = Router();

// Import Controllers
const createUserController = new CreateUserController();

router.post('/api/users', createUserController.handle);

export { router };