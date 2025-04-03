export class ApiError extends Error {
    status: number;
    body: { title: string; message: string };
  
    constructor(status: number, body: { title: string; message: string }) {
      super(body.message);
      this.name = "ApiError";
      this.status = status;
      this.body = body;
    }
  }
  