import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";



  // follow user

export const followUser = async (followData) => {
  console.log(followData)
  return axios.post(`${API_BASE_URL}/follows`, followData, {
    headers: {
      authorization: "Bearer " + followData.token,
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
  return axios.delete(`${API_BASE_URL}/follows/unfollow/${unFollowData.followingId}`, {
    headers: {
      authorization: "Bearer " + unFollowData.token,
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
