import { Link } from 'react-router-dom'
import {FaExclamationTriangle} from 'react-icons/fa'

const NotFoundPage = () => {
  return (
    <section className="flex-grow">
        <div className="container m-auto max-w-2xl py-24">
            <div
                className="bg-neutral px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <div className="flex justify-center">
                    <FaExclamationTriangle className="fa-5x text-8xl text-red-400"/>
                </div>
                <div className="text-center">
                    <h1 className="text-3xl font-bold mt-4 mb-2">Not Found</h1>
                    <p className="text-white text-lg mb-10">
                        La page que vous recherchez n'existe pas.
                    </p>
                    <Link 
                    to={'/'}
                    className="bg-slate-800 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded"
                    >
                        Retour Accueil
                    </Link >
                </div>
            </div>
        </div>
        <div className="flex-grow"></div>
    </section>
  )
}

export default NotFoundPage;