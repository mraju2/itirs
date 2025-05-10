using System.Text;
using Microsoft.AspNetCore.Http;

public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;

    public RequestLoggingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        context.Request.EnableBuffering(); // Allow rereading the request body

        if (context.Request.ContentLength > 0 &&
            context.Request.ContentType != null &&
            context.Request.ContentType.Contains("application/json"))
        {
            var buffer = new byte[Convert.ToInt32(context.Request.ContentLength)];
            await context.Request.Body.ReadAsync(buffer, 0, buffer.Length);
            string requestBody = Encoding.UTF8.GetString(buffer);

            Console.WriteLine("========== Incoming Raw Request Body ==========");
            Console.WriteLine(requestBody);
            Console.WriteLine("================================================");

            context.Request.Body.Position = 0; // Reset stream so MVC can read it again
        }

        await _next(context);
    }
}
