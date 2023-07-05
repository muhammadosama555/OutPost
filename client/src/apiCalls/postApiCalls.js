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