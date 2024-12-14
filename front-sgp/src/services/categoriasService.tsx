import axios from "axios";
import { ApiURL } from "../Auth/constants";

export const getAllCategories = async(token:string,) => {
  try {
    const response = await axios.get(`${ApiURL}/categories`, {
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

export const createCategories = async(dataForm:{ name: string, projectID: string}, token: string) => {
  try {
    const response = await axios.post(`${ApiURL}/categories`, dataForm, {
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

export const deleteCategoria = async(categoriaID: string, token: string) => {
  try {
    const response = await axios.delete(`${ApiURL}/categories/${categoriaID}`, {
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