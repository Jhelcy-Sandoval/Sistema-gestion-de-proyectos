import axios from "axios";

const ApiURL = import.meta.env.VITE_API_URL;

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