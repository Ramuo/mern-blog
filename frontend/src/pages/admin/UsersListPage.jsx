import {Alert} from "flowbite-react";
import {FaTimes, FaCheck, FaTrash} from "react-icons/fa";
import {toast} from "react-toastify";
import Loader from '../../components/Loader';


import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/userApiSlice";

const UsersListPage = () => {

  const {
    data: users, 
    isLoading, 
    refetch,
    error, 
  } = useGetUsersQuery();
  

  const [deleteUser] = useDeleteUserMutation();

  const deleteUserHandler = async (id) => {
    if(window.confirm("Êtes-vous sûr de supprimer cet utilisateur?")){
      try {
        await deleteUser(id);
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
                  <th>Image</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
             <tbody>
              {users.map((user) => (
                <tr key={user._id} className='hover:bg-slate-600'>
                  <td>{user.createdAt.substring(0, 10)}</td>
                  <td>
                    <img 
                    src={user?.avatar?.url}
                    alt="user"
                    className='w-10 h-10 object-cover bg-gray-50 rounded-full'
                    />
                  </td>
                  <td>{user.name}</td>
                  <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                  <td>{user.isAdmin ? (<FaCheck className='text-green-500'/>): (<FaTimes className='text-red-500'/>)}</td>
                  <td>
                    <FaTrash className='text-red-500 text-lg cursor-pointer' onClick={() => deleteUserHandler(user._id)}/>
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

export default UsersListPage;






