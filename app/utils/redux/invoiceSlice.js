import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
  },
  reducers: {
    dispatchInvoices: (state, action) => {
      state.invoices = action.payload;
    },
    addInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
    editInvoice: (state, action) => {
      const { invoiceId, updatedInvoice } = action.payload;
      const index = state.invoices.findIndex(
        (invoice) => invoice.id === invoiceId
      );
      if (index !== -1) {
        state.invoices[index] = updatedInvoice;
      }
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload
      );
    },
  },
});

export const { addInvoice, editInvoice, deleteInvoice, dispatchInvoices } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
