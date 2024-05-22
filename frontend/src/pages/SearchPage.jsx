import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";
import PostCard from "../components/PostCard"


const SearchPage = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  console.log(sidebarData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);

      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/posts/filter-posts?${searchQuery}`);

      if (!res.ok) {
        setLoading(false);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }

    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/posts/filter-posts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 3) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <main className='flex flex-col md:flex-row'>
      <section className="p-7 border-b md:border-r md:min-h-screen border-gray-300 bg-slate-800">
        <form 
        className='flex flex-col gap-8'
        onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-2">
            <label className='whitespace-nowrap font-semibold'>Rechercher:</label>
            <TextInput placeholder='Search...'
            id='searchTerm'
            type='text'
            value={sidebarData.searchTerm}
            onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className='whitespace-nowrap font-semibold'>Trier:</label>
            <Select
            id='sort'
            onChange={handleChange}
            value={sidebarData.sort}
            >
              <option value='desc'>Récents</option>
              <option value='desc'>Anciens</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className='whitespace-nowrap font-semibold'>Category:</label>
            <Select
            id='category'
            onChange={handleChange}
            value={sidebarData.category}
            >
              <option value='uncategorized'>Toutes</option>
              <option value='reactjs'>React JS</option>
              <option value='nextjs'>Next JS</option>
              <option value='javascript'>JavaScript</option>
            </Select>
          </div>
          <Button type='submit' gradientDuoTone='purpleToBlue'>
            Rechercher
          </Button>
        </form>
      </section>

      <section className="w-full">
     
        <h1 className="text-3xl font-semibold sm:border-b border-gray-300 p-3 mt-5">Resultats de la recherche</h1>
        {
          !loading && posts.length === 0 && (
            <p className='text-xl'>
              Aucun posts trouvés
            </p>
        )}
        {
          loading && <Loader/>
        }
        
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
          {!loading && posts && posts.map((post) => (

            <PostCard key={post._id} post={post}/>
          ))
          }
        </div>

        {!showMore && (
            <button
              onClick={handleShowMore}
              className='text-cyan-500 text-lg hover:underline p-7 w-full'
            >
              Voir Plus
            </button>
        )}
      
      </section>
    </main>
  )
}

export default SearchPage;

