import React from "react";
import {useDispatch} from "react-redux";
import authServices from "../../appwrite-services/auth";
import {logout} from "../../store/authSlice";        

function LogoutBtn() {
        const dispatch = useDispatch();
        const logoutHandler = () =>{
                authServices.logout()
                .then(() => {
                        dispatch(logout());
                })
                .catch((error) => {
                        throw error
                })
        }
  return (
          <button className="inline-block px-6 py-2 duration-150 rounded-full font-bold text-[#ff8181] hover:bg-[#ff8181] hover:text-[#4300FF]" onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
