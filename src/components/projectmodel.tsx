import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthResponseError } from "../types/types";
import { useAuth } from "../context/AuthContext";
import useError from "../hooks/error";
import { createProject, ProjectToBase64 } from "../services/projectsService";
import useUserData from "../hooks/userHooks";

interface Developer {
  _id: string;
  name: string;
  email: string;
}

interface FormValues {
  name: string;
  description: string;
  status: "planning" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  startDate: string | null;
  endDate: string | null;
  imgProject: FileList;
  developersIds: string[];
}

interface ProjectsFetchProps {
  isActive: boolean;
  onToggle: () => void;
  onProjectUploaded: () => void;
}

export default function ProjectModel({
  onToggle,
  onProjectUploaded,
}: ProjectsFetchProps) {
  const { register, handleSubmit } = useForm<FormValues>();

  const { userID, usersDevelopers } = useUserData(false, true) as {
    userID: string;
    usersDevelopers: Developer[];
  };

  const [localError, setLocalError] =
    useState<AuthResponseError | null>(null);

  const [message, setMessage] = useState<string>("");

  const { isLogin } = useAuth();
  const { error } = useError();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!userID) {
        throw new Error("User not found");
      }

      const projectImg = data.imgProject?.[0];

      if (!projectImg) {
        throw new Error("Select an image");
      }

      const base64Data = await ProjectToBase64(projectImg);

      const projectData = {
        name: data.name,
        description: data.description,

        imgProject: {
          nombre: projectImg.name,
          data: base64Data,
          type: projectImg.type,
        },

        status: data.status,
        priority: data.priority,
        startDate: data.startDate || null,
        endDate: data.endDate || null,

        managerId: userID,
        developersIds: data.developersIds || [],
      };

      const response = await createProject(projectData, isLogin);

      setMessage(response.message);
      onProjectUploaded();
      onToggle();
    } catch (err: any) {
      setLocalError({
        body: {
          error:
            err.response?.data?.message ||
            err.message ||
            "Error creating project",
        },
      });
    }
  });

  return (
    <section className="content p-4 m-4 rounded-lg mode border-t-4 ">
      <div className="flex p-3 justify-between ">
        <h1 className="font-bold text-2xl w-full">
          Form new project
        </h1>

        <button
          className="w-8"
          onClick={onToggle}
          type="button"
        >
          <img
            src="/close-x-svgrepo-com.svg"
            alt="close icon"
          />
        </button>
      </div>

      <div className="sm:container md:mx-auto bg-[--card-dark] p-4 rounded-lg">
        <div>

          {message && (
            <p className="block text-sm text-green-400 bg-green-100 p-4 rounded-md border-l-4 border-green-500 mb-3">
              {message}
            </p>
          )}

          {error && (
            <p className="text-red-400">{error.message}</p>
          )}

          {localError && (
            <p className="block text-sm text-red-400 bg-red-100 p-4 rounded-md border-l-4 border-red-500 mb-3">
              {localError.body.error}
            </p>
          )}

          <form
            className="space-y-4 flex flex-col gap-2"
            onSubmit={onSubmit}
          >
            <div>
              <h4 className="mb-1">Project name</h4>

              <input
                type="text"
                {...register("name", { required: true })}
                className="rounded-md border-0 p-2 text-gray-900 w-full"
              />
            </div>

            <div>
              <h4 className="mb-1">Description</h4>

              <textarea
                {...register("description")}
                className="rounded-md border-0 p-2 text-gray-900 w-full"
              />
            </div>

            <div>
              <h4 className="mb-1">Status</h4>

              <select
                {...register("status")}
                className="rounded-md border-0 p-2 text-gray-900 w-full"
              >
                <option value="planning">Planning</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <h4 className="mb-2">Developers</h4>

              <div className="max-h-52 overflow-y-auto rounded-md border border-gray-600 bg-[--background] p-3 space-y-2">
                {usersDevelopers.length > 0 ? (
                  usersDevelopers.map((developer) => (
                    <label
                      key={developer._id}
                      className="flex items-center gap-3 rounded-md p-2 hover:bg-slate-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={developer._id}
                        {...register("developersIds")}
                      />

                      <div>
                        <p className="text-white font-medium">
                          {developer.name}
                        </p>

                        <p className="text-sm text-gray-400">
                          {developer.email}
                        </p>
                      </div>
                    </label>
                  ))
                ) : (
                  <p className="text-gray-400">
                    No developers available
                  </p>
                )}
              </div>
            </div>

            <div>
              <h4 className="mb-1">Priority</h4>

              <select
                {...register("priority")}
                className="rounded-md border-0 p-2 text-gray-900 w-full"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <h4 className="mb-1">Start date</h4>

              <input
                type="date"
                {...register("startDate")}
                className="rounded-md border-0 p-2 text-gray-900 w-full"
              />
            </div>

            <div>
              <h4 className="mb-1">End date</h4>

              <input
                type="date"
                {...register("endDate")}
                className="rounded-md border-0 p-2 text-gray-900 w-full"
              />
            </div>

            <div className="truncate">
              <h4 className="mb-1">Project image</h4>

              <input
                type="file"
                accept="image/*"
                {...register("imgProject", {
                  required: "Project image is required",
                })}
                className="text-gray-300"
              />
            </div>

            <button
              type="submit"
              className="rounded-md mt-2 bg-[--primary] max-w-32 px-3 py-2 text-white hover:bg-[--primary-hover]"
            >
              Save Project
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}