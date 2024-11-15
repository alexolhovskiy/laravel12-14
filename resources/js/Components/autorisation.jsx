import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchUser } from "../redux/slices/userSlice";

export const Autorisation=()=>{
    
    const dispatch=useDispatch();
    const [login,setLog]=useState('');
    const [pass,setPass]=useState('');
    const [checkBox,setCheckBox]=useState(false);


    const autFunc=(e)=>{
        e.preventDefault();
        dispatch(fetchUser({url:'/api/aut',data:{login,pass,checkBox},token:''}));
        // if(checkBox){
        //     localStorage.setItem('login', login);
        // }
        // else{
        //     localStorage.setItem('login', '');
        // }
    }


    return(
        <div>
            <form onSubmit={autFunc} className="aut-box">
                <input id="aut-log" type="text" onChange={(e)=>setLog(e.target.value)} value={login} placeholder="Логин"/>
                <input id="aut-pass" type='text' onChange={(e)=>setPass(e.target.value)} value={pass} placeholder="Пароль"/>
                <button type='submit'>Войти</button>
                <label><input type='checkbox' onChange={()=>setCheckBox(prevCheckBox => !prevCheckBox)} checked={checkBox} />Запомнить меня </label>
            </form>
        </div>
    );
}