import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from "react-toastify";
import { Button, Spinner } from 'flowbite-react';

import {useLoginMutation} from "../slices/userApiSlice";
import {setCredentials} from "../slices/authSlice";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

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
        try {
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        } catch (err) {
        toast.error(err?.data?.message || err.error);
        }
    };


    return (
        <main className="hero lg:px-24 lg:mt-12 Z-50">
            <section className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Se connecter Maintenant!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm bg-neutral">
                    <form className="card-body" onSubmit={submitHandler}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Email</span>
                            </label>
                            <input 
                            type="email" 
                            placeholder="Email" 
                            className="input input-bordered" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Mot de Passe</span>
                            </label>
                            <input 
                            type="password" 
                            placeholder="Mot de Passe" 
                            className="input input-bordered" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            />
                            <label className="label flex justify-between">
                                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="label-text-alt link link-hover text-xs">
                                    Créer un compte?
                                </Link>
                                <Link to="/!#" className="label-text-alt link link-hover text-xs">
                                    Mot de Passe oublié?
                                </Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
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
  )
}

export default LoginPage;