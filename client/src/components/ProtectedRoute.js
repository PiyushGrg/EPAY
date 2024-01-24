import React, { useEffect } from "react";
import { message } from "antd";
import { GetUserInfo } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReloadUser, SetUser } from "../redux/usersSlice";
import DefaultLayout from "./DefaultLayout";
import { ShowLoading , HideLoading } from "../redux/loadersSlice"

function ProtectedRoute(props) {
  
  const {user,reloadUser} = useSelector((state) => {
    return state.users;
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetUserInfo();
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        dispatch(SetUser(response.data));
      }
      else{
        message.error(response.message);
        navigate("/login");
      }
      dispatch(ReloadUser(false));
    } catch (error) {
        dispatch(HideLoading());
        navigate("/login");
        message.error(error.message);
    }
  };

  useEffect(() => {
    if(localStorage.getItem("token")){
        if(!user){
            getData();
        }
    }
    else{
        navigate("/login");
    }
  }, []);

  useEffect(() => {
    if(reloadUser){
      getData();
    }
  },[reloadUser]);

  return ( 
    user && (
        <div>
            <DefaultLayout>
                {props.children}
            </DefaultLayout>
        </div>
    )
  );
}

export default ProtectedRoute;
