class ResponseHandler {
    public static success(message: string, data: any = null, statusCode: number = 200) {
        return {
            status: "success",
            message,
            data,
            statusCode,
        };
    }

    public static error(message: string, statusCode: number = 500, error: any = null) {
        return {
            status: "error",
            message,
            error,
            statusCode,
        };
    }
}

export default ResponseHandler;