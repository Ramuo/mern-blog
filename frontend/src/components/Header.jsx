import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Navbar, TextInput, Button, Dropdown, Avatar} from 'flowbite-react';
import {AiOutlineSearch} from 'react-icons/ai';
import {FaMoon} from 'react-icons/fa';


import { useLogoutMutation } from '../slices/authApiSlice';
import { logout } from '../slices/authSlice';



const Header = () => {
    const path = useLocation().pathname;

    const {userInfo} = useSelector((state) => state.auth);
   

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login')
        } catch (err) {
            console.log(err);
        }
    };


    return (
    <Navbar className='p-6 shadow-lg bg-neutral'>
        <Link to='/' 
        className='self-center whitespace-nowrap text-sm 
        sm:text-xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 
        to-pink-500 rounded p-2 text-white hover:text-gray-300
        dark:text-white'
        >
            <span>Alpha</span>
            -Blog
        </Link>
        <form>
            <TextInput
            type='text'
            placeholder='Rechercher...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            />
        </form>
        <Button
        className='w-12 h-10 lg:hidden' 
        color='gray' pill
        >
            <AiOutlineSearch/>
        </Button>
        <div className="flex gap-2 md:order-2">
            <Button 
            className='w-12 h-10 hidden sm:inline' color='gray' pill
            >
                <FaMoon/>
            </Button>

            {userInfo ? (
                <Dropdown
                arrowIcon={false}
                inline
                label={<Avatar alt="user" img={userInfo.profilePicture} rounded/>}
                >
                    <Dropdown.Header>
                        <span className='block text-sm'>@{userInfo.name}</span>
                        <span className='block text-sm font-medium truncate'>{userInfo.email}</span>
                    </Dropdown.Header>
                    <Link to={'/dashboard?tab=profile'}>
                        <Dropdown.Item>
                            Profil
                        </Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={logoutHandler}>
                            Se deconnecter
                        </Dropdown.Item>
                    </Link>
                </Dropdown>
            ) : (
                <Link to='/login'>
                    <Button gradientDuoTone='purpleToBlue' outline>Connexion</Button>
                </Link>
            )
            }
            <Navbar.Toggle/>
        </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>
                        Accueil
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'}  as={'div'}>
                    <Link to='/about'>
                        À Propos
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/projects'}  as={'div'}>
                    <Link to='/projects'>
                        Projets
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
    )
}

export default Header