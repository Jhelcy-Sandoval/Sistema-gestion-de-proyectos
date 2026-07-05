import { ReactNode } from "react";

export interface AuthResponse {
  body: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthResponseError {
  body: {
    error: string;
  };
}

export interface ResponseError {
  message: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  foto?: {
    nombre: string;
    data: string;
    type: string;
  };
  role: "admin" | "manager" | "developer";
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthContextType {
  signup: (userData: any) => Promise<void>;
  signin: (userData: any) => Promise<void>;
  logout: (userData: any) => Promise<void>;
  isLogin: string;
  user: any;
  isAuthenticated: boolean;
  error: AuthResponseError | null;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface File {
  _id: string;
  nombre: string;
  tipo: string;
  data: string;
  userId: string;
  projectId?: string;
  taskId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comentario {
  autor: string;
  mensaje: string;
  fecha: Date;
}

export type TaskStatus = "todo" | "in_progress" | "review" | "done";

export type TaskPriority = "low" | "medium" | "high";

export interface UserTask {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "developer";
  avatar?: string;
}

export interface TaskComment {
  _id?: string;
  userId: UserTask | string;
  comment: string;
  createdAt: string;
}

export interface TaskAttachment {
  name: string;
  url: string;
  type: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  progress: number;
  priority: TaskPriority;
  projectId: string;
  categoryId: string;
  userId: UserTask | string;
  assignedTo?: UserTask | string | null;
  estimatedHours?: number;
  actualHours?: number;
  startDate?: string;
  dueDate?: string;
  completedAt?: string;
  labels?: string[];
  attachments?: TaskAttachment[];
  comments?: TaskComment[];
  createdAt: string;
  updatedAt: string;
}

export interface SubTask {
  _id: string;
  name: string;
  description?: string;
  taskId: string;
  userId: string;
  assignedTo?: UserTask | string | null;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  progress: number;
  estimatedHours?: number;
  actualHours?: number;
  startDate?: string;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Categoria {
  _id: string;
  name: string;
  projectId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectsFetchProps {
  selectedProject: string;
  setSelectedProject: any;
}

export interface UserProject {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "developer";
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectImage {
  nombre: string;
  data: string;
  type: string;
}

export interface ProjectMetrics {
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  reviewTasks: number;
  completedTasks: number;
  totalCategories: number;
  totalSubTasks: number;
  estimatedHours: number;
  actualHours: number;
  overdueTasks: number;
}

export interface ProjectsData {
  _id: string;
  name: string;
  description: string;
  status: "planning" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  progress: number;
  startDate?: string;
  endDate?: string;
  imgProject: ProjectImage;
  managerId: UserProject;
  developersIds: UserProject[];
  metrics: ProjectMetrics;
  createdAt: string;
  updatedAt: string;
}