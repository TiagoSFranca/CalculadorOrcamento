using CalculadorOrcamento.Domain.Entities.GenericModels;
using System;
using System.Collections.Generic;

namespace CalculadorOrcamento.Domain.Entities
{
    public class Usuario : RegistroTempo
    {
        public Usuario()
        {
            Orcamentos = new HashSet<Orcamento>();
        }

        public int Id { get; set; }
        public Guid Codigo { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public bool ConfirmouEmail { get; set; }

        public virtual ICollection<Orcamento> Orcamentos { get; set; }
    }
}
