import {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from "react-toastify";
import { Button, Spinner } from 'flowbite-react';

import {useRegisterMutation} from "../slices/userApiSlice";
import {setCredentials} from "../slices/authSlice";

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [register, { isLoading }] = useRegisterMutation();

    const {userInfo} = useSelector((state) => state.auth);


    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
          navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);



    const submitHandler = async (e) => {
        e.preventDefault();

        //Let'us check is the pwd match
        if(password !== confirmPassword){
            toast.error("Mot de passe non identique");
            return;
        }else{
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
              } catch (err) {
                toast.error(err?.data?.message || err.error);
              } 
        }
    };

    return ( 
        <main className="hero lg:px-24 lg:mt-12">
            <section className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">S'inscrire Maintenant!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-neutral">
                    <form className="card-body" onSubmit={submitHandler}>
                        <div className="form-control mb-1">
                            <input 
                            type="text" 
                            placeholder="Nom" 
                            className="input input-bordered" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            />
                        </div>
                        <div className="form-control mb-1">
                            <input 
                            type="email" 
                            placeholder="Email" 
                            className="input input-bordered" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-control mb-1">
                            <input 
                            type="password" 
                            placeholder="Mot de Passe" 
                            className="input input-bordered" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <input 
                            type="password" 
                            placeholder="Mot de Passe" 
                            className="input input-bordered" 
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            />
                            <p>
                                <span className='text-xs mr-2'>Vous avez déja un compte?</span>
                                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="label-text-alt link link-hover text-xs">
                                     Se Connecter
                                </Link>
                            </p>
                        </div>
                        <div className="form-control mt-3">
                            <Button
                            type='submit'
                            gradientDuoTone="purpleToBlue"
                            >
                                {isLoading ? (
                                    <>
                                        <Spinner size='sm' />
                                        <span className='pl-3'>Loading...</span>
                                    </>
                                ) : (
                                    'Envoyer'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default RegisterPage;