import { configureStore } from '@reduxjs/toolkit'
import bottomTabsReducer from './ReloadBottomTabs/reducer'
import textReducer from "./SearchBar/reducer"
import contactReducer from "./Contacts/reducer"
import contactClickReducer from './ContactClicked/reducer'
import oneContactReducer from "./OneContact/reducer"

export const store = configureStore({
    reducer: {
        bottomTabsReducer: bottomTabsReducer,
        text: textReducer,
        contacts: contactReducer,
        contactClickReducer: contactClickReducer,
        oneContact: oneContactReducer
    }
})