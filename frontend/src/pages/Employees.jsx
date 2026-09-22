import employeeApi from "../services/employeeApi";
import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchEmployees,
  removeEmployee,
} from "../features/employeeSlice";

import EmployeeTable from "../components/EmployeeTable";
import DeleteModal from "../components/DeleteModal";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

function Employees() {
  const dispatch = useDispatch();

  const [departments, setDepartments] =
    useState([]);

  const { employees, loading, error, pagination } = useSelector(
    (state) => state.employees
  );

  const [search, setSearch] =useState("");

  const [department, setDepartment] =useState("");

  const [sort, setSort] =useState("");

  const [page, setPage] = useState(1);

  const [
    employeeToDelete,
    setEmployeeToDelete,
  ] = useState(null);

  const [success, setSuccess] =
    useState("");

  const loadEmployees = (pageNumber = page) => {
    let sortBy = "id";
    let order = "asc";

    if (sort === "name") {
      sortBy = "name";
      order = "asc";
    }

    if (sort === "-name") {
      sortBy = "name";
      order = "desc";
    }

    if (sort === "salary") {
      sortBy = "salary";
      order = "asc";
    }

    if (sort === "-salary") {
      sortBy = "salary";
      order = "desc";
    }

    dispatch(
      fetchEmployees({
        search,
        department,
        sortBy,
        order,
        page: pageNumber,
        limit: 3,
      })
    );
  };

  useEffect(() => {
    loadEmployees();

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

  const handleSearch = () => {
    setPage(1);
    loadEmployees(1);
  };

  const handleDelete = async () => {
    if (!employeeToDelete) return;

    const result = await dispatch(
      removeEmployee(
        employeeToDelete.id
      )
    );

    if (
      removeEmployee.fulfilled.match(
        result
      )
    ) {
      setEmployeeToDelete(null);

      setSuccess(
        "Employee removed successfully"
      );

      setTimeout(
        () => setSuccess(""),
        3000
      );
    }
  };

  if (
    loading &&
    employees.length === 0
  ) {
    return (
      <Loader text="Loading employees..." />
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Employees</h1>

          <p>
            Manage all employees in your
            organization
          </p>
        </div>
      </div>

      {success && (
        <div className="success-box">
          ✓ {success}
        </div>
      )}

      {error && (
        <ErrorState
          message={error}
          onRetry={loadEmployees}
        />
      )}

      <div className="filters-card">
        <div className="search-box">
          🔍

          <input
            value={search}
            onChange={(event) => {
              const value = event.target.value;

              setSearch(value);

              if (value === "") {
                setPage(1);
                loadEmployees(1);
              }
            }}
            placeholder="Search name or email"
          />
        </div>

        <select
          value={department}
          onChange={(event) => {
            setDepartment(event.target.value);
          }}
        >
          <option value="">
            All Departments
          </option>

          {departments.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name">Name A-Z</option>
          <option value="-name">Name Z-A</option>
          <option value="salary">Salary Low-High</option>
          <option value="-salary">Salary High-Low</option>
        </select>

        <button
          className="primary-button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {!loading &&
      employees.length === 0 &&
      !error ? (
        <EmptyState
          title="No Employees Found"
          message="Employee data will appear here when available."
        />
      ) : (
        <>
          <EmployeeTable
            employees={employees}
            departments={departments}
            onDelete={
              setEmployeeToDelete
            }
          />
          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={pagination.page === 1}
                onClick={() => {
                  const nextPage = pagination.page - 1;
                  setPage(nextPage);
                  loadEmployees(nextPage);
                }}
              >
                Previous
              </button>

              {Array.from(
                { length: pagination.totalPages },
                (_, index) => index + 1
              ).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => {
                    setPage(pageNumber);
                    loadEmployees(pageNumber);
                  }}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                disabled={pagination.page === pagination.totalPages}
                onClick={() => {
                  const nextPage = pagination.page + 1;
                  setPage(nextPage);
                  loadEmployees(nextPage);
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      <DeleteModal
        employee={employeeToDelete}
        onCancel={() =>
          setEmployeeToDelete(null)
        }
        onConfirm={handleDelete}
        loading={loading}
      />
    </div>
  );
}

export default Employees;