// contactsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from '../articles/operations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.contacts.items = payload;
        state.contacts.isLoading = false;
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        state.contacts.error = payload;
        state.contacts.isLoading = false;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        const index = state.contacts.items.findIndex(
          contact => contact.id === payload
        );
        state.contacts.items.splice(index, 1);
      });
  },
  selectors: {
    selectContacts: state => state.contacts.items,
    selectIsLoading: state => state.contacts.isLoading,
    selectError: state => state.contacts.error,
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { addContactSlice, deleteContactSlice } = contactsSlice.actions;
export const { selectContacts, selectIsLoading, selectError } = contactsSlice.selectors;
