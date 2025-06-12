using System;

namespace SkillConnect.Exceptions
{
    public class CustomException : Exception
    {
        public string Title { get; }
        public string Details { get; }
        public int StatusCode { get; }

        public CustomException(string title, string message, int statusCode = 400) 
            : base(message)
        {
            Title = title;
            Details = message;
            StatusCode = statusCode;
        }
    }
}