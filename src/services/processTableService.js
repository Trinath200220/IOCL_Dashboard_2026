
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("accessToken");
};

// Fetch treatment stages with their batches
export const getStagesWithBatches = async () => {
  try {
    const token = getToken();

    const response = await axios.get(
      `${apiUrl}/treatment-process/stages-with-batches/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching treatment stages with batches:", error);

    throw error;
  }
};

