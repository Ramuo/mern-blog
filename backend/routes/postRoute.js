import express from 'express';
import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    filterPosts,
} from '../controllers/postController.js';
import {protect, admin} from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';


const router = express.Router();

router.route('/').get(getPosts);
router.route('/create-post').post(protect, admin, createPost);
router.route('/filter-posts').get(filterPosts);
router.route('/:id')
    .get(checkObjectId, getPostById)
    .put(protect, admin, checkObjectId, updatePost)
    .delete(protect, admin, checkObjectId, deletePost);


export default router;