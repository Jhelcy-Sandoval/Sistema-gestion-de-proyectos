import axios from 'axios';
import { ApiURL } from './constants'
import { User } from '../types/types'

export const Register = async (user:User) => {
   try {
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