import React, { useEffect, useState } from 'react';
import {Home} from './Pages/home';
import { Catalog } from './Pages/catalog';
import { About } from './Pages/about';
import {useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { fetchUser } from './redux/slices/userSlice';

function Main() {
    const dispatch = useDispatch();
    const {token}=useSelector(store=>store.user);

    useEffect(() => {
        dispatch(fetchUser({url:'/api/access_token',data:{},token:token}));
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log(token);
            dispatch(fetchUser({url:'/api/access_token',data:{},token:token}));
        }, 2 * 60 * 1000); // Обновляем каждые 15 минут

        return () => clearInterval(intervalId); // Чистка интервала при размонтировании компонента
    }, [dispatch,token]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/catalog" element={<Catalog/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </BrowserRouter>
    )
  }
  
  export default Main;