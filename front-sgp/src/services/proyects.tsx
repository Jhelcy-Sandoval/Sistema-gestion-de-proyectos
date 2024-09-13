import axios from "axios"
import { ApiURL } from "../Auth/constants"

export const getProyects = async() => {
  try {
    const response = await axios.get(`${ApiURL}/proyects`)
    return response.data
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
}