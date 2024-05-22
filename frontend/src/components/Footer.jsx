import {Link} from 'react-router-dom';
import {FaGithub, FaLinkedin, FaTwitter, FaDiscord} from "react-icons/fa";
import { Button } from 'flowbite-react';

const Footer = () => {
    const footerYear = new Date().getFullYear();
    return (
        
        <footer className="bg-slate-800 ">
            
            <div className="max-w-8xl py-4 lg:px-24">
              
                <div className="flex flex-col items-center mb-8 space-y-6 md:flex-row md:space-y-0 md:justify-between md:items-start">
                   
                    <div className="flex flex-col items-center space-y-4 md:items-start md:space-y-5">
                        <div className="h-8">
                            
                            <Link to={"/"} className='text-xl text-white text-bold'>BARRYBLOG</Link>
                        </div>
                       
                        <div className="flex flex-col items-center space-y-4 font-bold text-white md:flex-row md:space-y-0 md:space-x-6 md:ml-3">
                           
                            <div className=" h-5 group">
                                <a href="/">Accueil</a>
                                <div className="group-hover:border-b group-hover:border-blue-50"></div>
                            </div>
                            
                            <div className=" h-5 group">
                                <a href="/about">À Propos</a>
                                <div className="group-hover:border-b group-hover:border-blue-50"></div>
                            </div>
                            
                            <div className=" h-5 group">
                                <a href="/blog">Blog</a>
                                <div className="group-hover:border-b group-hover:border-blue-50"></div>
                            </div>
                        </div>
                    </div>
    
                   
                    <div className="flex flex-col items-start justify-between space-y-4 text-white">
                        
                        <div className="flex items-center justify-center mx-auto space-x-4 md:justify-end md:mx-0">
                          
                            <div className="h-8 group">
                                <Link to='https://support.discord.com/hc/fr/profiles/22690334605591' target='_blank' className="hover:text-violet-600 text-3xl">
                                    <FaDiscord />
                                </Link>
                            </div>
                         
                            <div className="h-8 group">
                                <Link to='https://twitter.com/baosaram' target='_blank' className="hover:text-blue-500 text-3xl">
                                    <FaTwitter />
                                </Link>
                            </div>
                           
                            <div className="h-8 group">
                                <Link to='https://github.com/Ramuo' target='_blank'>
                                    <FaGithub className="hover:text-gray-700 text-3xl"/>
                                </Link>
                            </div>
                           
                            <div className="h-8 group">
                                <Link to='https://www.linkedin.com/in/alpha-barry-paris/' target='_blank'>
                                    <FaLinkedin className="hover:text-blue-500 text-3xl mr-4"/>
                                </Link>
                            </div>
                        </div>
    
                       
                        <div className="font-bold">
                            &copy; Tous droits réservés {footerYear}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer