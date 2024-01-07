import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {AiFillGoogleCircle} from 'react-icons/ai';
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import { app } from '../firebase.config';


import { useGoogleMutation } from '../slices/authApiSlice';
// import {setCredentials} from '../slices/authSlice';

const GoogleBtn = () => {
    const auth = getAuth(app);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [google] = useGoogleMutation();

    const handleGoogleBtn = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt: 'select_account'});

        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    googlePhotoUrl: resultFromGoogle.user.photoURL
                }),
            });
            
            const data = await res.json();
            if(res.ok){
                dispatch(google(data));
                navigate('/');
            }
            console.log(resultFromGoogle);
        } catch (err) {
            console.log(err);
        }
    };




    return (
    <button
    type='button'
    className="mt-4 py-4 w-full bg-gradient-to-r from-pink-500 via-purple-500 
    to-orange-500  text-white font-bold rounded-md text-md
    hover:-translate-y-0.5 transition-all duration-150 flex items-center justify-center"
    onClick={handleGoogleBtn}
    >
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>Continuer avec Google
    </button>
    );
};

export default GoogleBtn

