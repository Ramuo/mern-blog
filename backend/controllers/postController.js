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
          user: req.user.id
      });
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
  };
});


// //@desc     Get All Posts
// //@route    GET /api/posts/getposts
// //@access   Public
const getPosts = asyncHandler(async(req, res) => {
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const posts = await Post.find({}).sort({createdAt: sortDirection});
    res.status(200).json(posts);
});

// @desc    Fetch single post
// @route   GET /api/products/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    return res.json(post);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Update Post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const { title, category, image, content} = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    post.title = title;
    post.category = category;
    post.image = image;
    post.content = content;

    const updatedPost = await post.save();

    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Post non trouvé');
  }
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await Post.deleteOne({ _id: post._id });
    res.json({ message: 'Post supprimé' });
  } else {
    res.status(404);
    throw new Error('Post non trouvé');
  }
});

//////////////////////////////////////////////////////////////////
//@desc     Filter accordinly
//@route    GET /api/posts/filter-posts
//@access   Public
const filterPosts = asyncHandler( async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 3;
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
    res.status(404)
    throw new Error("Aucun post trouvé");
  }
});

////////////////////////////////////////////////////////


export {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    filterPosts
}