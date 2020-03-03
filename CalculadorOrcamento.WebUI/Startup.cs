using CalculadorOrcamento.Application.Orcamentos.Models;
using CalculadorOrcamento.Application.Orcamentos.Queries.Search;
using CalculadorOrcamento.Application.Settings.Models;
using CalculadorOrcamento.Persistence;
using CalculadorOrcamento.WebUI.Filters;
using CalculadorOrcamento.WebUI.Helpers;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
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
                .AddMvcOptions(options =>
                {
                    options.ModelBinderProviders.Insert(0, new DateTimeModelBinderProvider());
                })
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<OrcamentoViewModel>());

            services.AddDbContext<CalculadorOrcamentoContext>(options =>
                options.UseLazyLoadingProxies().UseSqlServer(Configuration.GetConnectionString("CalculadorOrcamentoConnection")));

            services
                .Configure<AppSettings>(_appSettingsSection);


            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
           .AddJwtBearer(x =>
           {
               x.RequireHttpsMetadata = false;
               x.SaveToken = true;
               x.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuerSigningKey = _appSettings.JwtSettings.ValidateIssuerSigningKey,
                   ValidateIssuer = _appSettings.JwtSettings.ValidateIssuer,
                   ValidateAudience = _appSettings.JwtSettings.ValidateAudience,
                   ValidateLifetime = _appSettings.JwtSettings.ValidateLifetime,
                   SignatureValidator = delegate (string token, TokenValidationParameters parameters)
                   {
                       var jwt = new JwtSecurityToken(token);

                       return jwt;
                   },
                   RequireSignedTokens = false,
                   ClockSkew = TimeSpan.Zero
               };
           });

            services.AddAuthorization(auth =>
            {
                auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser().Build());
            });

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

            var defaultCulture = new CultureInfo("pt-BR");
            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture(defaultCulture),
                SupportedCultures = new List<CultureInfo> { defaultCulture },
                SupportedUICultures = new List<CultureInfo> { defaultCulture }
            });

            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

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
