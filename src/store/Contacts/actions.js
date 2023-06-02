import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const read_contacts = createAsyncThunk(
    'read_contacts',
    async ({ inputText, headers }) => {
        try{
            let response = await axios.get("https://prueba-tecnica-minicrm.onrender.com/contacts/?&name="+inputText.trim(),headers)
            return { contacts: response.data.contacts }
        }catch(error){
            return { contacts: '' }
        }
    }
) 

const actions = { read_contacts }
export default actions