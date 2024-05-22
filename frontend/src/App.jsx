

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import BlogPage from './pages/BlogPage';
import PostPage from './pages/PostPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

import UsersListPage from './pages/admin/UsersListPage';
import DashboardPage from './pages/admin/DashboardPage';
import CreatePostPage from './pages/admin/CreatePostPage';
import PostsListPage from './pages/admin/PostsListPage';
import PostEditPage from './pages/admin/PostEditPage';
import CommentsListPage from './pages/admin/CommentsListPage';


import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';



const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/blog' element={<BlogPage/>}/>
        <Route path='/search' element={<SearchPage/>}/>
        <Route path='/post/:id' element={<PostPage/>}/>

        <Route path='' element ={<PrivateRoute/>}>
          <Route path='/profile' element={<ProfilePage/>}/>
        </Route>

        <Route path='' element ={<AdminRoute/>}>
          <Route path='/admin/usersList' element={<UsersListPage/>}/>
          <Route path='/admin/dashboard' element={<DashboardPage/>}/>
          <Route path='/admin/create-post' element={<CreatePostPage/>}/>
          <Route path='/admin/postsList' element={<PostsListPage/>}/>
          <Route path='/admin/post/:id/edit' element={<PostEditPage/>}/>
          <Route path='/admin/commentsList' element={<CommentsListPage/>}/>
        </Route>
        <Route path='/*' element={<NotFoundPage/>}/>
      </Routes>
      <Footer/>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App