import { createReducer } from "@reduxjs/toolkit";
import contactClickActions from "./action"

const { contactClicked } = contactClickActions

const initialState = {
    state: false,
}

const contactClickReducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            contactClicked,
            (state, action) => {
                let newState = {
                    ...state,
                    state: action.payload.state,
                }
                return newState
            }
        )
)

export default contactClickReducer