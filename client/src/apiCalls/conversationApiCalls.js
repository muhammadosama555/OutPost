import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";

// get conversations

const getConversations = async (token) => {
    return axios.get(`${API_BASE_URL}/conversations`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
  };
  
  export const useGetConversations = () => {
    const currentUser = store.getState().userSlice.currentUser;
    const token = currentUser ? currentUser.token : null;
    return useQuery(["conversations"], () => getConversations(token));
  };

// get conversation

const getConversation = async (conversationId,token) => {
    return axios.get(`${API_BASE_URL}/conversations/${conversationId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
  };
  
  export const useGetConversation = (conversationId) => {
    const currentUser = store.getState().userSlice.currentUser;
    const token = currentUser ? currentUser.token : null;
    return useQuery(["conversation",conversationId], () => {if (conversationId !== null) {
        return getConversation(conversationId, token);
      }});
  };

   // create conversation

export const createConversation = async (conversationData) => {
  console.log(conversationData)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.post(`${API_BASE_URL}/conversations`, conversationData, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();
  return useMutation(createConversation, {
    onSuccess: (data) => {
      toast.success('Conversation is Created Sucessfully!');
      queryClient.invalidateQueries("conversations");
    },
  });
};