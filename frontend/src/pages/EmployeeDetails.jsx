
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

import {
  fetchEmployeeById,
} from "../features/employeeSlice";

import employeeApi from "../services/employeeApi";

import Loader from "../components/Loader";

function EmployeeDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [departments, setDepartments] =
    useState([]);

  const {
    selectedEmployee: employee,
    loading,
    error,
  } = useSelector(
    (state) => state.employees
  );

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

  if (loading) {
    return (
      <Loader text="Loading employee..." />
    );
  }

  if (error || !employee) {
    return (
      <div className="error-box">
        {error ||
          "Employee not found"}
      </div>
    );
  }

  const departmentName =
    departments.find(
      (department) =>
        department.id ===
        employee.departmentId
    )?.name || "-";

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Employee Details</h1>

          <p>
            Employee information
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            navigate(
              `/employees/${id}/edit`
            )
          }
        >
          Edit
        </button>
      </div>

      <div className="employee-details-card">
        <div className="details-header">
          <div className="large-avatar">
            {employee.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <h2>{employee.name}</h2>

            <p>
              {employee.designation}
            </p>
          </div>
        </div>

        <div className="details-grid">
          <div>
            <span>Email</span>

            <strong>
              {employee.email}
            </strong>
          </div>

          <div>
            <span>Phone</span>

            <strong>
              {employee.phone || "-"}
            </strong>
          </div>

          <div>
            <span>Department</span>

            <strong>
              {departmentName}
            </strong>
          </div>

          <div>
            <span>Designation</span>

            <strong>
              {employee.designation}
            </strong>
          </div>

          <div>
            <span>Salary</span>

            <strong>
              ₹
              {Number(
                employee.salary
              ).toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Created</span>

            <strong>
              {employee.createdAt
                ? new Date(
                    employee.createdAt
                  ).toLocaleDateString()
                : "-"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
