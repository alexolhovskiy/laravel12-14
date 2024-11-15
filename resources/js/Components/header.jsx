import { Link } from "react-router-dom";
import { Window } from "./window";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/redux/slices/userSlice";

export const Header=()=>{
    const {message,login,token}=useSelector(store=>store.user);
    const [isOpen,setClose]=useState(false);
    const dispatch=useDispatch();
    // const [login,setLogin]=useState('');
    const handleInOut=()=>{
        if(login===''){
            setClose(true);
        }else{
            dispatch(fetchUser({url:'/api/logout',data:{login},token}));
        }
    }

    return(
        <header>
            <Window isOpen={isOpen} setClose={setClose}/>
            <nav className="header">
                <nav className="logo">
                    <Link to='/'>Partner Shop</Link>
                </nav>
                <nav className="links">
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/catalog'>Catalog</Link>
                    <p>{login!==''?login:'Гость'}</p>
                    <Link to='#' onClick={handleInOut}>{login!==''?'Выйти':'Войти'}</Link>
                </nav>
            </nav>
        </header>
    );
}