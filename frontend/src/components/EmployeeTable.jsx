import { useNavigate } from "react-router-dom";

function EmployeeTable({
  employees,
  departments,
  onDelete,
}) {
  const navigate = useNavigate();

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>

              <td>
                <div className="employee-name">
                  <div className="employee-avatar">
                    {employee.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  {employee.name}
                </div>
              </td>

              <td>{employee.email}</td>

              <td>
                {employee.phone || "-"}
              </td>

              <td>
                {
                  departments.find(
                    (department) =>
                      department.id === employee.departmentId
                  )?.name || "-"
                }
              </td>

              <td>
                {employee.designation}
              </td>

              <td>
                ₹
                {Number(
                  employee.salary
                ).toLocaleString()}
              </td>

              <td>
                {employee.createdAt
                  ? new Date(
                      employee.createdAt
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                <div className="action-buttons">
                  <button
                    title="View"
                    onClick={() =>
                      navigate(
                        `/employees/${employee.id}`
                      )
                    }
                  >
                    👁
                  </button>

                  <button
                    title="Edit"
                    onClick={() =>
                      navigate(
                        `/employees/${employee.id}/edit`
                      )
                    }
                  >
                    ✏️
                  </button>

                  <button
                    title="Delete"
                    onClick={() =>
                      onDelete(employee)
                    }
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;