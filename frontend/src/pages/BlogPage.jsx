import React from 'react';
import {Alert} from "flowbite-react";
import PostCard from '../components/PostCard';
import Loader from '../components/Loader'

import {useGetPostsQuery} from "../slices/postApiSlice"

function BlogPage() {
  const {
    data: posts, 
    isLoading, 
    refetch,
    error, 
  } = useGetPostsQuery();


  return (
    
    <>
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Alert color="failure" className='mt-5'>
          {error?.data?.message || error.error}
        </Alert>
      ) : (
        <>
          <main className='px-8 lg:px-24 py-6'>
            <div className="container-xl lg:container m-auto px-4 py-6">
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                <PostCard key={post._id} post={post}/>
                ))}
            </div>
            </div>
          </main>
        </>
      )}
    </>
  )
}

export default BlogPage

