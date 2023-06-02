import { createReducer } from "@reduxjs/toolkit";
import actions from './actions'


const { read_contact, delete_contact } = actions

const initialState = {
    contact: [],
}

const reducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(read_contact.fulfilled,
            (state, action) => {
                let newState = {
                    ...state,
                    contact: action.payload.contact
                }
                return newState
            }
        )
        .addCase(
            delete_contact.fulfilled,
            (state, action) => {
                let newState = {
                    contact: []

                }
                return newState
            }
        )
)

export default reducer