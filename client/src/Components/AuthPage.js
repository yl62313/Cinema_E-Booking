import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {CurrentUser} from "../action/users"


function AuthPage({children}) {
    const navigate = useNavigate();
    const [user,setUser] = useState(null);

    const currentUser = async() => {
        try {
            const response = await CurrentUser();
            if(response.succese){
                setUser(response.data);
            }else{
                setUser(null);
                message.error(response.message);
            }
        }catch(error){
            setUser(null);
            message.error(error.message);
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("token")){
            currentUser();
        }else{
            navigate('/login');
        }
    }, []);

  return (
    user && (
    <div className="layout p-1">
        {user.name}
        {children}
    </div>
    )
  )
}

export default AuthPage
