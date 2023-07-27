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

// User to logout

export const logout = async () => {
  return axios.get(`${API_BASE_URL}/auth/logout`);
}

export const useLogout = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
return useMutation(logout,{
  onSuccess: (data) => {
    dispatch(logoutSuccess())
    persistor.purge();
    navigate("/");
    toast.success('User is Logout Sucessfully!');
  },
})
}

// get all users

const getUsers = async ( token, search = "") => {
  console.log(search)
  return await axios.get(`${API_BASE_URL}/users?search=${search}`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useGetUsers = (token,search) => {
  return useQuery(["users", token,search], () => getUsers( token,search));
};

// get user details

const getUserDetails = async (userId, token) => {
  return axios.get(`${API_BASE_URL}/users/${userId}`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useGetUserDetails = (userId, token) => {
  return useQuery(["user", userId, token], () => getUserDetails(userId, token));
};

// create user

export const createUser = async (userData) => {
  return axios.post(`${API_BASE_URL}/auth/register`, userData);
};

export const useCreateUser = () => {
  const navigate = useNavigate();
  return useMutation(createUser, {
    onSuccess: (data) => {
      navigate("/");
      toast.success('User created Successfully!');
    },
  });
};

// Edit profile

export const updateProfile = async (userData) => {
  console.log(userData)
  return axios.put(`${API_BASE_URL}/users/${userData.userId}/profile`, userData, {
    headers: {
      authorization: "Bearer " + userData.token,
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProfile, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("user");
      toast.success('User profile updated Successfully!');
    },
  });
};

// update user image

export const updateUserImage = async (userData) => {
  return axios.put(
    `${API_BASE_URL}/users/${userData.userId}/updateUserImage`,
    userData,
    {
      headers: {
        authorization: "Bearer " + userData.token,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const useUpdateUserImage = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUserImage, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("user");
      toast.success('User image uploaded Successfully!');
    },
  });
};

// mark all notifications as read

export const readAllNotifications = async (userData) => {
  return axios.put(
    `${API_BASE_URL}/notifications/mark-read`,userData,
    {
      headers: {
        authorization: "Bearer " + userData.token,
      },
    }
  );
};

export const useReadAllNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation(readAllNotifications, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("user");
      toast.success('all notifications readed Successfully!');
    },
  });
};

