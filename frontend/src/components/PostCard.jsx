import {Link} from 'react-router-dom';


const Post = ({post}) => {


  return (
    <div className="card bg-gray-50 hover:translate-y-1.5 transition-all duration-300">
      <Link to={`/post/${post._id}`} className='cursor-pointer'>
        <figure><img src={post.image} alt="postImg" className='h-[260px] object-cover w-full rounded-t-xl' /></figure>
      </Link>
      <div className="card-body">
        <h2 className="card-title text-black">{post.title}</h2>
        <p 
        dangerouslySetInnerHTML={{__html: post.content}}
        className='text-md text-gray-900 line-clamp-2'>
        </p>
        <button className="btn bg-slate-950 hover:bg-slate-800">
          <Link to={`/post/${post._id}`} className='cursor-pointer'>
            Lire l'article
          </Link>
        </button>
      </div>
    </div>
    
     
   

  )
}

export default Post





