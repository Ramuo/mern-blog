import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Button, Alert, Spinner} from "flowbite-react";
import {toast} from "react-toastify";



import {
    useUploadPostImageMutation,
    useCreatePostMutation
} from "../../slices/postApiSlice";

const CreatePostPage = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');

    const [createPost, {isLoading, error}] = useCreatePostMutation();

    const [uploadProductImage, {error: uploadImageError}] = useUploadPostImageMutation();

    //Submit Handler function
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          await createPost({
            title,
            image,
            category,
            content,
          }).unwrap(); 
          toast.success('Le poste a été créée');
          navigate('/admin/postsList');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
    };

     //Upload image fuction
    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
          const res = await uploadProductImage(formData).unwrap();
          toast.success(res.message);
          setImage(res.image);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
    };

    return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className='text-center text-3xl my-7 font-semibold'>Créer une publication</h1>
        {error ? (
            <Alert color="failure" className='mt-5'>
                {error?.data?.message || error.error}
            </Alert>   
        ) : (    
            <form className='flex flex-col gap-4 bg-slate-800 p-6 rounded-lg' onSubmit={submitHandler}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <input 
                    type="text" 
                    placeholder="Titre" 
                    className="input input-bordered border-white  w-full flex-1 bg-neutral" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <select 
                    className="select select-bordered border-white w-full sm:max-w-xs bg-neutral"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value='uncategorized'>Choisir une catégorie</option>
                        <option value='javascript'>JavaScript</option>
                        <option value='reactjs'>React.js</option>
                        <option value='nextjs'>Next.js</option>
                        <option value='nextjs'>MongoDB</option>
                    </select>
                </div>
                <div className="flex flex-col gap-4 border-4 border-gray-400 border-dotted p-3">
                    <input
                        type='text'
                        placeholder='url image'
                        className="file-input file-input-bordered w-full hidden"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <input
                        onChange={uploadFileHandler}
                        type='file'
                        className="file-input file-input-bordered w-full"
                    />
                </div>
                {uploadImageError && <Alert color='failure'>{uploadImageError?.data?.message}</Alert>}
                {image && (
                    <img
                    src={image}
                    alt="PostImg"
                    className='w-full h-72 object-cover'
                    />
                )}
                <ReactQuill
                theme='snow'
                placeholder='Écrire ici...'
                className='h-72 mb-12 text-white'
                required
                value={content}
                onChange={setContent}
                />
                <Button type='submit' gradientDuoTone='purpleToBlue'>
                    {isLoading ? (
                        <>
                            <Spinner size='sm' />
                            <span className='pl-3'>Loading...</span>
                        </>
                    ) : (
                        "Publier"
                    )}
                </Button>
            </form>
        )}
    </div>
    )
}

export default CreatePostPage