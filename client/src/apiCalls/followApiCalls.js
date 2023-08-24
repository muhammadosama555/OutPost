import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";



  // follow user

export const followUser = async (followData) => {
  console.log(followData)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.post(`${API_BASE_URL}/follows`, followData, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation(followUser, {
    onSuccess: (data) => {
      toast.success('follow Sucessfully!');
      queryClient.invalidateQueries("users");
      queryClient.invalidateQueries("user");
    },
  });
};

  // unfollow user

export const unFollowUser = async (unFollowData) => {
  console.log(unFollowData)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.delete(`${API_BASE_URL}/follows/unfollow/${unFollowData.followingId}`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useUnFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation(unFollowUser, {
    onSuccess: (data) => {
      toast.success('unfollow Sucessfully!');
      queryClient.invalidateQueries("user");
      queryClient.invalidateQueries("users");
    },
  });
};
