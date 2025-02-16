﻿namespace CalculadorOrcamento.Application.Settings.Models
{
    public class AppSettings
    {
        public string SecretKey { get; set; }
        public string Version { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public JwtSettings JwtSettings { get; set; }
    }
}
