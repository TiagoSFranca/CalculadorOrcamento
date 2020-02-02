using CalculadorOrcamento.Application.Orcamentos.Models;
using CalculadorOrcamento.Application.Orcamentos.Queries.Search;
using CalculadorOrcamento.Application.Settings.Models;
using CalculadorOrcamento.Persistence;
using CalculadorOrcamento.WebUI.Filters;
using CalculadorOrcamento.WebUI.Helpers;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Reflection;

namespace CalculadorOrcamento.WebUI
{
    public class Startup
    {
        private const string _appSettingsSectionName = "AppSettings";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            _appSettingsSection = Configuration
                .GetSection(_appSettingsSectionName);

            _appSettings = _appSettingsSection.Get<AppSettings>();
        }

        public IConfiguration Configuration { get; }

        private readonly IConfigurationSection _appSettingsSection;

        private readonly AppSettings _appSettings;

        public void ConfigureServices(IServiceCollection services)
        {
            DependencyInjectionHelper.Configure(services);

            services
                .AddMediatR(typeof(SearchOrcamentoQuery).GetTypeInfo().Assembly);

            services
                .AddCors();

            services.AddControllersWithViews(options =>
            {
                options.Filters.Add(typeof(CustomExceptionFilterAttribute));
                //var policy = new AuthorizationPolicyBuilder()
                //       .RequireAuthenticatedUser()
                //       .RequireScope(Config._apiName).Build();
                //options.Filters.Add(new AuthorizeFilter(policy));
            })
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<OrcamentoViewModel>());

            services.AddDbContext<CalculadorOrcamentoContext>(options =>
                options.UseLazyLoadingProxies().UseSqlServer(Configuration.GetConnectionString("CalculadorOrcamentoConnection")));

            services
                .Configure<AppSettings>(_appSettingsSection);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
