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

  // create post

export const createPost = async (postData) => {
  return axios.post(`${API_BASE_URL}/posts`, postData, {
    headers: {
      authorization: "Bearer " + postData.token,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useCreatePost = () => {
  const navigate = useNavigate();
  return useMutation(createPost, {
    onSuccess: (data) => {
      navigate("/");
      toast.success('Post is Created Sucessfully!');
    },
  });
};
