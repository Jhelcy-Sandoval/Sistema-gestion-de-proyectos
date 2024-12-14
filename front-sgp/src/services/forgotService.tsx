import axios from "axios";
import { ApiURL } from "../Auth/constants";

export const verifyEmail = async (formValues:{email:string}) => {
  try {        
    const response = await axios.post(`${ApiURL}/forgot`, formValues);

    return response.data

  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
}

export const resetPassword = async (email: string, formData: any, token: string) => {
  try {
    const response = await axios.patch(`${ApiURL}/user/reset/${email}`, formData, {
      headers: {
        'x-access-token': token,
      }
    })

    return response.data;
    
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
}