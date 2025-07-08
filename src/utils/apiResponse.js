class ApiResponse {
  constructor(success, message = "success", data) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  static success(message, data = null) {
    return new ApiResponse(true, message, data);
  }

  static error(message, data = null) {
    return new ApiResponse(false, message, data);
  }
}

export { ApiResponse };