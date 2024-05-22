import express from 'express';
import {
    register,
    login,
    logout,
    getUsers,
    getUserProfile,
    updateUserProfile,
    updloadAvatar,
    deleteUser,
    getUserById,
    getUsersDashboard
} from '../controllers/userController.js';
import {protect, admin} from '../middleware/authMiddleware.js';
import checkObjectId from "../middleware/checkObjectId.js"

const router = express.Router();


router.route('/').get(protect, admin, getUsers)
router.route('/login').post(login);
router.route('/register').post(register);
router.route('/logout').post(logout);
router.route('/uploadavatar').put(protect,  updloadAvatar);
router.route('/dashboard').get(protect, admin, getUsersDashboard);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/:id')
  .delete(protect, checkObjectId, deleteUser)
  .get(protect, checkObjectId, getUserById)



export default router;