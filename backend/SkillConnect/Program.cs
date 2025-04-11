using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using SkillConnect.Configuration;
using SkillConnect.Data;
using SkillConnect.Repositories;
using SkillConnect.Repositories.Interfaces;
using SkillConnect.Services;
using SkillConnect.Services.Interfaces;
using SkillConnect.Mappings;

var builder = WebApplication.CreateBuilder(args);

// Load configuration
builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables()
    .AddCommandLine(args);

// Bind AppSettings
builder.Services.Configure<AppSettings>(builder.Configuration);
var serviceProvider = builder.Services.BuildServiceProvider();
var appSettings = serviceProvider.GetRequiredService<IOptions<AppSettings>>().Value;

// Log AppSettings info
Console.WriteLine(builder.Environment.EnvironmentName);
Console.WriteLine("MySQL Settings:");
Console.WriteLine($"  Server: {appSettings.MySqlSettings.Server}");
Console.WriteLine($"  Port: {appSettings.MySqlSettings.Port}");
Console.WriteLine($"  Database: {appSettings.MySqlSettings.Database}");
Console.WriteLine($"  UserId: {appSettings.MySqlSettings.UserId}");
Console.WriteLine("Logging Settings:");
Console.WriteLine($"  Default LogLevel: {appSettings.Logging.LogLevel}");
Console.WriteLine($"  Microsoft.AspNetCore LogLevel: {appSettings.Logging.EnableConsoleLogging}");

var logger = serviceProvider.GetRequiredService<ILogger<Program>>();
logger.LogInformation("Loaded AppSettings: {@AppSettings}", appSettings);

// Register DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
{
    var connectionString = appSettings.MySqlSettings.ConnectionString;
    if (string.IsNullOrEmpty(connectionString))
    {
        connectionString = $"Server={appSettings.MySqlSettings.Server};" +
                            $"Port={appSettings.MySqlSettings.Port};" +
                            $"Database={appSettings.MySqlSettings.Database};" +
                            $"User={appSettings.MySqlSettings.UserId};" +
                            $"Password={appSettings.MySqlSettings.Password};";
    }

    var serverVersion = new MySqlServerVersion(new Version(8, 0, 35));

    options.UseMySql(connectionString, serverVersion, mySqlOptions =>
    {
        mySqlOptions.CommandTimeout(60)
            .EnableRetryOnFailure(3, TimeSpan.FromSeconds(5), null);
    });

    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});

// Register Repositories
builder.Services.AddScoped<IUserRepository, UserRegistrationRepository>();
builder.Services.AddScoped<IJobApplicationRepository, JobApplicationRepository>();
builder.Services.AddScoped<IJobPostRepository, JobPostRepository>();
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
builder.Services.AddScoped<IStateRepository, StateRepository>();
builder.Services.AddScoped<IDistrictRepository, DistrictRepository>();
builder.Services.AddScoped<ITradeRepository, TradeRepository>();



// Register Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IJobApplicationService, JobApplicationService>();
builder.Services.AddScoped<IJobPostService, JobPostService>();
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<IStateService, StateService>();
builder.Services.AddScoped<IDistrictService, DistrictService>();
builder.Services.AddScoped<ITradeService, TradeService>();




// Register AutoMapper
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Configure Swagger, Controllers, and CORS
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
// app.UseHttpsRedirection();
app.MapControllers();

// Test endpoint
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast(
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
