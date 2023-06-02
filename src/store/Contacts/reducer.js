import { createReducer } from "@reduxjs/toolkit";
import contactsActions from './actions'

const { read_contacts, delete_contacts } = contactsActions

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
            delete_contacts.fulfilled,
            (state, action) => {
                let newContact = state.contacts.filter
                let newState = {
                    ...state,
                    contacts: newContact

                }
                return newState
            }
        )
)

export default reducer