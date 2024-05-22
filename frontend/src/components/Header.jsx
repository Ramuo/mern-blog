import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import clsx from 'clsx';
import { FaBars, FaTimes,FaPoll, FaRegFileAlt, FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import {HiUser} from 'react-icons/hi';
import { Button } from 'flowbite-react';
import default_avatar from "../assets/img/avatar.jpg";
import SearchBox from './SearchBox';



import {logout} from "../slices/authSlice";
import {useLogoutMutation} from "../slices/userApiSlice";



const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [logoutApiCall] = useLogoutMutation();
    
    const logoutHandler = async () => {
        try {
          await logoutApiCall().unwrap();
          dispatch(logout());
          navigate('/login');
        } catch (err) {
          console.error(err);
        }
    };

    //Change bg color when scroll
    const userScroll = () => {
        const navbar = document.querySelector('.main');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
            navbar.classList.add('bg-slate-800');
            } else {
            navbar.classList.remove('bg-slate-800');
            }
        });
    }
    window.addEventListener('scroll', userScroll);

    return (
    
        <nav className="navbar bg-neutral py-6 lg:px-24 shadow-lg sticky top-0 z-50 main ">
            <div className="flex-none">
                <FaBars className='text-2xl text-white mr-4 cursor-pointer lg:hidden'
                    onClick={() => setIsSidebarOpen(true)}
                />  
            </div>
            <section className="flex-1">
                <Button gradientDuoTone="purpleToBlue" >
                    <Link to={'/'}>BARRYBLOG</Link>
                </Button>

                <div className="hidden lg:block ml-4">
                        <ul className='flex justify-between gap-2 text-lg text-white font-semibold'>
                            <li className='rounded hover:bg-gray-600 p-2'>
                                <Link to="/">
                                    Accueil
                                </Link>
                            </li>
                            <li className=' rounded hover:bg-gray-600 p-2'>
                                <Link to="/about">
                                    À Propos
                                </Link>
                            </li>
                            <li className='rounded hover:bg-gray-600 p-2'>
                                <Link to="/blog">
                                    Blog
                                </Link>
                            </li>
                            {userInfo && userInfo.isAdmin &&(
                                <li className='rounded hover:bg-gray-600 p-2'>
                                <Link to="/admin/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                            )}
                        </ul>
                </div>
            </section>
            
            {/* SearchBox */}
            <SearchBox/>

            {userInfo && (  
                <section className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            <img 
                            src={userInfo.avatar || default_avatar}
                            alt="avatar-img" 
                            />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-neutral rounded-box w-52">
                            <li>
                                <Link to={'/profile'}>
                                    Profile
                                </Link>
                            </li>
                            {userInfo && userInfo.isAdmin &&(
                                <>
                                    <li>
                                        <Link to="/admin/create-post">Créer un Poste</Link>
                                    </li>
                                </>
                            )}
                            <li><Link onClick={logoutHandler}>Déconnexion</Link></li>
                        </ul>
                    </div>
                </section>
            )}

            <section>
                {!userInfo && (
                    <button className="btn bg-gray-600 text-lg flex-none">
                        <Link to="/login" className='flex items-center gap-1'>
                            <FaSignInAlt/>Connexion
                        </Link>
                    </button>   
                )}
            </section>

            {/* Sidebar Mobile Menu */}
            <div className={clsx(
                "fixed h-full w-screen lg:hidden backdrop-blur-sm top-0 right-0 -translate-x-full z-50", 
                isSidebarOpen && 'translate-x-0 transition-all')} 
            >
                <section className="bg-neutral  text-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56">
                    <FaTimes className='mt-0 mb-6 cursor-pointer text-4xl rounded-full bg-gray-600 p-2'
                    onClick={() => setIsSidebarOpen(false)}
                    />
                    <hr  className='mb-4'/>
                    <ul className='text-lg'>
                        <li className='mb-1 rounded hover:shadow hover:bg-gray-600 p-2'>
                            <Link to="/" onClick={() => setIsSidebarOpen(false)}>
                                <HiUser className='inline-block w-6 h-6 mr-2 -mt-2'/>
                                Profil
                            </Link>
                        </li>
                        <li className='mb-1 rounded hover:shadow hover:bg-gray-600 p-2'>
                            <Link to="/blog" onClick={() => setIsSidebarOpen(false)}>
                                <FaRegFileAlt className='inline-block w-6 h-6 mr-2 -mt-2' />
                                Blog
                            </Link>
                        </li>
                        {userInfo && userInfo.isAdmin && ( 
                            <>
                                <li className='mb-1 rounded hover:shadow hover:bg-gray-600 p-2'>
                                    <Link to='/admin/dashboard' onClick={() => setIsSidebarOpen(false)}>
                                        <FaPoll className='inline-block w-6 h-6 mr-2 -mt-2'/>
                                        Dashbord
                                    </Link>
                                </li>
                            </>   
                        )}
                        {userInfo ? (
                            <li className='mb-1 rounded hover:shadow hover:bg-gray-600 p-2' onClick={logoutHandler}>
                                <Link to="/login" onClick={() => setIsSidebarOpen(false)} >
                                    <FaSignOutAlt className='inline-block w-6 h-6 mr-2 -mt-2'/>
                                    Déconnexion
                                </Link>
                            </li>
                        ): (
                            <li className='mb-1 rounded hover:shadow hover:bg-gray-600 p-2'>
                                <Link to="/login" onClick={() => setIsSidebarOpen(false)} >
                                    <FaSignInAlt className='inline-block w-6 h-6 mr-2 -mt-2'/>
                                    Connexion
                                </Link>
                            </li>
                        )}
                    </ul>
                </section>
            </div>  
        </nav>
    )
}

export default Header


