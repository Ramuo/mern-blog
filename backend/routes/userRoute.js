import express from 'express';
import {
    logoutUser,
    getUsers,
    getUserProfile,
    updateUserProfile,
    deleteUser

} from '../controllers/userController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();


router.route('/').post(getUsers)
router.route('/logout').post(logoutUser);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router.route('/:id').delete(protect, deleteUser)



export default router;