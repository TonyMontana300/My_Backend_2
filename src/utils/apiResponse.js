class ApiResponse {
  constructor(success, message = "success", data) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }

  static success(message, data = null) {
    return new ApiResponse(true, message, data);
  }

  static error(message, data = null) {
    return new ApiResponse(false, message, data);
  }
}