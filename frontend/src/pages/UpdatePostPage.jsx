
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { Button, FileInput, Select, Spinner, TextInput, Alert } from 'flowbite-react';
import 'react-quill/dist/quill.snow.css';
import {toast} from 'react-toastify'

import {
    useUploadPostImgMutation,
    useCreatePostMutation
} from '../slices/postApiSlice';

const UpdatePostPage = () => {
    const navigate = useNavigate();
 

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    
    console.log(title, category, content)

    const [
        uploadPostImg, 
        {isLoading: loadingPostImg}
    ] = useUploadPostImgMutation();

    const [
        createpost, 
        {isLoading: loadingCreatepost, error: createPostError}
    ] = useCreatePostMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await createpost({title, category, image, content}).unwrap();
            navigate(`/posts/${res.slug}`);  
            toast.success('Publication Créée avec succès');      
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }


    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        console.log(formData)

        try {
            const res = await uploadPostImg(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    };


    return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className='text-center text-3xl my-7 font-semibold'>Créer une publication</h1>
        <form className='flex flex-col gap-4' onSubmit={submitHandler}>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput 
                type='text' 
                value={title}
                placeholder='Titre' 
                className='flex-1'
                onChange={(e) => setTitle(e.target.value)}
                />
                <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                    <option value='uncategorized'>Choisir...</option>
                    <option value='javacript'>Javacript</option>
                    <option value='reactjs'>React.JS</option>
                    <option value='css'>CSS</option>
                    <option value='nodejs'>Node JS</option>
                    <option value='mongodb'>Mongo DB</option>
                    <option value='html'>HTML</option>
                </Select>
            </div>
            <div 
            className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                <FileInput 
                type='file' 
                accept='image/*'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                />
                <Button
                type='button'
                gradientDuoTone='purpleToBlue'
                size='sm'
                outline
                onClick={uploadFileHandler}
                disabled={loadingPostImg}
                >
                    {loadingPostImg ? (
                        <>
                            <Spinner size='sm' />
                            <span className='pl-3'>Loading...</span>
                        </>
                    ): (
                        'Télécharger une image'
                    )
                    }
                </Button>
            </div>
            <textarea
            rows="5"
            cols="10"
            className="rounded-lg appearance-none block w-full py-3 px-3 text-base leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
            type="text"
            value={content}
            placeholder='Votre message'
            onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <Button
            type='submit'
            gradientDuoTone='purpleToPink'>
                {loadingCreatepost ? (
                    <>
                        <Spinner size='sm' />
                        <span className='pl-3'>Loading...</span>
                    </>
                ) : (
                    "Publier"
                ) 
                }
            </Button>
            {createPostError && (
                <Alert className='mt-5' color='failure'>
                    {createPostError?.data?.message || createPostError.error}
                </Alert>
            )}
        </form>
    </div>
    );
};

export default UpdatePostPage;