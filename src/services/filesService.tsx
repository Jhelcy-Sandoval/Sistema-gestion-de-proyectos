import axios from 'axios';

const ApiURL = import.meta.env.VITE_API_URL;

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

export const fileService = async (fileData:{ nombre: string, tipo: string, data: string, user: string, projectID:string, taskID: string}, token:string) => {
  try {
    const response = await axios.post(`${ApiURL}/files`, fileData, {
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

export const getoneFile = async(fileName: string) => {
  try {    
    const response = await axios.get(`${ApiURL}/files/${fileName}`)
    return response
  } catch(error) {
    console.error('Error en el registro:', error);
    throw error;
  }
}

export const getFiles = async (token: string, userID: string) => {
  try {
    const response = await axios.get(`${ApiURL}/files/${userID}`, {
      headers: {
        'x-access-token': token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};

export const getByTaskID = async (token: string, taskID: string) => {
  try {
    const response = await axios.get(`${ApiURL}/files/task/${taskID}`, {
      headers: {
        'x-access-token': token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching files by task:', error);
    throw error;
  }
};

export const deleteFile =async (fileID: string, token: string) => {
  try {
    const response = await axios.delete(`${ApiURL}/files/${fileID}`,{
      headers: {
        'x-access-token': token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
}

export const updateFile = async(fileID:string , formData:any, token:string) => {
  try {
    const response = await axios.patch(`${ApiURL}/files/${fileID}`, formData, {
      headers: {
        'x-access-token': token,
      }
    })
    return response.data
  } catch (error) {
    console.error('Error en el update:', error);
    throw error;
  }
}