import axios from "axios"
import { ApiURL } from "../Auth/constants"

export const ProjectToBase64 = (projectimg: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(projectimg); 
  });
};

export const getProjects = async(userID: string, token:string,) => {
  try {
    const response = await axios.get(`${ApiURL}/projects/${userID}`, {
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

export const getOneProject = async(projetID: string, token:string,) => {
  try {
    const response = await axios.get(`${ApiURL}/projects/one/${projetID}`, {
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

export const createProject = async (ProjectsData:{
  nombre: string,
  objetivo: string,
  alcance: string,
  imgProject:{
    nombre: string,
    data: string,
    type: string
  }, 
  userID: string,
  promedio: number
}, token:string) => {
  try {
    const response = await axios.post(`${ApiURL}/projects`, ProjectsData, {
      headers: {
        'x-access-token': token,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
};

export const deleteProject = async (projectID: string, token:string) => {
  try {
    const response = await axios.delete(`${ApiURL}/projects/${projectID}`,{
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

export const updateProject = async (projectID: string, ProjectsData:any, token:string) => {
  try {
    const response = await axios.patch(`${ApiURL}/projects/${projectID}`, ProjectsData, {
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