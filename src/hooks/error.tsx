import { useState } from "react";
import axios from "axios";
import { ResponseError } from "../types/types";

export default function useError() {
  const [error, setError] = useState<ResponseError | null>(null);

  const handleError = (err: unknown) => {
    if (axios.isAxiosError(err) && err.response) {
      // Set the error message correctly based on the AuthResponseError type
      const errorMessage = err.response.data.message || 'Ocurrió un error desconocido';
      console.log(errorMessage)
      setError({ message: errorMessage });
    } else {
      setError({ message: 'Ocurrió un error desconocido' });
      console.log(err);
    }
  };

  return { error, handleError };
}

