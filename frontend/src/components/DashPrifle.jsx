import {useSelector} from 'react-redux';
import { Button, TextInput } from 'flowbite-react';

const DashPrifle = () => {
  const {userInfo} = useSelector((state) => state.auth);
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>{userInfo.name}</h1>
      <form className='flex flex-col gap-4'>
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img src={userInfo.profilePicture} alt="user" className='rounded-full w-full h-full border-8 object-cover border-[lightgray] '/>
        </div>
        <TextInput 
        type='text' 
        placeholder='Nom'
        defaultValue={userInfo.name}
        />
        <TextInput 
        type='email' 
        placeholder='E-mail'
        defaultValue={userInfo.email}
        />
        <TextInput 
        type='password' 
        placeholder='Mot de passe'
        />
        <Button 
        type='submit' 
        placeholder='Mot de passe'
        gradientDuoTone={'purpleToBlue'} outline
        >
          Mettre à jour
        </Button>
      </form>

      <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer'>Se dconnecter</span>
        <span className='cursor-pointer'>Supprimer le compte</span>
      </div>
    </div>
  )
}

export default DashPrifle