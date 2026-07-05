import axios from "axios";

export interface UpdateSubTaskDTO {
  status?: "todo" | "in_progress" | "done";
  progress?: number;
  completedAt?: Date | null;

  name?: string;
  description?: string;
  assignedTo?: string | null;
  priority?: "low" | "medium" | "high";
  estimatedHours?: number;
  actualHours?: number;
  dueDate?: string | null;
}

export interface CreateSubTaskDTO {
  name: string;
  description?: string;

  taskId: string;
  userId: string;

  assignedTo?: string | null;

  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";

  progress: number;

  estimatedHours?: number;
  dueDate?: string | null;
}

const ApiURL = import.meta.env.VITE_API_URL;

export const getAllSubTask = async (userID: string, token: string) => {
  try {
    const response = await axios.get(`${ApiURL}/subtasks/${userID}`, {
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

export const getSubTask = async (taskID: string, token: string) => {
  try {
    const response = await axios.get(`${ApiURL}/subtasks/task/${taskID}`, {
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

export const createSubTask = async (
  subTaskForm:CreateSubTaskDTO,
  token: string,
) => {
  try {
    const response = await axios.post(
      `${ApiURL}/subtasks/${subTaskForm.taskId}`,
      subTaskForm,
      {
        headers: {
          "x-access-token": token,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};

export const deleteSubTask = async (subTaskID: string, token: string) => {
  try {
    const response = await axios.delete(`${ApiURL}/subtasks/${subTaskID}`, {
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

export const updateSubTask = async (
  subtaskID: string,
  subTaskForm: UpdateSubTaskDTO,
  token: string,
) => {
  try {
    const response = await axios.patch(
      `${ApiURL}/subtasks/${subtaskID}`,
      subTaskForm,
      {
        headers: {
          "x-access-token": token,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error updating subtask:", error);
    throw error;
  }
};
