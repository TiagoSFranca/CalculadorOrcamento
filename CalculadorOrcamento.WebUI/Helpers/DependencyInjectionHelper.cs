using AutoMapper;
using CalculadorOrcamento.Application.BaseApplications;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.Settings;
using CalculadorOrcamento.Application.Settings.AutoMapper;
using MediatR;
using MediatR.Pipeline;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace CalculadorOrcamento.WebUI.Helpers
{
    public static class DependencyInjectionHelper
    {
        public static void Configure(IServiceCollection services)
        {
            //services.AddTransient<IAuthBaseApplication, AuthBaseApplication>();
            //services.AddTransient<IFileService, FileService>();
            //services.AddTransient<IIdentityServerAuthService, IdentityServerAuthService>();
            services.AddTransient(typeof(IPaginacaoBaseApplication<,>), typeof(PaginacaoBaseApplication<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestPreProcessorBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));
            //services.AddTransient<UserManager<ApplicationUser>, ApplicationUserManager>();
            //services.AddTransient<SignInManager<ApplicationUser>, ApplicationSignInManager>();
            //services.AddTransient<SeedData>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddScoped(provider => new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile(provider.GetService<IHttpContextAccessor>()));
            }).CreateMapper());
        }
    }
}
