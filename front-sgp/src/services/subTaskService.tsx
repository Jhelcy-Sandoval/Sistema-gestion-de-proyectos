import axios from "axios";
import { ApiURL } from "../Auth/constants";

export const getAllSubTask = async(taskID: string, token:string) => {
  try {
    const response = await axios.get(`${ApiURL}/subTask/${taskID}`, {
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

export const createSubTask = async(subTaskForm:{name: string, hecho: boolean, taskID:string}, token: string) => {
  try {
    const response = await axios.post(`${ApiURL}/subTask`, subTaskForm, {
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

export const deleteSubTask = async(subTaskID:string ,token: string) => {
  try {
    const response = await axios.delete(`${ApiURL}/subTask/${subTaskID}`, {
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

export const updateSubTask = async (subTaskID:string, subTaskForm:{hecho:boolean}, token: string) => {
  try {
    const response = await axios.patch(`${ApiURL}/subTask/${subTaskID}`, subTaskForm, {
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