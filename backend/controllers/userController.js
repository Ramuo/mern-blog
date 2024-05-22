import User from "../models/userModel.js";
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import {delete_file, upload_file} from '../utils/cloudinary.js';


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
            isAdmin: user.isAdmin,
            avatar: user.avatar.url
        })
    }else{
        res.status(401);
        throw new Error("Email ou mot de passe invalide");
    };
});

//@desc     Register User
//@route    POST /api/users/register
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
        password,
    });

    if(user){
        generateToken(res, user._id);
        
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            avatar: user.avatar.url
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
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Déconnecté avec succès' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar: user.avatar.url
      });
    } else {
      res.status(404);
      throw new Error('Utilisateur non trouvé');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('Utilisateur non trouvé');
    }
});

//@desc     Upload user avatar
//@route    PUT /api/users/uploadavatar
//@access   Private/admin
const updloadAvatar = asyncHandler(async(req, res) => {
    const avatarResponse = await upload_file(req.body.avatar, "blogapp/avatars");

    if(req?.user?.avatar?.url){
        await delete_file(req?.user?.avatar?.public_id)
    }

    const user = await User.findByIdAndUpdate(req?.user?._id, {
        avatar: avatarResponse,
    });
    
    res.status(200).json({user});
});

// @desc    Delete user account
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      await User.deleteOne({ _id: user._id });
      res.json({ message: "Compte supprimé avec succès" });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('untilisateur inconnu');
  }
});

////////////////Get users for dashboard/////////////
// @desc    Get  users for dashboard
// @route   GET /api/users/dasboard
// @access  Private/Admin
const getUsersDashboard = asyncHandler (async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find().select('-password')
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

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
      users,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    res.status(404);
    throw new Error("une Erreur s'est produite");
  }
})
//////////////////////////////////////////////////////////////////////////

export {
    register,
    login,
    logout,
    getUserProfile,
    updateUserProfile,
    updloadAvatar,
    deleteUser,
    getUsers,
    getUserById,
    getUsersDashboard,
};
