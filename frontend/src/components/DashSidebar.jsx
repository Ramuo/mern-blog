import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Sidebar} from 'flowbite-react';
import {HiArrowSmRight, HiUser, HiDocumentText} from 'react-icons/hi';

const DashSidebar = () => {
    const location = useLocation();
    const [tab, setTab] = useState('');

    const {userInfo} = useSelector((state) => state.auth);
  
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
        setTab(tabFromUrl);
        }
    }, [location.search]);
    return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item 
                    active={tab === 'profile'} 
                    icon={HiUser} label={userInfo.isAdmin ? 'Admin' : 'User' } 
                    labelColor='dark'
                    as='div'
                    >
                        Profil
                    </Sidebar.Item>
                </Link>

                {userInfo.isAdmin && (
                    <Link to='/dashboard?tab=posts'>
                        <Sidebar.Item
                        active={tab === 'posts'}
                        icon={HiDocumentText}
                        as='div'
                        >
                            Publications
                        </Sidebar.Item>
                    </Link>
                ) }
                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
                    Se deconnecter
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
    )
}

export default DashSidebar;
