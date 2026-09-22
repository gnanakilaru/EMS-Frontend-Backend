import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { fetchEmployees } from "../features/employeeSlice";

import SummaryCard from "../components/SummaryCard";

function Dashboard() {
  const dispatch = useDispatch();

  const { employees } = useSelector(
    (state) => state.employees
  );

  useEffect(() => {
    // Load the complete employee list so dashboard totals are not limited
    // by the default page size used by the employee listing.
    dispatch(fetchEmployees({ page: 1, limit: 1000 }));
  }, [dispatch]);

  const departments = new Set(
    employees
      .map(
        (employee) => {
          const department = employee.department;

          return (
            department?.name ||
            department?.departmentName ||
            department?.department_name ||
            employee.departmentName ||
            employee.department_name ||
            employee.departmentId ||
            employee.department_id ||
            (typeof department === "string" ? department : null)
          );
        }
      )
      .filter(Boolean)
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Employee management overview
          </p>
        </div>
      </div>

      <div className="summary-grid">
        <SummaryCard
          title="Total Employees"
          value={employees.length}
          icon="👥"
        />

        <SummaryCard
          title="Departments"
          value={departments.size}
          icon="🏢"
        />
      </div>

      <div className="dashboard-card">
        <h2>Employee Overview</h2>

        {employees.length === 0 ? (
          <p>
            Employee statistics will
            appear when data is available.
          </p>
        ) : (
          <p>
            Currently managing{" "}
            <strong>
              {employees.length}
            </strong>{" "}
            employees across{" "}
            <strong>
              {departments.size}
            </strong>{" "}
            departments.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;