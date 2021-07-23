import { Router } from 'express';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ensureAdmin } from './middlewares/ensureAdmin';

const router = Router();

// Import Controllers
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

router.post('/api/users', createUserController.handle);
router.post('/api/tags', ensureAdmin, createTagController.handle);

export { router };