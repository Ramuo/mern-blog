import React from 'react';
import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePostPage = () => {
    return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className='text-center text-3xl my-7 font-semibold'>Créer une publication</h1>
        <form className='flex flex-col gap-4'>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput 
                type='text' 
                placeholder='Titre' 
                required id='title' 
                className='flex-1'
                />
                <Select>
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
                <FileInput type='file' accept='image/*'/>
                <Button
                type='button'
                gradientDuoTone='purpleToBlue'
                size='sm'
                outline
                >
                    Télécharger une image
                </Button>
            </div>
            <ReactQuill 
            theme='snow' 
            placeholder='Votre message...' 
            className='h-72 mb-12'
            required
            />
            <Button
            type='submit'
            gradientDuoTone='purpleToPink'>
                Publier
            </Button>
        </form>
    </div>
    );
};

export default CreatePostPage;