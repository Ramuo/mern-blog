import { useState,  useEffect} from 'react';
// import { useParams } from 'react-router-dom';
// import {useSelector} from 'react-redux';
import { Button, TextInput} from 'flowbite-react';
import {toast} from 'react-toastify';
import Loader from '../components/Loader'

// TextInput, Spinner

import {
    useUploadProfileImageMutation,
    useGetUserProfileQuery,
    useUpdateUserMutation,
  } from '../slices/userApiSlice'


const TestPage = () => {
  

    const [profilePicture, setProfilePicture] = useState('');
   


    const {
        data: profile, 
        isLoading, 
        refetch, 
        error
    } = useGetUserProfileQuery();
    

    const [
        updateProduct, 
        {isLoading: loadingUpdate}
    ] = useUpdateUserMutation();


    const [
        uploadProductImage,
        {isLoading: loadingUpload}
    ] =  useUploadProfileImageMutation()
   
    //FUNCTIONS:
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await updateProduct({
              profilePicture
               
            });

            toast.success('Produit éditer avec succèss');
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    useEffect(() => {
        if(profile){
            setProfilePicture(profile.profilePicture)
        }
    }, [profile]);

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setProfilePicture(res.profilePicture);
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    };


    
    //RENDERED ELEMENTS:
    return (
    <>
        

        <div>

            <h1>Éditer un produit</h1>

            {loadingUpdate && <Loader/>}

            {isLoading ? (
                <Loader/>
            ) : error ? (
                <h1>{error.data.message}</h1>
            ) : (
                 <form onSubmit={submitHandler}>
                    <div>
                        <TextInput
                        type='text'
                        placeholder='Image du produit'
                        value={profilePicture}
                        onChange={(e) => setProfilePicture(e.target.value)}
                        />
                        <TextInput
                        type='file'
                        label= "Choisir un fichier"
                        onChange={uploadFileHandler}
                        />
                        {loadingUpload && <Loader/>}
                    </div> 
                    <Button
                    type='submit' 
                    placeholder='Mot de passe'
                    gradientDuoTone={'purpleToBlue'} outline
                    >
                        Éditer
                    </Button>
                 </form>
            )}
        </div>
    </>
    );
};

export default TestPage;