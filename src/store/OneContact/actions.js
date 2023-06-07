import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const read_contact = createAsyncThunk(
    'read_contact',
    async ({ id, headers }) => {
        try {
            let response = await axios.get("https://prueba-tecnica-minicrm.onrender.com/contacts/" + id, headers)
            
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