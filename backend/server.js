import { or } from "@prisma/orm-postgres/orm-client";
import express from "express";
import { db } from "./src/prisma/db.ts";
import validateEmployee from "./src/middleware/validateEmployee.js";
import errorHandler from "./src/middleware/errorHandler.js";
import cors from "cors";

const app = express();

const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// ===============================
// ROOT
// ===============================

app.get("/", (req, res) => {
    res.json({
        message: "Employee Management System Backend is running"
    });
});


// ===============================
// GET ALL EMPLOYEES
// SEARCH + FILTER + SORT + PAGINATION
// ===============================

app.get("/api/employees", async (req, res, next) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    const offset = (page - 1) * limit;

    const search = String(req.query.search || "").trim();

    // departmentId instead of department
   const departmentId = String(req.query.department || "").trim();

    const sortBy = String(req.query.sortBy || "id");
    const order = String(req.query.order || "asc").toLowerCase();

    const allowedSortFields = [
        "id",
        "name",
        "email",
        "departmentId",
        "designation",
        "salary",
        "createdAt"
    ];

    const safeSortBy = allowedSortFields.includes(sortBy)
        ? sortBy
        : "id";

    const safeOrder = order === "desc" ? "desc" : "asc";
    try {
        let employeeQuery = db.orm.public.Employee;

        // ===============================
        // SEARCH BY NAME OR EMAIL
        // ===============================

        if (search) {
            employeeQuery = employeeQuery.where((e) =>
                or(
                    e.name.ilike(`%${search}%`),
                    e.email.ilike(`%${search}%`)
                )
            );
        }

        // ===============================
        // DEPARTMENT FILTER
        // ===============================

        if (departmentId) {

            const id = Number(departmentId);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid department ID"
                });
            }

            employeeQuery = employeeQuery.where({
                departmentId: id
            });
        }

        // ===============================
        // SORTING
        // ===============================

        if (safeSortBy === "id") {

            employeeQuery = employeeQuery.orderBy((e) =>
                safeOrder === "desc"
                    ? e.id.desc()
                    : e.id.asc()
            );

        } else if (safeSortBy === "name") {

            employeeQuery = employeeQuery.orderBy((e) =>
                safeOrder === "desc"
                    ? e.name.desc()
                    : e.name.asc()
            );

        } else if (safeSortBy === "email") {

            employeeQuery = employeeQuery.orderBy((e) =>
                safeOrder === "desc"
                    ? e.email.desc()
                    : e.email.asc()
            );

        } else if (safeSortBy === "departmentId") {

            employeeQuery = employeeQuery.orderBy((e) =>
                safeOrder === "desc"
                    ? e.departmentId.desc()
                    : e.departmentId.asc()
            );

        } else if (safeSortBy === "designation") {

            employeeQuery = employeeQuery.orderBy((e) =>
                safeOrder === "desc"
                    ? e.designation.desc()
                    : e.designation.asc()
            );

        } else if (safeSortBy === "salary") {

            employeeQuery = employeeQuery.orderBy((e) =>
                safeOrder === "desc"
                    ? e.salary.desc()
                    : e.salary.asc()
            );

        } else if (safeSortBy === "createdAt") {

            employeeQuery = employeeQuery.orderBy((e) =>
                safeOrder === "desc"
                    ? e.createdAt.desc()
                    : e.createdAt.asc()
            );
        }

        // ===============================
        // PAGINATION
        // ===============================

        const employees = await employeeQuery
            .limit(limit)
            .offset(offset)
            .all();

        // ===============================
        // COUNT
        // ===============================

        let countQuery = db.orm.public.Employee;

        if (search) {
            countQuery = countQuery.where((e) =>
                or(
                    e.name.ilike(`%${search}%`),
                    e.email.ilike(`%${search}%`)
                )
            );
        }

        if (departmentId) {

            countQuery = countQuery.where({
                departmentId: Number(departmentId)
            });
        }

        const result = await countQuery.aggregate((agg) => ({
            total: agg.count()
        }));

        const total = result.total;
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            success: true,
            employees,

            pagination: {
                page,
                limit,
                total,
                totalPages
            },

            sorting: {
                sortBy: safeSortBy,
                order: safeOrder
            }
        });

    } catch (error) {
        next(error);
    }
});

// ===============================
// GET EMPLOYEE BY ID
// ===============================

app.get("/api/employees/:id", async (req, res, next) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid employee ID"
        });
    }

    try {

        const employee =
            await db.orm.public.Employee.first({ id });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        return res.status(200).json({
            success: true,
            employee
        });

    } catch (error) {
        next(error);
    }
});

// ===============================
// UPDATE EMPLOYEE
// ===============================

app.put(
    "/api/employees/:id",
    validateEmployee,
    async (req, res, next) => {

        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            });
        }

        try {

            const employee =
                await db.orm.public.Employee.first({ id });

            if (!employee) {
                return res.status(404).json({
                    success: false,
                    message: "Employee not found"
                });
            }

            const updatedEmployee =
                await db.orm.public.Employee
                    .where({ id })
                    .update({
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        departmentId:Number(req.body.departmentId),
                        designation:req.body.designation,
                        salary:Number(req.body.salary)
                    });

            res.status(200).json({
                success: true,
                message: "Employee updated successfully",
                employee: updatedEmployee
            });

        } catch (error) {

            if (error.sqlState === "23505") {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists"
                });
            }

            next(error);
        }
    }
);

// ===============================
// CREATE EMPLOYEE
// ===============================

app.post(
    "/api/employees",
    validateEmployee,
    async (req, res, next) => {

        try {

            const employee =
                await db.orm.public.Employee.create({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    departmentId:Number(req.body.departmentId),
                    designation:req.body.designation,
                    salary:Number(req.body.salary)
                });


            res.status(201).json({
                success: true,
                message: "Employee created successfully",
                employee
            });

        } catch (error) {

            if (error.sqlState === "23505") {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists"
                });
            }

            next(error);
        }
    }
);

// ===============================
// DELETE EMPLOYEE
// ===============================

app.delete("/api/employees/:id", async (req, res, next) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid employee ID"
        });
    }

    try {

        const employee =
            await db.orm.public.Employee.first({ id });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        await db.orm.public.Employee
            .where({ id })
            .delete();

        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        });

    } catch (error) {
        next(error);
    }
});

app.get("/api/departments", async (req, res, next) => {
    try {
        const departments = await db.orm.public.Department
            .orderBy((d) => d.id.asc())
            .all();

        res.status(200).json({
            success: true,
            departments
        });

    } catch (error) {
        next(error);
    }
});

// ===============================
// ERROR HANDLER
// ===============================

app.use(errorHandler);

// ===============================
// SERVER
// ===============================

app.listen(PORT, () => {
    console.log(
        `Server running on http://localhost:${PORT}`
    );
});