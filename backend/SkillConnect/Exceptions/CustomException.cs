public class CustomException : Exception
{
    public string Title { get; }
    public int StatusCode { get; }

    public CustomException(string title, string message, int statusCode) : base(message)
    {
        Title = title;
        StatusCode = statusCode;
    }
}