import { message } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentUser } from '../action/users'
import { HideLoading, ShowLoading } from "../reducers/loader_reducer"
import { SetUser } from "../reducers/user_reducer"

function AuthPage({children}) {
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = async() => {
        try {
            dispatch(ShowLoading());
            const response = await CurrentUser();
            dispatch(HideLoading());
            if(response.succese){
                dispatch(SetUser(response.data));
            }else{
                dispatch(SetUser(null));
                message.error(response.message);
                localStorage.removeItem("token");
                navigate("/login");
            }
        }catch(error){
            dispatch(HideLoading());
            dispatch(SetUser(null));
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
    <div>
        {user.name}
        {children}
    </div>
    )
  )
}

export default AuthPage