import Post from '../models/postModel.js';
import asyncHandler from '../middleware/asyncHandler.js';


//@desc     Create Post
//@route    POST /api/posts/create
//@access   Private
const createPost = asyncHandler(async (req, res) => {
    const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');
    
    if(!slug){
        res.status(400);
        throw new Error("Le titre est requis");
    }else{
        const newPost = new Post({
            ...req.body,
            slug,
            userId: req.user.id
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    };
});


//@desc     Get All Posts
//@route    GET /api/posts/getposts
//@access   Public
const getPosts = asyncHandler( async (req, res) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
          ...(req.query.userId && { userId: req.query.userId }),
          ...(req.query.category && { category: req.query.category }),
          ...(req.query.slug && { slug: req.query.slug }),
          ...(req.query.postId && { _id: req.query.postId }),
          ...(req.query.searchTerm && {
            $or: [
              { title: { $regex: req.query.searchTerm, $options: 'i' } },
              { content: { $regex: req.query.searchTerm, $options: 'i' } },
            ],
          }),
        })
          .sort({ updatedAt: sortDirection })
          .skip(startIndex)
          .limit(limit);
    
        const totalPosts = await Post.countDocuments();
    
        const now = new Date();
    
        const oneMonthAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
    
        const lastMonthPosts = await Post.countDocuments({
          createdAt: { $gte: oneMonthAgo },
        });
    
        res.status(200).json({
          posts,
          totalPosts,
          lastMonthPosts,
        });
      } catch (error) {
        throw new Error(" Aucune publication trouvé")
      }
});

//@desc     Delete Post
//@route    DELETE /api/posts/deletepost/:postId/:userId
//@access   Private
const deletePost = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    res.status(403);
    throw new Error('You are not allowed to delete this post');
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    res.status(404);
    throw new Error("Aucune publication trouvé")
  }

});



export {
    createPost,
    getPosts,
    deletePost
}