import axios from "axios";
import { ApiURL } from "../Auth/constants";

export const getOneRole = async(role: any, token: string) => {
  try {
    const response = await axios.get(`${ApiURL}/roles/${role}`, {
      headers: {
        'x-access-token': token,
      }
    })
    return response.data
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
}