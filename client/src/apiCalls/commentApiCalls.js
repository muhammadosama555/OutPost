import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";



  // create comment

export const createComment = async (commentData) => {
  console.log(commentData)
  return axios.post(`${API_BASE_URL}/comments`, commentData, {
    headers: {
      authorization: "Bearer " + commentData.token,
    },
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation(createComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("posts");
    },
  });
};
