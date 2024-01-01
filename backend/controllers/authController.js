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
    const {name, email, password} = req.body;

    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400);
        throw new Error("L'utilistaur existe déjà");
    };

    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        res.status(400);
        throw new Error("Information invalide")
    };

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