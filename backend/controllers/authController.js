import User from "../models/userModel.js";
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';


//@desc     Login User
//@route    POST /api/auth/login
//@access   Public
const login = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(401);
        throw new Error("Email ou mot de passe invalide");
    };
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
        generateToken(res, user._id);
        
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        res.status(400);
        throw new Error("Information invalide");
    };

});

//@desc     Logout / Clear the cookie
//@route    POST /api/auth/logout
//@access   Private
const logout = asyncHandler(async(req, res)=>{
    res.cookie('jwt', ' ', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({
        msg: "Déconnecté avec succès"
    })
});

//@desc     Register User with google
//@route    POST /api/auth/google
//@access   Public
const google = asyncHandler(async(req, res)=>{
    const {email, name, googlePhotoUrl} = req.body;

    try {
        const user = await User.findOne({email});

        if(user){
            generateToken(res, user._id);

            const {password, ...rest} = user._doc;
            res.status(200).json(rest);
        }else{
            const generatedPassword = 
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

            const newUser = new User({
                name: 
                    name.toLowerCase().split(' ').join('') +
                    Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl
            });

            await newUser.save();
            generateToken(res, user._id);
            const {password, ...rest} = user._doc;
            res.status(201).json(rest)
        }
    } catch (error) {
        res.status(400);
        throw new Error("Une erreur s'est produite avec google");
    }
});


export {
    login,
    register,
    logout,
    google
};