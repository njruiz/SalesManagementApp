using API.Extensions;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

//services container

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors();

app.UseAuthentication();

app.UseAuthorization();

app.UseDefaultFiles();

app.UseStaticFiles();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

app.Run();