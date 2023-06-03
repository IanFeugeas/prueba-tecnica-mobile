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
const create_contact = createAsyncThunk(
    'create_contact',
    async ({body, headers }) => {
        try{
            let response = await axios.post("https://prueba-tecnica-minicrm.onrender.com/contacts/add", body ,headers)
            console.log(response.data)
            return {contact: response.data.contact }
        }catch(error){
            console.log(error.message)
        }
    }
)
const edit_contact = createAsyncThunk(
    'edit_contact',
    async ({ id, body, headers }) => {
      try {
        let response = await axios.put(
          "https://prueba-tecnica-minicrm.onrender.com/contacts/" + id,
          body,
          headers
        );
        if (response.data) {
          console.log(response.data);
          return { contact: response.data.contact };
        } else {
          throw new Error("No se encontró el objeto 'contact' en la respuesta");
        }
      } catch (error) {
        console.log(error.message);
        return null;
      }
    }
  );

const delete_contacts = createAsyncThunk(
    'delete_contacts',
    async ({id, headers}) => {
        try{
            let response = await axios.delete('https://prueba-tecnica-minicrm.onrender.com/contacts/' + id, headers)
            return { contacts: response.data.contacts }
        }catch(error){
            console.log(error)
        }
    }
) 

const actions = { read_contacts, create_contact, edit_contact, delete_contacts }
export default actions