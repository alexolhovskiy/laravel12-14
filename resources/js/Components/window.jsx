import { useSelector } from "react-redux";
import { Autorisation } from "./autorisation";
import { Registration } from "./registration";
import { useEffect, useState } from "react";

export const Window=({isOpen,setClose})=>{
    const {message}=useSelector(store=>store.user);
    const [isLogin,setLogin]=useState(true);

    useEffect(()=>{
        if(message==='Вход выполнен успешно.'){
            handleClose();
        }
    },[message]);

    const handleClose=()=>{
        setLogin(true);
        setClose(false);
    }

    if(isOpen){
        return(
            <div className="window">
                {
                    isLogin?
                    <Autorisation/>:
                    <Registration/>
                }
                <div className="button-box">
                    <button onClick={()=>setLogin(!isLogin)}>{isLogin?"Зарегистрироваться":"Войти"}</button>
                    <button onClick={handleClose}>Отмена</button>
                </div>
            </div>
        );
    }
    return;
}