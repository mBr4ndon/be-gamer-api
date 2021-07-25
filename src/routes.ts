import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateAwardController } from './controllers/CreateAwardController';
import { ensureAdmin } from './middlewares/ensureAdmin';

const router = Router();

// Import Controllers
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createAwardController = new CreateAwardController();

router.post('/api/users', createUserController.handle);
router.post('/api/tags', ensureAdmin, createTagController.handle);
router.post('/api/login', authenticateUserController.handle);
router.post('/api/awards', createAwardController.handle);

export { router };