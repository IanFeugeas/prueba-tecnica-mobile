import { createReducer } from "@reduxjs/toolkit";
import contactsActions from './actions'

const { read_contacts, create_contact , edit_contact, delete_contacts } = contactsActions

const initialState = {
    contacts: []
}

const reducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            read_contacts.fulfilled,
            (state, action) => {
                let newState = {
                    ...state,
                    contacts: action.payload.contacts
                }
                return newState
            }
        )
        .addCase(
            create_contact.fulfilled,
            (state, action) => {

                let newState = {
                    ...state,
                    contacts: [action.payload.contact, ...state.contacts]
                }
                return newState
            }
        )
        .addCase(
            edit_contact.fulfilled,
            (state, action) => {
                const updatedContact = action.payload.contact;
                const newContacts = state.contacts.map(contact =>
                    contact._id === updatedContact._id ? updatedContact : contact
                );
        
                return {
                    ...state,
                    contacts: newContacts
                };
            }
        )
        .addCase(
            delete_contacts.fulfilled,
            (state, action) => {
                let newContact = state.contacts.filter((contact) => contact._id != action.payload.contacts._id)
                console.log(action.payload)
                let newState = {
                    ...state,
                    contacts: newContact

                }
                return newState
            }
        )
)

export default reducer