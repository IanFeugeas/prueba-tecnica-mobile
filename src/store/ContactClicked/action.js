import { createAction } from "@reduxjs/toolkit";

let contactClicked = createAction(
    'contactClicked',
    ({ state }) => {
        return {
            payload: {
                state: state
            }
        }
    }
)

const contactClickActions = {contactClicked}
export default contactClickActions