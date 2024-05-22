import React from 'react';
import {Link} from "react-router-dom";
import {Button, Table} from "flowbite-react";
import {HiOutlineUserGroup, HiArrowNarrowUp, HiAnnotation, HiDocumentText} from "react-icons/hi";
import Loader from "../../components/Loader";
import default_avatar from '../../assets/img/avatar.jpg';


import {useGetUsersForDashboardQuery} from "../../slices/userApiSlice";
import {useGetCommentsQuery} from "../../slices/commentApiSlice";
import {useGetFilterPostsQuery} from "../../slices/postApiSlice";

const DashboardPage = () => {

  const {
    data: dataUsers,
    isLoading: loadingUsers, 
    error: usersError 
  } =   useGetUsersForDashboardQuery();

  
  const {
    data: dataComments,
    isLoading: loadingComments,
    error: errorComments
  } =  useGetCommentsQuery();

  const {
    data: dataPosts,
    isLoading: loadingPosts,
    error: errorPosts
  } =  useGetFilterPostsQuery();


  return (
    <div className='p-3 md:mx-auto lg:px-24 mt-6'>
      {loadingUsers || loadingComments ||loadingPosts ? (
        <Loader/>
      ): usersError || errorComments || errorPosts ? (
        <p className='text-red-600'>Une erreur s'est produite</p>
      ) : (
        <>
          <main className="flex flex-wrap gap-4 justify-between">
            <section className="flex flex-col p-3 bg-slate-800 gap-4 md:w-80 w-full rounded-md shadow-md ">
                <div className='flex justify-between'>
                  <div >
                    <h3 className='text-white text-sm uppercase'>Total Utilisateurs</h3>
                    <p className='text-2xl'>{dataUsers.totalUsers}</p>
                  </div>
                  <HiOutlineUserGroup className='bg-cyan-500 text-white text-5xl p-3 rounded-full shadow-lg'/>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className='text-green-500 flex items-center'>
                    <HiArrowNarrowUp/>
                    <p>{dataUsers.lastMonthUsers}</p>
                  </span>
                  <span className='text-neutral-content'>Le mois dernier</span>
                </div>
            </section>

            <section className="flex flex-col p-3 bg-slate-800 gap-4 md:w-80 w-full rounded-md shadow-md">
                <div className='flex justify-between'>
                  <div >
                    <h3 className='text-white text-sm uppercase'>Total Publications</h3>
                    <p className='text-2xl'>{dataPosts.totalPosts}</p>
                  </div>
                  <HiDocumentText className='bg-lime-600 text-white text-5xl p-3 rounded-full shadow-lg'/>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className='text-green-500 flex items-center'>
                    <HiArrowNarrowUp/>
                    <p>{dataPosts.lastMonthPosts}</p>
                  </span>
                  <span className='text-neutral-content'>Le mois dernier</span>
                </div>
            </section>

            <section className="flex flex-col p-3 bg-slate-800 gap-4 md:w-80 w-full rounded-md shadow-md">
                <div className='flex justify-between'>
                  <div >
                    <h3 className='text-white text-sm uppercase'>Total Commentaires</h3>
                    <p className='text-2xl'>{dataComments.totalComments}</p>
                  </div>
                  <HiAnnotation className='bg-indigo-500 text-white text-5xl p-3 rounded-full shadow-lg'/>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className='text-green-500 flex items-center'>
                    <HiArrowNarrowUp/>
                    <p>{dataComments.lastMonthComments}</p>
                  </span>
                  <span className='text-neutral-content'>Le mois dernier</span>
                </div>
            </section>
          </main>

          <main className='mt-4 flex flex-wrap justify-center gap-4 py-3 mx-auto'>
            <section className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-slate-800">
              <div className="flex justify-between p-3 text-sm font-semibold">
                <h1 className="text-center p-2">Utitilisateurs Récents</h1>
                <Button outline gradientDuoTone="purpleToBlue">
                  <Link to={'/admin/usersList'}>Voir Plus</Link>
                </Button>
              </div>
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Image</Table.HeadCell>
                  <Table.HeadCell>Nom</Table.HeadCell>
                </Table.Head>
                {dataUsers?.users?.map((user) => (
                  <Table.Body key={user._id} className='divide-y'>
                    <Table.Row className='bg-slate-800'>
                      <Table.Cell>
                        <img 
                        src={user?.avatar?.url || default_avatar} alt="user" 
                        className='w-10 h-10 rounded-full bg-gray-500'
                        />
                      </Table.Cell>
                      <Table.Cell>{user.name}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
            </section>

            <section className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-slate-800">
              <div className="flex justify-between p-3 text-sm font-semibold">
                <h1 className="text-center p-2">Posts Récents</h1>
                <Button outline gradientDuoTone="purpleToBlue">
                  <Link to={'/admin/postsList'}>Voir Plus</Link>
                </Button>
              </div>
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Image</Table.HeadCell>
                  <Table.HeadCell>Titre</Table.HeadCell>
                  <Table.HeadCell>Categorie</Table.HeadCell>
                </Table.Head>
                {dataPosts?.posts?.map((post) => (
                  <Table.Body key={post._id} className='divide-y'>
                    <Table.Row className='bg-slate-800'>
                      <Table.Cell>
                        <img 
                        src={post.image} alt="img" 
                        className='w-14 h-10 rounded-md bg-gray-500'
                        />
                      </Table.Cell>
                      <Table.Cell className='w-96'>{post.title}</Table.Cell>
                      <Table.Cell className='w-5'>{post.category}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
            </section>

            <section className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-slate-800">
              <div className="flex justify-between p-3 text-sm font-semibold">
                <h1 className="text-center p-2">Commentaires Récents</h1>
                <Button outline gradientDuoTone="purpleToBlue">
                  <Link to={'/admin/commentsList'}>Voir Plus</Link>
                </Button>
              </div>
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Commentaires</Table.HeadCell>
                  <Table.HeadCell>Likes</Table.HeadCell>
                </Table.Head>
                {dataComments?.comments?.map((comment) => (
                  <Table.Body key={comment._id} className='divide-y'>
                    <Table.Row className='bg-slate-800'>
                      <Table.Cell className='w-96'>
                        <p className='line-clamp-2' dangerouslySetInnerHTML={{__html: comment.description}}></p>
                      </Table.Cell>
                      <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
            </section>
          </main>
        </>
      ) }
    </div>
  )
}

export default DashboardPage