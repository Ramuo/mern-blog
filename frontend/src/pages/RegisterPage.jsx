import { useState } from 'react';
import {Link} from 'react-router-dom';

import illustration from '../assets/img/illustration.png';

const RegisterPage = () => {
  const [name, setName] = useState(' ');
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState(' ');


  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('hello')
  }

  return (
    <section className="container px-4 mx-auto min-h-screen mt-20">
      <main className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-10 lg:mb-0 sm:px-6">
            <div className="max-w-md">
              <img src={illustration} alt="blog" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <h3 className="mb-6 text-2xl text-dark text-center font-bold font-heading">
                {`S'inscrire`}
            </h3>
            <form onSubmit={submitHandler}>
              <div className="pl-6 mb-3 bg-white">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-400 rounded-md focus:outline-none"
                  placeholder="Nom"
                />
              </div>
              <div className="pl-6 mb-3 bg-white">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-400 rounded-md focus:outline-none"
                  placeholder="E-mail"
                />
              </div>
              <div className="pl-6 mb-3 bg-white">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-400 rounded-md focus:outline-none"
                  placeholder="Mot de passe"
                />
              </div>
              <div className="pl-6">
                <button
                  type="submit"
                  className="py-4 w-full bg-gradient-to-r from-indigo-500 via-purple-500 
                  to-pink-500  text-white font-bold rounded-md hover:-translate-y-0.5 transition-all duration-150"
                >
                  Envoyer
                </button>
              </div>

              {/* {isLoading && <Loader/>} */}
            </form>

            <div className="flex items-center justify-between py-3">
              <Link
                to={'/login'}
                className="font-medium text-gray-600 text-sm hover:text-purple-600 pl-6"
              >
              Vous avez un compte ?
              </Link>
              <Link
                to="/#!"
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

export default RegisterPage