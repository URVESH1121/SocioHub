import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorPage from '../components/common/ErrorPage';
import Login from '../view/auth/Login';
import SignUp from '../view/auth/SignUp';
import Home from '../view/home/Home';
import Profile from '../view/home/Profile';
import Setting from '../view/home/Setting';
import PostGallery from '../view/post/PostGallery';
import PrivateRoute from './PrivateRoute';

const RouteLinks = () => {
    return (
        <>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route exact path='/' element={<Home />} >
                        <Route path='/' element={<Navigate to="/posts" />} />
                        <Route path='/posts' element={<PostGallery />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/setting' element={<Setting />} />
                        <Route path='*' element={<ErrorPage />} />
                    </Route>
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
            </Routes>
        </>
    )
}

export default RouteLinks