class ResponseHandler {
  public static success(
    message: string,
    data: object | null = null,
    statusCode: number = 200
  ) {
    return {
      status: 'success',
      message,
      data,
      statusCode
    }
  }

  public static error(
    message: string,
    statusCode: number = 500,
    error: object | null = null
  ) {
    return {
      status: 'error',
      message,
      error,
      statusCode
    }
  }
}

export default ResponseHandler
