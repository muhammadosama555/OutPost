import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { persistor } from "../redux/store";
import { loginSuccess, logoutSuccess } from "../redux/reducers/userReducers ";
import { useDispatch } from "react-redux";
import showToast from "../components/Toast";
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
      if (data.data.user.role === "foreman") {
        showToast("User logged in Successfully!", "success");
      } else {
        showToast("User is Unauthorized!", "error");
      }
    },
  });
};

// User to logout

export const logout = async () => {
  return axios.get(`${API_BASE_URL}/auth/logout`);
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation(logout, {
    onSuccess: (data) => {
      dispatch(logoutSuccess());
      persistor.purge();
      navigate("/");
      showToast("User logout Successfully!", "success");
    },
  });
};

// get formen details

const getUserDetails = async (userId, token) => {
  return axios.get(`${API_BASE_URL}/foreman/${userId}`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useGetUserDetails = (userId, token) => {
  return useQuery(["user", userId, token], () => getUserDetails(userId, token));
};

// foreman to change password

export const changePassword = async (userData) => {
  return axios.post(`${API_BASE_URL}/auth/change-password`, userData, {
    headers: {
      authorization: "Bearer " + userData.token,
    },
  });
};

export const useChangePassword = () => {
  return useMutation(changePassword, {
    onSuccess: (data) => {
      showToast("Password changed Successfully!", "success");
    },
  });
};

// Generate Password

export const generatePassword = async (userData) => {
  return axios.put(`${API_BASE_URL}/auth/resetPassword`, userData);
};

export const useGeneratePassword = () => {
  const navigate = useNavigate();
  return useMutation(generatePassword, {
    onSuccess: (data) => {
      navigate("/");
      showToast("Password Generated Successfully!", "success");
    },
  });
};

// Generate Otp

export const generateOtp = async (userData) => {
  return axios.post(`${API_BASE_URL}/auth/generateOtp`, userData);
};

export const useGenerateOtp = () => {
  return useMutation(generateOtp, {
    onSuccess: (data) => {
      showToast("OTP Generated Successfully!", "success");
    },
  });
};
