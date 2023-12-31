import express from 'express';
import {
    updateUser,
    deleteUser,
    logoutUser,
    getUsers,
    getUserById
} from '../controllers/userController.js';

const router = express.Router();


router.route('/').post(getUsers)
router.route('/logout').post(logoutUser)
router.route('/:id')
    .put(updateUser)
    .get(getUserById)
    .delete(deleteUser)


export default router;