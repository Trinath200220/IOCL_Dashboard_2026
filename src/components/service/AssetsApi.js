import axios from "axios";

// const BASE_URL = "http://192.168.1.12:8001";

const BASE_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("accessToken");
};

export const getAssetDetails = async (page, pageSize) => {
    const token = getToken();

    const response = await axios.get(
        `${BASE_URL}/equipment/assets/detail/`,
        {
            params: {
                page: Number(page),
                page_size: Number(pageSize),
            },
            headers: {
                ...(token && {
                    Authorization: `Bearer ${token}`,
                }),
            },
        }
    );

    return response.data;
};


export const getAssetCategories = async () => {
    const token = getToken();

    const response = await axios.get(
        `${BASE_URL}/equipment/assets/category-cards/`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};




export const getAssetOverview = async () => {
    const token = getToken();

    const response = await axios.get(
        `${BASE_URL}/equipment/assets/overview/`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};



export const getEquipmentTypes = async () => {
  const response = await axios.get(
    `${BASE_URL}/equipment/types/`
  );

  return response.data;
};



export const getFilteredAssetDetails = async (
  category,
  page,
  pageSize
) => {
  const token = getToken();

  const response = await axios.get(
    `${BASE_URL}/equipment/assets/detail/`,
    {
      params: {
        category: Number(category),
        page: Number(page),
        page_size: Number(pageSize),
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


