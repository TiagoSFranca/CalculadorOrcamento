using System;
using System.Collections.Generic;
using System.Text;

namespace CalculadorOrcamento.Application.Settings.Models
{
    public class AppSettings
    {
        public string SecretKey { get; set; }
        public string Version { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
