import { createReducer } from "@reduxjs/toolkit";
import detailsClickActions from './actions'

const { detailsClicked } = detailsClickActions

const initialState = {
    state: false,
}

const detailsClickReducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            detailsClicked,
            (state, action) => {
                let newState = {
                    ...state,
                    state: action.payload.state,
                }
                return newState
            }
        )
)

export default detailsClickReducer