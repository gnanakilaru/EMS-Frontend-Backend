const errorHandler = (error, req, res, next) => {
    console.error("FULL ERROR:");
    console.error(error);

    res.status(500).json({
        success: false,
        message: error.message,
        error: error
    });
};

export default errorHandler;