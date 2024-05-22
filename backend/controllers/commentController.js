import Comment from '../models/commentModel.js';
import asyncHandler from '../middleware/asyncHandler.js';


//@desc     Create Comment
//@route    POST /api/comments/create
//@access   Private
const createComment = asyncHandler (async (req, res) => {
    const {postId, description} = req.body;

    const comment = await Comment.create({
      post: postId,
      user: req.user.id,
      description
    });

    if(comment){
      res.status(201).json(comment);
    }else{
      res.status(404);
      throw new Error("La création du poste a échouée")
    };
});

//@desc     Get  Post comments 
//@route    GET/comments/getComments/:postId
//@access   Public
const getPostComments = asyncHandler(async(req, res) => {
  const comments = await Comment.find({post: req.params.postId}).sort('-createdAt');

  if(comments){
      res.status(200).json(comments);
  }else{
      res.status(404);
      throw new Error("Aucun Commentaire trouvé")
  }  
});

//@desc     Get single comment
//@route    GET/comments/:id
//@access   Private
const getCommentById = asyncHandler(async(req, res) => {
  const comment = await Comment.findById(req.params.id);

  if(comment){
      res.status(200).json(comment); 
  }else{
      res.status(404);
      throw new Error(`Aucun Commentaire trouvé avec ce ID: ${req.params.id}`);
  }
});

//@desc     Like comment
//@route    PUT /api/comments/likeComment/:commentId
//@access   Public
const likeComment = asyncHandler( async (req, res) => {
  try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
          res.status(404);
          throw new Error("aucun commentaire trouvé")
      }
      const userIndex = comment.likes.indexOf(req.user.id);
      if (userIndex === -1) {
        comment.numberOfLikes += 1;
        comment.likes.push(req.user.id);
      } else {
        comment.numberOfLikes -= 1;
        comment.likes.splice(userIndex, 1);
      }
      await comment.save();
      res.status(200).json(comment);
    } catch (error) {
      res.status(404);
      throw new Error("Une erreur s'est produite, aucun commentaire trouvé")
    }
});

//@desc     Edit comment
//@route    PUT /api/comments/editComment/:commentId
//@access   Private
const editComment = asyncHandler (async (req, res) => {
  try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
          res.status(404);
          throw new Error("aucun commentaire trouvé")
      }
      if (comment.user.toString() !== req.user.id && !req.user.isAdmin) {
          res.status(401);
          throw new Error("Vous n'êtes pas authorisé à éditer ce commentaire")
      }
  
      const editedComment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        {
          description: req.body.description,
        },
        { new: true }
      );
      console.log(editedComment)

      res.status(200).json(editedComment);
    } catch (error) {
      res.status(404);
      throw new Error("Une erreur s'est produite, pour éditer le commentaire")
    }
})

//@desc     Delete comment
//@route    DELETE /api/comments/deleteComment/:commentId
//@access   Private
const deleteComment = asyncHandler (async (req, res) => {
  try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
          res.status(404);
          throw new Error("aucun commentaire trouvé")
      }
      if (comment.user.toString() !== req.user.id && !req.user.isAdmin) {
          res.status(401);
          throw new Error("Vous n'êtes pas authorisé à supprimer ce commentaire")
      }
      await Comment.findByIdAndDelete(req.params.commentId);
      res.status(200).json('Commentaire a été been supprimé');
    } catch (error) {
      res.status(404);
      throw new Error("Une erreur s'est produite, pour supprimer ce commentaire")
  }
})

//////////ROUTES Related to Dashboard Page///////////
//@desc     Get the last 5 comments
//@route    GET /api/comments/getComments
//@access   Private/admin
const getComments = asyncHandler ( async (req, res ) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0; //to have the page

    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'desc' ? -1 : 1;

    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    res.status(404);
    throw new Error("Une erreur s'est produite")
  }
});






export {
    createComment,
    getPostComments,
    getCommentById,
    likeComment,
    editComment,
    deleteComment,
    getComments,
}