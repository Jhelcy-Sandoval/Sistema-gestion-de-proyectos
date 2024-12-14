import {ReactNode} from 'react'

export interface AuthResponse {
  body: {
    user: User;
    accessToken: string;
    refreshToken: string;
  }
}

export interface AuthResponseError {
  body: {
    error: string;
  }
}

export interface ResponseError {
  message: string; 
}

export interface User {
  userName: {
    type: string,
    unique: true
  },
  email:{
    type: string,
    unique: true
  },
  password:{
    type: string,
    require: true
  },
  foto: {
    nombre: { type: string, required: true },
    data: { type: string, required: true }, 
    type: { type: string, required: true }
  },
  rol: Array<{
    ref: Roles;
    type: Object;
  }>;
}

export interface Roles {
  name:{
    type: string
  }
}

export interface AuthContextType {
  signup:(userData: any) =>Promise<void>;
  signin:(userData: any) =>Promise<void>;
  logout: (userData: any) =>Promise<void>;
  isLogin:string;
  user: any;
  isAuthenticated: boolean;
  error: AuthResponseError | null;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface File {
  nombre: {
    type: string;
    unique: boolean;
  };
  tipo: {
    type: string;
  };
  data: {
    type: string;
  };
  user:{
    type: string
  };
  projectID: {
    type: string
  };
  taskID:{
    type: string
  };
}

export interface Projects {
  nombre: string,
  objetivo: string,
  alcance: string,
  _id: string
}

type Prioridad = 'baja' | 'media' | 'alta';
type Estado = 'pendiente' | 'en progreso' | 'completado' | 'bloqueada';

export interface Comentario {
  autor: string;
  mensaje: string;
  fecha: Date;
}

export interface Task {
  Título: string;               
  Descripción?: string;          
  Categoría: string[];        
  Responsable?: string;          
  projectID: string;     
  userID: string;        
  Prioridad: Prioridad;           
  FechaInicio: Date;              
  FechaVencimiento: Date;         
  Estado: Estado;                
  Progreso: number;               
  Comentarios?: Comentario[];
  _id: string;     
}

export interface SubTask {
  name: string,
  hecho: boolean,
  taskID:string,
  _id: string
}

export interface Categoria {
  name: string,
  _id: string,
  userID: string
}