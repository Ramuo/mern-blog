import { useState,  useEffect, useRef} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Button, TextInput, Modal, Alert} from 'flowbite-react';
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {toast} from 'react-toastify';
import Loader from '../components/Loader'


import {
  useUploadProfileImageMutation,
  useGetUserProfileQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} from '../slices/userApiSlice';

import { useLogoutMutation } from '../slices/authApiSlice';
import { logout } from '../slices/authSlice';





const DashProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {userInfo}= useSelector((state) => state.auth);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');

  const [showModal, setShowModal] = useState(false)

  const {
    data: profile,
    isLoading,
    error,
    refetch
  } = useGetUserProfileQuery();


  const filePickerRef = useRef();

  const [
    updateProfile, 
    {isLoading: loadingProfileUpdate}
  ] = useUpdateUserMutation();

  const [
    uploadProfileImage, 
    {isLoading: loadingProfileImg}
  ] = useUploadProfileImageMutation();

  const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();

  const [logoutApiCall] = useLogoutMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      await updateProfile({ name, email, password, image});
      toast.success('Profil modifié avec succès');
      refetch
    } catch (err) {
      toast.error(err?.data.message || err.error)
    }
  }


  useEffect(() => {
    if(profile){
      setName(profile.name);
      setEmail(profile.email);
      setPassword(profile.password);
      setImage(profile.image)
    }
  }, [profile]);



  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProfileImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteUserHandler = async (id) => {
    setShowModal(false)
    try {
      await deleteUser(id);
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("Compte supprimé avec succès");
      navigate('/register')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  };


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
    <div className='max-w-lg mx-auto p-3 w-full'>
      {isLoading ? (
        <Loader/>
      ): error ? (
        <Alert color='failure' className='mt-5'>
          {error.data.message}
        </Alert>
      ): (
        <>
          <h1 className='my-7 text-center font-semibold text-3xl'>{profile.name}</h1>
          <form className='flex flex-col gap-4' onSubmit={submitHandler}>
            <div>
              <input 
              type='text'
              placeholder='Enter image url'
              value={image || ''}
              onChange={(e) => setImage(e.target.value)}
              className='hidden'
              />
              <input 
              type="file" 
              accept='/image/*'
              onChange={uploadFileHandler}
              ref={filePickerRef}
              className='hidden'
              />
            </div>
            <div 
            className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
            onClick={() => filePickerRef.current.click()} 
            >
              <img src={ image || profile.image} alt="" className='rounded-full w-full h-full border-8 object-cover border-[lightgray] '/>
            </div>
            <TextInput 
            type='text' 
            placeholder='Nom'
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
            />
            <TextInput 
            type='email' 
            placeholder='E-mail'
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput 
            type='password' 
            placeholder='Mot de passe'
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
            />
            <Button 
            type='submit' 
            placeholder='Mot de passe'
            gradientDuoTone={'purpleToBlue'} 
            outline
            disabled= {loadingProfileUpdate || loadingProfileImg}
            >
              {loadingProfileUpdate ? 'Loading' : 'Mettre à jour'}
            </Button>
            {userInfo.isAdmin && (
              <Link to='/createpost'>
                <Button
                type='button'
                gradientDuoTone='purpleToPink'
                className='w-full'
                >
                  Créer un poste
                </Button>
              </Link>
            )
            }
          </form>
        </>
      )}
      
      <div className="text-red-500 flex justify-between mt-5">
        <span 
        className='cursor-pointer'
        onClick={logoutHandler}
        >
          Se dconnecter
        </span>
        <span 
        className='cursor-pointer'
        onClick={() => setShowModal(true)}
        >
          Supprimer le compte
        </span>
      </div>

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
              onClick={() => deleteUserHandler(profile._id)}
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
    </div>
    
  )
}

export default DashProfile;


