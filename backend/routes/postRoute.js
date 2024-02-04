import express from 'express';
import {
    createPost,
    getPosts,
    deletePost
} from '../controllers/postController.js';
import {protect, admin} from '../middleware/authMiddleware.js';
// import checkObjectId from '../middleware/checkObjectId.js'


const router = express.Router();

router.route('/createpost').post(protect, admin, createPost);
router.get('/getposts', getPosts);
router.route('/deletepost/:postId/:userId').delete(protect, deletePost)


export default router;