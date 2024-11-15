import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/slices/userSlice";

export const Registration=()=>{
    // const {response}=useSelector(store=>store.user)
    const dispatch=useDispatch();
    const [login,setLog]=useState('');
    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');
    const [rpass,setRPass]=useState('');
    const [checkBox,setCheckBox]=useState(false);

    // useEffect(()=>{
    //     if(response==='Регистрация прошла успешно.'){
            
    //     }
    // },[response])

    const regFunc=(e)=>{
        e.preventDefault();
        dispatch(fetchUser({url:'/api/reg',data:{login,email,pass,rpass,checkBox},token:''}));
        // if(checkBox){
        //     localStorage.setItem('login', login);
        // }
        // else{
        //     localStorage.setItem('login', '');
        // }
    }
    return(
        <div>
            <form onSubmit={regFunc} className="reg-box">
                <input type='text' id="reg-log" onChange={(e)=>setLog(e.target.value)} value={login} placeholder="Логин" />
                <input type='text' id="reg-mail" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Email" />
                <input type='text' id="reg-pass" onChange={(e)=>setPass(e.target.value)} value={pass} placeholder="Пароль"/>
                <input type='text' id="reg-rpass" onChange={(e)=>setRPass(e.target.value)} value={rpass} placeholder="Повторить Пароль"/>
                <button type='submit'>Регистрация</button>
                <label><input type='checkbox' onChange={()=>setCheckBox(prevCheckBox => !prevCheckBox)} checked={checkBox} />Запомнить меня </label>
            </form>
        </div>
    );
}