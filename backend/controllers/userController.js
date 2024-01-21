import User from "../models/userModel.js";
import asyncHandler from '../middleware/asyncHandler.js';



// @desc      Delete user
// @route     DELETE /api/auth/users/:id
// @access    Private/Admin
const deleteUser = asyncHandler(async(req, res) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        data: {}
    });
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

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    // check if  user
    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(404);
        throw new Error("Utilisateur non trové");
    };
});

//@desc     Update user profile
//@route    PUT /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    //Check if user 
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.image = req.body.image || user.image;
        user.profilePicture = req.body.profilePicture || user.profilePicture;

        //Let's check if in the request sent, if there is a password
        if(req.body.password){
            user.password = req.body.password
        };

        //Save the updated changes
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            image: updatedUser.image,
            profilePicture: updatedUser.profilePicture,
            isAdmin: updatedUser.isAdmin
        });
    }else{
        res.status(404);
        throw new Error("Utilisateur non trové")
    };

});

//@desc     Get User by id
//@route    GET /api/users/:id
//@access   Private
const getUserById = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);

    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            profilePicture: user.profilePicture,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(404);
        throw new Error("Aucun utilisateur trouver")
    }
});


export {
    deleteUser,
    logoutUser,
    getUsers,
    getUserProfile,
    updateUserProfile,
    getUserById
};
