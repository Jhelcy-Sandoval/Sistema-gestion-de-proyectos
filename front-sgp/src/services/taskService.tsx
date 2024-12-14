import axios from "axios";
import { ApiURL } from "../Auth/constants";

export const getAllTask = async(projectID: string, token:string) => {
  try {
    const response = await axios.get(`${ApiURL}/task/${projectID}`, {
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

export const getTask = async(token:string) => {
  try {
    const response = await axios.get(`${ApiURL}/task`, {
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

export const createNewTask = async (
  formulario: {
    Título: string, 
    Descripción: string, 
    Categoría: any, 
    Responsable: string,
    projectID: string,
    Prioridad: string,
    FechaVencimiento: string,
    userID: string
  }, token: string) => {
  try {
    const response = await axios.post(`${ApiURL}/task`, formulario, {
      headers: {
        'x-access-token': token,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
}

export const updateTask = async (taskID:string, formTask:any, token:string) => {
  try {
    const response = await axios.patch(`${ApiURL}/task/${taskID}`, formTask, {
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

export const deleteTask = async (taskID: string, token:string) => {
  try {
    const response = await axios.delete(`${ApiURL}/task/${taskID}`, {
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