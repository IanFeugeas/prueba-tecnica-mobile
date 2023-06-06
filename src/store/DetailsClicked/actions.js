import { createAction } from "@reduxjs/toolkit";

let detailsClicked = createAction(
    'detailsClicked',
    ({ state }) => {
        return {
            payload: {
                state: state
            }
        }
    }
)

const detailsClickActions = {detailsClicked}
export default detailsClickActions