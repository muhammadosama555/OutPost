import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState: {
    searchHistories: {}, // Use an object to store search histories for each user
  },
  reducers: {
    addSearchHistory: (state, action) => {
      const { userId, entry } = action.payload;
      // Add the search entry to the user's search history array
      if (!state.searchHistories[userId]) {
        state.searchHistories[userId] = [];
      }
      state.searchHistories[userId].push(entry);
    },
    clearSearchHistory: (state, action) => {
      const { userId } = action.payload;
      // Clear the search history for the user
      state.searchHistories[userId] = [];
    },
  },
});

export const { addSearchHistory, clearSearchHistory } = searchSlice.actions;

export default searchSlice.reducer;
