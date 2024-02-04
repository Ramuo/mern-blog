import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import {Table, Modal, Button} from 'flowbite-react';
import Loader from './Loader';
import {HiOutlineExclamationCircle} from 'react-icons/hi'



// import {useGetPostsQuery} from '../slices/postApiSlice';

const DashPosts = () => {
  const {userInfo} = useSelector((state) => state.auth);

  const [userPosts, setUserPosts] = useState([]);
  const [showmore, setShowmore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  
  // const {
  //   data,
  //   isLoading,
  //   refetch,
  //   error
  // } = useGetPostsQuery();
  // console.log(data)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts/getposts?userId=${userInfo._id}`);
        const data = await res.json();
        if(res.ok){
          setUserPosts(data.posts);
          if(data.posts.length < 9){
            setShowmore(false);
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    };
    if(userInfo.isAdmin){
      fetchPosts();
    }
  }, [userInfo._id, userInfo.isAdmin]);

  const handleShomore = async () => {
    const startIndex = userPosts.length;

    try {
      const res = await fetch(`/api/posts/getposts?userid=${userInfo._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUserPosts((prev) => [...prev, ...data.posts]);
        if(data.posts.length < 9){
          setShowmore(false);
        }
      }
    } catch (error) {
      console.log(error.messsage)
    }

  }

  const deletePost = async () => {
    setShowModal(false)
    try {
      const res = await fetch(`/api/posts/deletepost/${postIdToDelete}/${userInfo._id}`, 
      {
        method: "DELETE",
      }
      );
      const data = await res.json();
      if(!res.ok){
        console.log(data.message)
      }else{
        setUserPosts((prev) =>
        prev.filter((post) => post._id !== postIdToDelete)
        )
      }
    } catch (error) {
      console.log(error.error)
    }
  }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 
    dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500' 
    >
      {userInfo.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Titre</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Supprimer</Table.HeadCell>
              <Table.HeadCell>
                <span>Editer</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body key={post._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {post.updatedAt.substring(0, 10)}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/posts/${post.slug}`}>
                      <img 
                      src={post.image}
                      alt={post.title}
                      className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/posts/${post.slug}`} className='font-medium text-gray-900 dark:text-white'>
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/posts/${post.slug}`}>
                      {post.category}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <span 
                    onClick={() => {
                      setShowModal(true);
                      setPostIdToDelete(post._id)
                    }}
                    className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Supprimer
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                  <Link to={`/updatepost/${post._id}`} className='text-teal-500'>
                    <span>Editer</span>
                  </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ) )}
          </Table>
          {
            showmore && (
              <button 
              onClick={handleShomore}
              className='w-full text-teal-500 self-center text-sm py-7'
              >
                Voir Plus
              </button>
            )
          }
        </>
      ) : (
        <>
          <p>Vous n'avez aucune publication </p>
        </>
      )
      }

      <Modal 
      show={showModal} 
      onClick={() => setShowModal(false)}
      popup
      size='md'
      >
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle 
            className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'
            />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Êtes-vous sûr de supprimer cette publication ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color='failure'
              onClick={() => deletePost(userPosts._id)}
              >
                Oui, supprimer
              </Button>
              <Button 
              onClick={() => setShowModal(false)}
              >
                Non, annuler
              </Button>

              {/* {loadingDelete && <Loader/>} */}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
    
  )
}

export default DashPosts