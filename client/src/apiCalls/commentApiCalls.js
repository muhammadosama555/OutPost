import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";



  // create comment

export const createComment = async (commentData) => {
  console.log(commentData)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.post(`${API_BASE_URL}/comments`, commentData, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation(createComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("post");
    },
  });
};
