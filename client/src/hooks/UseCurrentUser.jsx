import React, { useEffect } from "react";
import { axiosInstance } from "../config/axios.js";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

const UseCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axiosInstance.get("/api/user/me", {
          withCredentials: true,
        });
        dispatch(setUserData(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    getCurrentUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default UseCurrentUser;
