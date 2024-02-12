import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";

// get all reels

const getReels = async () => {
   const currentUser = store.getState().userSlice.currentUser;
   const token = currentUser ? currentUser.token : null;
   return await axios.get(`${API_BASE_URL}/reels`, {
     headers: {
       authorization: "Bearer " + token,
     },
   });
 };
 
 export const useGetReels = () => {
   return useQuery("reels",getReels);
 };

 // create reel

export const createReel = async (reelData) => {
  console.log(reelData)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.post(`${API_BASE_URL}/reels`, reelData, {
    headers: {
      authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useCreateReel = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(createReel, {
    onSuccess: (data) => {
      navigate("/reels");
      toast.success('Reel is Created Sucessfully!');
      queryClient.invalidateQueries("reels");
    },
  });
};

// like post

export const likeReel = async (reelData) => {
  console.log(reelData)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.post(`${API_BASE_URL}/reels/${reelData.reelId}/like`, reelData, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useLikeReel = () => {
  const queryClient = useQueryClient();
  return useMutation(likeReel, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("reels"); 
    },
  });
};
