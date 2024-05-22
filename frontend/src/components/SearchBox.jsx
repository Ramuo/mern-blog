import {useState, useEffect} from 'react';;
import { useLocation, useNavigate } from 'react-router-dom';


const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState('');

  

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const sp = urlParams.get('searchTerm');
        if(sp){
            setSearchTerm(sp);
        }
    }, [location.search]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searcTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
        
    }

    return (
    <form className="flex justify-between" onSubmit={submitHandler}>
        <input
            type="text"
            className="ml-4 border-none w-40 md:w-80 placeholder:font-thin focus:outline-none rounded-l-md"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className='rounded-r-md bg-gray-700 p-1 mr-4'>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 text-white duration-200 hover:scale-110"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
        </button>
    </form>
  )
}

export default SearchBox