import express from 'express';
import {
  createComment,
  getPostComments,
  getCommentById,
  likeComment,
  editComment,
  deleteComment,
  getComments,
} from '../controllers/commentController.js';
import {protect, admin} from '../middleware/authMiddleware.js';
import checkOjectId from '../middleware/checkObjectId.js';

const router = express.Router();


router.route('/create-comment').post(protect, createComment);
router.route('/getComments').get(protect, admin, getComments);
router.route('/getComments/:postId').get(protect, getPostComments);
router.route('/likeComment/:commentId').put(protect, likeComment);
router.route('/editComment/:commentId').put(protect, editComment);
router.route('/deleteComment/:commentId').delete(protect, deleteComment);
router.route('/:id')
  .get(protect, checkOjectId, getCommentById)




export default router;