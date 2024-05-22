import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loader from "../components/Loader";
import CommentSection from '../components/CommentSection';
import { Button, Alert } from 'flowbite-react';
import PostCard from "../components/PostCard"



import {useGetPostByIdQuery} from "../slices/postApiSlice";



const PostPage = () => {
  const {id: postId} = useParams();

  const [recentPosts, setRecentPosts] = useState(null);

  const {
    data: post,
    isLoading,
    error,
    refetch
  } = useGetPostByIdQuery(postId);

  
  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/posts/filter-posts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader/>
      ): error ? (
        <Alert color="failure" className='mt-5'>
          {error?.data?.message || error.error}
        </Alert>
      ) : (
        <main className='p-3 flex flex-col max-w-5xl mx-auto lg:px-8 bg-slate-800'>
          <h1 className='text-3xl mt-5 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
            {post.title}
          </h1>
          <Link
          to={`/search?category=${post.category}`}
          className='self-center mt-5'
          >
            <Button  gradientDuoTone='purpleToBlue' pill size='sm'>
              {post.category}
            </Button>
          </Link>
          <img
          src={post.image}
          alt={post.title}
          className='mt-10 p-3 lg:mx-36 max-h-[500px] object-cover'
          />
          <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span className='italic'>
              {(post.content.length / 1000).toFixed(0)} minutes pour lire l'article
            </span>
          </div>
          <div 
          dangerouslySetInnerHTML={{__html: post.content}}
          className='p-3 max-w-2xl mx-auto w-full post-content'
          ></div>

          <CommentSection postId={post._id}/>

          {/* Recent Articles section */}
          <div className="container-xl lg:container m-auto px-4 py-6">
            <h1 className='text-xl text-center text-gray-100 font-semibold my-4'>Articles Récents</h1>
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentPosts &&
                recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
            </div>
          </div>
        </main>
      )}
    </>
  )
}

export default PostPage;


