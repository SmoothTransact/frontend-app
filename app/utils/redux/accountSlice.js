import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "accounts",
  initialState: {
    accounts: [],
  },
  reducers: {
    dispatchAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    addAccount: (state, action) => {
      state.accounts.push(action.payload);
    },
    editAccount: (state, action) => {
      const { accountId, updatedAccount } = action.payload;
      const index = state.accounts.findIndex(
        (account) => account.id === accountId
      );
      if (index !== -1) {
        state.accounts[index] = updatedAccount;
      }
    },
    deleteAccount: (state, action) => {
      state.accounts = state.accounts.filter(
        (account) => account.id !== action.payload
      );
    },
  },
});

export const { addAccount, editAccount, deleteAccount, dispatchAccounts } =
  accountSlice.actions;
export default accountSlice.reducer;
