import axios from "axios";

export interface CreateTaskDTO {
  title: string;
  description?: string;

  projectId: string;
  categoryId: string;

  userId: string;
  assignedTo?: string | null;

  status: "todo" | "in_progress" | "review" | "done";
  priority: "low" | "medium" | "high";

  progress: number;

  estimatedHours?: number;
  actualHours?: number;

  dueDate?: string | null;
}

const ApiURL = import.meta.env.VITE_API_URL;

export const getAllTask = async (projectID: string, token: string) => {
  try {
    const response = await axios.get(`${ApiURL}/task/project/${projectID}`, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};

export const getTask = async (token: string, userID: string) => {
  try {
    const response = await axios.get(`${ApiURL}/task/${userID}`, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};

export const getMyTask = async (token: string, userID: string) => {
  try {
    const response = await axios.get(`${ApiURL}/task/mytasks/${userID}`, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};

export const createNewTask = async (
  formulario: CreateTaskDTO,
  token: string,
  projectID: string,
) => {
  try {
    const response = await axios.post(
      `${ApiURL}/task/project/${projectID}`,
      formulario,
      {
        headers: {
          "x-access-token": token,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (
  taskID: string,
  formTask: Partial<CreateTaskDTO>,
  token: string,
) => {
  try {
    const response = await axios.patch(`${ApiURL}/task/${taskID}`, formTask, {
      headers: {
        "x-access-token": token,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (taskID: string, token: string) => {
  try {
    const response = await axios.delete(`${ApiURL}/task/${taskID}`, {
      headers: {
        "x-access-token": token,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
