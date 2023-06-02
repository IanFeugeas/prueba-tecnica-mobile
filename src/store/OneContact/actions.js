import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const read_contact = createAsyncThunk(
    'read_contact',
    async ({ contact_id, headers }) => {
        try {
            let response = await axios.get("https://prueba-tecnica-minicrm.onrender.com/contacts/" + contact_id, headers)
            return { contact: response.data.contact }
        } catch (error) {
            return { contact: [] }
        }
    }
)
const delete_contact = createAsyncThunk(
    'delete_contact',
    async () => {
     return null
    }
   
)


const actions = { read_contact, delete_contact}
export default actions