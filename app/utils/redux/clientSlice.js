import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
  },
  reducers: {
    dispatchClients: (state, action) => {
      state.clients = action.payload;
    },
    addClient: (state, action) => {
      state.clients.push(action.payload);
    },
    editClient: (state, action) => {
      const { clientId, updatedClient } = action.payload;
      const index = state.clients.findIndex((client) => client.id === clientId);
      if (index !== -1) {
        state.clients[index] = updatedClient;
      }
    },
    deleteClient: (state, action) => {
      state.clients = state.clients.filter(
        (client) => client.id !== action.payload
      );
    },
  },
});

export const { addClient, editClient, deleteClient, dispatchClients } =
  clientSlice.actions;
export default clientSlice.reducer;
