import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeApi from "../services/employeeApi";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (params = {}, { rejectWithValue }) => {
    try {
      return await employeeApi.getEmployees(
        params
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message
      );
    }
  }
);

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchEmployeeById",
  async (id, { rejectWithValue }) => {
    try {
      return await employeeApi.getEmployeeById(id);
    } catch (error) {
  return rejectWithValue(
    error.response?.data?.message ||
    error.message
  );
}
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      return await employeeApi.createEmployee(employeeData);
    } catch (error) {
  return rejectWithValue(
    error.response?.data?.message ||
    error.message
  );
}
  }
);

export const editEmployee = createAsyncThunk(
  "employees/editEmployee",
  async ({ id, employeeData }, { rejectWithValue }) => {
    try {
      return await employeeApi.updateEmployee(id, employeeData);
    } catch (error) {
  return rejectWithValue(
    error.response?.data?.message ||
    error.message
  );
}
  }
);

export const removeEmployee = createAsyncThunk(
  "employees/removeEmployee",
  async (id, { rejectWithValue }) => {
    try {
      await employeeApi.deleteEmployee(id);
      return id;
    } catch (error) {
  return rejectWithValue(
    error.response?.data?.message ||
    error.message
  );
}
  }
);

const initialState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,

  pagination: {
    page: 1,
    limit: 3,
    total: 0,
    totalPages: 0,
  },

  sorting: {
    sortBy: "id",
    order: "asc",
  },
};

const employeeSlice = createSlice({
  name: "employees",

  initialState,

  reducers: {
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },

    clearEmployeeError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload.employees;
        state.pagination = action.payload.pagination;
        state.sorting = action.payload.sorting;
      })

      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedEmployee = null;
      })

      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEmployee = action.payload;
      })

      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })

      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(editEmployee.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.employees.findIndex(
          (employee) => employee.id === action.payload.id
        );

        if (index !== -1) {
          state.employees[index] = action.payload;
        }

        state.selectedEmployee = action.payload;
      })

      .addCase(editEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.loading = false;

        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload
        );
      })

      .addCase(removeEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearSelectedEmployee,
  clearEmployeeError,
} = employeeSlice.actions;

export default employeeSlice.reducer;