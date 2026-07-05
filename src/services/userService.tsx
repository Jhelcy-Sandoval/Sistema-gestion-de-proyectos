import axios from "axios"

const ApiURL = import.meta.env.VITE_API_URL;

export const fotoToBase64 = (foto: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(foto); 
  });
};

export const getOneUser = async(userData: string, token: string) => {
  try {
    const response = await axios.get(`${ApiURL}/user/${userData}`, {
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

export const updateUser = async(user:string , formData:any, token:string) => {
  try {
    const response = await axios.patch(`${ApiURL}/user/${user}`, formData, {
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

export const getDevelopers = async (token: string) => {
  try {
    const response = await axios.get(`${ApiURL}/user/developers`, {
      headers: {
        'x-access-token': token,
      }
    })
    return response.data
  } catch (error) {
    console.error("Error al obtener los desarrolladores:", error);
    throw error;
  }
};
