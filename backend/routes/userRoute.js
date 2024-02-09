import express from 'express';
import {
    getUsers,
    getUserProfile,
    updateUserProfile,
    deleteUser

} from '../controllers/userController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();


router.route('/').get(protect, getUsers)
// router.route('/getusers').get(protect, getUsers);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router.route('/:id').delete(protect, deleteUser)



export default router;