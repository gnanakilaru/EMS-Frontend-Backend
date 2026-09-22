import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const employeeApi = {
    getEmployees: async (params = {}) => {
    console.log("API params:", params);

    const response = await axios.get(
      `${API_URL}/employees`,
      {
        params: params,
      }
    );

    return response.data;
  },
  getEmployeeById: async (id) => {
  const response = await axios.get(
    `${API_URL}/employees/${id}`
  );

  return response.data.employee;
},
  getDepartments: async () => {
    const response = await axios.get(
      `${API_URL}/departments`
    );

    return response.data.departments;
  },

  createEmployee: async (employeeData) => {
    const response = await axios.post(
      `${API_URL}/employees`,
      employeeData
    );

    return response.data;
  },

  updateEmployee: async (id, employeeData) => {
    const response = await axios.put(
      `${API_URL}/employees/${id}`,
      employeeData
    );

    return response.data;
  },

  deleteEmployee: async (id) => {
    const response = await axios.delete(
      `${API_URL}/employees/${id}`
    );

    return response.data;
  },
};

export default employeeApi;