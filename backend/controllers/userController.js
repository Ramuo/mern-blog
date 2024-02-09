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


//@desc     Get All Users
//@route    GET /api/users/getUsers
//@access   Private
const getUsers = asyncHandler(async(req, res)=>{
    if (!req.user.isAdmin) {
        res.status(404);
        throw new Error("You are not allowed to see all users");
      }
      try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
    
        const users = await User.find()
          .sort({ createdAt: sortDirection })
          .skip(startIndex)
          .limit(limit);
    
        const usersWithoutPassword = users.map((user) => {
          const { password, ...rest } = user._doc;
          return rest;
        });
    
        const totalUsers = await User.countDocuments();
    
        const now = new Date();
    
        const oneMonthAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        const lastMonthUsers = await User.countDocuments({
          createdAt: { $gte: oneMonthAgo },
        });
    
        res.status(200).json({
          users: usersWithoutPassword,
          totalUsers,
          lastMonthUsers,
        });
      } catch (error) {
        res.status(404);
        throw new Error("You are not allowed to see all users");
      }
});


//@desc     Get all users
//@route    GET /api/users
//@access   Private/Admin
// const getUsers = asyncHandler(async(req, res) => {
//     const users = await User.find({});

//     res.status(200).json(users);
    
// });


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
    getUsers,
    getUserProfile,
    updateUserProfile,
    getUserById
};
