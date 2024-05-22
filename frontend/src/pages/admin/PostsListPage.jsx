import {Link} from "react-router-dom";
import {Alert} from "flowbite-react";
import {FaEdit, FaTrash} from "react-icons/fa";
import {toast} from "react-toastify";
import Loader from '../../components/Loader';


import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "../../slices/postApiSlice";

const PostsListPage = () => {
  
  const {
    data: posts, 
    isLoading, 
    refetch,
    error, 
  } = useGetPostsQuery();
  
  const [deletePost, { isLoading: loadingDelete }] =
  useDeletePostMutation();
 
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deletePost(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className='px-8 lg:px-24 mt-12'>
      <h1 className='text-center text-3xl my-7 font-semibold'> Liste des Posts</h1>

      {loadingDelete && <Loader/>}
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
                  <th>Date Publication</th>
                  <th>Image</th>
                  <th>Titre</th>
                  <th>Category</th>
                  <th>Éditer</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
             <tbody>
              {posts.map((post) => (
                <tr key={post._id} className='hover:bg-slate-600'>
                  <td>{post.createdAt.substring(0, 10)}</td>
                  <td>
                    <Link to={`/post/${post._id}`}>
                      <img 
                      src={post.image}
                      alt="PostImg"
                      className='w-10 h-10 object-cover bg-gray-50 rounded-full'
                    />
                    </Link>
                  </td>
                  <td>{post.title}</td>
                  <td>{post.category}</td>
                  <td>
                    <Link to={`/admin/post/${post._id}/edit`}>
                      <FaEdit className='text-neutral-content text-lg cursor-pointer'/>
                    </Link>
                  </td>
                  <td>
                    <FaTrash 
                    className='text-red-500 text-lg cursor-pointer'
                    onClick={() => deleteHandler(post._id)} 
                    />
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

export default PostsListPage