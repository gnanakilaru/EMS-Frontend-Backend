const validateEmployee = (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).json({
            success: false,
            message: "Name is required"
        });
    }

    if (!req.body.email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(req.body.email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
    }

    if (!req.body.phone) {
        return res.status(400).json({
            success: false,
            message: "Phone is required"
        });
    }

    if (
    req.body.departmentId === undefined ||
    req.body.departmentId === null ||
    req.body.departmentId === ""
    ) {
        return res.status(400).json({
            success: false,
            message: "Department ID is required"
        });
    }

    if (!Number.isInteger(Number(req.body.departmentId)) || Number(req.body.departmentId) <= 0) {
        return res.status(400).json({
            success: false,
            message: "Department ID must be a positive integer"
        });
    }

    if (!req.body.designation) {
        return res.status(400).json({
            success: false,
            message: "Designation is required"
        });
    }

    if (!req.body.salary) {
        return res.status(400).json({
            success: false,
            message: "Salary is required"
        });
    }
    if (isNaN(Number(req.body.salary)) || Number(req.body.salary) <= 0) {
        return res.status(400).json({
            success: false,
            message: "Salary must be a positive number"
        });
    }

    next();
};

export default validateEmployee;