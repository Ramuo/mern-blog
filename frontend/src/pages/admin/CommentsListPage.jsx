import {Alert} from "flowbite-react";
import {FaTrash} from "react-icons/fa";
import {toast} from "react-toastify";
import Loader from "../../components/Loader";


import {
    useGetCommentsQuery,
    useDeleteCommentMutation
} from "../../slices/commentApiSlice";

const CommentsListPage = () => {

  const {
    data, 
    isLoading, 
    refetch,
    error, 
  } =  useGetCommentsQuery();


  const [deleteComment] = useDeleteCommentMutation();

  const deleteCommentHandler = async (id) => {
    if(window.confirm("Êtes-vous sûr de supprimer cet utilisateur?")){
      try {
        await deleteComment(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.meassage || err.error)
      }
    }
  };

  return (
    <div className='px-8 lg:px-24 mt-12'>
      <h1 className='text-center text-3xl my-7 font-semibold'> Liste des Utilisateurs</h1>
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Alert color="failure" className='mt-5'>
          {error?.data?.message || error.error}
        </Alert>
      ) : (
        <>
          <div className="overflow-x-auto mt-12" >
            <table className="table table-xs lg:table-md bg-slate-800">
              <thead className='text-white text-lg'>
                <tr>
                  <th>Date</th>
                  <th>Commentaire</th>
                  <th>Likes</th>
                  <th>Post ID</th>
                  <th>Utilisateur ID</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
             <tbody>
              {data?.comments?.map((comment) => (
                <tr key={comment._id} className='hover:bg-slate-600'>
                  <td>{comment.updatedAt.substring(0, 10)}</td>
                  <td>
                    {comment.description}
                  </td>
                  <td>{comment.numberOfLikes}</td>
                  <td>{comment.post}</td>
                  <td>{comment.user}</td>
                  <td>
                    <FaTrash className='text-red-500 text-lg cursor-pointer' onClick={() => deleteCommentHandler(comment._id)}/>
                  </td>
                </tr>
              ))}
             </tbody>
            </table>
          </div>
        </>
     )}
    </div>
  );
};

export default CommentsListPage;
