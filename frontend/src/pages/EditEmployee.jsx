import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import EmployeeForm from "../components/EmployeeForm";
import Loader from "../components/Loader";

import {
  editEmployee,
  fetchEmployeeById,
} from "../features/employeeSlice";

import employeeApi from "../services/employeeApi";

function EditEmployee() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selectedEmployee,
    loading,
    error,
  } = useSelector(
    (state) => state.employees
  );

  const [success, setSuccess] =
    useState("");

  const [departments, setDepartments] =
    useState([]);

  useEffect(() => {
    dispatch(fetchEmployeeById(id));

    const loadDepartments = async () => {
      try {
        const data =
          await employeeApi.getDepartments();

        setDepartments(data);
      } catch (error) {
        console.error(
          "Failed to load departments:",
          error
        );
      }
    };

    loadDepartments();
  }, [dispatch, id]);

  const handleSubmit = async (
    employeeData
  ) => {
    const result = await dispatch(
      editEmployee({
        id,
        employeeData,
      })
    );

    if (
      editEmployee.fulfilled.match(result)
    ) {
      setSuccess(
        "Employee updated successfully"
      );

      setTimeout(() => {
        navigate("/employees");
      }, 1000);
    }
  };

  if (
    loading &&
    !selectedEmployee
  ) {
    return (
      <Loader text="Loading employee..." />
    );
  }

  if (
    !selectedEmployee &&
    error
  ) {
    return (
      <div className="error-box">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Edit Employee</h1>

          <p>
            Update employee information
          </p>
        </div>
      </div>

      {success && (
        <div className="success-box">
          ✓ {success}
        </div>
      )}

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {selectedEmployee && (
        <div className="form-card">
          <EmployeeForm
            initialData={
              selectedEmployee
            }
            departments={departments}
            onSubmit={handleSubmit}
            onCancel={() =>
              navigate("/employees")
            }
            loading={loading}
            submitText="Update Employee"
          />
        </div>
      )}
    </div>
  );
}

export default EditEmployee;