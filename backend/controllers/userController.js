import User from "../models/userModel.js";
import asyncHandler from '../middleware/asyncHandler.js';


//@desc     Update User
//@route    PUT /api/users/:id
//@access   Private
const updateUser = asyncHandler(async(req, res)=>{
    res.json('update user');
});

//@desc     Delete User
//@route    DELETE /api/users/:id
//@access   Private
const deleteUser = asyncHandler(async(req, res)=>{
    res.json('delete user');
});

//@desc     Logout User
//@route    post /api/users/logout
//@access   Private
const logoutUser = asyncHandler(async(req, res)=>{
    res.json('logout user');
});

//@desc     Get All Users
//@route    GET /api/users
//@access   Private
const getUsers = asyncHandler(async(req, res)=>{
    res.json('get all users');
});

//@desc     Get User by id
//@route    GET /api/users/:id
//@access   Private
const getUserById = asyncHandler(async(req, res)=>{
    res.json('get user by id');
});


export {
    updateUser,
    deleteUser,
    logoutUser,
    getUsers,
    getUserById
};
