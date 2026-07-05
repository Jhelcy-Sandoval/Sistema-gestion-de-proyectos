import axios from "axios";

const ApiURL = import.meta.env.VITE_API_URL;

export const getAllCategories = async(token:string, projectID:string) => {
  try {
    const response = await axios.get(`${ApiURL}/categories/${projectID}`, {
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

export const getCategories = async(token:string) => {
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

export const createCategories = async(dataForm:{ name: string, projectId: string, userId:string}, token: string) => {
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