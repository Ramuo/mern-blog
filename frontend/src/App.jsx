import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import CreatePostPage from './pages/CreatePostPage';
import UpdatePostPage from './pages/UpdatePostPage';

import Header from './components/Header';
import Footer from './components/Footer';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';


const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/projects' element={<ProjectsPage/>}/>
        {/* <Route path='/test' element={<TestPage/>}/> */}
        

        <Route path='' element ={<PrivateRoute/>}>
          <Route path='/dashboard' element={<DashboardPage/>}/>
        </Route>

        <Route path='' element ={<AdminRoute/>}>
          <Route path='/createpost' element={<CreatePostPage/>}/>
          <Route path='/updatepost/:postId' element={<UpdatePostPage/>}/>
        </Route>
      </Routes>
      <Footer/>
      <ToastContainer className={'toast-position'}/>
    </BrowserRouter>
  )
}

export default App