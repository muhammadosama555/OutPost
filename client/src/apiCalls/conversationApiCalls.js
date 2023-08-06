import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";

// get conversations

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