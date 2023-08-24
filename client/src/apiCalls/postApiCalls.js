import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";

// get posts

const getPosts = async (token) => {
    return axios.get(`${API_BASE_URL}/posts`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
  };
  
  export const useGetPosts = () => {
    const currentUser = store.getState().userSlice.currentUser;
    const token = currentUser ? currentUser.token : null;
    return useQuery(["posts"], () => getPosts(token));
  };

// get post details

const getPostDetails = async (postId,token) => {
    return axios.get(`${API_BASE_URL}/posts/${postId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
  };
  
  export const useGetPostDetails = (postId) => {
    const currentUser = store.getState().userSlice.currentUser;
    const token = currentUser ? currentUser.token : null;
    return useQuery(["post",postId], () => {
      // Only call the API when conversationId is not null
      if (postId !== null && token) {
        return getPostDetails(postId, token);
      }
    });
  };

  // create post

export const createPost = async (postData) => {
  console.log(postData)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.post(`${API_BASE_URL}/posts`, postData, {
    headers: {
      authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useCreatePost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(createPost, {
    onSuccess: (data) => {
      navigate("/");
      toast.success('Post is Created Sucessfully!');
      queryClient.invalidateQueries("posts");
    },
  });
};

  // like post

export const likePost = async (postData) => {
  console.log(postData)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.post(`${API_BASE_URL}/posts/${postData.postId}/like`, postData, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation(likePost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("post");
      queryClient.invalidateQueries("posts"); 
    },
  });
};
