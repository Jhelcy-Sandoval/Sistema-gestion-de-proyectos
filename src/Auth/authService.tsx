import axios from 'axios';
import { User } from '../types/types'

const ApiURL = import.meta.env.VITE_API_URL;

export const Register = async (user:User) => {
   try {
    console.log(user)
    const response = await axios.post(`${ApiURL}/auth/signup`, user);
    return response.data; 
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error; 
  }
}

export const Login = async (user:User) => {
  try {
    const response = await axios.post(`${ApiURL}/auth/signin`, user);
    return response.data; 
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error; 
  }
}