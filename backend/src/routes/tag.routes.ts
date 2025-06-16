import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import {
  addTag,
  removeTag,
  getUserTags,
  search,
  popular
} from '../controllers/tag.controller';

const router = express.Router();

router.post('/', authenticate, addTag);
router.delete('/:tagId', authenticate, removeTag);
router.get('/user/:userId', authenticate, getUserTags);
router.get('/search', authenticate, search);
router.get('/popular', authenticate, popular);

export default router;
