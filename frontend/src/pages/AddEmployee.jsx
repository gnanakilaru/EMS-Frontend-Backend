import { useEffect, useState } from "react";
import employeeApi from "../services/employeeApi";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { useNavigate } from "react-router-dom";

import EmployeeForm from "../components/EmployeeForm";

import { addEmployee } from "../features/employeeSlice";

function AddEmployee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const { loading, error } =
    useSelector(
      (state) => state.employees
    );

  const [success, setSuccess] =
    useState("");

  const [departments, setDepartments] =
  useState([]);

  useEffect(() => {
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
  }, []);

  const handleSubmit = async (
    employeeData
  ) => {
    const result = await dispatch(
      addEmployee(employeeData)
    );

    if (
      addEmployee.fulfilled.match(
        result
      )
    ) {
      setSuccess(
        "Employee created successfully"
      );

      setTimeout(() => {
        navigate("/employees");
      }, 1000);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Add Employee</h1>
          <p>
            Create a new employee
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

      <div className="form-card">
        <EmployeeForm
          onSubmit={handleSubmit}
          onCancel={() =>
            navigate("/employees")
          }
          loading={loading}
          submitText="Create Employee"
          departments={departments}
        />
      </div>
    </div>
  );
}

export default AddEmployee;