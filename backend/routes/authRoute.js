import express from 'express';
import {
    login,
    register,
    logout,
    google
} from '../controllers/authController.js'

const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/logout').post(logout);
router.route('/google').post(google);


export default router;