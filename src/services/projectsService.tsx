import axios from "axios";

export interface CreateProjectDTO {
  name: string;
  description: string;

  imgProject: {
    nombre: string;
    data: string;
    type: string;
  };

  status: "planning" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  startDate?: string | null;
  endDate?: string | null;
  managerId: string;
  developersIds: string[];
}
const ApiURL = import.meta.env.VITE_API_URL;

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

export const getProjects = async (userID: string, token: string) => {
  try {
    const response = await axios.get(`${ApiURL}/projects/user/${userID}`, {
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

export const getOneProject = async (projectID: string, token: string) => {
  try {
    const response = await axios.get(`${ApiURL}/projects/${projectID}`, {
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

export const createProject = async (
  projectData: CreateProjectDTO,
  token: string,
) => {
  try {
    const response = await axios.post(`${ApiURL}/projects`, projectData, {
      headers: {
        "x-access-token": token,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const deleteProject = async (projectID: string, token: string) => {
  try {
    const response = await axios.delete(`${ApiURL}/projects/${projectID}`, {
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

export const updateProject = async (
  projectID: string,
  ProjectsData: any,
  token: string,
) => {
  try {
    const response = await axios.patch(
      `${ApiURL}/projects/${projectID}`,
      ProjectsData,
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
