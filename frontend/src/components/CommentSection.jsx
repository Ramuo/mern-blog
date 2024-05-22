import {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { Button, Textarea, Spinner, Alert } from 'flowbite-react';
import {toast} from "react-toastify";
import CommentItem from "../components/CommetItem";
import Loader from "../components/Loader";

import {
    useCreateCommentMutation,
    useGetPostCommentsQuery,
    useLikeCommentMutation,
    useDeleteCommentMutation
} from "../slices/commentApiSlice";


const CommentSection = ({postId}) => {
    const navigate = useNavigate();

    const {userInfo} = useSelector((state) => state.auth);

    const [description, setDescription] = useState(''); 

    const [createComment, {isLoading: loadingCreate}] = useCreateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();

    const {
        data: comments,
        isLoading: loadingPostComments,
        error: postCommentsError,
        refetch
    } = useGetPostCommentsQuery(postId);

    const [likePost] = useLikeCommentMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createComment({
                postId,
                description,
                // user: userInfo._id
            }).unwrap();
            refetch();
            toast.success("Le post a été crée")
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    //To Handle Like
    const handleLike = async (commentId) => {
        try {
            if(!userInfo){
                navigate('/login')
                return;
            }

            const res = await likePost({commentId});
            comments.map((com) => 
                com._id === commentId ? {
                    ...com,
                    likes: res.likes,
                    numberOfLikes: res.likes.length,
                }: com);
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    const handleEdit = async (comment, editDescription) => {
        comments.map((c) => 
            c._id === comment._id ? {...c, description: editDescription} : c
        );
    }

    //To Delete comment
    const handleDelete = async (id) => {
        if(window.confirm('Êtes-vous sur de supprimer?')){
            try {
                await deleteComment(id);
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error); 
            }
        }
    };



    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {userInfo ? (
                <div className='flex items-center gap-1 my-5 text-gray-200 text-sm'>
                    <p>Connecté en tant que:</p>
                    <img 
                    src={userInfo.avatar} 
                    alt="" className='h-5 w-5 object-cover rounded-full'
                    />
                    <Link to={'/profile'} className='text-xs text-indigo-400 hover:underline'>
                        @{userInfo.name}
                    </Link>
                </div>
            ) : (
                <div className='text-sm text-red-600 my-5'>
                        Connectez-vous pour nous laisser un commentaire
                    <Link to={'/login'} className='text-indigo-700 hover:underline'></Link>
                </div>
            )}

            {userInfo && (
                <form
                className='border border-white rounded-md p-3 bg-slate-950'
                onSubmit={submitHandler}
                >
                    <Textarea
                    placeholder='Commenter...'
                    rows="3"
                    maxLength="200"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className='flex justify-between items-center mt-5'>
                        <p className='text-neutral-content text-xs'>
                            {200 - description.length} Caractères restants 
                        </p>
                        <Button 
                        type='submit'
                        gradientDuoTone='purpleToBlue'
                        >
                            {loadingCreate ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) : (
                                'Envoyer'
                            )}
                        </Button>
                    </div> 
                </form>     
            )}

            {/* CommentItem */}
            {loadingPostComments ? (
                <Loader/>
            ) : postCommentsError ? (
                <Alert color="failure" className='mt-5'>
                    {/* {postCommentsError?.data?.message || postCommentsError.error} */}
                    <p className="text-sm text-gray-700">Pour commenter cet article connecter vous ou créer un compte</p>
                </Alert>
            ) : (
              <div>
                  {comments.length === 0 ? (
                      <p className='text-sm my-5'>Aucun commentaire</p>
                  ) : (
                      <>
                          <div className='text-sm my-5 flex items-center gap-1'>
                              <p>Commentaires</p>
                              <div className="border border-gray-400 py-1 px-2 rounded-sm">
                                  <p>{comments.length}</p>
                              </div>
                          </div>
                      
                          {comments.map((comment) => (
                              <CommentItem 
                              key={comment._id}
                              comment={comment}
                              onLike={handleLike}
                              onEdit={handleEdit}
                              onDelete={handleDelete}
                              />
                          ))}
                      </>
                  )}
              </div>
            ) }
        </div>
    )
};

export default CommentSection;