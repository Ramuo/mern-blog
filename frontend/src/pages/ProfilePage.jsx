import {useState, useEffect, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch } from "react-redux";
import default_avatar from "../assets/img/avatar.jpg";
import {toast} from "react-toastify";
import {Modal, Button, Spinner} from "flowbite-react";
import {HiOutlineExclamationCircle} from "react-icons/hi";
import Loader from "../components/Loader";

import {
    useUploadavatarMutation,
    useUpdateUserprofileMutation,
    useDeleteUserMutation,
    useLogoutMutation,
} from "../slices/userApiSlice";
import {setCredentials}  from "../slices/authSlice";
import {logout} from "../slices/authSlice";



const ProfilePage = () => {
    const {userInfo}=useSelector((state) => state.auth);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const [showModal, setShowModal] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imageInputRef = useRef();
  
    const [uploadAvatar, { isLoading, error, isSuccess }] = useUploadavatarMutation();

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useUpdateUserprofileMutation();

    const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();
    const [logoutApiCall] = useLogoutMutation();

    useEffect(() => {
        if(userInfo){
            setAvatar(userInfo.avatar);
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPassword(userInfo.password)
        }
    }, [userInfo, userInfo.avatar, userInfo.email, userInfo.name, userInfo.password])

    useEffect(() => {
        
        if (error) {
          toast.error(error?.data?.message);
        }
    
        if (isSuccess) {
          toast.success("Image a été téléchargée avec succès");
        }
    }, [error, isSuccess]);

    const handleUploadImage = async () => {
       
        try {
             await uploadAvatar({avatar}).unwrap();
        } catch (err) {
            toast.error(err?.data?.message)
        }
    };

    const onChange = (e) => {
        const reader = new FileReader();
    
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatar(reader.result);
          }
        };
    
        reader.readAsDataURL(e.target.files[0]);
        

    };

    const submitHandler = async (e) => {
        e.preventDefault();
            try {
            const res = await updateProfile({
                name,
                email,
                password,
                avatar
            }).unwrap();
            dispatch(setCredentials({ ...res, avatar }));
            toast.success('Le profil a été modifié avec succès');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const deleteUserHandler = async (id) => {
        setShowModal(false)
        try {
            await deleteUser(id);
            await logoutApiCall().unwrap();
            dispatch(logout())
            toast.success("Compte supprimé avec succès");
            navigate('/register')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    };

    return (
        <main className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-2xl text-center font-semibold'>Votre Profil</h1>
            <form className='flex flex-col gap-4' onSubmit={submitHandler}>
                <input 
                type="file" 
                accept='image/*'
                onChange={onChange}
                className='self-center hidden'
                ref={imageInputRef}
                />

                <div 
                className="w-32 h-32 self-center cursor-pointer"
                onClick={() => imageInputRef.current.click()}
                >
                    <img 
                    src={avatar || default_avatar }
                    alt={userInfo?.name}
                    className='rounded-full w-full h-full border-8 object-cover border-[lightgray] mb-2'
                    />
                </div>

                <button 
                className="btn btn-neutral text-lg"
                onClick={handleUploadImage}
                disabled={isLoading}
                >
                    Téléchargé l'image
                </button>

                <div className="form-control">
                    <input 
                    type="text" 
                    placeholder="Nom" 
                    className="input input-bordered" 
                    value={name || ' '}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-control">
                    <input 
                    type="email" 
                    placeholder="Email" 
                    className="input input-bordered" 
                    value={email || ' ' }
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-control">
                    <input 
                    type="password" 
                    placeholder="Mot de Passe" 
                    className="input input-bordered" 
                    value={password || ''}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-control">
                    <Button 
                    type='submit' 
                    gradientDuoTone="purpleToBlue" 
                    disabled={loadingUpdateProfile}
                    >
                        {loadingUpdateProfile ? (
                            <>
                                <Spinner size='sm' />
                                <span className='pl-3'>Loading...</span>
                            </>
                        ) : (
                            'Valider'
                        )}
                    </Button>
                </div>
            </form>

            <p 
            className="text-red-500 cursor-pointer mt-5"
            onClick={() => setShowModal(true)}
            >
                Supprimer le compte
            </p>

            <Modal 
            show={showModal} 
            onClick={() => setShowModal(false)}
            popup
            size='md'
            >
                <Modal.Header/>
                <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle 
                    className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'
                    />
                    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Êtes-vous sûr de supprimer ce compte ?</h3>
                    <div className="flex justify-center gap-4">
                    <Button color='failure'
                    onClick={() => deleteUserHandler(userInfo._id)}
                    >
                        Oui, supprimer
                    </Button>
                    <Button 
                    onClick={() => setShowModal(false)}
                    >
                        Non, annuler
                    </Button>

                    {loadingDelete && <Loader/>}
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </main>
    );
};

export default ProfilePage;

