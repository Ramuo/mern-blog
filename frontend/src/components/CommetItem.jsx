import {useState} from 'react';
import { useSelector } from 'react-redux';
import {Textarea, Button, Alert, Spinner} from "flowbite-react";
import moment from "moment";
import {FaThumbsUp, FaTrash, FaEdit} from 'react-icons/fa';
import Loader from "../components/Loader";
import {toast} from "react-toastify";
import default_avatar from "../assets/img/avatar.jpg"


import {useGetUserByIdQuery,} from "../slices/userApiSlice";
import {useEditCommentMutation} from "../slices/commentApiSlice"



const CommetItem = ({comment, onLike, onEdit, onDelete}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(comment.description);

  const {userInfo} = useSelector((state) => state.auth);
 

  const {
    data: userDetail,
    isLoading,
    error,
    refetch
  } = useGetUserByIdQuery(comment.user);



  const [editComment, {isLoading: loadingEditComment} ] = useEditCommentMutation();
  

  const handleEdit = () => {
    setIsEditing(true);
    setEditDescription(comment.description);
  };


  //Save the edited changes of comment
  const handleSave = async () => {
    const commentId = comment._id;
    try {
      await editComment({
        commentId,
        description: editDescription
      }).unwrap();
      setIsEditing(false);
      onEdit(comment, editDescription);
      refetch()
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  

  return (
    <>
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Alert color="failure" className='mt-5'>
          {error?.data?.message || error.error}
        </Alert>
      ) : (
        <div className='flex p-4 border-b border-white text-sm'>
          <div className='flex-shrink-0 mr-3'>
                <img 
                src={userDetail?.avatar?.url || default_avatar} 
                alt={userDetail.name}
                className='w-10 h-10 rounded-full bg-gray-200'
                />
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-1">
                    <span className='font-bold mr-1 text-xs truncate'>
                      {userDetail ? `@${userDetail.name}` : 'anonyme'}
                    </span>
                    <span className='text-gray-500 text-xs'>
                        {moment(comment.createdAt).fromNow()}
                    </span>
                </div>
                { isEditing ? (
                  <>
                    <Textarea
                    className='mb-2'
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <div className='flex justify-end gap-2 text-xs'>
                        <Button
                            type='button'
                            size='sm'
                            gradientDuoTone='purpleToBlue'
                            onClick={handleSave}
                        >
                            {loadingEditComment ? (
                              <>
                                <Spinner size='sm' />
                                <span className='pl-3'>Loading...</span>
                              </>
                            ) : (
                              'Valider'
                            )}
                            
                        </Button>
                        <Button
                            type='button'
                            size='sm'
                            gradientDuoTone='purpleToBlue'
                            outline
                            onClick={() => setIsEditing(false)}
                        >
                            Annuler
                        </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className='mb-2'>{comment.description}</p>

                    <div className="flex items-center pt-2 text-xs border-t border-gray-200 max-w-fit gap-2">
                      <button 
                      type="button" 
                      className={`text-gray-400 hover:text-blue-500 ${
                          userInfo &&
                          comment.likes.includes(userInfo._id) &&
                          '!text-blue-500'
                      }`}
                      onClick={() => onLike(comment._id)}
                      >
                          <FaThumbsUp className='text-sm hover:cursor-pointer'/>
                      </button>
                      <p className='text-gray-400'>
                          {comment.numberOfLikes > 0 &&
                          comment.numberOfLikes +
                              ' ' +
                              (comment.numberOfLikes === 1 ? 'like' : 'likes')}
                      </p>
                      {
                        userInfo &&
                          (userInfo._id === comment.user || userInfo.isAdmin) && (
                          <>
                              <FaEdit 
                              className='text-sm text-gray-400 hover:text-blue-500 hover:cursor-pointer ml-2'
                              onClick={handleEdit}
                              />
                                <FaTrash 
                              className='text-sm text-red-400 hover:text-red-600 hover:cursor-pointer ml-2'
                              onClick={() => onDelete(comment._id)}
                              />
                          </>
                        )
                      }
                    </div>
                  </>
                )}
              </div>
        </div>
      )}
    </>
  );
}

export default CommetItem; 