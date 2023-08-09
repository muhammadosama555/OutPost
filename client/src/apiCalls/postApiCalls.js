import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";

// get posts

const getPosts = async (token) => {
    return axios.get(`${API_BASE_URL}/posts`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
  };
  
  export const useGetPosts = (token) => {
    return useQuery(["posts",token], () => getPosts(token));
  };

// get post details

const getPostDetails = async (postId,token) => {
    return axios.get(`${API_BASE_URL}/posts/${postId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
  };
  
  export const useGetPostDetails = (postId,token) => {
    return useQuery(["post",postId,token], () => {
      // Only call the API when conversationId is not null
      if (postId !== null) {
        return getPostDetails(postId, token);
      }
    });
  };

  // create post

export const createPost = async (postData) => {
  console.log(postData)
  return axios.post(`${API_BASE_URL}/posts`, postData, {
    headers: {
      authorization: "Bearer " + postData.token,
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
  return axios.post(`${API_BASE_URL}/posts/${postData.postId}/like`, postData, {
    headers: {
      authorization: "Bearer " + postData.token,
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
