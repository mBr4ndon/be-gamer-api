import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateAwardController } from './controllers/CreateAwardController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuth } from './middlewares/ensureAuth';
import { ListAwardsUserReceiverController } from './controllers/ListAwardsUserReceiverController';
import { ListAwardsUserSenderController } from './controllers/ListAwardsUserSenderController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUsersController } from './controllers/ListUsersController';

const router = Router();

// Import Controllers
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createAwardController = new CreateAwardController();
const listAwardsUserReceiverController = new ListAwardsUserReceiverController();
const listAwardsUserSenderController = new ListAwardsUserSenderController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post('/api/users', createUserController.handle);
router.post('/api/tags', ensureAuth, ensureAdmin, createTagController.handle);
router.post('/api/login', authenticateUserController.handle);
router.post('/api/awards', ensureAuth, createAwardController.handle);

router.get('/api/awards/receiver', ensureAuth, listAwardsUserReceiverController.handle);
router.get('/api/awards/sender', ensureAuth, listAwardsUserSenderController.handle);
router.get('/api/tags', ensureAuth, listTagsController.handle);
router.get('/api/users', ensureAuth, listUsersController.handle);

export { router };