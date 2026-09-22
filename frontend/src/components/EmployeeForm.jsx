import {
  useEffect,
  useState,
} from "react";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  departmentId: "",
  designation: "",
  salary: "",
};

function EmployeeForm({
  initialData,
  onSubmit,
  onCancel,
  loading,
  submitText,
  departments,
}) {
  const [formData, setFormData] =
    useState(emptyForm);

  const [errors, setErrors] =
    useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        departmentId:
          initialData.departmentId || "",
        designation:
          initialData.designation || "",
        salary:
          initialData.salary || "",
      });
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email";
    }

    if (!formData.departmentId) {
      newErrors.department =
        "Department is required";
    }


    if (
      formData.salary === "" ||
      Number(formData.salary) < 0
    ) {
      newErrors.salary =
        "Valid salary is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    onSubmit({
      ...formData,
      salary: Number(formData.salary),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Name *</label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Employee name"
          />

          {errors.name && (
            <span className="form-error">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Email *</label>

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Employee email"
          />

          {errors.email && (
            <span className="form-error">
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Phone</label>

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
          />
        </div>

        <div className="form-group">
          <label>Department *</label>

          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
          >
            <option value="">
              Select Department
            </option>

            {departments.map((department) => (
              <option
                key={department.id}
                value={department.id}
              >
                {department.name}
              </option>
            ))}
          </select>

          {errors.departmentId && (
            <span className="form-error">
              {errors.departmentId}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Designation *</label>

          <input
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
          />

          {errors.designation && (
            <span className="form-error">
              {errors.designation}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Salary *</label>

          <input
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
          />

          {errors.salary && (
            <span className="form-error">
              {errors.salary}
            </span>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="primary-button"
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : submitText}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;