import Comment from '../models/commentModel.js';
import asyncHandler from '../middleware/asyncHandler.js';



const createComment = asyncHandler (async (req, res) => {
    try {
        const { content, postId, userId } = req.body;
    
        if (userId !== req.user.id) {
            res.status(403);
            throw new Error('You are not allowed to create this comment')
        }
    
        const newComment = new Comment({
          content,
          postId,
          userId,
        });
        await newComment.save();
    
        res.status(200).json(newComment);
      } catch (error) {
        res.status(404);
        throw new Error('Error, Comment not created')
      }
});


export {
    createComment
}