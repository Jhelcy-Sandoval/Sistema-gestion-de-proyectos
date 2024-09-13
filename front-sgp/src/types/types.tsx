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

export interface User {
  userName: {
    type: String,
    unique: true
  },
  email:{
    type: String,
    unique: true
  },
  password:{
    type: String,
    require: true
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
}

interface JwtPayload {
  id: string;
  name: string;
}
