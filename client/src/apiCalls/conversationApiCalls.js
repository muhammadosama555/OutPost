import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";



const getConversations = async (token) => {
    return axios.get(`${API_BASE_URL}/conversations`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
  };
  
  export const useGetConversations = (token) => {
    return useQuery(["conversations",token], () => getConversations(token));
  };

// get conversation

const getConversation = async (conversationId,token) => {
    return axios.get(`${API_BASE_URL}/conversations/${conversationId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
  };
  
  export const useGetConversation = (conversationId,token) => {
    return useQuery(["conversation",conversationId,token], () => {if (conversationId !== null) {
        return getConversation(conversationId, token);
      }});
  };

   // create conversation

export const createConversation = async (conversationData) => {
  console.log(conversationData)
  return axios.post(`${API_BASE_URL}/conversations`, conversationData, {
    headers: {
      authorization: "Bearer " + conversationData.token,
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