import { useState, useEffect } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import {Spinner} from 'flowbite-react';
import blog from '../assets/img/blog.png';
// import GoogleBtn from '../components/GoogleBtn';


import {useLoginMutation} from '../slices/authApiSlice';
import { setCredentials } from '../slices/authSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState(' ');
  

  const [login, {isLoading}] = useLoginMutation();

  const {userInfo} = useSelector((state) => state.auth);

  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if(userInfo){
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res}));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <section className="container px-4 mx-auto min-h-screen mt-20">
      <main className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-10 lg:mb-0 sm:px-6">
            <div className="max-w-md">
              <img src={blog} alt="blog" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <h3 className="mb-6 text-2xl text-dark text-center font-bold font-heading">
                Se connecter
            </h3>
            <form onSubmit={submitHandler}>
              <div className="pl-6 mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-400 rounded-md focus:outline-none dark:text-gray-700"
                  placeholder="E-mail"
                />
              </div>
              <div className="pl-6 mb-3 ">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-400 rounded-md focus:outline-none dark:text-gray-700"
                  placeholder="********"
                />
              </div>
              <div className="pl-6">
                <button
                  type="submit"
                  className="py-4 w-full bg-gradient-to-r from-indigo-500 via-purple-500 
                  to-pink-500  text-white font-bold rounded-md hover:-translate-y-0.5 transition-all duration-150"
                  disabled={isLoading}
                >
                  {isLoading ? (
                      <>
                        <Spinner size='sm' />
                        <span className='pl-3'>Loading...</span>
                      </>
                    ) : (
                      'Envoyer'
                    )
                  }
                </button>
              </div>

              {/* <div className="pl-6">
                <GoogleBtn/>
              </div> */}

            </form>

            <div className="flex items-center justify-between py-3">
              <Link
                to={'/register'}
                className="font-medium text-gray-600 text-sm hover:text-purple-600 pl-6"
              >
              Vous n'avez pas de compte ?
              </Link>
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                className="font-medium text-gray-600 text-sm hover:text-purple-600 pl-6"
              >
                Mot de passe oublier ?
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default LoginPage