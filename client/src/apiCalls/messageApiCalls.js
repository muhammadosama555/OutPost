import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";

// get conversation messages

const getConversationMessages = async (conversationId,token) => {
    return axios.get(`${API_BASE_URL}/messages/conversation/${conversationId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
  };
  
  export const useGetConversationsMessages = (conversationId,token) => {
    return useQuery(["conversationMessages",conversationId,token], () => {
      // Only call the API when conversationId is not null
      if (conversationId !== null) {
        return getConversationMessages(conversationId, token);
      }
    });
  };

 // create message

 export const createMessage = async (messageData) => {
  console.log(messageData)
  return axios.post(`${API_BASE_URL}/messages`, messageData, {
    headers: {
      authorization: "Bearer " + messageData.token,
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

