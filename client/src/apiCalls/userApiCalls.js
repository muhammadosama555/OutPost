import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { persistor } from "../redux/store";
import { loginSuccess, logoutSuccess } from "../redux/reducers/userReducers ";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";

// user to login.

export const login = async (userData) => {
  return axios.post(`${API_BASE_URL}/auth/login`, userData);
};

export const useLogin = () => {
  const dispatch = useDispatch();
  return useMutation(login, {
    onSuccess: (data) => {
      dispatch(loginSuccess(data.data));
      toast.success('User Login Sucessfully!');
    },
  });
};

