using System.ComponentModel.DataAnnotations;

namespace SkillConnect.Configuration
{
    public class AppSettings
    {
        public MySqlSettings MySqlSettings { get; set; } // 🔄 Changed to match JSON key
        public Logging Logging { get; set; } // 🔄 Changed to match JSON key
    }

    public class MySqlSettings
    {
        public string Server { get; set; }
        public int Port { get; set; }
        public string Database { get; set; }
        public string UserId { get; set; }
        public string Password { get; set; }
        public string ConnectionString { get; set; }
    }

    public class Logging
    {
        public bool EnableConsoleLogging { get; set; }
        public LogLevelSettings LogLevel { get; set; }
    }

    public class LogLevelSettings
    {
        public string Default { get; set; }
        public string MicrosoftAspNetCore { get; set; } // Maps to "Microsoft.AspNetCore"
    }
}
