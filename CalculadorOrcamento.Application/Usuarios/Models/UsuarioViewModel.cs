using CalculadorOrcamento.Application.GenericModels;
using System;

namespace CalculadorOrcamento.Application.Usuarios.Models
{
    public class UsuarioViewModel : RegistroTempoViewModel
    {
        public int Id { get; set; }
        public Guid Codigo { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public string NomeCompleto { get; set; }
    }
}
