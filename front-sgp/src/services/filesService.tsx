import axios from 'axios';
import { ApiURL } from '../Auth/constants';
import { useAuth } from '../context/AuthContext';

export const fileToBase64 = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file); 
  });
};

export const fileService = async (fileData: { nombre: string; tipo: string; data: string }) => {
  try {
    const response = await axios.post(`${ApiURL}/files`, fileData);
    return response.data;
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
};

export const getoneFile = async(fileName: string) => {
  try {
    const response = await axios.get(`${ApiURL}/files/${fileName}`)
    return response
  } catch(error) {
    console.error('Error en el registro:', error);
    throw error;
  }
}

export const getFiles = async(token: string) => {
  try {
    const response = await axios.get(`${ApiURL}/files`, {
      headers: {
        'x-access-token': token,
      },
    })
    return response.data
  } catch (error) {
    
  }
}