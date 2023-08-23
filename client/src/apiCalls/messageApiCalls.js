import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";


export const getConversationMessages = async (conversationId, token) => {
  return axios.get(`${API_BASE_URL}/messages/conversation/${conversationId}`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useGetConversationsMessages = (conversationId) => {
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;

  const queryClient = useQueryClient();
  return useQuery(["conversationMessages", conversationId], () => {
    // Only call the API when conversationId is not null
    if (conversationId !== null && token) {
      return getConversationMessages(conversationId, token);
    }
  });
};

export const createMessage = async (messageData) => {
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;

  return axios.post(`${API_BASE_URL}/messages`, messageData, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation(createMessage, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("conversationMessages");
    },
  });
};