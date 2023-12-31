import User from "../models/userModel.js";
import asyncHandler from '../middleware/asyncHandler.js';


//@desc     Login User
//@route    POST /api/auth/login
//@access   Public
const login = asyncHandler(async(req, res)=>{
    res.json('login user');
});

//@desc     Register User
//@route    POST /api/auth/register
//@access   Public
const register = asyncHandler(async(req, res)=>{
    res.json('register user');
});

//@desc     Register User with google
//@route    POST /api/auth/register
//@access   Public
const google = asyncHandler(async(req, res)=>{
    res.json('register with google');
});


export {
    login,
    register,
    google
};